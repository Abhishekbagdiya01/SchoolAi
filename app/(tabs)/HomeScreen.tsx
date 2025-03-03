import { View, Text } from 'react-native'
import React from 'react'
import Header from '../components/header'
import Colors from '../constant/Color'
import NoCourse from '../components/NoCourse'

export default function HomeScreen() {
  return (
    <View style={{
      padding: 10,
      backgroundColor: Colors.WHITE,
      flex: 1,
    }}>
      <Header></Header>
      <NoCourse></NoCourse>
    </View>
  )
}
