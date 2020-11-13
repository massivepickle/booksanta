import * as React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import RequestScreen from '../screens/requestScreen';
import DonateScreen from '../screens/donateScreen';
import {AppStackNavigator} from './appStackNavigator';

export const AppTabNavigator = createBottomTabNavigator({
    RequestScreen: {screen: RequestScreen},
    DonateScreen: {screen: AppStackNavigator}
})