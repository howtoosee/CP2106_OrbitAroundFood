import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Image } from 'react-native';

import StartScreenButton from './StartScreenButton';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

function LogInScreen({navigation}) {

    const [email, enteredEmail] = useState('');
    const [password, enteredPassword] = useState('');


    return (
        <View style={styles.screen}>
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
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <StartScreenButton color={Colors.BUTTON} title="SIGN IN" onPress={() => navigation.navigate('Navigation')} />
                    <View style={styles.helpContainer}> 
                        <Button title="Forget Password?" color={Colors.ALT_BUTTON} onPress={()=>{}}/>
                        <Button title="Sign Up"color={Colors.ALT_BUTTON} onPress={() => navigation.navigate('SignUp')}/>
                    </View>
                    <View style={styles.back}>
                        <Button title="BACK"color={Colors.ALT_BUTTON} onPress={() => navigation.goBack()} />
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
        flex: 1,
        paddingTop: 0,
        alignItems: 'center',
    },

    image: {
        width: 320,
        height: 320,
    },

    contentContainer: {
        flex: 2,
        paddingHorizontal:45,
        justifyContent: 'center'
    },

    content: {
        paddingBottom: 10
    },

    inputContainer: {
        paddingVertical: 10
    },

    buttonContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    helpContainer: {
        width: '100%',
        paddingVertical: 10,
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
        padding:5
    },

    back: {
        width: '30%'
    }


});

export default LogInScreen;