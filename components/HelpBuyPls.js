import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import DefaultStyles from '../constants/DefaultStyles';
import Fonts from '../constants/Fonts';
import Colors from '../constants/Colors';
import LemmeHelpContainer from './LemmeHelpContainer';

function HelpBuyPls(props) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={DefaultStyles.headerTextBox}>
                <Text style={DefaultStyles.headerTitle}>Lemme Help</Text>
            </View>
            <View style={styles.noteContainer}>
                <Text style={styles.note}>*Note: Help Fee $1 (on top of food fee) ,
                        {'\n'} pay helper directly upon receival of goods</Text>
            </View>
            <ScrollView style={styles.content}>
                <LemmeHelpContainer/>
                <LemmeHelpContainer/>
                <LemmeHelpContainer/>
                <LemmeHelpContainer/>
            </ScrollView>
            <View style={styles.button}>
                <Button title="Lemme Help" color={Colors.DARKER_BUTTON} onPress={() => { }} />
            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        flexDirection: 'column',
        paddingBottom: 10,
        paddingHorizontal: 20,
    },
    noteContainer: {
        paddingHorizontal:10,
        paddingTop: 5,
        paddingBottom:15
    },
    note: {
        fontSize: Fonts.XS,
        color: Colors.TEXT
    },
    requestButton: {
        width: '75%',
        height: 20,
    },
    button: {
        width: '100%',
        justifyContent: 'flex-end',
        alignContent: 'center',
        paddingHorizontal: 80,
        paddingVertical: 25

    }
});

export default HelpBuyPls;