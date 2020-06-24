import React from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';

import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

const BoxContainer = props => {

    return (
        <View style={{ ...styles.boxContainer, ...props.style }}>
            {props.children}
            <Text style={{fontSize: Fonts.M, fontWeight: '700'}}>Lemme Help</Text>
            <Text>
                Location: The Deck {'\n'}
                        Destination: Raffles Hall {'\n'}
                        Timing of Food Purchase: 12pm
                    </Text>
            <View style={styles.requestButton}>
                <Button title='Request' color={Colors.ALT_BUTTON} />
            </View>
        </View>
    );

};

const styles = StyleSheet.create({
    boxContainer: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        height: 150,
        width: 320,
        margin: 20,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        paddingHorizontal: 15,
        paddingBottom:8,
        backgroundColor: Colors.CARD
    }
});

export default BoxContainer;