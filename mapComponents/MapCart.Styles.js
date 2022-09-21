/** @format */

const React = require('react-native');
const { StyleSheet } = React;

const styles = StyleSheet.create({
	cartPress: {
		flexDirection: 'row',
		width: '90%',
		height: 120,
		backgroundColor: '#F7F1E9',
		marginBottom: 20,
		borderRadius: 3,
	},
	rating: {
		borderRadius: 3,
		position: 'absolute',
		top: 10,
		right: 10,
		width: 46,
		height: 22,
		backgroundColor: '#F7F1E9',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	ratingText: {
		fontFamily: 'glimer-light',
		fontSize: 12,
	},
	cartBody: {
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 5,
		paddingBottom: 5,
		justifyContent: 'space-between',
	},
	propertyName: {
		fontFamily: 'milkman-regular',
		fontSize: 24,
		flexWrap: 'wrap',
		maxWidth: '90%',
	},
	distanceParent: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	divider: {
		borderBottomWidth: 1,
		borderBottomColor: '#9D9E9F',
	},
	cartFooter: {
		flexDirection: 'row',
		alignItems: 'center',
		alignContent: 'center',
	},
	footerFromText: {
		fontFamily: 'glimer-light',
		fontSize: 14,
		paddingRight: 5,
	},
	footerPriceText: {
		fontFamily: 'glimer-bold',
		fontSize: 14,
		color: '#B26422',
	},
	footerNightText: {
		fontFamily: 'glimer-light',
		fontSize: 14,
		color: '#B26422',
	},
	image: {
		width: 120,
		height: 120,
		resizeMode: 'cover',
	},
});
export default styles;
