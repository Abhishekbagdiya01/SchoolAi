import { View, Text, Image } from 'react-native'
import React from 'react'
import Button from './shared/Button'
import { useRouter } from 'expo-router';

export default function NoCourse() {
  const router = useRouter();
  return (
    <View style={{
      flex: 1,
      display: "flex",
      alignItems: "center",
      marginTop: 15,
      padding: 10,
    }}>
      <Image style={{
        height: 200,
        width: 200,
      }} source={require('../../assets/images/book-icon.png')}></Image>
      <Text style={{
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 10,
      }}>You Don't Have Any Course</Text>
      <Button text="+ Add Course" onPress={() => {
        router.push("/add_course")
      }}></Button>
      <Button text="Explore Existing Courses" type='outline' onPress={() => {

      }}></Button>
    </View>
  )
}
