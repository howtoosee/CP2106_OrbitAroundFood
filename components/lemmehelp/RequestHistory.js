import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';

import {Colors, DefaultStyles, Fonts} from '../../constants';
import RequestInfoContainer from './RequestInfoContainer';
import {readAllUserRelatedRequests} from '../../api/HelpApi';


function RequestHistory({navigation, route}) {

    const [isLoading, setLoading] = useState(true);
    const [myRequests, setRequests] = useState([])
    const [myHelps, setHelps] = useState([]);


    useEffect(() => {
        if (isLoading) {
            readAllUserRelatedRequests(setRequests, setHelps)
                .then(() => setLoading(false))
                .catch(err => console.log('Error loading requests:', err));
        }

    }, [isLoading, readAllUserRelatedRequests, setRequests, setHelps, setLoading]);


    return (
        <SafeAreaView style={DefaultStyles.screen}>

            <View style={styles.headerTextContainer}>
                <Text style={styles.headerText}>My Request List</Text>
            </View>

            <View style={styles.contentContainer}>
                {(isLoading)

                    ? <View style={styles.loadingContainer}>
                        <ActivityIndicator size='large' color='black'/>
                    </View>

                    : (myRequests.length === 0 && myHelps.length === 0)

                        ? <View style={styles.noResultsContainer}>
                            <View style={styles.searchResultInfo}>
                                <Text style={styles.resultStatText}>No requests found :(</Text>
                            </View>
                        </View>

                        : <View>

                            <View style={styles.requestInfoHeading}>
                                <Text style={styles.resultStatText}>
                                    Requests found: {myRequests.length + myHelps.length}
                                </Text>
                            </View>

                            <ScrollView style={styles.searchResults}
                                        showsVerticalScrollIndicator={false}
                            >
                                {myRequests.map(item => getConfirmedRequestItemElement(item, 'req', navigation))}
                                {myHelps.map(item => getConfirmedRequestItemElement(item, 'help', navigation))}

                                <View style={styles.endOfResultsText}>
                                    <Text style={styles.endOfResultsText}>No more liao!</Text>
                                </View>

                            </ScrollView>

                        </View>

                }
            </View>
        </SafeAreaView>
    );

}


function getConfirmedRequestItemElement(item, status, navigation) {
    const helpID = item.helpId;

    return (
        <View key={helpID}>
            <RequestInfoContainer
                item={item}
                status={status}
                navigation={navigation}
            />
        </View>
    );
}

const styles = StyleSheet.create({

    headerTextContainer: {
        // paddingLeft: 20,
        flex: 1
    },

    headerText: {
        color: Colors.TEXT,
        fontSize: Fonts.S,
        fontWeight: 'bold',
    },

    contentContainer: {
        flex: 25
    },

    loadingContainer: {
        flex: 1,
        marginBottom: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    noResultsContainer: {
        marginTop: 250,
        alignItems: 'center',
        justifyContent: 'center'
    },

    searchResultInfo: {
        color: Colors.TEXT,
        fontSize: 14,
    },

    resultStatText: {
        color: Colors.DARK_TEXT,
        fontSize: Fonts.XS,
        fontWeight: 'bold',
    },

    requestInfoHeading: {
        paddingHorizontal: 2,
        paddingVertical: 4,
    },

    searchResults: {
        marginLeft: 0,
        // paddingTop: 0,
        marginTop: 10,
        overflow: 'hidden',
        height: '95%'
    },

    endOfResultsText: {
        paddingVertical: 20,
        fontSize: Fonts.XS,
        color: Colors.TEXT,
        fontStyle: 'italic',
        alignItems: 'center',
        // justifyContent: 'center'
    },

});

export default RequestHistory;
