import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import WeatherScreen from '../screens/WeatherScreen';
import ForecastScreen from '../screens/ForecastScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : '-outline'}`
          : 'md-home'
      }
    />
  ),
};

HomeStack.path = '';

const WeatherStack = createStackNavigator(
  {
    Weather: WeatherScreen,
  },
  config
);

WeatherStack.navigationOptions = {
  tabBarLabel: 'Weather',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-cloud' : 'md-cloud'} />
  ),
};

WeatherStack.path = '';

const ForecastStack = createStackNavigator(
  {
    Forecast: ForecastScreen,
  },
  config
);

ForecastStack.navigationOptions = {
  tabBarLabel: 'Forecast',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-clock' : 'md-clock'} />
  ),
};

ForecastStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  WeatherStack: WeatherStack,
  ForecastStack: ForecastStack,
});

tabNavigator.path = '';

export default tabNavigator;
