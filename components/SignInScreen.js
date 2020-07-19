import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Image, Alert, ScrollView } from 'react-native';

import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

import * as firebase from 'firebase';

function SignInScreen({ navigation }) {

    const [email, enteredEmail] = useState('');
    const [password, enteredPassword] = useState('');
    const [signInSuccessful, setIsSignInSuccessful] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleLogIn = () => {

        firebase.
            auth().
            signInWithEmailAndPassword(email, password).
            then(() => {
                enteredEmail('');
                enteredPassword('');
                navigation.navigate('Orbit Around Food');
            }).
            then(() => {
                setIsSignInSuccessful(true);
            }).
            catch(error => {
                setErrorMessage(error);
                if (!errorMessage) {
                    Alert.alert('Sign In Error', 'Invalid Account');
                } else if (errorMessage) {
                    Alert.alert('Sign In Error', errorMessage.toString());
                }
            });
    }

    return (
        <ScrollView style={styles.screen}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={require('../assets/icon.png')}
                />
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.content}>
                    <View>
                        <Text style={styles.signIn}>Sign In</Text>
                        <Text>Sign into OrbitAroundFood</Text>
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
                        <View style={styles.inputContainer}>
                            <Text style={styles.accDetails}>Password</Text>
                            <TextInput
                                placeholder=" Password"
                                style={styles.textInput}
                                autoCapitalize="none"
                                onChangeText={password => enteredPassword(password)}
                                value={password}
                                secureTextEntry={true}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Button color={Colors.BUTTON} title="Confirm" onPress={() => {
                        if (email.length && password.length) { handleLogIn() }
                    }} />
                    <View style={styles.helpContainer}>
                        <Text style={{ fontSize: Fonts.S, paddingTop: 6 }}>Have not created an account?  </Text>
                        <Button title="Sign Up" color={Colors.ALT_BUTTON} onPress={() => navigation.navigate('Sign Up')} />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column'
    },

    imageContainer: {
        // flex: 4,
        paddingTop: 10,
        alignItems: 'center',
    },

    image: {
        width: 320,
        height: 280,
    },

    contentContainer: {
        // flex: 3,
        paddingHorizontal: 45,
        justifyContent: 'center'
    },

    content: {
        paddingBottom: 10
    },

    inputContainer: {
        paddingTop: 10
    },

    buttonContainer: {
        // flex: 4,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    helpContainer: {
        width: '100%',
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'center'
    },

    signIn: {
        fontSize: Fonts.XL,
        fontWeight: 'bold'

    },

    accDetails: {
        fontWeight: 'bold',
        fontSize: Fonts.M,
        paddingBottom: 3,
    },

    textInput: {
        height: 35,
        width: '100%',
        borderColor: 'grey',
        borderWidth: 3,
        padding: 5
    },

    back: {
        width: '30%'
    }


});

export default SignInScreen;

