import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	ActivityIndicator,
	Button
} from "react-native";

import { DefaultStyles, Colors } from "../constants";
import searchQueryFood from "../api/SearchApi";

function RequestResult({ route, navigation }) {
    const { searchKey } = route.params;
    const onGoBack = route.params?.onGoBack;
    
	const closeResults = () => {
		setLoading(true);
		setResList([]);
		navigation.goBack();
	};

	const [ isLoading, setLoading ] = useState(true);
	const [ results, setResList ] = useState([]);

	useEffect(
		() => {
			if (isLoading) {
				searchQueryFood(searchKey, setResList)
					.then(() => setLoading(false))
					.catch((err) => console.log("Error querying:", err));
			}
		},
		[ isLoading, searchKey, searchQueryFood ]
	);

	return (
		<View style={DefaultStyles.screen}>
			<View style={DefaultStyles.contentContainer}>
				<View style={styles.resultStatInfo}>
					<Text>Searching for: "{searchKey}"</Text>
				</View>

				{isLoading ? (
					<View style={styles.loadingContainer}>
						<ActivityIndicator size="large" color="black" />
					</View>
				) : results.length === 0 ? (
					<View style={styles.noResultsContainer}>
						<View style={styles.searchResultInfo}>
							<Text>No results found :(</Text>
						</View>
					</View>
				) : (
					<View>
						<View style={styles.resultStatInfo}>
							<Text>Results found: {results.length}</Text>
						</View>

						<ScrollView style={styles.searchResults}>
							{results.map((item) =>
								getResultItemElement(item, navigation, onGoBack)
							)}

							<View style={styles.endOfResultsText}>
								<Text>No more liao!</Text>
							</View>
						</ScrollView>
					</View>
				)}
			</View>
		</View>
	);
}

function getResultItemElement(item, navigation, onGoBack) {
	const getKey = (name, objType) =>
		name + "_" + objType + "_" + Math.floor(Math.random() * 10000);
	const foodID = getKey(item.name, "list");

	return (
		<View style={styles.searchResultContainer} key={foodID}>
			<View style={styles.searchResultInfoContainer}>
				<Text style={styles.searchResultKey}>{item.name}</Text>

				<Text style={styles.searchResultInfo}>{item.price}</Text>

				<Text style={styles.searchResultInfo}>
					{item.store.store_name} ({item.store.location})
				</Text>

				<Text style={styles.searchResultInfo}>
					{item.store.open_hours} - {item.store.close_hours}
				</Text>
			</View>

			<View style={styles.detailsButtonContainer}>
				<Button
					title="Select"
					color={Colors.BUTTON}
					onPress={() =>
						navigation.navigate("My Request", {
							onGoBack : () => onGoBack(),
							foodObj  : item
							// store: item.store.store_name,
							// open: item.store.open_hours,
							// close: item.store.close_hours,
							// loc: item.store.location,
							// food: item.name,
							// price: item.price
						})}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	searchResults             : {
		marginLeft : 0,
		paddingTop : 0
	},

	searchResultContainer     : {
		marginTop     : 10,
		padding       : 10,
		borderWidth   : 2,
		// borderColor: Colors.CARD,
		borderColor   : Colors.TEXT,
		borderRadius  : 4,
		width         : "97%",
		color         : Colors.TEXT,
		flexDirection : "row"
	},

	searchResultKey           : {
		color      : Colors.TEXT,
		fontSize   : 16,
		fontWeight : "bold"
	},

	searchResultInfo          : {
		color    : Colors.TEXT,
		fontSize : 14
	},

	loadingContainer          : {
		flex           : 1,
		paddingBottom  : 100,
		flexDirection  : "row",
		alignItems     : "center",
		justifyContent : "center"
	},

	noResultsContainer        : {
		paddingTop     : 250,
		alignItems     : "center",
		justifyContent : "center"
	},

	searchResultInfoContainer : {
		flex : 10
	},

	detailsButtonContainer    : {
		flex           : 4,
		justifyContent : "space-around",
		alignItems     : "flex-end"
	},

	detailsButton             : {
		fontSize : 12,
		color    : Colors.BUTTON
	},

	resultStatInfo            : {
		marginTop    : 4,
		marginBottom : 4,
		fontSize     : 14,
		color        : Colors.TEXT,
		fontStyle    : "italic"
	},

	endOfResultsText          : {
		height          : 180,
		paddingVertical : 20,
		fontStyle       : "italic",
		alignItems      : "center"
		// justifyContent: 'center'
	}
});

export default RequestResult;
