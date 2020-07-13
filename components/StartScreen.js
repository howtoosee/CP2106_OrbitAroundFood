import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

import DefaultStyles from "../constants/DefaultStyles";

import StartScreenButton from "./StartScreenButton";


function StartScreen({navigation}) {

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

                    <StartScreenButton title="Log In"
                                       onPress={() => navigation.navigate('Sign In')}
                    />

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
        paddingHorizontal: 15,
    },


});

export default StartScreen;

