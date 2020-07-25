import React, {useEffect, useState} from "react";
import {ActivityIndicator, Button, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";

import {Colors, DefaultStyles, Fonts} from "../../constants";
import {readHelps} from "../../api/HelpApi";
import ActiveRequestContainer from "./ActiveRequestContainer";
import firebase from 'firebase';


const helpCollection = firebase.firestore().collection('HELPS');


function LemmeHelpScreen({navigation}) {
    const [isLoading, setLoading] = useState(true);
    const [requests, setRequests] = useState([]);

    const loadRequests = () => {
        readHelps(setRequests)
            .then(() => setLoading(false))
            .catch(err => console.log("Error loading Requests:", err));
    }

    const refresh = () => {
        setLoading(true);
        loadRequests();
    };

    // Import Info from database
    useEffect(() => {
        if (isLoading) {
            loadRequests();
        }
    }, [isLoading, loadRequests, readHelps, setLoading, setRequests]);


    return (

        <SafeAreaView style={DefaultStyles.screen}>

            <View style={styles.searchResultInfoContainer}>

                {isLoading
                    ? <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="black"/>
                    </View>

                    : (requests.length === 0)
                        ? <View style={styles.noResultsContainer}>

                            <View style={styles.resultStatInfo}>
                                <Text style={styles.resultStatText}>No open requests today yet</Text>
                            </View>

                        </View>

                        : <View>
                            <View style={styles.resultStatInfo}>
                                <Text style={styles.resultStatText}>
                                    Requests found: {requests.length}
                                </Text>
                            </View>

                            <ScrollView style={styles.requestResultsContainer}
                                        showsVerticalScrollIndicator={false}
                            >
                                {
                                    requests.map((item) =>
                                        getRequestItemElement(item, navigation, refresh)
                                    )
                                }

                                <View style={styles.endOfResultsText}>
                                    <Text style={styles.endOfResultsText}>No more liao!</Text>
                                </View>

                            </ScrollView>
                        </View>
                }
            </View>

            <View style={styles.buttonContainer}>

                <View style={styles.buttonIndivContainer}>
                    <Button title="Request History"
                            color={Colors.BUTTON}
                            onPress={() =>
                                navigation.navigate("Request History")}
                    />
                </View>

                <View style={styles.buttonIndivContainer}>
                    <Button title="New Request"
                            color={Colors.DARKER_BUTTON}
                            onPress={() =>
                                navigation.navigate("Request Search", {
                                    onGoBack: () => refresh()
                                })}
                    />
                </View>

            </View>

        </SafeAreaView>
    );
}


function getRequestItemElement(item, navigation, refresh) {
    const helpID = item.helpId;

    return (
        <View key={helpID}>
            <ActiveRequestContainer item={item}
                                    navigation={navigation}
                                    onPress={() =>
                                        navigation.navigate("Accept Request", {
                                            requestObj: item,
                                            onGoBack: () => refresh()
                                        })
                                    }
            />
        </View>
    );
}


const styles = StyleSheet.create({

    loadingContainer: {
        flex: 1,
        // marginBottom: ,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },

    noResultsContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },

    resultStatInfo: {
        height: '5%',
        // marginBottom: '4%',
        color: Colors.TEXT,
        fontStyle: 'italic',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        // borderWidth: 1,
    },

    resultStatText: {
        fontSize: Fonts.S,
        color: Colors.TEXT,
        fontStyle: 'italic',
        fontWeight: 'bold',
    },

    searchResultInfoContainer: {
        flex: 18
    },

    noResultsTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    noResultText: {
        fontSize: Fonts.M,
        color: Colors.TEXT,
        fontStyle: 'italic',
        fontWeight: 'bold',
    },

    requestResultsContainer: {
        // height: '90%',
        overflow: 'hidden',
    },

    endOfResultsText: {
        // height: 180,
        paddingVertical: '5%',
        fontSize: Fonts.XS,
        color: Colors.TEXT,
        fontStyle: 'italic',
        alignItems: 'center',
        // justifyContent: 'center'
    },

    buttonContainer: {
        flex: 2,
        height: '10%',
        flexDirection: 'row',
        marginTop: '5%',
        alignItems: 'center',
    },

    buttonIndivContainer: {
        flex: 1,
        marginVertical: '3%',
        justifyContent: "center",
        alignContent: "center",
        height: '100%',
    }

});


export default LemmeHelpScreen;

