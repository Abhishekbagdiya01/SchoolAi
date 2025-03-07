import { View, Text } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';

export default function ChapterView() {
  const route = useRoute();
  const { contentParams } = useLocalSearchParams()
  const content = JSON.parse(contentParams);

  return (
    <View>
      <Text>{content[0].topic}</Text>
    </View>
  )
}
