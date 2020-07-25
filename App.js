import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';
import firebase from 'firebase';

import {
    AcceptHelpRequest,
    CreateHelpRequest,
    Favourite,
    FoodDetails,
    LeaveReview,
    LemmeHelpScreen,
    Profile,
    Recommendation,
    RequestDetails,
    RequestHistory,
    RequestSearch,
    RequestSearchResult,
    Search,
    SearchResults,
    SignInScreen,
    SignUpScreen,
    StartScreen
} from './components';


export default function App() {

    // disable warnings during debugging:
    console.disableYellowBox = true;
    
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
                                  component={LemmeHelpScreen}
                    />

                    <stack.Screen name="New Request"
                                  component={CreateHelpRequest}
                    />

                    <stack.Screen name="Request Search"
                                  component={RequestSearch}
                    />

                    <stack.Screen name="Accept Request"
                                  component={AcceptHelpRequest}
                    />

                    <stack.Screen name="Request History"
                                  component={RequestHistory}
                    />

                    <stack.Screen name='Request Details'
                                  component={RequestDetails}
                    />

                    <stack.Screen name="Request Search Results"
                                  component={RequestSearchResult}
                    />

                    <stack.Screen name="Profile"
                                  component={Profile}
                    />

                </stack.Navigator>

            </NavigationContainer>

        </SafeAreaProvider>
    );

}
