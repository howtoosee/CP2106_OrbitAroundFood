import React from 'react';
import {View, Text} from 'react-native';

import DefaultStyles from "../constants/DefaultStyles";


function DefaultHeader(props) {
    return (
        <View style={DefaultStyles.headerContainer}>

            <View style={DefaultStyles.headerTextBox}>
                <Text style={DefaultStyles.headerTitle}>{props.headerText}</Text>
            </View>

        </View>
    );
}


export default DefaultHeader;
