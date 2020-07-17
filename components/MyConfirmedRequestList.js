import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DefaultStyles, Colors } from '../constants';
import ConfirmedRequestContainer from './ConfirmedRequestContainer';

function MyConfirmedRequestList({ route }) {

    const [requestList, setRequestList] = useState([]);

    useEffect(() => {
        if (route.params) {
            // Post updated, do something with `route.params`
            addRequestHandler(
                route.param?.store,
                route.param?.open,
                route.param?.close,
                route.params?.loc,
                route.params?.food,
                route.params?.price,
                route.params?.dest,
                route.params?.date,
                route.params?.time,
                route.params?.customerRemarks,
                route.params?.buyerContact,
                route.params?.buyerRemarks)
        }
    }, [route.params]);

    const addRequestHandler = (store, open, close, location, food, price, destination, date, timingOfPurchase, customerRemarks, buyerContact, buyerRemarks) => {
        setRequestList(currentRequests => [...currentRequests,
        {
            id: Math.random().toString(),
            store: store,
            open: open,
            close: close,
            loc: location,
            place: destination,
            date: date,
            time: timingOfPurchase,
            food: food,
            price: price,
            custRemarks: customerRemarks,
            buyerContact: buyerContact,
            buyerRemarks: buyerRemarks
        }
        ]);
    };

    // const removeRequestHandler = helpId => {
    //     setHelpList(currentList => {
    //         return currentList.filter((help) => help.uid !== helpId);
    //     })
    // }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerTextBox}>
                <Text style={DefaultStyles.headerTitle}>Requests</Text>
            </View>
            <FlatList
                keyExtractor={item => item.id}
                data={requestList}
                renderItem={({ item }) => (
                    <ConfirmedRequestContainer
                        // onCancel={removeRequestHandler}
                        // key={item.id}
                        store={item.store}
                        open={item.open}
                        close={item.close}
                        location={item.loc}
                        food={item.food}
                        price={item.price}
                        destination={item.place}
                        date={item.date}
                        timingOfPurchase={item.time}
                        customerRemarks={item.custRemarks}
                        buyerContact={item.buyerContact}
                        buyerRemarks={item.buyerRemarks}
                    />
                )}
            />
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerTextBox: {
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: 52,
        paddingTop: 10,
        paddingLeft: 25,
        borderBottomWidth: 3,
        borderBottomColor: Colors.BUTTON,
    },

});

export default MyConfirmedRequestList;
