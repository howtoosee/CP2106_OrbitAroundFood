import React, {useState, useEffect} from 'react';
import {View, KeyboardAvoidingView, TextInput, Text, Button, StyleSheet, Image, Alert} from 'react-native';

import {Colors, Fonts, DefaultStyles, firebaseDB} from '../constants';


function SignInScreen({navigation}) {

    const [email, setEmailInput] = useState('');
    const [password, setPasswordInput] = useState('');

    const signInErrorAlert = err => {
        Alert.alert(
            'Error',
            err.message,
            [
                {
                    text: 'Dismiss'
                }
            ]
        );
    }

    const signInHandler = () => {
        firebaseDB.auth()
            .signInWithEmailAndPassword(email, password)
            .catch(err => {
                    signInErrorAlert(err);
                    console.log('Error signing in:', err.code, err.message);
                }
            )
            .then(() => signInSuccessHandler());
    }

    const signInSuccessHandler = () => {
        const user = firebaseDB.auth().currentUser;

        if (user) {
            const displayName = user.displayName;
            console.log("Successfully signed in:", email, displayName);

            Alert.alert(
                'Success',
                'Signed in as @' + displayName,
                [
                    {
                        text: 'Ok',
                        onPress: () => {
                            setEmailInput('');
                            setPasswordInput('');
                            navigation.goBack();
                        }
                    }
                ]
            );
        }
    }


    return (

        <KeyboardAvoidingView style={DefaultStyles.keyboardAvoidScreen}
                         s     behavior='position'
        >

            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={require('../assets/icon.png')}
                />
            </View>

            <View style={styles.contentContainer}>

                <View style={styles.titleTextContainer}>
                    <Text style={styles.signInText}>Sign In</Text>
                    <Text style={styles.signInSubtext}>Sign in to OrbitAroundFood</Text>
                </View>

                <View style={styles.inputContainer}>

                    <View style={styles.inputSubContainer}>
                        <Text style={styles.accDetailsHeader}>Email</Text>

                        <View style={styles.textInputContainer}>
                            <TextInput
                                placeholder="Email"
                                style={styles.textInput}
                                autoCapitalize="none"
                                onChangeText={email => setEmailInput(email)}
                                value={email}
                            />
                        </View>
                    </View>

                    <View style={styles.inputSubContainer}>
                        <Text style={styles.accDetailsHeader}>Password</Text>

                        <View style={styles.textInputContainer}>
                            <TextInput
                                placeholder="Password"
                                style={styles.textInput}
                                autoCapitalize="none"
                                onChangeText={password => setPasswordInput(password)}
                                value={password}
                                secureTextEntry={true}
                            />
                        </View>
                    </View>

                </View>

                <View style={styles.buttonContainer}>
                    <View style={styles.confirmButtonContainer}>
                        <Button color={Colors.BUTTON}
                                title="Confirm"
                                onPress={signInHandler}
                        />
                    </View>

                    <View style={styles.signUpContainer}>
                        <Text style={styles.noAccountText}>No account yet? </Text>
                        <Button title="Sign Up"
                                color={Colors.DARKER_BUTTON}
                                onPress={() => navigation.navigate('Sign Up')}/>
                    </View>

                </View>
            </View>

        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({

    imageContainer: {
        flex: 4,
        marginTop: 0,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    image: {
        width: 320,
        height: 320,
    },

    contentContainer: {
        flex: 6,
        marginHorizontal: 20,
        marginBottom: 100,
        justifyContent: 'flex-start',
    },

    inputContainer: {
        flex: 4,
        marginVertical: 20,
        justifyContent: 'flex-start',
    },

    buttonContainer: {
        flex: 3,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    titleTextContainer: {
        flex: 2,
        paddingBottom: 10,
        justifyContent: 'flex-end',
    },

    signInText: {
        fontSize: Fonts.XL,
        fontWeight: 'bold',
        paddingVertical: 8,
    },

    signInSubtext: {
        fontSize: Fonts.XS,
    },

    inputSubContainer: {
        paddingBottom: 20,
    },

    confirmButtonContainer: {
        paddingTop: 10,
    },

    accDetailsHeader: {
        fontWeight: 'bold',
        fontSize: Fonts.M,
        paddingBottom: 4,
    },

    textInputContainer: {
        borderBottomWidth: 2,
        borderRadius: 0,
        borderColor: Colors.LIGHT_BORDER,
    },

    textInput: {
        color: Colors.DARK_TEXT,
        paddingVertical: 8,
        paddingHorizontal: 4,
    },

    signUpContainer: {
        marginTop: 20,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    noAccountText: {
        padding: 6,
        color: Colors.DARK_TEXT,
        fontSize: Fonts.M,
    }

});

export default SignInScreen;

