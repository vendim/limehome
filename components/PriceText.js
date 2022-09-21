/** @format */

import React from 'react';
import { StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';

const PriceTextComponent = ({ price }) => {
	return <Text style={styles.text}>{price === null ? '80€' : price}</Text>;
};
export default PriceTextComponent;

PriceTextComponent.propTypes = {
	price: PropTypes.number,
};

const styles = StyleSheet.create({
	text: { color: '#fff' },
});
