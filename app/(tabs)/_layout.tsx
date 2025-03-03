
import React from 'react'
import { Tabs } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={
        {
          headerShown: false
        }
      }
    >
      <Tabs.Screen
        name="HomeScreen"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen name="ExploreScreen" options={{
        tabBarLabel: "Explore",
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="search1" size={size} color={color} />)
      }} />
      <Tabs.Screen name="ProgressScreen" options={{
        tabBarLabel: "Explore",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="analytics-outline" size={size} color={color} />
        )
      }} />
      <Tabs.Screen name="ProfileScreen" options={{
        tabBarLabel: "Explore",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person-circle-outline" size={size} color={color} />)
      }} />
    </Tabs>
  );
}

