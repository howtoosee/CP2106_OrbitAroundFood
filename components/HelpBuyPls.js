import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Fonts from '../constants/Fonts';
import Colors from '../constants/Colors';
import MyRequestContainer from '../components/MyRequestContainer';

function HelpBuyPls({ navigation, route }) {

    const [requestList, setRequestList] = useState([]);

    useEffect(() => {
        if (route.params) {
            // Post updated, do something with `route.params`
            addRequestHandler(
                route.params?.store,
                route.params?.open,
                route.params?.close,
                route.params?.loc,
                route.params?.food,
                route.params?.price,
                route.params?.dest,
                route.params?.date,
                route.params?.time,
                route.params?.remarks)
        }
    }, [route.params]);

    const addRequestHandler = (store, open, close, location, food, price, destination, date, time, remarks) => {
        setRequestList(currentRequests => [...currentRequests,
        {
            id: Math.random().toString(),
            store: store,
            open: open,
            close: close,
            loc: location,
            food: food,
            price: price,
            place: destination,
            date: date,
            time: time,
            remarks: remarks
        }
        ]);
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.noteContainer}>
                <Text style={styles.note}>*Note: Help Fee $1 (on top of food fee) ,
                        {'\n'} pay helper directly upon receival of goods</Text>
            </View>
            <FlatList
                keyExtractor={item => item.id}
                data={requestList}
                renderItem={({ item }) => (
                    <MyRequestContainer
                        // onCancel={removeRequestHandler}
                        // key={item.id}
                        store={item.store}
                        open={item.open}
                        close={item.close}
                        location={item.loc}
                        destination={item.place}
                        date={item.date}
                        timingOfPurchase={item.time}
                        food={item.food}
                        price={item.price}
                        remarks={item.remarks}
                        navigation={() => navigation.navigate('Accept Request', {
                            store: item.store,
                            open: item.open,
                            close: item.close,
                            loc: item.loc,
                            dest: item.place,
                            date: item.date,
                            time: item.time,
                            food: item.food,
                            price: item.price,
                            customerRemarks: item.remarks
                        })}
                    />
                )}
            />
            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Button title="Request Help" color={Colors.DARKER_BUTTON} onPress={navigation.navigate('Request Help')} />
                </View>
                <View style={styles.button}>
                    <Button title="My Req List" color={Colors.ALT_BUTTON} onPress={() => navigation.navigate('My Request List')} />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        flexDirection: 'column',
        paddingBottom: 10,
        paddingHorizontal: 20,
    },
    noteContainer: {
        paddingHorizontal: 20,
        paddingTop: 0,
        paddingBottom: 15
    },
    note: {
        fontSize: Fonts.XS,
        color: Colors.TEXT
    },
    requestButton: {
        width: '75%',
        height: 20,
    },
    buttonContainer:{
        paddingVertical: 10
    },
    button: {
        width: '100%',
        justifyContent: 'flex-end',
        alignContent: 'center',
        paddingHorizontal: 80,
        paddingBottom: 8
    }
});

export default HelpBuyPls;