import React from 'react';
import {Button, Dimensions, StyleSheet, View} from 'react-native';

import {Colors} from '../../constants';

const {width, height} = Dimensions.get('window');


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
        width: width * 0.5,

        justifyContent: 'space-around',
        // alignItems: 'center',
        marginVertical: '4%',
        backgroundColor: 'rgba(0,0,0,0)'
    },
});


export default StartScreenButton;
