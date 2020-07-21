import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';

import {
    Favourite,
    FoodDetails,
    HelpBuyPls,
    RequestDirectory,
    RequestResult,
    MyRequestInput,
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


export default function App() {

    const stack = createStackNavigator();

    return (
        <SafeAreaProvider>

            <NavigationContainer>

                <stack.Navigator initialRouteName="Welcome"
                                 mode={'card'}
                                 transitionConfig={getSlideFromRightTransition}
                >

                    <stack.Screen name="Welcome"
                                  component={StartScreen}
                    />

                    <stack.Screen name="Sign In"
                                  component={SignInScreen}
                    />

                    <stack.Screen name="Sign Up"
                                  component={SignUpScreen}
                    />

                    <stack.Screen name="Search"
                                  component={Search}
                    />

                    <stack.Screen name="Search Results"
                                  component={SearchResults}
                    />

                    <stack.Screen name="Food Details"
                                  component={FoodDetails}
                    />

                    <stack.Screen name="Leave Review"
                                  component={LeaveReview}
                    />

                    <stack.Screen name="Recommendation"
                                  component={Recommendation}
                    />

                    <stack.Screen name="Favourite"
                                  component={Favourite}
                    />

                    <stack.Screen name="Lemme Help"
                                  component={HelpBuyPls}
                    />

                    <stack.Screen name="My Request"
                                  component={MyRequestInput}
                    />

                    <stack.Screen name="Request Help"
                                  component={RequestDirectory}
                    />

                    <stack.Screen name="DateTimePicker"
                                  component={DateAndTimePicker}
                    />

                    <stack.Screen name="Accept Request"
                                  component={AcceptRequestInput}
                    />

                    <stack.Screen name="Confirmed Request List"
                                  component={MyConfirmedRequestList}
                    />

                    <stack.Screen name="Food Choices"
                                  component={RequestResult}
                    />

                    <stack.Screen name="Profile"
                                  component={Profile}
                    />

                </stack.Navigator>

            </NavigationContainer>

        </SafeAreaProvider>
    );

}
