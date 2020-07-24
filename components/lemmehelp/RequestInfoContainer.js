import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, Fonts} from '../../constants';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';


function RequestInfoContainer(props) {
    const {navigation} = props;

    const [item, setItem] = useState(props?.item);
    const [status, setStatus] = useState(props?.status);
    const showButton = ('showButton' in props) ? props.showButton : true;

    console.log('Item:', item);

    const ItemField = ({title, info}) => {
        return (
            <View style={{flexDirection: 'row', marginTop: 4, marginHorizontal: 2, alignItems: 'center'}}>
                <Text style={styles.headerText}>{title}:</Text>
                <Text style={styles.infoText}>{info}</Text>
            </View>
        );
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

    const getStatusHeaderString = (statusString) => {
        if (statusString === 'req') {
            return 'I requested ( ' + (item.isOpen ? 'OPEN' : 'CLOSED') + ' ) :';
        } else if (statusString === 'help') {
            return 'I helped:'
        } else if (statusString === 'helping') {
            return 'Accepting request:';
        } else {
            console.log('Invalid statusID string:', statusString);
        }
    }

    return (
        <View style={styles.boxContainer}>

            <View style={{flexDirection: 'row'}}>

                <View style={styles.infoContainer}>

                    <Text style={styles.titleText}>{getStatusHeaderString(status)}</Text>

                    <View style={styles.sectionContainerBottomSeparator}>
                        <ItemField title='Food'
                                   info={item.foodObj.name}
                        />
                        <ItemField title='Store'
                                   info={item.foodObj.store.store_name}
                        />
                        <ItemField title='Location'
                                   info={item.foodObj.store.location}
                        />
                        <ItemField title='Price'
                                   info={item.foodObj.price}
                        />
                        <ItemField title='Time of Req'
                                   info={timeString}
                        />
                        <ItemField title='ETA'
                                   info={item.dateInfo.timeETA}
                        />
                        <ItemField title='Meet at'
                                   info={item.askerInfo.dropOffLocation}
                        />
                    </View>

                    <View style={item.helperInfo
                        ? styles.sectionContainerBottomSeparator
                        : styles.sectionContainer}>

                        <ItemField title='Asker'
                                   info={item.askerInfo.askerId}
                        />
                        <ItemField title='Contact'
                                   info={item.askerInfo.askerContact}
                        />
                        <ItemField title='Remarks'
                                   info={item.askerInfo.askerRemark}
                        />
                    </View>

                    {item.helperInfo &&
                    <View>
                        <ItemField title='Helper'
                                   info={item.helperInfo.helperId}
                        />
                        <ItemField title='Contact'
                                   info={item.helperInfo.helperContact}
                        />
                        <ItemField title='Remarks'
                                   info={item.helperInfo.helperRemark}
                        />
                    </View>
                    }

                </View>

                {showButton && <View style={styles.buttonContainer}>
                    <Button type='clear'
                        // title='HELP'
                            icon={
                                <Icon name='chevron-right'
                                      size={30}
                                      color={Colors.BUTTON}
                                />
                            }
                            onPress={() => navigation.navigate('Request Details', {
                                item: item,
                                status: status
                            })}
                    />

                </View>}

            </View>

        </View>
    );

}


const styles = StyleSheet.create({
    boxContainer: {
        // width: '98%',
        marginTop: '3%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        paddingHorizontal: '3%',
        paddingVertical: '2%',
        borderWidth: 1,
        borderRadius: 4,
    },

    infoContainer: {
        flex: 9
    },

    buttonContainer: {
        flex: 1,
        marginVertical: '1%',
        marginHorizontal: '1%',
        alignItems: 'flex-end',
        justifyContent: 'center',
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

    titleText: {
        fontSize: Fonts.S,
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: Colors.DARK_TEXT,
        paddingBottom: '1%',
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
        paddingLeft: '1%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default RequestInfoContainer;