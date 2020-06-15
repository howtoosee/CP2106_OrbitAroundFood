import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

import DefaultStyles from "../constants/DefaultStyles";
import StartScreenButton from "./StartScreenButton";


function StartScreen({ navigation }) {

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
                    <StartScreenButton title="SEARCH" onPress={() => navigation.navigate('Search')}/>
                    <StartScreenButton title="RECOMMENDATION" onPress={() => navigation.navigate('Recommendation')}/>
                </View>
                <View style={styles.logInContainer}>
                    <StartScreenButton title="Log In" onPress={() => navigation.navigate('Sign In')}/>
                </View>

            </View>

        </View>
    );
}


const styles = StyleSheet.create({
    imageContainer: {
        flex: 6,
        paddingTop: 40,
        paddingBottom: 30,
        alignItems: 'center',
    },

    image: {
        width: 350,
        height: 350,
    },

    buttonContainer: {
        flex: 7,
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 15,
    },

    infoContainer: {
        alignItems: 'center',
        
    },

    logInContainer: {
        
    }

});


export default StartScreen;
