import React from 'react';
import {View, Button, Text} from 'react-native';

import DefaultStyles from "../constants/DefaultStyles";
import Colors from "../constants/Colors";


function DefaultHeader(props) {
    return (
        <View style={DefaultStyles.headerContainer}>

            <View style={DefaultStyles.headerTextBox}>
                <Text style={DefaultStyles.headerTitle}>{props.headerText}</Text>
            </View>

            <View style={DefaultStyles.headerBackButton}>
                <Button title="BACK" color={Colors.DARKER_BUTTON} onPress={props.onPress}/>
            </View>

        </View>
    );
}


export default DefaultHeader;
