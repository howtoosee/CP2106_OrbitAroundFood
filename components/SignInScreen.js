import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Image, ScrollView } from 'react-native';

import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

import * as firebase from 'firebase';

function SignInScreen({ navigation }) {

    const [email, enteredEmail] = useState('');
    const [password, enteredPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('\n');

    const handleLogIn = () => {

        firebase.
            auth().
            signInWithEmailAndPassword(email, password).
            catch(error => setErrorMessage(error));


        if (firebase.auth().currentUser != null) {
            navigation.navigate('Orbit Around Food');
            enteredEmail('');
            enteredPassword('');
        } else {
            setErrorMessage('Account invalid');
        }

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
                            />
                        </View>
                    </View>
                </View>
                <View style={{height: 45}}>
                    {errorMessage &&
                        <View style={{ paddingBottom: 10 }}>
                            <Text
                                style={
                                    {
                                        color: "tomato",
                                        textAlign: "center",
                                        fontSize: Fonts.XS,
                                        fontWeight: "600"
                                    }}>
                                {errorMessage.toString()}
                            </Text>
                        </View>
                    }
                </View>
                <View style={styles.buttonContainer}>
                    <Button color={Colors.BUTTON} title="Confirm" onPress={handleLogIn} />
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

