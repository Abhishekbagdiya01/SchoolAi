import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import { imageAssets } from '../constant/Option'
import Colors from '../constant/Color'
import * as Progress from "react-native-progress"

export default function CourseProgress({ courseList }) {
  return (
    <View style={{
      marginTop: 10,
    }}>
      <Text style={{
        fontSize: 25, fontWeight: "bold",
      }}>Progress</Text>
      <FlatList data={courseList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ index, item }) => (
          <View style={{
            margin: 7,
            padding: 15,
            backgroundColor: Colors.LIGHTGREY,
            borderRadius: 15,
          }}>
            <View key={index} style={{
              display: "flex",
              flexDirection: "row",
              gap: 8,
            }}>
              <Image style={{
                height: 80,
                width: 80,
                borderRadius: 8,
              }} source={imageAssets[item.banner_image]} />
              <View style={{
                flex: 1,
                maxWidth: 200
              }}>
                <Text
                  numberOfLines={2}
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    flexWrap: "wrap",
                  }}>{item?.course_title}</Text>
              </View>
            </View>
            <View style={{
              marginTop: 10,
            }}>
              <Progress.Bar progress={0.3} width={250}></Progress.Bar>
              <Text style={{
                marginTop: 8,
                fontWeight: "semibold"
              }}>3 out of 5 Chapter Completed</Text>
            </View>
          </View>
        )}
      ></FlatList>
    </View>
  )
}
