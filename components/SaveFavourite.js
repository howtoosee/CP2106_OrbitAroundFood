import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import Colors from '../constants/Colors';



function SaveFavourite(props) {

    return (
        <View style={styles.screen}>

            <View style={styles.header}>

                <View style={styles.headerBox}>
                    <Text style={styles.headerTitle}>Yummylicious</Text>
                </View>

                <View style={styles.button}>
                    <Button title="BACK" color={Colors.darkerButton} onPress={() => props.onPressBack(true)}/>
                </View>

            </View>

            <View style={styles.content}>
                <Button title="Chicken Rice" color={Colors.button}/>
                <Button title="Bandung" color={Colors.button}/>
                <Button title="Mala HotPot" color={Colors.button}/>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 30,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },

    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10
    },

    headerBox: {
        width: '65%',
        alignItems: 'center',
        borderBottomWidth: 3,
        borderBottomColor: Colors.button,
        justifyContent: 'flex-start'
    },

    headerTitle: {
        fontSize: 35,
        color: Colors.button,
        fontStyle: 'italic',
        fontWeight: "bold"
    },

    button: {
        width: '20%',
        paddingTop: 10
    },

    content: {
        flex: 12
    }
});


export default SaveFavourite;
