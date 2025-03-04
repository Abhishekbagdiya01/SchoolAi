import { View, Text, Image } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native'
import { PraticeOption } from '../constant/Option'
import Colors from '../constant/Color'

export default function PracticeSection() {
  return (
    <View style={{
      marginTop: 10,
    }}>
      <Text style={{
        fontSize: 25,
        fontWeight: "bold",
      }}>Practice</Text>
      <View>
        <FlatList
          numColumns={3}
          showsHorizontalScrollIndicator={false}
          data={PraticeOption} renderItem={({ index, item }) => (
            <View key={index}
              style={{
                flex: 1,
                margin: 5,
                aspectRatio: 1,
              }}
            >
              <Image style={{
                width: "100%",
                height: "100%",
                borderRadius: 15,
              }} source={item.image}></Image>
              <Text style={{
                position: "absolute",
                fontSize: 18,
                fontWeight: "bold",
                padding: 15,
                color: Colors.WHITE,
              }} >{item.name}</Text>
            </View>
          )}></FlatList>
      </View >

    </View >
  )
}
