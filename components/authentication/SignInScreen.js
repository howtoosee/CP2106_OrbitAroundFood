import React, {useState} from "react";
import {
    Alert,
    Button,
    Dimensions,
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";

import {Colors, DefaultStyles, Fonts} from "../../constants";
import firebase from "firebase";
import DismissKeyboardView from "../support-components/DismissKeyboardView";
import HideWithKeyboard from "react-native-hide-with-keyboard";

const {width, height} = Dimensions.get("window");

function SignInScreen({navigation}) {
    const [email, setEmailInput] = useState("");
    const [password, setPasswordInput] = useState("");

    const signInErrorAlert = (err) => {
        Alert.alert("Error", err.message, [
            {
                text: "Dismiss"
            }
        ]);
    }

    const checkFields = () => {
        const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (email.length === 0) {
            signInErrorAlert('Email cannot be empty!');
        } else if (!email.match(emailFormat)) {
            signInErrorAlert('Incorrect email format!');
        } else if (password.length === 0) {
            signInErrorAlert('Password cannot be empty!');
        } else if (password.length < 6) {
            signInErrorAlert('Password must be of at least 6 characters!');
        } else {
            return true;
        }

        return false;
    }

    const signInHandler = () => {
        if (checkFields()) {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .catch((err) => {
                    signInErrorAlert(err);
                    console.log("Error signing in:", err.code, err.message);
                })
                .then(() => signInSuccessHandler());
        }
    }

    const signInSuccessHandler = () => {
        const user = firebase.auth().currentUser;

        if (user) {
            const displayName = user.displayName;
            console.log("Successfully signed in:", email, displayName);

            Alert.alert("Success", "Signed in as @" + displayName, [
                {
                    text: "Ok",
                    onPress: () => {
                        setEmailInput("");
                        setPasswordInput("");
                        navigation.goBack();
                    }
                }
            ]);
        }
    };

    return (
        <SafeAreaView style={DefaultStyles.screen}>

            <KeyboardAvoidingView style={DefaultStyles.keyboardAvoidScreen}
                                  behavior={Platform.OS === 'ios' ? "padding" : null}
            >
                <DismissKeyboardView style={{flex: 1}}>

                    <View style={{
                        flex: 9,
                        width: '80%',
                        height: '100%',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        // borderWidth: 1
                    }}>

                        <View style={styles.imageContainer}>
                            <Image
                                style={styles.image}
                                source={require("../../assets/icon.png")}
                            />
                        </View>

                        <View style={styles.titleTextContainer}>
                            <HideWithKeyboard>
                                <Text style={styles.signInTitleText}>Sign In</Text>
                                <Text style={styles.signInSubtext}>Sign in to OrbitAroundFood</Text>
                            </HideWithKeyboard>
                        </View>

                        <View style={styles.inputContainer}>
                            <View style={styles.inputSubContainer}>
                                <View style={styles.inputIndividualContainer}>
                                    <Text style={styles.accDetailsHeader}>
                                        Email
                                    </Text>

                                    <View style={styles.textInputContainer}>
                                        <TextInput
                                            placeholder="Email"
                                            style={styles.textInput}
                                            autoCapitalize="none"
                                            onChangeText={(email) =>
                                                setEmailInput(email)}
                                            value={email}
                                        />
                                    </View>
                                </View>

                                <View style={styles.inputIndividualContainer}>
                                    <Text style={styles.accDetailsHeader}>
                                        Password
                                    </Text>

                                    <View style={styles.textInputContainer}>
                                        <TextInput
                                            placeholder="Password"
                                            style={styles.textInput}
                                            autoCapitalize="none"
                                            onChangeText={(password) =>
                                                setPasswordInput(password)}
                                            value={password}
                                            secureTextEntry={true}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={styles.confirmButtonContainer}>
                            <Button
                                color={Colors.BUTTON}
                                title="Confirm"
                                onPress={signInHandler}
                            />
                        </View>

                    </View>

                    <View style={styles.signUpButtonContainer}>
                        <Text style={styles.noAccountText}>
                            No account yet?{" "}
                        </Text>
                        <Button
                            title="Sign Up"
                            color={Colors.DARKER_BUTTON}
                            onPress={() => navigation.navigate("Sign Up")}
                        />
                    </View>

                </DismissKeyboardView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        flex: 4,
        marginVertical: '1%',
        marginHorizontal: '1%',
        alignSelf: "center"
    },

    image: {
        height: '100%',
        width: '100%',
        aspectRatio: 1,
    },

    inputContainer: {
        flex: 3,
        width: "100%",
        justifyContent: "center"
    },

    titleTextContainer: {
        flex: 1,
        paddingBottom: '1%',
        justifyContent: "center"
    },

    signInTitleText: {
        fontSize: Fonts.XL,
        fontWeight: "bold",
        paddingVertical: '4%'
    },

    signInSubtext: {
        fontSize: Fonts.XS
    },

    inputSubContainer: {
        width: "100%",
        // alignSelf: 'stretch',
        marginVertical: '3%'
    },

    inputIndividualContainer: {
        marginVertical: 10
    },

    accDetailsHeader: {
        fontWeight: "bold",
        fontSize: Fonts.M,
        paddingVertical: '2%'
    },

    textInputContainer: {
        // borderWidth: 2,
        marginTop: '2%',
        borderBottomWidth: 2,
        borderRadius: 0,
        borderColor: Colors.LIGHT_BORDER
    },

    textInput: {
        color: Colors.DARK_TEXT,
        paddingVertical: '2%',
        paddingHorizontal: '1%',
        // height: '100%',
        width: '100%',
    },

    confirmButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: height * 0.02,
    },

    signUpButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    noAccountText: {
        padding: '2%',
        color: Colors.DARK_TEXT,
        fontSize: Fonts.M
    }
});

export default SignInScreen;
