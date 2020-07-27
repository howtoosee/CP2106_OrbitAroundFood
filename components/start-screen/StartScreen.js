import React, {useEffect, useState} from "react";
import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Dimensions} from "react-native";

import requireSignInAlert from "../support-components/ComponentRequiresSignInAlert";
import StartScreenButton from "./StartScreenButton";
import {Colors, DefaultStyles, Fonts} from "../../constants";

import * as firebase from 'firebase';

const {width, height} = Dimensions.get('window');


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
                    color={isSignedIn ? Colors.BUTTON : Colors.DISABLED_BUTTON}
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
        width: 0.8 * width,
        height: 0.6 * height,
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
    },

    userButtonContainer: {
        // flex: 2,
        alignSelf: 'center',
        alignItems: 'stretch',
        justifyContent: 'center',
        paddingVertical: 0.01 * height,
        marginVertical: 0.02 * height,
        width: width * 0.5,
        height: height * 0.08,
    },

    userButton: {
        alignItems: "center",
        backgroundColor: Colors.DARKER_BUTTON,
        borderRadius: 4,
        width: "100%",
        paddingVertical: 0.012 * height,
        paddingHorizontal: 0.01 * height,
        borderColor: "white"
    }

});

export default StartScreen;
