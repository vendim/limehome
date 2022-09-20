/** @format */

import React, { useState, useEffect } from 'react';
import Modal from 'react-native-modalbox';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { SliderBox } from 'react-native-image-slider-box';

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
							<Text style={{ fontFamily: 'glimer-light', fontSize: 14, paddingLeft: 5 }}>{selectedProperty.distance.toFixed(2)} km from city center</Text>
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
					<Text style={styles.footerTextFrom}>From</Text>
					<Text style={styles.footerTextPrice}>{selectedProperty.lowest_price_per_night === null ? '80€' : selectedProperty.lowest_price_per_night}</Text>
					<Text style={styles.footerTextNight}>/ Night</Text>
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

const styles = StyleSheet.create({
	modal: {
		justifyContent: 'flex-start',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	autoModal: {
		height: 'auto',
	},
	sliderBox: {
		width: '100%',
		height: 300,
		resizeMode: 'cover',
	},
	closeModal: {
		width: 40,
		height: 40,
		backgroundColor: '#fff',
		position: 'absolute',
		top: 60,
		left: 20,
		justifyContent: 'center',
		borderRadius: 3,
	},
	closeText: {
		fontSize: 19,
		fontFamily: 'glimer-light',
		alignSelf: 'center',
	},
	headText: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	propertyName: {
		fontFamily: 'milkman-regular',
		fontSize: 24,
		color: '#4B4B4D',
	},
	distance: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: 10,
	},
	rating: {
		borderRadius: 3,
		borderColor: '#4B4B4D',
		borderWidth: 0.5,
		paddingLeft: 10,
		paddingRight: 10,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	ratingText: {
		fontFamily: 'glimer-bold',
		fontSize: 20,
	},
	propertyDescription: {
		fontFamily: 'glimer-light',
		fontSize: 16,
		paddingTop: 15,
	},
	propertyDivider: {
		borderBottomWidth: 1,
		borderBottomColor: '#9D9E9F',
		paddingBottom: 10,
	},
	roomTypeText: {
		fontFamily: 'glimer-bold',
		fontSize: 20,
		paddingTop: 15,
	},
	bedroomView: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'flex-start',
	},
	roomButton: {
		backgroundColor: '#C9CBAB',
		borderRadius: 3,
		padding: 5,
		marginRight: 10,
		marginBottom: 5,
		marginTop: 5,
	},
	roomButtonText: {
		fontFamily: 'glimer-light',
		fontSize: 16,
	},
	footerView: {
		backgroundColor: '#C9CBAB',
		width: '100%',
		height: 64,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingLeft: 10,
		paddingRight: 10,
	},
	footerLeft: {
		flexDirection: 'row',
		alignItems: 'center',
		alignContent: 'center',
		justifyContent: 'flex-start',
	},
	footerTextFrom: {
		fontFamily: 'glimer-light',
		fontSize: 14,
		paddingRight: 5,
	},
	footerTextPrice: {
		fontFamily: 'glimer-bold',
		fontSize: 14,
		color: '#B26422',
	},
	footerTextNight: {
		fontFamily: 'glimer-light',
		fontSize: 14,
		color: '#B26422',
	},
	footerButton: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#4D6447',
		borderRadius: 3,
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
		paddingLeft: 20,
		paddingRight: 5,
		paddingTop: 15,
		paddingBottom: 15,
	},
});
