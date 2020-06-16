import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

import DefaultStyles from "../constants/DefaultStyles";

import StartScreenButton from "./StartScreenButton";


function StartScreen(props) {

    return (
        <View style={DefaultStyles.screen}>

            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={require('../assets/icon.png')}
                />
            </View>

            <View style={styles.buttonContainer}>

                <StartScreenButton title="SEARCH" onPress={() => props.onPressSearch()}/>
                <StartScreenButton title="RECOMMENDATION" onPress={() => props.onPressRec()}/>
                <StartScreenButton title="FAVOURITES" onPress={() => props.onPressFav()}/>

            </View>

        </View>
    );
}


const styles = StyleSheet.create({
    imageContainer: {
        flex: 5,
        paddingTop: 80,
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
