import React from 'react';
import { StyleSheet, View, Button, Image } from 'react-native';
import Colors from '../constants/Colors';



function StartScreen(props) {

    return (
        <View>

            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={require('../assets/icon.png')}
                />
            </View>

            <View style={styles.buttonContainer}>

                <View style={styles.button}>
                    <Button title="SEARCH" color={Colors.button} onPress={() => props.onPressSearch(true)}/>
                </View>

                <View style={styles.button}>
                    <Button title="RECOMMENDATION" color={Colors.button} onPress={() => props.onPressRec(true)}/>
                </View>

                <View style={styles.button}>
                    <Button title="FAVOURITES" color={Colors.button} onPress={() => props.onPressFav(true)}/>
                </View>

            </View>

        </View>
    );
}


const styles = StyleSheet.create({
    imageContainer: {
        paddingTop: 80,
        alignItems: 'center'
    },

    image: {
        width: 350,
        height: 350
    },

    buttonContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 15
    },

    button: {
        width: '55%',
        paddingTop: 10
    }
});


export default StartScreen;

