import React from "react";
import {StyleSheet, Text, View, Dimensions} from "react-native";
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';

import {Colors, Fonts} from "../../constants";

const {width, height} = Dimensions.get('window');


function FoodInfoContainer(props) {
    const {item, navigation, isSaved, addFavHandler, removeFavHandler, onPress} = props;
    const buttonType = props?.buttonType ? props.buttonType : 'details'
    const onGoBack = props?.onGoBack ? props?.onGoBack : () => null;
    const hideButton = props?.hideButton ? props.hideButton : false;

    const MAX_LENGTH = 60;
    const trimmedString = str => str.length > MAX_LENGTH ? str.substring(0, MAX_LENGTH) + '...' : str;

    return (
        <View style={styles.searchResultContainer}>

            <View style={styles.searchResultInfoContainer}>

                <Text style={styles.searchResultKey}>
                    {trimmedString(item.name)}
                </Text>

                <Text style={styles.searchResultPrice}>
                    {item.price}
                </Text>

                <Text style={styles.searchResultInfo}>
                    {item.store.store_name} ({item.store.location})
                </Text>

                <Text style={styles.searchResultInfo}>
                    {item.store.open_hours} - {item.store.close_hours}
                </Text>
            </View>

            {/*<View style={{flex: 2}}>*/}
                {hideButton
                    ? <View/>
                    : (buttonType === 'favs')
                        ? <View style={styles.favButtonContainer}>
                            <Button type='clear'
                                    icon={
                                        <Icon name={isSaved ? 'heart' : 'heart-o'}
                                              size={30}
                                              color={Colors.BUTTON}
                                        />
                                    }

                                    onPress={() => {
                                        if (isSaved) {
                                            removeFavHandler();
                                        } else {
                                            addFavHandler();
                                        }
                                        onGoBack();
                                    }}
                            />
                        </View>

                        // details or lemmehelp request
                        : <View style={styles.detailsButtonContainer}>
                            <Button type='clear'
                                    icon={
                                        <Icon5
                                            name='chevron-right'
                                            size={30}
                                            color={Colors.BUTTON}
                                        />
                                    }
                                    onPress={() => {
                                        buttonType === 'details'
                                            ? // go to details
                                            navigation.navigate('Food Details',
                                                {
                                                    foodObj: item,
                                                    onGoBack: () => onGoBack()
                                                })
                                            : // go to lemmehelp request
                                            onPress()
                                    }
                                    }
                            />
                        </View>
                }
            {/*</View>*/}

        </View>
    );
}

const styles = StyleSheet.create({
    searchResultContainer: {
        flex: 1,
        // marginVertical: '1%',
        marginTop: height * 0.01,
        borderWidth: 1,
        borderColor: Colors.BORDER,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },

    searchResultInfoContainer: {
        flex: 10,
        marginVertical: height * 0.005,
        marginHorizontal: height * 0.01,
    },

    searchResultKey: {
        color: Colors.DARK_TEXT,
        fontSize: Fonts.S,
        fontWeight: "bold",
        paddingVertical: height * 0.005,
        // marginBottom: height * 0.01,
        marginRight: width * 0.03,
        textAlign: 'left',
    },

    searchResultPrice: {
        color: Colors.TEXT,
        fontSize: Fonts.XS,
        fontWeight: "bold",
        paddingVertical: height * 0.005,
    },

    searchResultInfo: {
        color: Colors.TEXT,
        fontSize: Fonts.XS,
        paddingBottom: height * 0.005,
    },

    detailsButtonContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },

    favButtonContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1,
    },
});

export default FoodInfoContainer;

