/** @format */

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import styles from './FooterComponent.Styles';

const FooterComponent = () => {
	return (
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
	);
};

export default FooterComponent;
