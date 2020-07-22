import {Alert} from "react-native";

export default function requireSignInAlert(functionMsg, navigation) {
    Alert.alert(
        'Error',
        'Please sign in to ' + functionMsg + '!',
        [
            {
                text: 'Sign in',
                onPress: () => navigation.navigate('Sign In'),
            },
            {
                text: 'Ok',
            },
        ]
    );
}