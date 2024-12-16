import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';

import LoginScreen from '../(auth)/login';
import HomeScreen from '../(tabs)/todo';
import RegisterScreen from '../(auth)/register';

// Create Stack Navigators
const AuthStack = createNativeStackNavigator();
const AppStack = createBottomTabNavigator();

// Auth Stack: Login and Registration Screens
const AuthNavigator = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Register" component={RegisterScreen} />
  </AuthStack.Navigator>
);

// App Stack: Main app tabs
const AppNavigator = () => (
  <AppStack.Navigator>
    <AppStack.Screen name="Home" component={HomeScreen} />
  </AppStack.Navigator>
);

export default function RootNavigation() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await AsyncStorage.getItem('isLoggedIn');
      setIsLoggedIn(loggedIn === 'true');
    };

    checkLoginStatus();
  }, []);

  if (isLoggedIn === null) {
    // Show loading spinner while determining login status
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
