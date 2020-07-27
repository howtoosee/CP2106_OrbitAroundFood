import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';

import {
    AcceptRequest,
    CreateRequest,
    CreateReview,
    Favourite,
    FoodDetails,
    LemmeHelpScreen,
    Profile,
    Recommendation,
    RequestDetail,
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

                <stack.Navigator initialRouteName="OrbitAroundFood"
                                 mode={'card'}
                                 transitionConfig={getSlideFromRightTransition}
                >

                    <stack.Screen name="OrbitAroundFood"
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

                    <stack.Screen name="Create Review"
                                  component={CreateReview}
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

                    <stack.Screen name="Create Request"
                                  component={CreateRequest}
                    />

                    <stack.Screen name="Request Search"
                                  component={RequestSearch}
                    />

                    <stack.Screen name="Accept Request"
                                  component={AcceptRequest}
                    />

                    <stack.Screen name="Request History"
                                  component={RequestHistory}
                    />

                    <stack.Screen name='Request Detail'
                                  component={RequestDetail}
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
