import React from 'react';
import {StyleSheet, View, Button} from 'react-native';

import {Colors} from '../../constants';


function StartScreenButton(props) {
    return (
        <View style={styles.buttonContainer}>
            <Button title={props.title}
                    color={props.color ? props.color : Colors.BUTTON}
                    onPress={props.onPress}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    buttonContainer: {
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 20,
        backgroundColor: 'rgba(0,0,0,0)'
    },
})


export default StartScreenButton;
