import React, {useEffect, useState} from "react";
import {Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as firebase from 'firebase';

import requireSignInAlert from "../support-components/ComponentRequiresSignInAlert";
import StartScreenButton from "./StartScreenButton";
import {Colors, DefaultStyles, Fonts} from "../../constants";


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
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginVertical: '8%',
    },

    userButton: {
        alignItems: "center",
        backgroundColor: Colors.DARKER_BUTTON,
        borderRadius: 4,
        width: "100%",
        paddingVertical: '3%',
        paddingHorizontal: '3%',
        borderColor: "white"
    }

});

export default StartScreen;
