/** @format */

import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useCallback, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as Font from 'expo-font';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import PropertyModal from './PropertyModal';
import * as SplashScreen from 'expo-splash-screen';

// We have used SliderBox library to show a slider of pictures, that was a reason why we dropped react and react native version, PropType known bug :)
// We might have dropped expo version also, but since this is a demo only I didn't lose time doing that

export default function App() {
	// Initial Location set to Berlin lat and lng, later on can changed to current possition or cordinates loaded from somewhere else
	const [initialRegion, setInitialRegion] = useState({ latitude: 52.51139202772277, longitude: 13.392388969659805, latitudeDelta: 0.18822200596332372, longitudeDelta: 0.24783944009863035 });
	const [properties, setProperties] = useState([]);
	const [propertyData, setPropertyData] = useState([]);
	const [appIsReady, setAppIsReady] = useState(false);
	const [selectedProperty, setSelectedProperty] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const mapRef = useRef(null);
	const { width, height } = Dimensions.get('window');

	useEffect(() => {
		// Here we fetch all the properties for asked location (Berlin), in the future we can have parameters here
		getProperties();
		async function prepare() {
			try {
				// We load fonts and set app to ready
				await Promise.all([
					Font.loadAsync({
						// This is where we load the fonts
						'milkman-regular': require('./assets/fonts/MilkmanRegular.ttf'),
						'glimer-light': require('./assets/fonts/Gilmer Light.ttf'),
						'glimer-bold': require('./assets/fonts/Gilmer-Bold.ttf'),
					}),
				]);
			} catch (e) {
				console.warn(e);
			} finally {
				setAppIsReady(true);
			}
		}
		prepare();
	}, []);

	const getProperties = () => {
		// GET request, later on we can change the url parameters
		fetch('https://api.limehome.com/properties/v1/public/properties/?cityId=32&adults=1', {
			method: 'GET',
			// Request Type
		})
			.then((response) => response.json())
			// If response is in json then in success
			.then((responseJson) => {
				// Success
				setProperties(responseJson.payload);
			})
			// If response is not in json then in error
			.catch((error) => {
				//Error
				alert(JSON.stringify(error));
			});
	};

	const getPropertyDetails = (propertyId) => {
		// GET request, later on we can change the url parameters
		fetch('https://api.limehome.com/properties/v1/public/properties/' + propertyId, {
			method: 'GET',
			// Request Type
		})
			.then((response) => response.json())
			// If response is in json then in success
			.then((responseJson) => {
				// Success
				setPropertyData(responseJson.payload);
			})
			.finally(() => setLoaded(true))
			// If response is not in json then in error
			.catch((error) => {
				//Error
				alert(JSON.stringify(error));
			});
	};

	const toggleModal = () => {
		setModalVisible(!modalVisible);
	};

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) {
			// This tells the splash screen to hide immediately! If we call this after
			// `setAppIsReady`, then we may see a blank screen while the app is
			// loading its initial state and rendering its first pixels. So instead,
			// we hide the splash screen once we know the root view has already
			// performed layout.
			await SplashScreen.hideAsync();
		}
	}, [appIsReady]);

	if (!appIsReady) {
		return null;
	}

	// We have to use this function for IOS version of the app, so we have initial map region set correctly (ios bug)
	const onRegionChangeComplete = (region) => {
		if (!loaded) {
			if (region.latitude != initialRegion.latitude || region.longitude != initialRegion.longitude) {
				mapRef.current.animateToRegion(initialRegion, 1);
			}
			setLoaded(true);
		}
	};

	return (
		<View style={styles.container} onLayout={onLayoutRootView}>
			<MapView
				provider={PROVIDER_GOOGLE} // remove if not using Google Maps
				loadingEnabled={true}
				ref={mapRef}
				onRegionChangeComplete={(region) => onRegionChangeComplete(region)}
				region={initialRegion}
				style={styles.map}
				onMarkerPress={() => {
					mapRef.current.animateToRegion(
						{
							latitudeDelta: 0.18,
							longitudeDelta: 0.24,
							latitude: selectedProperty.location.lat,
							longitude: selectedProperty.location.lng,
						},
						500
					);
				}}
			>
				{properties.map((property, index) => {
					return (
						<Marker
							key={index}
							onPress={() => {
								setSelectedProperty(property);
								getPropertyDetails(property.id);
							}}
							coordinate={{
								latitude: property.location.lat,
								longitude: property.location.lng,
							}}
							tracksViewChanges={true}
							identifier={property.id}
						>
							<View
								style={[
									styles.markerView,
									{
										backgroundColor: property.id === selectedProperty?.id ? '#B26422' : '#4B4B4D',
									},
								]}
							>
								<Text style={{ color: '#fff' }}>{property.lowest_price_per_night === null ? '80€' : lowest_price_per_night}</Text>
							</View>
						</Marker>
					);
				})}
			</MapView>
			{selectedProperty && (
				<>
					<TouchableOpacity onPress={() => toggleModal(!modalVisible)} style={styles.cartPress}>
						<>
							<View>
								<Image source={selectedProperty.profilePhoto !== null && { uri: selectedProperty.images[0].url }} style={styles.image} />
								<View style={styles.rating}>
									<Text style={styles.ratingText}>4.5</Text>
									<MaterialIcon size={15} color='#B26422' name='star' />
								</View>
							</View>

							<View style={styles.cartBody}>
								<Text style={styles.propertyName}>{selectedProperty.name}</Text>
								<View style={styles.distanceParent}>
									<MaterialIcon size={15} color='#B26422' name='place' />
									<Text style={styles.distanceText}>{selectedProperty.distance.toFixed(2)} km from city center</Text>
								</View>
								<View style={styles.divider} />
								<View style={styles.cartFooter}>
									<Text style={styles.footerFromText}>From</Text>
									<Text style={styles.footerPriceText}>{selectedProperty.lowest_price_per_night === null ? '80€' : selectedProperty.lowest_price_per_night}</Text>
									<Text style={styles.footerNightText}>/ Night</Text>
								</View>
							</View>
						</>
					</TouchableOpacity>
					<PropertyModal selectedProperty={selectedProperty} toggleModal={toggleModal} modalVisible={modalVisible} propertyData={propertyData} />
				</>
			)}
			<View style={styles.menuFooter}>
				<TouchableOpacity style={styles.menuButton}>
					<MaterialIcon size={24} color='white' name='search' />
					<Text style={styles.menuButtonText}>Search</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.menuButton}>
					<MaterialIcon size={24} color='white' name='map' />
					<Text style={styles.menuButtonText}>Map</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.menuButton}>
					<MaterialIcon size={24} color='white' name='favorite-border' />
					<Text style={styles.menuButtonText}>Saved</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.menuButton}>
					<MaterialIcon size={24} color='white' name='account-circle' />
					<Text style={styles.menuButtonText}>Profile</Text>
				</TouchableOpacity>
			</View>
			<StatusBar style='auto' />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	image: {
		width: 120,
		height: 120,
		resizeMode: 'cover',
	},
	markerView: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: 43,
		height: 40,
		borderRadius: 3,
	},
	map: {
		...StyleSheet.absoluteFillObject,
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	cartPress: {
		flexDirection: 'row',
		width: '90%',
		height: 120,
		backgroundColor: '#F7F1E9',
		marginBottom: 20,
		borderRadius: 3,
	},
	rating: {
		borderRadius: 3,
		position: 'absolute',
		top: 10,
		right: 10,
		width: 46,
		height: 22,
		backgroundColor: '#F7F1E9',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	ratingText: {
		fontFamily: 'glimer-light',
		fontSize: 12,
	},
	cartBody: {
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 5,
		paddingBottom: 5,
		justifyContent: 'space-between',
	},
	propertyName: {
		fontFamily: 'milkman-regular',
		fontSize: 24,
		flexWrap: 'wrap',
		maxWidth: '90%',
	},
	distanceParent: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	distanceText: {
		fontFamily: 'glimer-light',
		fontSize: 14,
		paddingLeft: 5,
	},
	divider: {
		borderBottomWidth: 1,
		borderBottomColor: '#9D9E9F',
	},
	cartFooter: {
		flexDirection: 'row',
		alignItems: 'center',
		alignContent: 'center',
	},
	footerFromText: {
		fontFamily: 'glimer-light',
		fontSize: 14,
		paddingRight: 5,
	},
	footerPriceText: {
		fontFamily: 'glimer-bold',
		fontSize: 14,
		color: '#B26422',
	},
	footerNightText: {
		fontFamily: 'glimer-light',
		fontSize: 14,
		color: '#B26422',
	},
	menuFooter: {
		flexDirection: 'row',
		width: '100%',
		height: 80,
		backgroundColor: '#4D6447',
		padding: 24,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		justifyContent: 'space-around',
	},
	menuButton: {
		alignItems: 'center',
	},
	menuButtonText: {
		fontFamily: 'glimer-light',
		fontSize: 12,
		color: '#fff',
	},
});
