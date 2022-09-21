/** @format */

import config from '../constants/environment';

const ENDPOINTS = {
	GET_PROPERTIES_CITY: 'properties/?',
	GET_PROPERTY_DETAILS: 'properties/',
};

const { API_BASE_URL } = config;

class PropertyService {
	getPropertyByCity = (data) =>
		fetch(API_BASE_URL + ENDPOINTS.GET_PROPERTIES_CITY + getSearchParams(data), {
			method: 'GET',
			// Request Type
		})
			.then((response) => response.json())
			// If response is in json then in success
			.then((responseJson) => {
				// Success
				return responseJson.payload;
			})
			// If response is not in json then in error
			.catch((error) => {
				//Error
				alert(JSON.stringify(error));
			});

	getPropertyDetails = (propertyId) =>
		fetch(API_BASE_URL + ENDPOINTS.GET_PROPERTY_DETAILS + +propertyId, {
			method: 'GET',
			// Request Type
		})
			.then((response) => response.json())
			// If response is in json then in success
			.then((responseJson) => {
				// Success
				return responseJson.payload;
			})
			// If response is not in json then in error
			.catch((error) => {
				//Error
				alert(JSON.stringify(error));
			});
}

const getSearchParams = (data) => {
	const searchParams = new URLSearchParams();
	Object.keys(data).forEach((key) => searchParams.append(key, data[key]));
	return searchParams.toString();
};

export const propertyService = new PropertyService();
