import * as React from 'react';
import {View} from 'react-native';
import DonateScreen from '../screens/donateScreen';
import ReceiverDetailsScreen from '../screens/receiverDetailsScreen';
import {createStackNavigator} from 'react-navigation-stack';

export const AppStackNavigator = createStackNavigator({
    DonateScreen: {screen: DonateScreen},
    ReceiverDetailsScreen: {screen: ReceiverDetailsScreen}
},
{
    initialRouteName: 'DonateScreen'
})