import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {Colors, Fonts} from '../../constants';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as firebase from 'firebase';

function ActiveRequestContainer(props) {
    const {item, onPress} = props;

    const username = firebase.auth().currentUser.displayName;
    const buttonDisable = username === item.askerInfo.askerId;

    const ItemField = ({title, info}) => {
        return (
            <View style={{flexDirection: 'row', marginTop: 4, marginHorizontal: 2, alignItems: 'center'}}>
                <Text style={styles.headerText}>{title}:</Text>
                <Text style={styles.infoText}>{info}</Text>
            </View>
        );
    }

    const onPressHandler = () => {
        if (buttonDisable) {
            Alert.alert('Error',
                'You cannot accept your own request!',
                [{text: 'Dismiss'}]
            );
        } else {
            onPress();
        }
    }

    const getTimeString = (timestamp) => {
        const day = item.dateInfo.date;

        const date = new Date(timestamp);
        const hr24 = date.getHours();
        const hr = hr24 % 12;
        const min = ('0' + date.getMinutes()).slice(-2);
        const ampm = hr24 > 12 ? 'pm' : 'am';
        return day + ' @ ' + hr + ':' + min + ' ' + ampm;
    }

    const timeString = getTimeString(item.dateInfo.timestamp);

    return (
        <View style={styles.boxContainer}>

            <View style={{flexDirection: 'row'}}>

                <View style={styles.infoContainer}>

                    <Text style={styles.titleText}>{item.foodObj.store.location}</Text>

                    <View style={styles.sectionContainerBottomSeparator}>

                        <ItemField title='Food'
                                   info={item.foodObj.name}
                        />
                        <ItemField title='Store'
                                   info={item.foodObj.store.store_name}
                        />
                        <ItemField title='Price'
                                   info={item.foodObj.price}
                        />
                    </View>

                    <View style={styles.sectionContainer}>

                        <ItemField title='Time'
                                   info={timeString}
                        />
                        <ItemField title='ETA'
                                   info={item.dateInfo.timeETA}
                        />
                        <ItemField title='Meet at'
                                   info={item.askerInfo.dropOffLocation}
                        />
                        <ItemField title='Asker'
                                   info={item.askerInfo.askerId}
                        />
                        <ItemField title='Remarks'
                                   info={item.askerInfo.askerRemark}
                        />
                    </View>

                </View>

                <View style={styles.buttonContainer}>
                    <Button type='clear'
                        // title='HELP'
                            icon={
                                <Icon name='hand-holding-heart'
                                      size={30}
                                      color={buttonDisable ? Colors.DISABLED_BUTTON : Colors.BUTTON}
                                />
                            }
                            onPress={onPressHandler}
                    />

                </View>

            </View>

        </View>
    );

}


const styles = StyleSheet.create({
    boxContainer: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        marginTop: '3%',
        paddingHorizontal: '3%',
        paddingVertical: '2%',
        borderWidth: 1,
        borderRadius: 4,
    },

    infoContainer: {
        flex: 8
    },

    buttonContainer: {
        flex: 2,
        marginVertical: '1%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    titleText: {
        fontSize: Fonts.S,
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: Colors.DARK_TEXT,
        paddingBottom: '1%',
    },

    sectionContainer: {
        width: '100%',
        // borderBottomWidth: 1,
        paddingBottom: '1%',
        marginTop: '0.5%',
        borderColor: Colors.LINE_SEPARATOR_BORDER,
    },

    sectionContainerBottomSeparator: {
        width: '100%',
        borderBottomWidth: 1,
        paddingBottom: '2%',
        marginTop: '0.5%',
        borderColor: Colors.LINE_SEPARATOR_BORDER,
    },

    headerText: {
        flex: 3,
        width: '100%',
        fontSize: Fonts.XS,
        // fontStyle: 'italic',
        // fontWeight: 'bold',
        color: Colors.DARK_TEXT

    },

    infoText: {
        flex: 7,
        width: '100%',
        fontSize: Fonts.XS,
        // fontStyle: 'italic',
        fontWeight: 'bold',
        color: Colors.TEXT,
        paddingLeft: 4,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default ActiveRequestContainer;