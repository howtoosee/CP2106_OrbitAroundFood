import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { Fonts, Colors } from '../constants';

function MyRequestContainer({ navigation, item }) {

    const ItemField = ({ title, info }) => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <Text style={{
                    fontWeight: 'bold'
                }}>
                    {title}
                </Text>
                <Text>
                    {info}
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.boxContainer}>
            <Text style={{ fontSize: Fonts.M, fontWeight: '700' }}>{item.store.location}</Text>
            <ItemField title='Food: ' info={item.name} />
            <ItemField title='Store: ' info={item.store.store_name} />
            <ItemField title='Operating Hours: ' info={item.store.open_hours + ' - ' + item.store.close_hours} />
            <ItemField title='Price of Food: ' info={item.price} />
            <ItemField title='Date of Food Request: ' info={item.date} />
            <ItemField title='Estimated Time of Arrival: ' info={item.time} />
            <ItemField title='Meeting Place: ' info={item.asker.dropOff} />
            <ItemField title='Requestor: ' info={item.asker.name} />
            <ItemField title='Requestor Remarks: ' info={item.asker.remark} />
            <View style={styles.requestButton}>
                <Button
                    title='HELP'
                    color={Colors.ALT_BUTTON}
                    onPress={navigation}
                />
            </View>
        </View>
    );

};

const styles = StyleSheet.create({
    boxContainer: {
        width: '85%',
        marginHorizontal: 28,
        marginBottom: 30,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderWidth: 2,
        borderRadius: 8,
        backgroundColor: Colors.CARD
    },

    requestButton: {
        width: '25%',
        paddingVertical: 4
    }
});

export default MyRequestContainer;