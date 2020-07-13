import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';

import { Colors, Fonts, DefaultStyles } from "../constants";
import StartScreenButton from "./StartScreenButton";

import * as firebase from 'firebase';

function Home({navigation}) {

    const { displayName } = firebase.auth().currentUser;
    
    return (
        <View style={DefaultStyles.screen}>

            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={require('../assets/icon.png')}
                />
            </View>

            <View style={styles.buttonContainer}>

                <View style={styles.infoContainer}>
                    <StartScreenButton title="SEARCH"
                                       onPress={() => navigation.navigate('Search')}
                    />
                    <StartScreenButton title="RECOMMENDATION"
                                       onPress={() => navigation.navigate('Recommendation')}
                    />
                    <StartScreenButton title="FAVOURITE"
                                       onPress={() => navigation.navigate('Favourite')}
                    />
                    <StartScreenButton title="LEMME HELP"
                                       onPress={() => navigation.navigate('Lemme Help')}
                    />
                </View>

                <View style={styles.userContainer}>
                    <TouchableOpacity style={styles.userButton} onPress={() => navigation.navigate('Profile')}>
                        <Text style={{ color: 'white', fontSize: Fonts.M }}>{"-  " + displayName + "  -"}</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </View>
    );
}


const styles = StyleSheet.create({
    imageContainer: {
        flex: 3,
        paddingBottom: 10,
        alignItems: 'center',
    },

    image: {
        width: 350,
        height: 350,
    },

    buttonContainer: {
        flex: 4,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 15,
    },

    infoContainer: {
        alignItems: 'center',

    },

    userContainer: {
        flex: 1,
        paddingTop: 35
    },

    userButton: {
        alignItems: "center",
        backgroundColor: Colors.DARKER_BUTTON,
        borderRadius: 4,
        width: '100%',
        padding: 8,
        borderColor: 'tomato'
    }

});


export default Home;