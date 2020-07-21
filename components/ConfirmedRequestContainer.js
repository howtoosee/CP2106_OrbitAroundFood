import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Fonts, Colors } from '../constants';

function ConfirmedRequestContainer({ status, store, open, close, location, food, price, destination,
    date, timingOfPurchase, asker, askerContact, askerRemarks, helper, helperContact, helperRemarks }) {

    const titlehandler = (status) => {
        if (status === 'helper') {
            return 'Help Request';
        } else if (status === 'asker') {
            return 'My Confirmed Request';
        }
    }

    const ItemField = ({title, info}) => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <Text style={{fontWeight: 'bold', 
                // fontStyle:'italic'
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
            <Text style={{ fontSize: Fonts.M, fontWeight: '700' }}>{titlehandler(status)}</Text>
            <ItemField title='Food: ' info={food}/>
            <ItemField title='Store: ' info={store}/>
            <ItemField title='Location: ' info={location}/>
            <ItemField title='Operating Hours: ' info={open + ' - ' + close}/>
            <ItemField title='Price of Food: ' info={price}/>
            <ItemField title='Date of Food Request: ' info={date}/>
            <ItemField title='Estimated Time of Arrival: ' info={timingOfPurchase}/>
            <ItemField title='Meeting Place: ' info={destination}/>
            <ItemField title='Requestor: ' info={asker}/>
            <ItemField title='Requestor Contact: ' info={askerContact}/>
            <ItemField title='Requestor Remarks: ' info={askerRemarks}/>
            <ItemField title='Helper: ' info={helper}/>
            <ItemField title='Helper Contact: ' info={helperContact}/>
            <ItemField title='Helper Remarks: ' info={helperRemarks}/>
        </View>
    );

}

const styles = StyleSheet.create({
    boxContainer: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderWidth: 2,
        borderRadius: 8,
        backgroundColor: Colors.CARD
    }
});

export default ConfirmedRequestContainer;