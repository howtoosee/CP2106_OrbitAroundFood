import React, {useState, useEffect} from 'react';
import {View, KeyboardAvoidingView, SafeAreaView, TextInput, Text, Button, StyleSheet, Image, Alert, Platform} from 'react-native';

import {Colors, Fonts, DefaultStyles, firebaseDB} from '../../constants';


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

        <SafeAreaView style={DefaultStyles.screen}>
            <KeyboardAvoidingView style={DefaultStyles.keyboardAvoidScreen}
                                  behavior={Platform.OS === "ios" ? "padding" : null}
            >
                <View style={{flex: 1, alignSelf: 'stretch', marginBottom: 20}}>

                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            source={require('../../assets/icon.png')}
                        />
                    </View>

                    <View style={styles.titleTextContainer}>
                        <Text style={styles.signInTitleText}>Sign In</Text>
                        <Text style={styles.signInSubtext}>Sign in to OrbitAroundFood</Text>
                    </View>

                    <View style={styles.inputContainer}>

                        <View style={styles.inputSubContainer}>

                            <View style={styles.inputIndividualContainer}>
                                <Text style={styles.accDetailsHeader}>Email</Text>

                                <View style={styles.textInputContainer}>
                                    <TextInput placeholder="Email"
                                               style={styles.textInput}
                                               autoCapitalize="none"
                                               onChangeText={email => setEmailInput(email)}
                                               value={email}
                                    />
                                </View>
                            </View>

                            <View style={styles.inputIndividualContainer}>
                                <Text style={styles.accDetailsHeader}>Password</Text>

                                <View style={styles.textInputContainer}>
                                    <TextInput placeholder="Password"
                                               style={styles.textInput}
                                               autoCapitalize="none"
                                               onChangeText={password => setPasswordInput(password)}
                                               value={password}
                                               secureTextEntry={true}
                                    />
                                </View>
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

                        <View style={styles.signUpButtonContainer}>
                            <Text style={styles.noAccountText}>No account yet? </Text>
                            <Button title="Sign Up"
                                    color={Colors.DARKER_BUTTON}
                                    onPress={() => navigation.navigate('Sign Up')}/>
                        </View>
                    </View>
                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    imageContainer: {
        flex: 4,
        marginVertical: 2,
        marginHorizontal: 10,
        alignSelf: 'stretch',
    },

    image: {
        height: 280,
        width: 280,
    },

    inputContainer: {
        flex: 2,
        width: '100%',
        // alignSelf: 'stretch',
        marginVertical: 20,
        justifyContent: 'center',
    },

    buttonContainer: {
        flex: 2,
        marginBottom: 20,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    titleTextContainer: {
        flex: 2,
        paddingBottom: 10,
        justifyContent: 'center',
    },

    signInTitleText: {
        fontSize: Fonts.XL,
        fontWeight: 'bold',
        paddingVertical: 8,
    },

    signInSubtext: {
        fontSize: Fonts.XS,
    },

    inputSubContainer: {
        width: '100%',
        // alignSelf: 'stretch',
        marginVertical: 10
    },

    inputIndividualContainer: {
        marginVertical: 10,
    },

    accDetailsHeader: {
        fontWeight: 'bold',
        fontSize: Fonts.M,
        paddingVertical: 4
    },

    textInputContainer: {
        // borderWidth: 2,
        marginTop: 4,
        borderBottomWidth: 2,
        borderRadius: 0,
        borderColor: Colors.LIGHT_BORDER,
    },

    textInput: {
        color: Colors.DARK_TEXT,
        paddingVertical: 8,
        paddingHorizontal: 4,
    },

    confirmButtonContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    signUpButtonContainer: {
        marginTop: 20,
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

