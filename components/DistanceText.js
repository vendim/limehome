/** @format */

import React from 'react';
import { StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';

const DistanceTextComponent = ({ distance }) => {
	return <Text style={styles.distanceText}>{distance.toFixed(2)} km from city center</Text>;
};
export default DistanceTextComponent;

DistanceTextComponent.propTypes = {
	distance: PropTypes.number,
};

const styles = StyleSheet.create({
	distanceText: {
		fontFamily: 'glimer-light',
		fontSize: 14,
		paddingLeft: 5,
	},
});
