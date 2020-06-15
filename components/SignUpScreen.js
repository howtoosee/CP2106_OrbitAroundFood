import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';

import StartScreenButton from './StartScreenButton';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

function SignUpScreen({navigation}) {

    const [email, enteredEmail] = useState('');
    const [password, enteredPassword] = useState('');


    return (
        <View style={styles.screen}>
            <View style={styles.contentContainer}>
                <View style={styles.content}>
                        <Text style={styles.signUp}>Sign Up</Text>
                        <View style={styles.inputContainer}>
                            <Text style={styles.accDetails}>Email</Text>
                            <TextInput 
                                placeholder=" Type your email address here"
                                style={styles.textInput}
                                enteredEmail={text => enteredEmail(text)}
                                value={email}
                            />
                        <View style={styles.inputContainer}>
                            <Text style={styles.accDetails}>Password</Text>
                            <TextInput 
                                placeholder=" Type your password here"
                                style={styles.textInput}
                                enteredPassword={text => enteredPassword(text)}
                                value={password}    
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.accDetails}>Confirm Password</Text>
                            <TextInput 
                                placeholder=" Retype your password here"
                                style={styles.textInput}
                                enteredPassword={text => enteredPassword(text)}
                                value={password}    
                            />
                        </View>
                        <View style={styles.checkBox}>
                            <CheckBox 
                                title="I agree to the Terms of Services and Privacy Policy"
                                checked={true} />
                        </View>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <StartScreenButton color={Colors.BUTTON} title="CONTINUE" />
                    <View style={styles.helpContainer}> 
                        <Text style={styles.signInText}>Have an Account?   </Text>
                        <Button title="Sign In"color={Colors.ALT_BUTTON} onPress={() => navigation.goBack()}/>
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

    contentContainer: {
        paddingTop: 50,
        paddingHorizontal:40,
        justifyContent: 'center',
        width: '100%'
    },

    content: {
        paddingBottom: 12
    },

    inputContainer: {
        paddingTop: 20
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
        paddingTop:10,
        fontSize: Fonts.S,
        color: Colors.ALT_BUTTON
    },

    textInput: {
        height: 32,
        width: '100%',
        borderColor: 'grey',
        borderWidth: 3,
        padding:5
    }


});

export default SignUpScreen;