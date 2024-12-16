import React from 'react';
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: styles.tabBar, // Style for the tab bar
        tabBarActiveTintColor: styles.tabBarActive.tintColor, // Active tab text color
        tabBarInactiveTintColor: styles.tabBarInactive.tintColor, // Inactive tab text color
        tabBarLabelStyle: styles.tabBarLabel, // Label style for tabs
        headerStyle: styles.header, // Header background style
        headerTintColor: styles.headerTitle.color, // Header text color
        headerTitleStyle: styles.headerTitle, // Header text style
      }}
    >
      <Tabs.Screen
        name="todo"
        options={{
          tabBarLabel: 'To-Do',
          headerTitle: 'My To-Do App',
        }}
      />
      <Tabs.Screen
        name="logout"
        options={{
          tabBarLabel: 'Logout',
          headerTitle: 'Logout',
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#6200EE', // Tab bar background color
    borderTopWidth: 0, // Remove top border
    elevation: 0, // Remove shadow on Android
  },
  tabBarActive: {
    tintColor: '#FFFFFF', // Active tab text color
  },
  tabBarInactive: {
    tintColor: '#CCCCCC', // Inactive tab text color
  },
  tabBarLabel: {
    fontSize: 14,
    fontWeight: 'bold', // Bold font for better readability
  },
  header: {
    backgroundColor: '#6200EE', // Header background color
  },
  headerTitle: {
    color: '#FFFFFF', // Header text color
    fontWeight: 'bold',
    fontSize: 18,
  },
});
