import React, {useEffect, useState} from 'react';
import {View, TextInput, Text, Button, StyleSheet} from 'react-native';

import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import DefaultStyles from '../constants/DefaultStyles';

import firebaseDB from '../constants/firebaseDB';


function SignUpScreen({navigation}) {

    const [username, enteredUsername] = useState('');
    const [number, enteredNumber] = useState('');
    const [email, enteredEmail] = useState('');
    const [password, enteredPassword] = useState('');
    const [isSignUpSuccessful, setSignUpSuccessful] = useState(false);

    useEffect(() => {
        firebaseDB.auth()
            .onAuthStateChanged(user => {
                    navigation.navigate(user ? 'Sign In' : 'Sign Up');
                }
            );
        // catch(error => console.log(error));
    }, [firebaseDB]);

    const signUpHandler = () => {

        firebaseDB.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                return userCredentials.user.updateProfile({
                    displayName: username
                });
            })
            .then(() => {
                firebaseDB.firestore()
                    .collection('users')
                    .add({
                        username: username,
                        contact: number,
                        email: email
                    })
                    .then(() => console.log("Successfully signed up:", username))
            })
            .then(() => {
                enteredUsername('');
                enteredNumber('');
                enteredEmail('');
                enteredPassword('');
                setSignUpSuccessful(true);
            })
            .catch(error => console.error("Failed to register user:", error));

    };

    return (
        <View style={DefaultStyles.screen}>

            <View style={styles.titleTextContainer}>
                <Text style={styles.signUpTitleText}>Sign Up</Text>
                <Text>Create an account to use OrbitAroundFood</Text>
            </View>

            <View styles={styles.inputContainer}>

                <View style={styles.inputIndivContainer}>
                    <Text style={styles.accDetails}>Username</Text>
                    <TextInput
                        placeholder=" Username"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={username => enteredUsername(username)}
                        value={username}
                    />
                </View>

                <View style={styles.inputIndivContainer}>
                    <Text style={styles.accDetails}>Contact Number</Text>
                    <TextInput
                        placeholder=" Contact Number"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={number => enteredNumber(number)}
                        value={number}
                    />
                </View>

                <View style={styles.inputIndivContainer}>
                    <Text style={styles.accDetails}>Email</Text>
                    <TextInput
                        placeholder=" Email"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={email => enteredEmail(email)}
                        value={email}
                    />
                </View>

                <View style={styles.inputIndivContainer}>
                    <Text style={styles.accDetails}>Password</Text>
                    <TextInput
                        placeholder=" Password (min. 6 chars)"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={password => enteredPassword(password)}
                        value={password}
                    />
                </View>

            </View>

            <View style={styles.buttonContainer}>
                <View style={styles.confirmButtonContainer}>
                    <Button color={Colors.BUTTON}
                            title="Confirm"
                            onPress={() => {
                                if (username.length && number.length && email.length && (password.length > 5)) {
                                    signUpHandler();
                                }
                            }}
                    />

                    {
                        isSignUpSuccessful
                            ? <Text style={styles.text}>Sign Up Successful!</Text>
                            : null
                    }
                </View>

                <View style={styles.signInContainer}>
                    <Text style={styles.signInText}>Have an account? </Text>
                    <Button title="Sign In"
                            color={Colors.ALT_BUTTON}
                            onPress={() => navigation.goBack()}
                    />
                </View>

            </View>

        </View>
    );
}


const styles = StyleSheet.create({

    titleTextContainer: {
        flex: 2,
        paddingTop: 0,
        paddingBottom: 20,
        justifyContent: 'flex-end',
    },

    inputContainer: {
        flex: 8,
        justifyContent: 'center',
    },

    inputIndivContainer: {
        paddingTop: 20
    },

    checkBox: {
        paddingTop: 5,
        alignItems: 'stretch'
    },

    buttonContainer: {
        flex: 4,
        width: '100%',
        paddingTop: 18,
        paddingHorizontal: 20,
        justifyContent: 'flex-start',
    },

    confirmButtonContainer: {
        paddingTop: 20,
    },

    signInContainer: {
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    },

    signUpTitleText: {
        fontSize: Fonts.XL,
        fontWeight: 'bold',
        paddingBottom: 4,
    },

    accDetails: {
        fontWeight: 'bold',
        fontSize: Fonts.M,
        paddingBottom: 3
    },

    signInText: {
        paddingTop: 10,
        fontSize: Fonts.S,
        color: Colors.TEXT
    },

    textInput: {
        height: 32,
        width: '100%',
        borderColor: 'grey',
        borderWidth: 2,
        borderRadius: 4,
        padding: 5
    }

});

export default SignUpScreen;

