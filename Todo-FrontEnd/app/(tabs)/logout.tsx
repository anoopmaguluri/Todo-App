import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function LogoutScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('isLoggedIn'); // Clear login state
    router.replace('/(auth)/login'); // Navigate back to login
  };

  return (
    <View style={styles.container}>
      <Button title="Logout" onPress={handleLogout} color="#6200EE" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
});
