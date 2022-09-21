/** @format */

import React from 'react';
import { StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';

const FromPriceComponent = ({ price }) => {
	return (
		<>
			<Text style={styles.footerTextFrom}>From</Text>
			<Text style={styles.footerTextPrice}>{price === null ? '80€' : price}</Text>
			<Text style={styles.footerTextNight}>/ Night</Text>
		</>
	);
};
export default FromPriceComponent;

FromPriceComponent.propTypes = {
	price: PropTypes.number,
};

const styles = StyleSheet.create({
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
});
