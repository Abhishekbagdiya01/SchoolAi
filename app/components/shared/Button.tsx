import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import Colors from '@/app/constant/Color'

export default function Button({
  text, onPress, type = "fill", loading }) {
  return (
    <TouchableOpacity
      style={{
        width: "100%",
        backgroundColor: type == "fill" ? Colors.PRIMARY : Colors.WHITE,
        borderRadius: 15,
        borderColor: type == "outline" ? Colors.PRIMARY : Colors.WHITE,
        borderWidth: type == "outline" ? 1 : 0,
        marginTop: 10,
        padding: 15,
        alignItems: "center",
      }}
      onPress={onPress}
    >
      {
        !loading ?
          <Text style={{
            fontSize: 22,
            color: type == "fill" ? Colors.WHITE : Colors.PRIMARY
          }}>{text}</Text>
          : <ActivityIndicator color={type == "fill" ? Colors.WHITE : Colors.PRIMARY}></ActivityIndicator>
      }
    </TouchableOpacity>
  )
}
