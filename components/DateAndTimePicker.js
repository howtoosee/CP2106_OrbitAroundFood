import React, { useState } from 'react';
import { View, Button, Platform, Text, StyleSheet, TouchableOpacity } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors, Fonts } from '../constants';
import moment from 'moment';

function DateAndTimePicker() {

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    // const showDatepicker = () => {
    //     showMode('date');
    // };

    const showTimepicker = () => {
        showMode('time');
    };

    return (
        <View style={styles.dateTimeScreen}>
            <View style={styles.dateTimeContainer}>
                {/* <TouchableOpacity style={styles.dateTimeButton} onPress={showDatepicker} >
                    <Text style={styles.dateTimeText}>Pick Date</Text>
                </TouchableOpacity> */}
                <TouchableOpacity style={styles.dateTimeButton} onPress={showTimepicker}>
                    <Text style={styles.dateTimeText}>Pick Expected Estimated Time of Arrival</Text>
                </TouchableOpacity>
            </View>

            {
                show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        format="YYYY-MM-DD HH:mm"
                        onChange={onChange}
                    />)
            }
            <View style={{ padding: 10 }}>
                <Text>Date: {moment(date).format('Do MMM')} {'\n'}Time: {moment(date).format('HH:mm')}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    dateTimeScreen: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 10
    },

    dateTimeContainer: {
        paddingVertical:5,
        alignItems: 'center',
    },

    dateTimeButton: {
        alignItems: "center",
        backgroundColor: Colors.BUTTON,
        borderColor:'black',
        borderWidth: 3,
        borderRadius: 30,
        width: '88%',
        color: Colors.TEXT,
        padding: 8
    },
    
    dateTimeText: {
        color: 'black',
        fontSize: Fonts.S
    }

});

export default DateAndTimePicker;

// export default class DateAndTimePicker extends Component {
//     constructor() {
//         super()
//         this.state = {
//             isVisible: false,
//             chosenDate: ''
//         }
//     }

//     handlePicker = () => {
//         this.setState({
//             isVisible: false
//         })
//     }

//     showPicker = () => {
//         this.setState({
//             isVisible: true
//         })
//     }

//     hidePicker = () => {
//         this.setState({
//             isVisible: false,
//             chosenDate: moment(datetime).format('MMM Do YYYY HH:mm')
//         })
//     }

//     render() {
//         return (
//             <View style={styles.container}>
//                 <Text style={{color: Colors.TEXT, fontSize: Fonts.S}}>
//                     {this.state.chosenDate}
//                 </Text>
//                 <TouchableOpacity style={styles.button} onPress={this.showPicker}>
//                     <Text style={styles.text}>Show Date Picker</Text>
//                 </TouchableOpacity>
//                 <DateTimePicker
//                     isVisible={this.state.isVisible}
//                     onConfirm={this.handlePicker}
//                     onCancel={this.hidePicker}
//                     mode={'time'}
//                     datePickerModeAndroi
//                 />
//             </View>
//         );
//     }


// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     button: {
//         width: 250,
//         height: 50,
//         backgroundColor: Colors.BUTTON,
//         borderRadius: 30,
//         justifyContent: 'center',
//         marginTop: 15
//     },
//     text: {
//         fontSize: 18,
//         textAlign: 'center'
//     }
// });