/** @format */

import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useCallback, useRef } from 'react';
import { Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as Font from 'expo-font';
import PropertyModal from './modals/PropertyModal';
import * as SplashScreen from 'expo-splash-screen';
import { propertyService } from './services/PropertyService';
import MapCart from './mapComponents/MapCart';
import FooterComponent from './components/FooterComponent';
import styles from './App.Styles';
import PriceTextComponent from './components/PriceText';

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

	useEffect(() => {
		// Here we fetch all the properties for asked location (Berlin), in the future we can have parameters here
		// getProperties();
		async function prepare() {
			try {
				const properties = await propertyService.getPropertyByCity({ cityId: 32, adults: 1 });
				setProperties(properties);
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

	// On MarkerPress we are calling the service to get PropertyDetails so we can pass the property to the component/modal for rendering
	const onMarkerPress = async (property) => {
		setSelectedProperty(property);
		let propertyData = await propertyService.getPropertyDetails(property.id);
		setPropertyData(propertyData);
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
							onPress={() => onMarkerPress(property)}
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
								<PriceTextComponent price={property.lowest_price_per_night} />
							</View>
						</Marker>
					);
				})}
			</MapView>
			{selectedProperty && (
				<>
					<MapCart selectedProperty={selectedProperty} toggleModal={toggleModal} modalVisible={modalVisible} />
					<PropertyModal selectedProperty={selectedProperty} toggleModal={toggleModal} modalVisible={modalVisible} propertyData={propertyData} />
				</>
			)}
			<FooterComponent />
			<StatusBar style='auto' />
		</View>
	);
}
