import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View, Dimensions} from 'react-native';

import {Colors, DefaultStyles, Fonts} from '../../constants';
import RequestInfoContainer from './RequestInfoContainer';
import {readAllUserRelatedRequests} from '../../api/HelpApi';
import firebase from 'firebase';


const {width, height} = Dimensions.get('window');
const helpCollection = firebase.firestore().collection('HELPS');


function RequestHistory({navigation, route}) {

    const username = firebase.auth().currentUser.displayName;

    const [isLoading, setLoading] = useState(true);
    const [myRequests, setRequests] = useState([]);
    const [myHelps, setHelps] = useState([]);

    const loadRequests = () => {
        readAllUserRelatedRequests(setRequests, setHelps)
            .then(() => setLoading(false))
            .catch(err => console.log('Error loading requests:', err));
    }

    const sortRequests = (req, helps) => {
        let newArr = [...req, ...helps];
        newArr.sort((a, b) => a.dateInfo.timestamp - b.dateInfo.timestamp);
        return newArr;
    }

    useEffect(() => {
        if (isLoading) {
            loadRequests();
        }

    }, [isLoading, readAllUserRelatedRequests, setRequests, setLoading]);


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

                        : <View style={{flex: 1}}>

                            <View style={styles.requestInfoHeading}>
                                <Text style={styles.resultStatText}>
                                    Requests found: {myRequests.length + myHelps.length}
                                </Text>
                            </View>

                            <ScrollView style={styles.searchResults}
                                        showsVerticalScrollIndicator={false}
                            >
                                {
                                    (sortRequests(myRequests, myHelps))
                                        .map(item => getConfirmedRequestItemElement(item, username, navigation))
                                }


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


function getConfirmedRequestItemElement(item, username, navigation) {
    const helpID = item.helpId;
    const status = (username === item.askerInfo.askerId) ? 'req' : 'help';

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
        // flex: 1
    },

    headerText: {
        color: Colors.TEXT,
        fontSize: Fonts.S,
        fontWeight: 'bold',
    },

    contentContainer: {
        // flex: 29
        flex: 1,
    },

    loadingContainer: {
        flex: 1,
        // marginBottom: ,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    noResultsContainer: {
        // marginTop: '',
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
        paddingTop: '3%',
        paddingBottom: '3%',
    },

    requestInfoHeading: {
        marginVertical: '1%',
    },

    searchResults: {
        marginTop: '0%',
        overflow: 'scroll',
        // height: '95%',
    },

    endOfResultsText: {
        paddingVertical: '5%',
        fontSize: Fonts.XS,
        color: Colors.TEXT,
        fontStyle: 'italic',
        alignItems: 'center',
        // justifyContent: 'center'
    },

});

export default RequestHistory;
