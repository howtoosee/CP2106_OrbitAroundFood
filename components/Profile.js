import React from 'react';
import { Text, View, Image, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Fonts from '../constants/Fonts';
import Colors from '../constants/Colors';

import * as firebase from 'firebase';

function Profile({navigation}) {
    
    const { displayName } = firebase.auth().currentUser;

    const signOutUser = () => {
        firebase.auth().signOut().then(navigation.navigate('Welcome'));
    };

    return (
        <SafeAreaView>
            <View style={styles.screen}>
                <View style={styles.profile}>
                    <Image
                        style={styles.image}
                        source={require('../assets/potato.png')} />
                    <Text style={styles.name}>{displayName}</Text>
                </View>
                <View style={styles.button}>
                    <Button title="Log Out" color={Colors.DARKER_BUTTON} onPress={signOutUser} />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 50,
        flexDirection: 'column'
    },
    profile: {
        alignItems: 'center',
    },
    image: {
        width: 170,
        height: 200
    },
    name: {
        fontSize: Fonts.L,
        fontWeight: '600',
    },
    button: {
        paddingTop: 50,
        paddingHorizontal: 75,
        width: '100%'
    },
    content: {
        paddingTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    reviewContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    review: {
        fontSize: Fonts.SPECIAL,
        fontWeight: '700',
        padding: 20
    },
    rating: {
        flexDirection: 'row',
    },
    stars: {
        fontSize: Fonts.SPECIAL
    }
});

export default Profile;