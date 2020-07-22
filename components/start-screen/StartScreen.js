import React, {useEffect, useState} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

import requireSignInAlert from "../support-components/ComponentRequiresSignInAlert";
import StartScreenButton from "./StartScreenButton";
import {Colors, DefaultStyles, Fonts} from "../../constants";

import firebase from "firebase";

function StartScreen({navigation, route}) {
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
        <View style={DefaultStyles.screen}>
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
        </View>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        flex: 4,
        paddingTop: 40,
        paddingBottom: 30,
        alignItems: "center"
    },

    image: {
        width: 350,
        height: 350
    },

    userButtonContainer: {
        flex: 1,
        paddingTop: 40
    },

    userButton: {
        alignItems: "center",
        backgroundColor: Colors.DARKER_BUTTON,
        borderRadius: 4,
        width: "100%",
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderColor: "white"
    },

    buttonContainer: {
        flex: 6,
        flexDirection: "column",
        alignItems: "center",
        paddingHorizontal: 15
    }
});

export default StartScreen;
