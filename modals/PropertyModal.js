/** @format */

import React from 'react';
import Modal from 'react-native-modalbox';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { SliderBox } from 'react-native-image-slider-box';
import styles from './PropertyModal.Styles';
import DistanceTextComponent from '../components/DistanceText';
import FromPriceComponent from '../mapComponents/FromPrice';

const PropertyModal = ({ selectedProperty, toggleModal, modalVisible, propertyData }) => {
	return (
		<Modal isOpen={modalVisible} style={styles.modal} position={'bottom'} coverScreen={true} swipeArea={40}>
			<SliderBox style={styles.sliderBox} resizeMethod={'resize'} resizeMode={'cover'} images={selectedProperty.images} imageLoadingColor='#B26422' />
			<TouchableOpacity onPress={() => toggleModal()} style={styles.closeModal}>
				<Text style={styles.closeText}>X</Text>
			</TouchableOpacity>
			<ScrollView
				contentContainerStyle={{ flexGrow: 1 }}
				style={{
					padding: 15,
				}}
			>
				<View style={styles.headText}>
					<View>
						<Text style={styles.propertyName}>{selectedProperty.name}</Text>
						<View style={styles.distance}>
							<MaterialIcon size={23} color='#B26422' name='place' />
							<DistanceTextComponent distance={selectedProperty.distance} />
						</View>
					</View>
					<View style={styles.rating}>
						<Text style={styles.ratingText}>4.5</Text>
						<MaterialIcon size={23} color='#B26422' name='star' />
					</View>
				</View>
				<Text style={styles.propertyDescription}>{propertyData.description}</Text>
				<View style={styles.propertyDivider} />
				<Text style={styles.roomTypeText}>Room types available in this location</Text>
				<View style={styles.bedroomView}>
					{selectedProperty.unit_groups.map((unit, index) => {
						return (
							<View key={index} style={styles.roomButton}>
								<Text style={styles.roomButtonText}>{unit.bedroom_count} Bedroom suites</Text>
							</View>
						);
					})}
				</View>
			</ScrollView>
			<View style={styles.footerView}>
				<View style={styles.footerLeft}>
					<FromPriceComponent price={selectedProperty.lowest_price_per_night} />
				</View>
				<TouchableOpacity onPress={() => toggleModal()} style={styles.footerButton}>
					<Text style={styles.buttonText}>EXPLORE</Text>
					<MaterialIcon size={21} color='#fff' name='east' style={{ paddingRight: 10 }} />
				</TouchableOpacity>
			</View>
		</Modal>
	);
};

export default PropertyModal;
