import React, {useState} from 'react';
import {
    Alert,
    Button,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';

import {Colors, DefaultStyles, Fonts} from '../../constants';
import {createUser, signOut, userNameExists} from '../../api/AuthenticationApi';
import DismissKeyboardView from "../support-components/DismissKeyboardView";


function SignUpScreen({navigation}) {

    const [username, setUsername] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypedPassword] = useState('');


    const signUpAlert = err => {
        return Alert.alert(
            'Error',
            err,
            [
                {
                    text: 'Dismiss'
                }
            ]
        );
    };

    const checkFields = async () => {
        const illegalUsernameChars = /\W/;
        const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (email.length === 0) {
            signUpAlert('Email cannot be empty!');
        } else if (!email.match(emailFormat)) {
            signUpAlert('Incorrect email format!');

        } else if (username.length === 0) {
            signUpAlert('Username cannot be empty!');
        } else if (username.length < 4) {
            signUpAlert('Username must be of at least 4 characters!');
        } else if (illegalUsernameChars.test(username)) {
            signUpAlert('Username must of letters, numbers and underscores only!');

        } else if (number.length === 0) {
            signUpAlert('Contact number cannot be empty!');
        } else if (isNaN(parseInt(number))) {
            signUpAlert('Contact number contains illegal characters!');

        } else if (password.length === 0) {
            signUpAlert('Password cannot be empty!');
        } else if (password.length < 6) {
            signUpAlert('Password must be of at least 4 characters!');

        } else if (password !== retypePassword) {
            signUpAlert('Passwords do not match!');

        } else if (await userNameExists(username)) {
            signUpAlert('Username already exists!');

        } else {
            return true;
        }

        return false;
    }


    const signUpHandler = async () => {
        if (await checkFields()) {
            await createUser(email, password, number, username, alert)
                .then(() => signOut())
                .then(() => signUpSuccessHandler());
        }
    }


    const signUpSuccessHandler = () => {
        Alert.alert(
            'Success',
            'Registered as: @' + username,
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
        <SafeAreaView style={DefaultStyles.screen}>

            <KeyboardAvoidingView style={DefaultStyles.keyboardAvoidScreen}
                                  behavior={"padding"}
            >
                <DismissKeyboardView style={{flex: 1, width: '80%', alignSelf: 'center', justifyContent: 'center'}}>

                    <View style={styles.titleTextContainer}>
                        <Text style={styles.signUpTitleText}>Sign Up</Text>
                        <Text style={styles.signUpSubtext}>Create an account to use OrbitAroundFood</Text>
                    </View>


                    <View style={styles.inputContainer}>

                        <View style={styles.inputSubContainer}>
                            <Text style={styles.accDetailsHeader}>Email</Text>

                            <View style={styles.textInputContainer}>
                                <TextInput
                                    placeholder="Email"
                                    style={styles.textInput}
                                    autoCapitalize="none"
                                    onChangeText={email => setEmail(email)}
                                    value={email}
                                />
                            </View>
                        </View>

                        <View style={styles.inputSubContainer}>
                            <Text style={styles.accDetailsHeader}>Username</Text>

                            <View style={styles.textInputContainer}>
                                <TextInput
                                    placeholder="Username (min. 4 chars)"
                                    style={styles.textInput}
                                    autoCapitalize="none"
                                    onChangeText={username => setUsername(username)}
                                    value={username}
                                />
                            </View>
                        </View>

                        <View style={styles.inputSubContainer}>
                            <Text style={styles.accDetailsHeader}>Contact Number</Text>

                            <View style={styles.textInputContainer}>
                                <TextInput
                                    placeholder="Contact Number"
                                    keyboardType="numeric"
                                    style={styles.textInput}
                                    autoCapitalize="none"
                                    onChangeText={number => setNumber(number)}
                                    value={number}
                                />
                            </View>
                        </View>

                        <View style={styles.inputSubContainer}>
                            <Text style={styles.accDetailsHeader}>Password</Text>

                            <View style={styles.textInputContainer}>
                                <TextInput
                                    placeholder="Password (min. 6 chars)"
                                    style={styles.textInput}
                                    autoCapitalize="none"
                                    onChangeText={password => setPassword(password)}
                                    value={password}
                                    secureTextEntry={true}
                                />
                            </View>
                        </View>

                        <View style={styles.inputSubContainer}>
                            <Text style={styles.accDetailsHeader}>Confirm Password</Text>

                            <View style={styles.textInputContainer}>
                                <TextInput
                                    placeholder="Retype Password"
                                    style={styles.textInput}
                                    autoCapitalize="none"
                                    onChangeText={retypePassword => setRetypedPassword(retypePassword)}
                                    value={retypePassword}
                                    secureTextEntry={true}
                                />
                            </View>
                        </View>
                    </View>


                    <View style={styles.buttonContainer}>
                        <View style={styles.confirmButtonContainer}>
                            <Button color={Colors.BUTTON}
                                    title="Sign Up"
                                    onPress={() => signUpHandler()}
                            />
                        </View>

                        <View style={styles.signInButtonContainer}>
                            <Text style={styles.haveAccountText}>Have an account? </Text>
                            <Button title="Sign In"
                                    color={Colors.DARKER_BUTTON}
                                    onPress={() => navigation.goBack()}
                            />
                        </View>
                    </View>

                </DismissKeyboardView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    inputContainer: {
        width: '100%',
        marginVertical: '1%',
        justifyContent: 'flex-end',
    },

    buttonContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: '2%',
    },

    titleTextContainer: {
        marginBottom: '5%',
        justifyContent: 'flex-end',
    },

    signUpTitleText: {
        fontSize: Fonts.XL,
        fontWeight: 'bold',
        paddingVertical: '2%',
    },

    signUpSubtext: {
        fontSize: Fonts.XS,
        paddingVertical: '1%',
    },

    inputSubContainer: {
        marginVertical: '3%'
    },

    accDetailsHeader: {
        fontWeight: 'bold',
        fontSize: Fonts.M,
        paddingVertical: '1%'
    },

    textInputContainer: {
        // borderWidth: 2,
        marginTop: '1%',
        borderBottomWidth: 2,
        borderRadius: 0,
        borderColor: Colors.LIGHT_BORDER,
    },

    textInput: {
        color: Colors.DARK_TEXT,
        paddingVertical: '2%',
        paddingHorizontal: '1%',
    },

    confirmButtonContainer: {
        marginTop: '3%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    signInButtonContainer: {
        marginTop: '3%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    haveAccountText: {
        padding: '2%',
        color: Colors.DARK_TEXT,
        fontSize: Fonts.M,
    },


});

export default SignUpScreen;

