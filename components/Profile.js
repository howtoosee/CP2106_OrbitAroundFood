import React from 'react';
import { Text, View, Image, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import Fonts from '../constants/Fonts';
import Colors from '../constants/Colors';



function Profile({navigation}) {
    return (
        <SafeAreaView>
            <View style={styles.screen}>
                <View style={styles.profile}>
                    <Image
                        style={styles.image}
                        source={require('../assets/potato.jpg')} />
                    <Text style={styles.name}>Mr Couch Potato</Text>
                </View>

                <View style={styles.content}>
                    <View style={styles.reviewContainer}>
                        <Text style={styles.review}>Review</Text>
                        <Text style={styles.review}> (20) </Text>
                    </View>
                    <View style={styles.rating}>
                        <Ionicons name={'ios-star'} size={28} />
                        <Ionicons name={'ios-star'} size={28} />
                        <Ionicons name={'ios-star'} size={28} />
                        <Ionicons name={'ios-star'} size={28} />
                        <Ionicons name={'ios-star-half'} size={28} />
                        <Text style={styles.stars}>  4.5</Text>
                    </View>

                </View>
                <View style={styles.button}>
                    <Button title="Log Out" color={Colors.DARKER_BUTTON} onPress={() => navigation.navigate('StartScreen')} />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 50,
        flexDirection: 'column'
    },
    profile: {
        alignItems: 'center',
    },
    image: {
        width: 300,
        height: 200
    },
    name: {
        fontSize: Fonts.L,
        fontWeight: '600',
    },
    button: {
        paddingTop: 50,
    },
    content: {
        paddingTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    reviewContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    review: {
        fontSize: Fonts.SPECIAL,
        fontWeight: '700',
        padding: 20
    },
    rating: {
        flexDirection: 'row',
    },
    stars: {
        fontSize: Fonts.SPECIAL
    }
});

export default Profile;