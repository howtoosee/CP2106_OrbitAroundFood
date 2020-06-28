import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

import DefaultStyles from "../constants/DefaultStyles";
import StartScreenButton from "./StartScreenButton";


function Home({navigation}) {

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

                <View style={styles.user}>
                    <StartScreenButton
                        title="< user >"
                        onPress={() => navigation.navigate('Profile')}
                    />
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

    user: {
        flex: 1,
        paddingTop: 15
    }

});


export default Home;