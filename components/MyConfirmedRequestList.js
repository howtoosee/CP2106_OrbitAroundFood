import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, Fonts } from '../constants';
import ConfirmedRequestContainer from './ConfirmedRequestContainer';
import { readAllUserRelatedRequests } from '../api/HelpApi';
import * as firebase from 'firebase';

function MyConfirmedRequestList({ route }) {

    const [isLoading, setLoading] = useState(true);
    const [confirmedRequests, setConfirmedRequests] = useState([]);
    const { displayName } = firebase.auth().currentUser;

    // Import Info from database
    useEffect(() => {
        if (isLoading) {
            readAllUserRelatedRequests(displayName, setConfirmedRequests)
                .then(() => setLoading(false))
                .catch(err => console.log('Error loading Requests:', err));
        }
    }, [isLoading, readAllUserRelatedRequests, displayName, setConfirmedRequests]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerTextBox}>
                <Text style={{ fontSize: Fonts.S, fontWeight: 'bold' }}>My Request List</Text>
            </View>
            <View style={styles.contentContainer}>
                {(isLoading)

                    ? <View style={styles.loadingContainer}>
                        <ActivityIndicator size='large' color='black' />
                    </View>

                    : (confirmedRequests.myHelps.length === 0 && confirmedRequests.myRequests.length === 0)

                        ? <View style={styles.noResultsContainer}>
                            <View style={styles.searchResultInfo}>
                                <Text>No requests found :(</Text>
                            </View>
                        </View>

                        : <View>
                            <View style={styles.requestInfoHeading}>
                                <Text style={{ color: Colors.TEXT }}>Requests found: {confirmedRequests.length}</Text>
                            </View>
                            <ScrollView>
                                {confirmedRequests.myHelps.map(item => getConfirmedRequestItemElement(item, 'helper'))}
                                {confirmedRequests.myRequests.map(item => getConfirmedRequestItemElement(item, 'asker'))}
                                <View style={styles.endOfResultsText}>
                                    <Text>No more liao!</Text>
                                </View>

                            </ScrollView>

                        </View>

                }
            </View>
        </SafeAreaView>
    );

}


function getConfirmedRequestItemElement(item, status) {
    const helpID = item.helpId;

    return (
        <View style={{paddingHorizontal:20, paddingBottom: 25}} key={helpID}>
            <ConfirmedRequestContainer
                // onCancel={removeRequestHandler}
                key={helpID}
                status={status}
                store={item.store.store_name}
                open={item.store.open_hours}
                close={item.store.close_hours}
                location={item.store.location}
                destination={item.asker.dropOff}
                date={item.date}
                timingOfPurchase={item.time}
                food={item.name}
                price={item.price}
                asker={item.asker.name}
                askerContact={item.asker.contact}
                askerRemarks={item.asker.remark}
                helper={item.helper.name}
                helperContact={item.helper.contact}
                helperRemarks={item.helper.remark}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    headerTextBox: {
        paddingLeft: 20,
        flex: 1
    },

    contentContainer: {
        flex: 25
    },

    loadingContainer: {
        flex: 1,
        paddingBottom: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    noResultsContainer: {
        paddingTop: 250,
        alignItems: 'center',
        justifyContent: 'center'
    },

    searchResultInfo: {
        color: Colors.TEXT,
        fontSize: 14,
    },

    requestInfoHeading: { 
        paddingHorizontal: 20, 
        paddingVertical: 5 
    },

    endOfResultsText: {
        height: 180,
        paddingVertical: 20,
        fontStyle: 'italic',
        alignItems: 'center'
    },

});

export default MyConfirmedRequestList;
