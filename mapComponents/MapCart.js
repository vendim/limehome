/** @format */

import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './MapCart.Styles';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import DistanceTextComponent from '../components/DistanceText';
import FromPriceComponent from './FromPrice';

const MapCart = ({ selectedProperty, toggleModal, modalVisible }) => {
	return (
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
						<DistanceTextComponent distance={selectedProperty.distance} />
					</View>
					<View style={styles.divider} />
					<View style={styles.cartFooter}>
						<FromPriceComponent price={selectedProperty.lowest_price_per_night} />
					</View>
				</View>
			</>
		</TouchableOpacity>
	);
};

export default MapCart;
