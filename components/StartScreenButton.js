import React from 'react';
import {StyleSheet, View, Button} from 'react-native';

import Colors from '../constants/Colors';


function StartScreenButton(props) {
    return (
        <View style={styles.buttons}>
            <Button title={props.title} color={Colors.BUTTON} onPress={props.onPress}/>
        </View>
    );
}


const styles = StyleSheet.create({
    buttons: {
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 20,
    },
})


export default StartScreenButton;
