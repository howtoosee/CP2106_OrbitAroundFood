import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Alert, ScrollView } from 'react-native';

import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

import * as firebase from 'firebase';

function SignUpScreen({ navigation }) {

    const [username, enteredUsername] = useState('');
    const [number, enteredNumber] = useState('');
    const [email, enteredEmail] = useState('');
    const [password, enteredPassword] = useState('');
    const [retypePassword, enteredRetypePassword] = useState('');
    const [isSignUpSuccessful, setSignUpSuccessful] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSignUp = () => {

        firebase.
            auth().
            createUserWithEmailAndPassword(email, password).
            then(userCredentials => {
                return userCredentials.user.updateProfile({
                    displayName: username
                });
            }).
            then(() => {
                firebase.firestore()
                    .collection('users')
                    .add({
                        username: username,
                        contact: number,
                        email: email
                    });
            }).
            then(() => {
                enteredUsername('');
                enteredNumber('');
                enteredEmail('');
                enteredPassword('');
                enteredRetypePassword('');
                setSignUpSuccessful(true);
                if (firebase.auth().currentUser !== null) {
                    navigation.navigate('Sign In');
                    firebase.auth().signOut();
                }
            }).
            catch(error => setErrorMessage(error));

            errorMessage && !isSignUpSuccessful
                        ? Alert.alert('Sign Up Error', errorMessage.toString())
                        : null;



    };

    return (
        <ScrollView style={styles.screen}>
            <View style={styles.contentContainer}>
                <View style={styles.content}>
                    <Text style={styles.signUp}>Sign Up</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.accDetails}>Username</Text>
                        <TextInput
                            placeholder=" Username"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={username => enteredUsername(username)}
                            value={username}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.accDetails}>Contact Number</Text>
                        <TextInput
                            placeholder=" Contact Number"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={number => enteredNumber(number)}
                            value={number}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.accDetails}>Email</Text>
                        <TextInput
                            placeholder=" Email"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={email => enteredEmail(email)}
                            value={email}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.accDetails}>Password</Text>
                        <TextInput
                            placeholder=" Password (min. 6 chars)"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={password => enteredPassword(password)}
                            value={password}
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.accDetails}>Confirm Password</Text>
                        <TextInput
                            placeholder=" Retype Password"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={retypePassword => enteredRetypePassword(retypePassword)}
                            value={retypePassword}
                            secureTextEntry={true}
                        />
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Button color={Colors.BUTTON} title="CONTINUE" onPress={() => {
                        if (username.length && number.length && email.length && password.length && retypePassword.length) {
                            if (password !== retypePassword) {
                                Alert.alert('Sign up error', "Passwords don't match");
                            } else {
                                handleSignUp();
                            }
                        }
                    }} />
                    <View style={styles.helpContainer}>
                        <Text style={styles.signInText}>Have an Account?   </Text>
                        <Button title="Sign In" color={Colors.ALT_BUTTON} onPress={() => navigation.goBack()} />
                    </View>
                </View>
            </View>
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column'
    },

    contentContainer: {
        paddingTop: 50,
        paddingHorizontal: 40,
        justifyContent: 'center',
        width: '100%'
    },

    content: {
        paddingBottom: 30
    },

    inputContainer: {
        paddingTop: 10
    },

    checkBox: {
        paddingTop: 5,
        alignItems: 'stretch'
    },

    buttonContainer: {
        width: '100%',
        paddingHorizontal: 20
    },

    helpContainer: {
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    },

    signUp: {
        fontSize: Fonts.XL,
        fontWeight: 'bold'

    },

    accDetails: {
        fontWeight: 'bold',
        fontSize: Fonts.M,
        paddingBottom: 3
    },

    signInText: {
        paddingTop: 10,
        fontSize: Fonts.S,
        color: Colors.ALT_BUTTON
    },

    textInput: {
        height: 32,
        width: '100%',
        borderColor: 'grey',
        borderWidth: 3,
        padding: 5
    }

});

export default SignUpScreen;

