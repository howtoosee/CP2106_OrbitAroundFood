import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';

import * as firebase from 'firebase';
import {Colors, Fonts, DefaultStyles} from "../constants";
import StartScreenButton from "./StartScreenButton";


function StartScreenLoggedIn({navigation}) {

    const {displayName} = firebase.auth().currentUser;


    return (
        <View style={DefaultStyles.screen}>
            <View style={DefaultStyles.contentContainer}>

                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={require('../assets/icon.png')}
                    />
                </View>

                <View style={styles.buttonContainer}>

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

                    <View style={styles.userContainer}>
                        <TouchableOpacity style={styles.userButton}
                                          onPress={() => navigation.navigate('Profile')}>
                            <Text style={{color: 'white', fontSize: Fonts.M}}>
                                {"@" + displayName}
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    imageContainer: {
        flex: 4,
        paddingBottom: 10,
        alignItems: 'center',
    },

    image: {
        width: 350,
        height: 350,
    },

    buttonContainer: {
        flex: 6,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 15,
    },

    userContainer: {
        flex: 1,
        paddingTop: 25
    },

    userButton: {
        alignItems: "center",
        backgroundColor: Colors.BUTTON,
        borderRadius: 4,
        width: '100%',
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderColor: 'white'
    }

});


export default StartScreenLoggedIn;