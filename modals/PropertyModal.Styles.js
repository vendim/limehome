/** @format */

const React = require('react-native');
const { StyleSheet } = React;

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

export default styles;
