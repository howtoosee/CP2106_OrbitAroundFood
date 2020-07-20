import React, {useEffect, useState} from 'react';
import {View, KeyboardAvoidingView, TextInput, Text, Button, StyleSheet, Alert} from 'react-native';

import {Colors, Fonts, DefaultStyles, firebaseDB} from '../constants';

const userCollection = firebaseDB.firestore().collection('USER');


function SignUpScreen({navigation}) {

    const [username, setUsername] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypedPassword] = useState('');


    const signUpAlert = err => {
        return Alert.alert(
            'Error',
            err.message,
            [
                {
                    text: 'Dismiss'
                }
            ]
        );
    };

    const storeUserInDB = (email, number, username) => {
        userCollection.doc(username)
            .set({
                username: username,
                contact: number,
                email: email
            })
            .catch(err => console.log('Error creating user doc:', err));
    }


    const signUpHandler = () => {
        firebaseDB.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => firebaseDB.auth()
                .currentUser
                .updateProfile({
                    displayName: username,
                })
            )
            .catch(err => {
                console.log('Error logging in:', err.code, err.message);
                signUpAlert(err);
            })
            .then(() => {
                if (firebaseDB.auth().currentUser) {
                    storeUserInDB(email, number, username);
                    signUpSuccessHandler();
                    firebaseDB.auth()
                        .signOut()
                        .catch(err => console.log('Error signing out:', err));
                }
            })
            .catch(err => console.log('Error:', err));
    }


    const signUpSuccessHandler = () => {
        Alert.alert(
            'Success',
            'Registered as: @' + firebaseDB.auth().currentUser.displayName,
            [
                {
                    text: 'Sign in',
                    onPress: () => navigation.goBack()
                }
            ]
        );
        setUsername('');
        setNumber('');
        setEmail('');
        setPassword('');
        setRetypedPassword('');
    }


    return (
        <KeyboardAvoidingView style={DefaultStyles.keyboardAvoidScreen}
                              behavior='position'
        >

            <View styles={styles.contentContainer}>

                <View style={styles.titleTextContainer}>
                    <Text style={styles.signUpTitleText}>Sign Up</Text>
                    <Text style={styles.signUpSubtext}>Create an account to use OrbitAroundFood</Text>
                </View>


                <View style={styles.inputContainer}>

                    <View style={styles.inputSubContainer}>
                        <Text style={styles.accDetailsHeader}>Email</Text>
                        <TextInput
                            placeholder=" Email"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={email => setEmail(email)}
                            value={email}
                        />
                    </View>

                    <View style={styles.inputSubContainer}>
                        <Text style={styles.accDetailsHeader}>Username</Text>
                        <TextInput
                            placeholder=" Username"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={username => setUsername(username)}
                            value={username}
                        />
                    </View>

                    <View style={styles.inputSubContainer}>
                        <Text style={styles.accDetailsHeader}>Contact Number</Text>
                        <TextInput
                            placeholder=" Contact Number"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={number => setNumber(number)}
                            value={number}
                        />
                    </View>

                    <View style={styles.inputSubContainer}>
                        <Text style={styles.accDetailsHeader}>Password</Text>
                        <TextInput
                            placeholder=" Password (min. 6 chars)"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={password => setPassword(password)}
                            value={password}
                            secureTextEntry={true}
                        />
                    </View>

                    <View style={styles.inputSubContainer}>
                        <Text style={styles.accDetailsHeader}>Confirm Password</Text>
                        <TextInput
                            placeholder=" Retype Password"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={retypePassword => setRetypedPassword(retypePassword)}
                            value={retypePassword}
                            secureTextEntry={true}
                        />
                    </View>
                </View>


                <View style={styles.buttonContainer}>
                    <View style={styles.confirmButtonContainer}>
                        <Button color={Colors.BUTTON}
                                title="Sign Up"
                                onPress={() => {
                                    if (username.length && number.length && email.length && (password.length > 5)) {
                                        signUpHandler();
                                    }
                                }}
                        />
                    </View>

                    <View style={styles.signInContainer}>
                        <Text style={styles.haveAccountText}>Have an account? </Text>
                        <Button title="Sign In"
                                color={Colors.DARKER_BUTTON}
                                onPress={() => navigation.goBack()}
                        />
                    </View>
                </View>

            </View>

        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({

    contentContainer: {
        flex: 1,
        marginHorizontal: 20,
        marginBottom: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputContainer: {
        marginVertical: 20,
        justifyContent: 'flex-start',
    },

    buttonContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    titleTextContainer: {
        paddingBottom: 10,
        justifyContent: 'flex-end',
    },

    signUpTitleText: {
        fontSize: Fonts.XL,
        fontWeight: 'bold',
        paddingVertical: 8,
    },

    signUpSubtext: {
        fontSize: Fonts.XS,
    },

    inputSubContainer: {
        paddingBottom: 20,
    },

    confirmButtonContainer: {
        paddingTop: 0,
    },

    accDetailsHeader: {
        fontWeight: 'bold',
        fontSize: Fonts.M,
        paddingVertical: 4
    },

    textInput: {
        color: Colors.DARK_TEXT,
        borderColor: Colors.LIGHT_BORDER,
        borderWidth: 2,
        borderRadius: 4,
        padding: 8,
    },

    signInContainer: {
        marginTop: 20,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    haveAccountText: {
        padding: 6,
        color: Colors.DARK_TEXT,
        fontSize: Fonts.M,
    },


});

export default SignUpScreen;

