import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const DefaultStyles = StyleSheet.create({

    screen: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        marginVertical: height * 0.02,
        height: height * 0.98,
        width: width * 0.90,
        alignSelf: 'center',
        // borderWidth: 1,
    },

    keyboardAvoidScreen: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // alignSelf: 'stretch',
        // borderWidth: 1,
        height: '100%',
        width: '100%',
    },

});


export default DefaultStyles;
