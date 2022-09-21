/** @format */

const React = require('react-native');
const { StyleSheet } = React;
import { Dimensions } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'flex-end',
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
});

export default styles;
