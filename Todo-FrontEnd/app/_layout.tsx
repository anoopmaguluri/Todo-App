import React, { useEffect, useState } from 'react';
import { Slot, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';

export default function RootLayout() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const loggedIn = await AsyncStorage.getItem('isLoggedIn');
      setIsLoggedIn(loggedIn === 'true');
      setLoading(false);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (!loading) {
      if (isLoggedIn) {
        router.replace('/(tabs)/todo'); // Redirect to To-Do screen
      } else {
        router.replace('/(auth)/login'); // Redirect to Login screen
      }
    }
  }, [loading, isLoggedIn]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Slot />;
}
