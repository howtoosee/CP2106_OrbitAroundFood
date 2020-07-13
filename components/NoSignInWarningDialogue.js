import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Dialog, {DialogTitle, DialogContent, DialogFooter, DialogButton} from 'react-native-popup-dialog';

import Fonts from '../constants/Fonts';
import Colors from '../constants/Colors';

function NoSignInWarningDialogue(props) {
    const {visible, setVisible, navigation} = props;

    const signInHandler = () => {
        setVisible(false);
        navigation.navigate('Sign In');
    }

    return (
        <View>
            <Dialog
                visible={visible}
                width={0.75}
                rounded={true}
                animationDuration={100}
                onHardwareBackPress={() => setVisible(false)}

                dialogTitle={
                    <DialogTitle
                        title="Not signed in"
                        textStyle={styles.dialogTitle}
                        hasTitleBar={false}
                        align="center"
                    />
                }

                footer={
                    <DialogFooter>
                        <DialogButton text="Dismiss"
                                      textStyle={styles.okayButtonText}
                                      onPress={() => setVisible(false)}
                        />
                        <DialogButton text="Sign In"
                                      textStyle={styles.okayButtonText}
                                      onPress={signInHandler}
                        />

                    </DialogFooter>
                }
            >
                <DialogContent style={styles.dialogTextContainer}>
                    <Text styles={styles.dialogText}>Please sign in to review!</Text>
                </DialogContent>

            </Dialog>
        </View>
    );
}

const styles = StyleSheet.create({
    okayButtonText: {
        color: Colors.BUTTON,
    },

    dialogTitle: {
        fontSize: Fonts.M,
    },

    dialogTextContainer: {
        paddingVertical: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },

    dialogText: {
        textAlign: 'center',
        fontSize: Fonts.S,
    }
})

export default NoSignInWarningDialogue;

