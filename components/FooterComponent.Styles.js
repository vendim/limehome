/** @format */

const React = require('react-native');
const { StyleSheet } = React;

const styles = StyleSheet.create({
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
export default styles;
