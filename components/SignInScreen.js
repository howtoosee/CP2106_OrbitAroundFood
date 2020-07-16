import React, {useState} from 'react';
import {View, TextInput, Text, Button, StyleSheet, Image} from 'react-native';

import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import DefaultStyles from "../constants/DefaultStyles";

import firebaseDB from "../constants/firebaseDB";


function SignInScreen({navigation}) {

    const [email, enteredEmail] = useState('');
    const [password, enteredPassword] = useState('');

    const signInHandler = () => {
        firebaseDB.auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => console.log("Successfully signed in:", email))
            // .then.apply(navigation.navigate('Home'))
            .then(() => {
                enteredEmail('');
                enteredPassword('');
            }).catch(error => console.log(error));

        navigation.navigate('Home');
    }

    return (
        <View style={DefaultStyles.screen}>

            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={require('../assets/icon.png')}
                />
            </View>

            <View style={styles.contentContainer}>

                <View style={styles.titleTextContainer}>
                    <Text style={styles.signIn}>Sign In</Text>

                    <Text>Sign in to OrbitAroundFood</Text>
                </View>

                <View style={styles.inputContainer}>

                    <View style={styles.inputSubContainer}>
                        <Text style={styles.accDetailsHeader}>Email</Text>

                        <TextInput
                            placeholder="Email"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={email => enteredEmail(email)}
                            value={email}
                        />
                    </View>

                    <View style={styles.inputSubContainer}>
                        <Text style={styles.accDetailsHeader}>Password</Text>
                        <TextInput
                            placeholder="Password"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={password => enteredPassword(password)}
                            value={password}
                        />
                    </View>

                </View>

                <View style={styles.buttonContainer}>

                    <Button color={Colors.BUTTON}
                            title="Confirm"
                            onPress={signInHandler}
                    />

                    <View style={styles.signUpContainer}>
                        <Text style={{fontSize: Fonts.S, paddingTop: 6}}>Haven't created an account? </Text>
                        <Button title="Sign Up"
                                color={Colors.ALT_BUTTON}
                                onPress={() => navigation.navigate('Sign Up')}/>
                    </View>

                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column'
    },

    imageContainer: {
        flex: 4,
        paddingTop: 0,
        paddingBottom: 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    image: {
        width: 320,
        height: 320,
    },

    contentContainer: {
        flex: 6,
        paddingHorizontal: 20,
        paddingBottom: 100,
        justifyContent: 'center'
    },

    content: {
        paddingBottom: 10
    },

    inputContainer: {
        flex: 4,
        paddingVertical: 20,
        justifyContent: 'center',
    },

    buttonContainer: {
        flex: 4,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    signUpContainer: {
        width: '100%',
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    titleTextContainer: {
        flex: 2,
        paddingBottom: 10,
        justifyContent: 'flex-end',
    },

    signIn: {
        fontSize: Fonts.XL,
        fontWeight: 'bold',
        paddingBottom: 4,
    },

    inputSubContainer: {
        paddingBottom: 20,
    },

    accDetailsHeader: {
        fontWeight: 'bold',
        fontSize: Fonts.M,
        paddingBottom: 4,
    },

    textInput: {
        height: 35,
        width: '100%',
        borderColor: 'grey',
        borderWidth: 2,
        borderRadius: 4,
        paddingHorizontal: 8,
    },

    back: {
        width: '30%'
    }


});

export default SignInScreen;

