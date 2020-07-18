import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';

import {
    Favourite,
    FoodDetails,
    HelpBuyPls,
    StartScreenLoggedIn,
    LeaveReview,
    Profile,
    Recommendation,
    Search,
    SearchResults,
    SignInScreen,
    SignUpScreen,
    StartScreen
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

                    <stack.Screen name="Home"
                                  component={StartScreenLoggedIn}
                                  options={{headerLeft: null}}
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
                                  // options={{cardStyleInterpolator: forFade}}
                    />

                    <stack.Screen name="Profile"
                                  component={Profile}
                                  // options={{cardStyleInterpolator: forFade}}
                    />

                </stack.Navigator>

            </NavigationContainer>

        </SafeAreaProvider>
    );

}
