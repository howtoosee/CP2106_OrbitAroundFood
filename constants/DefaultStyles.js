import {StyleSheet} from 'react-native';
import Colors from "./Colors";
import Fonts from "./Fonts";


const DefaultStyles = StyleSheet.create({

    screen: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 30,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
    },

    headerTextBox: {
        width: '65%',
        alignItems: 'center',
        paddingTop: 0,
        borderBottomWidth: 3,
        borderBottomColor: Colors.BUTTON,
        justifyContent: 'flex-start',
    },

    headerTitle: {
        fontSize: Fonts.XL,
        color: Colors.BUTTON,
        fontStyle: 'italic',
        fontWeight: "bold",
    },

    headerBackButton: {
        width: '20%',
        paddingTop: 10,
    },

    contentContainer: {
        flex: 14,
    },
});


export default DefaultStyles;
