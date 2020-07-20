import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {
    Favourite,
    FoodDetails,
    HelpBuyPls,
    Home,
    LeaveReview,
    LogInScreen,
    Profile,
    Recommendation,
    Search,
    SearchResults,
    SignUpScreen,
    StartScreen
} from './components';

import {Platform} from "react-native";

import {readHelps} from "./api/HelpApi";


export default function App() {

    const [help, setHelp] = useState([]);

    // const test = () => {
    //     readHelps(setHelp)
    //         .then(() => console.log(help))
    //         .catch(err => console.error(err));
    // }

    test();


    const forFade = ({current}) => ({
        cardStyle: {
            opacity: current.progress
        }
    });

    const stack = createStackNavigator();


    return (
        <SafeAreaProvider>

            <NavigationContainer>

                <stack.Navigator initialRouteName="Welcome"
                                 mode={Platform.OS === 'ios' ? "modal" : "card"}>

                    <stack.Screen name="Welcome"
                                  component={StartScreen}
                    />
                    <stack.Screen name="Sign In"
                                  component={LogInScreen}
                                  options={{cardStyleInterpolator: forFade}}
                    />
                    <stack.Screen name="Sign Up"
                                  component={SignUpScreen}
                                  options={{cardStyleInterpolator: forFade}}
                    />
                    <stack.Screen name="Search"
                                  component={Search}
                                  options={{cardStyleInterpolator: forFade}}
                    />
                    <stack.Screen name="SearchResults"
                                  component={SearchResults}
                                  options={{cardStyleInterpolator: forFade}}
                    />
                    <stack.Screen name="FoodDetails"
                                  component={FoodDetails}
                                  options={{cardStyleInterpolator: forFade}}
                    />
                    <stack.Screen name="LeaveReview"
                                  component={LeaveReview}
                                  options={{cardStyleInterpolator: forFade}}
                    />
                    <stack.Screen name="Recommendation"
                                  component={Recommendation}
                                  options={{cardStyleInterpolator: forFade}}
                    />
                    <stack.Screen name="Favourite"
                                  component={Favourite}
                                  options={{cardStyleInterpolator: forFade}}
                    />
                    <stack.Screen name="Profile"
                                  component={Profile}
                                  options={{cardStyleInterpolator: forFade}}
                    />
                    <stack.Screen name="Lemme Help"
                                  component={HelpBuyPls}
                                  options={{cardStyleInterpolator: forFade}}
                    />
                    <stack.Screen name="Orbit Around Food"
                                  component={Home}
                                  options={{headerLeft: null}}

                    />

                </stack.Navigator>

            </NavigationContainer>

        </SafeAreaProvider>
    );

}
