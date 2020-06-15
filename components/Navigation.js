import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Search from './search';
import Recommendation from './Recommendation';
import HelpBuyPls from './HelpBuyPls';
import Favourite from './Favourite';
import Profile from './Profile';
import Colors from '../constants/Colors';

const Tab = createBottomTabNavigator();

function Navigation() {

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({color}) => {
          let iconName;

          if (route.name === 'Recommendation') {
            iconName = 'ios-help-circle';
          } if (route.name === 'Search') {
            iconName = 'ios-search';
          } if (route.name === 'LemmeHelp') {
            iconName = 'ios-hand';
          } if (route.name === 'Favourite') {
            iconName = 'ios-heart';
          } if (route.name === 'Profile') {
            iconName = 'ios-person';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={30} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: Colors.DARKER_BUTTON,
        inactiveTintColor: Colors.BUTTON,
      }}
    >
      <Tab.Screen name="Recommendation" component={Recommendation} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="LemmeHelp" component={HelpBuyPls} />
      <Tab.Screen name="Favourite" component={Favourite} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}



export default Navigation;