import React from 'react';
import {StyleSheet, View, Button} from 'react-native';

import Colors from '../constants/Colors';
import DefaultStyles from "../constants/DefaultStyles";
import DefaultHeader from "./DefaultHeader";


function Favourite(props) {

    return (
        <View style={DefaultStyles.screen}>

            <DefaultHeader headerText="Favourites" onPress={() => props.onPressBack()}/>

            <View style={DefaultStyles.contentContainer}>
                <View style={styles.content}>
                    <Button title="Chicken Rice" color={Colors.BUTTON} onPress={() => null}/>
                    <Button title="Bandung" color={Colors.BUTTON} onPress={() => null}/>
                    <Button title="Mala HotPot" color={Colors.BUTTON} onPress={() => null}/>
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({

    content: {
        flex: 1,
        flexDirection: 'column',
    }
});


export default Favourite;
