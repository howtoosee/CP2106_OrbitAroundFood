import {StyleSheet} from 'react-native';
import Colors from "./Colors";


const DefaultStyles = StyleSheet.create({

    screen: {
        flex: 1,
        marginVertical: 20,
        marginHorizontal: 30,
        alignSelf: 'stretch',
        height: '100%',
        // width: '100%',
    },

    keyboardAvoidScreen: {
        flex: 1,
        marginVertical: 0,
        marginHorizontal: 30,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        height: '100%',
        // width: '100%',
    },

    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
    },

    headerTextBox: {
        width: '65%',
        height: 52,
        alignItems: 'center',
        paddingTop: 10,
        borderBottomWidth: 3,
        borderBottomColor: Colors.BUTTON,
        justifyContent: 'flex-start',
    },

    headerTitle: {
        fontSize: 35,
        color: Colors.BUTTON,
        fontStyle: 'italic',
        fontWeight: "bold",
    },

    headerBackButton: {
        width: '20%',
        paddingTop: 10,
    },

    contentContainer: {
        flex: 16,
    },

});


export default DefaultStyles;
