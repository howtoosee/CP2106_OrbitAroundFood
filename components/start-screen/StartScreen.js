import React, {useEffect, useState} from "react";
import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";

import requireSignInAlert from "../support-components/ComponentRequiresSignInAlert";
import StartScreenButton from "./StartScreenButton";
import {Colors, DefaultStyles, Fonts} from "../../constants";

import firebase from "firebase";

function StartScreen({navigation}) {
    const [displayName, setDisplayName] = useState();
    const [isSignedIn, setSignedIn] = useState(
        firebase.auth().currentUser !== null
    );

    useEffect(
        () => {
            firebase.auth().onAuthStateChanged(() => {
                if (firebase.auth().currentUser) {
                    // User is signed in.
                    setDisplayName(firebase.auth().currentUser.displayName);
                    setSignedIn(true);
                } else {
                    // No user is signed in.
                    setDisplayName("");
                    setSignedIn(false);
                }
            });
        },
        [firebase]
    );

    return (
        <SafeAreaView style={DefaultStyles.screen}>

            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={require("../../assets/icon.png")}
                />
            </View>

            <View style={styles.buttonContainer}>
                <StartScreenButton
                    title="SEARCH"
                    onPress={() => navigation.navigate("Search")}
                />

                <StartScreenButton
                    title="RECOMMENDATION"
                    onPress={() => navigation.navigate("Recommendation")}
                />

                <StartScreenButton
                    title="FAVOURITE"
                    onPress={() => navigation.navigate("Favourite")}
                />

                <StartScreenButton
                    title="LEMME HELP"
                    color={isSignedIn ? Colors.BUTTON : Colors.TEXT}
                    onPress={() => {
                        isSignedIn
                            ? navigation.navigate("Lemme Help")
                            : requireSignInAlert("use LEMME HELP", navigation);
                    }}
                />

                <View style={styles.userButtonContainer}>
                    <TouchableOpacity
                        style={styles.userButton}
                        onPress={() =>
                            navigation.navigate(
                                isSignedIn ? "Profile" : "Sign In"
                            )}
                    >
                        <Text style={{color: "white", fontSize: Fonts.M}}>
                            {isSignedIn ? "@ " + displayName : "Sign In"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        flex: 4,
        alignItems: "center",
        alignSelf: 'center',
        justifyContent: "center",
        aspectRatio: 1
    },

    image: {
        height: '110%',
        width: '110%',
        overflow: 'hidden',
        aspectRatio: 1,
    },

    buttonContainer: {
        flex: 6,
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
    },

    userButtonContainer: {
        // flex: 2,
        alignSelf: 'center',
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginVertical: '8%',
    },

    userButton: {
        alignItems: "center",
        backgroundColor: Colors.DARKER_BUTTON,
        borderRadius: 4,
        width: "100%",
        paddingVertical: '2%',
        paddingHorizontal: '3%',
        borderColor: "white"
    }

});

export default StartScreen;
