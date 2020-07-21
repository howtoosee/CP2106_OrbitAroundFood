import React from 'react';
import {StyleSheet, Text, View, Image, Button, Alert} from 'react-native';


import Fonts from '../constants/Fonts';
import Colors from '../constants/Colors';
import DefaultStyles from "../constants/DefaultStyles";

import firebaseDB from '../constants/firebaseDB';

function Profile({navigation}) {

    const {displayName, email} = firebaseDB.auth().currentUser

    const signOutHandler = () => {
        firebaseDB.auth()
            .signOut()
            .then(() => console.log("Successfully signed out:", displayName))
            .then(() => Alert.alert(
                'Success',
                'Signed out from @' + displayName,
                [{text: 'Ok'}]
            ))
            .catch(err => console.error("Error signing out:", err))
            .then(() => navigation.goBack());
    };

    return (

        <View style={DefaultStyles.screen}>

            <View style={styles.profileContainer}>

                <View style={styles.profileImageContainer}>
                    <Image
                        style={styles.image}
                        source={require('../assets/potato.jpg')}/>
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

        </View>
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