import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DefaultStyles from "../constants/DefaultStyles";
import StartScreenButton from "./StartScreenButton";


function StartScreen({navigation}) {

    return (
        <View style={DefaultStyles.screen}>

            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={require('../assets/icon.png')}
                />
            </View>

            <View style={styles.buttonContainer}>
<<<<<<< Updated upstream

                <StartScreenButton title="SEARCH" onPress={() => props.onPressSearch()}/>
                <StartScreenButton title="RECOMMENDATION" onPress={() => props.onPressRec()}/>
                <StartScreenButton title="FAVOURITES" onPress={() => props.onPressFav()}/>

=======
                <View style={styles.infoContainer}>
                    <StartScreenButton title="SEARCH" onPress={() => navigation.navigate('Search')}/>
                    <StartScreenButton title="RECOMMENDATION" onPress={() => navigation.navigate('Recommendation')}/>
                </View>
                <View style={styles.logInContainer}>
                    <StartScreenButton title="Log In" onPress={() => navigation.navigate('LogIn')}/>
                </View>
>>>>>>> Stashed changes
            </View>

        </View>
    );
}


const styles = StyleSheet.create({
    imageContainer: {
<<<<<<< Updated upstream
        flex: 5,
        paddingTop: 80,
=======
        flex: 4,
        paddingTop: 40,
        paddingBottom: 30,
>>>>>>> Stashed changes
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

});


export default StartScreen;
