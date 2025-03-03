import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import Colors from '../constant/Color'
import Button from '../components/shared/Button'

export default function AddCourse() {
  const [loading, setLoading] = useState(false);
  return (
    <View style={{
      flex: 1,
      backgroundColor: Colors.WHITE,
      padding: 15,

    }}>
      <Text style={{
        fontSize: 32,
        fontWeight: "bold",
      }}>Create New Course</Text>
      <Text style={{
        fontSize: 22,
        fontWeight: "semibold",
      }}>What you want to learn today?</Text>
      <Text style={{
        fontSize: 22,
        marginTop: 10,
        color: Colors.GREY,
      }}>What course you want to create (ex. Learn Python, Data Analysis, English, etc...)</Text>

      <TextInput
        numberOfLines={3}
        multiline={true}
        placeholder='(ex. Learn Python, Rust, Linux)'
        style={{
          marginTop: 25,
          padding: 15,
          borderColor: Colors.BLACK,
          borderWidth: 1,
          borderRadius: 10,
          height: 80,
          marginBottom: 10,
          fontSize: 20
        }}></TextInput>

      <Button text="Generate Topics" type='outline' loading={loading} onPress={() => { }}></Button>
    </View>
  )
}
