import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Button,
	ActivityIndicator
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import MyRequestContainer from "../components/MyRequestContainer";
import { readHelps } from "../api/HelpApi";

function HelpBuyPls({ navigation }) {
	const [isLoading, setLoading] = useState(true);
	const [requests, setRequests] = useState([]);

	const loadHelps = () => {
		readHelps(setRequests)
			.then(() => setLoading(false))
			.catch((err) => console.log("Error loading Requests:", err));
	};

	const refresh = () => {
		setLoading(true);
		loadHelps();
	};

	// Import Info from database
	useEffect(
		() => {
			if (isLoading) {
				loadHelps();
			}
		},
		[isLoading, loadHelps, readHelps, setLoading]
	);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.noteContainer}>
				<Text style={styles.note}>
					*Note: Help Fee $1 (on top of food fee) ,
					{"\n"} please pay helper directly upon receiving!
				</Text>
			</View>
			<View style={styles.searchResultInfoContainer}>
				{isLoading ? (
					<View style={styles.loadingContainer}>
						<ActivityIndicator size="large" color="black" />
					</View>
				) : requests.length === 0 ? (
					<View style={styles.noResultsContainer}>
						<View style={styles.searchResultInfo}>
							<Text>No requests found :(</Text>
						</View>
					</View>
				) : (
							<View>
								<View style={styles.title}>
									<Text style={{ color: Colors.TEXT }}>
										Request found: {requests.length}
									</Text>
								</View>
								<ScrollView>
									{requests.map((item) =>
										getRequestItemElement(item, navigation)
									)}
									<View style={styles.endOfResultsText}>
										<Text>No more liao!</Text>
									</View>
								</ScrollView>
							</View>
						)}
			</View>
			<View style={styles.buttonContainer}>
				<View style={styles.button}>
					<Button
						title="Request Help"
						color={Colors.DARKER_BUTTON}
						onPress={() =>
							navigation.navigate("Request Help", {
								onGoBack: () => refresh()
							})}
					/>
				</View>
				<View style={styles.button}>
					<Button
						title="My Req List"
						color={Colors.ALT_BUTTON}
						onPress={() =>
							navigation.navigate("Confirmed Request List")}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
}

function getRequestItemElement(item, navigation) {
	const helpID = item.helpId;

	return (
		<View key={helpID}>
			<MyRequestContainer
				// onCancel={removeRequestHandler}
				key={helpID}
				item={item}
				navigation={() =>
					navigation.navigate("Accept Request", {
						requestObj: item
					})}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},

	noteContainer: {
		flex: 1,
		paddingHorizontal: 20,
		paddingTop: 0,
		paddingBottom: 15
	},

	note: {
		fontSize: Fonts.XS,
		color: Colors.TEXT
	},

	loadingContainer: {
		flex: 1,
		paddingBottom: 100,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center"
	},

	noResultsContainer: {
		paddingTop: 250,
		alignItems: "center",
		justifyContent: "center"
	},

	title: {
		paddingHorizontal: 20,
		paddingVertical: 5
	},

	searchResultInfoContainer: {
		flex: 15
	},

	searchResultInfo: {
		color: Colors.TEXT,
		fontSize: 14
	},

	endOfResultsText: {
		height: 180,
		paddingVertical: 20,
		fontStyle: "italic",
		alignItems: "center"
	},

	buttonContainer: {
		paddingTop: 40,
		flex: 3
	},
	
	button: {
		width: "100%",
		justifyContent: "flex-end",
		alignContent: "center",
		paddingHorizontal: 70,
		paddingBottom: 8
	}
});

export default HelpBuyPls;

// import React from 'react';
// import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
//
// import DefaultStyles from '../constants/DefaultStyles';
// import Fonts from '../constants/Fonts';
// import Colors from '../constants/Colors';
//
// function HelpBuyPls(props) {
//     return (
//         <SafeAreaView style={styles.container}>
//             {/* <View style={DefaultStyles.headerTextBox}>
//                 <Text style={DefaultStyles.headerTitle}>Lemme Help</Text>
//             </View> */}
//             <View style={styles.noteContainer}>
//                 <Text style={styles.note}>*Note: Help Fee $1 (on top of food fee) ,
//                         {'\n'} pay helper directly upon receival of goods</Text>
//             </View>
//             <ScrollView style={styles.content}>
//                 <Text>Work in progress...</Text>
//             </ScrollView>
//             <View style={styles.button}>
//                 <Button title="Lemme Help" color={Colors.DARKER_BUTTON} onPress={() => { }} />
//             </View>
//         </SafeAreaView >
//     );
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1
//     },
//     content: {
//         flexDirection: 'column',
//         paddingBottom: 10,
//         paddingHorizontal: 20,
//     },
//     noteContainer: {
//         paddingHorizontal:40,
//         paddingTop: 0,
//         paddingBottom:15
//     },
//     note: {
//         fontSize: Fonts.XS,
//         color: Colors.TEXT
//     },
//     requestButton: {
//         width: '75%',
//         height: 20,
//     },
//     button: {
//         width: '100%',
//         justifyContent: 'flex-end',
//         alignContent: 'center',
//         paddingHorizontal: 80,
//         paddingVertical: 25
//
//     }
// });
//
// export default HelpBuyPls;
