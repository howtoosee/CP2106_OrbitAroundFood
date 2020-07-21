import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {
    Favourite,
    FoodDetails,
    HelpBuyPls,
    RequestDirectory,
    RequestResult,
    MyRequestInput,
    Home,
    LeaveReview,
    SignInScreen,
    Profile,
    Recommendation,
    Search,
    SearchResults,
    SignUpScreen,
    StartScreen,
    DateAndTimePicker,
    AcceptRequestInput,
    MyConfirmedRequestList
} from './components';

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Setting a timer']);


export default function App() {


    const forFade = ({ current }) => ({
        cardStyle: {
            opacity: current.progress
        }
    });

    const stack = createStackNavigator();


    return (
        <SafeAreaProvider>

            <NavigationContainer>

                <stack.Navigator initialRouteName="Welcome" mode='card'
                //  mode={Platform.OS === 'ios' ? "modal" : "card"}
                >
                    <stack.Screen name="Welcome"
                        component={StartScreen}
                    />
                    <stack.Screen name="Sign In"
                        component={SignInScreen}
                        options={{ cardStyleInterpolator: forFade }}
                    />
                    <stack.Screen name="Sign Up"
                        component={SignUpScreen}
                        options={{ cardStyleInterpolator: forFade }}
                    />
                    <stack.Screen name="Search"
                        component={Search}
                        options={{ cardStyleInterpolator: forFade }}
                    />
                    <stack.Screen name="SearchResults"
                        component={SearchResults}
                        options={{ cardStyleInterpolator: forFade }}
                    />
                    <stack.Screen name="FoodDetails"
                        component={FoodDetails}
                        options={{ cardStyleInterpolator: forFade }}
                    />
                    <stack.Screen name="LeaveReview"
                        component={LeaveReview}
                        options={{ cardStyleInterpolator: forFade }}
                    />
                    <stack.Screen name="Recommendation"
                        component={Recommendation}
                        options={{ cardStyleInterpolator: forFade }}
                    />
                    <stack.Screen name="Favourite"
                        component={Favourite}
                        options={{ cardStyleInterpolator: forFade }}
                    />
                    <stack.Screen name="Profile"
                        component={Profile}
                        options={{ cardStyleInterpolator: forFade }}
                    />
                    <stack.Screen name="Help Buy Pls"
                        component={HelpBuyPls}
                        options={{ cardStyleInterpolator: forFade }}
                    />
                    <stack.Screen name="Request Help"
                        component={RequestDirectory}
                        options={{ cardStyleInterpolator: forFade }}
                    />
                    <stack.Screen name="My Request"
                        component={MyRequestInput}
                        options={{ cardStyleInterpolator: forFade }}
                    />
                    <stack.Screen name="DateTimePicker"
                        component={DateAndTimePicker}
                        options={{ cardStyleInterpolator: forFade }}
                    />
                    <stack.Screen name="Accept Request"
                        component={AcceptRequestInput}
                        options={{ cardStyleInterpolator: forFade }}
                    />
                    <stack.Screen name="Confirmed Request List"
                        component={MyConfirmedRequestList}
                        options={{ cardStyleInterpolator: forFade }}
                    />
                    <stack.Screen name="Food Choices"
                        component={RequestResult}
                        options={{ cardStyleInterpolator: forFade }}
                    />
                    <stack.Screen name="Orbit Around Food"
                        component={Home}
                        options={{ headerLeft: null }}

                    />

                </stack.Navigator>

            </NavigationContainer>

        </SafeAreaProvider>
    );

}
