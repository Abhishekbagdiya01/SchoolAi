import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

export default function CourseView() {
  const { courseParams } = useLocalSearchParams()
  console.log(courseParams);

  return (
    <View>
      <Text>CourseView</Text>
    </View>
  )
}
