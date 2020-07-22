import React from 'react';
import {Alert, Button, Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';

import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';
import DefaultStyles from "../../constants/DefaultStyles";

import * as firebase from "firebase";
import {signOut} from "../../api/AuthenticationApi";


function Profile({navigation}) {

    const {displayName, email} = firebase.auth().currentUser

    const signOutHandler = () => {
        signOut()
            .then(() => Alert.alert(
                'Success',
                'Signed out from @' + displayName,
                [{text: 'Ok', onPress: () => navigation.goBack()}]
            ));
    };

    return (

        <SafeAreaView style={DefaultStyles.screen}>

            <View style={styles.profileContainer}>

                <View style={styles.profileImageContainer}>
                    <Image
                        style={styles.image}
                        source={require('../../assets/potato.jpg')}/>
                </View>

                <View style={styles.profileNameContainer}>
                    <Text style={styles.name}>@ {displayName}</Text>
                </View>

                <View style={styles.profileEmailContainer}>
                    <Text style={styles.email}>{email}</Text>
                </View>

            </View>

            <View style={styles.buttonContainer}>
                <Button title="Log Out"
                        color={Colors.BUTTON}
                        onPress={signOutHandler}/>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    profileContainer: {
        flex: 6,
        paddingTop: 40,
    },

    profileImageContainer: {
        alignItems: 'center',
    },

    image: {
        width: 280,
        height: 280,
    },

    profileNameContainer: {
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 20,
    },

    profileEmailContainer: {
        alignItems: 'center',
    },

    name: {
        fontSize: Fonts.L,
        color: Colors.DARK_TEXT,
        fontWeight: '600',
    },

    email: {
        fontSize: Fonts.S,
        color: Colors.TEXT,
        fontStyle: 'italic',
    },

    buttonContainer: {
        flex: 4,
        justifyContent: 'flex-end',
        paddingBottom: 120,
        width: '100%'
    },
});

export default Profile;