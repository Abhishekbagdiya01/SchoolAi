import { View, Text, Pressable, Image, FlatList } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import Colors from '../constant/Color';
import { imageAssets } from '../constant/Option';
import Button from '../components/shared/Button';
export default function CourseView() {
  const { courseParams } = useLocalSearchParams()
  const router = useRouter();
  const course = JSON.parse(courseParams)
  console.log(course);
  return (
    <FlatList style={{
      backgroundColor: Colors.WHITE,
      flex: 1,
    }} data={[]} ListHeaderComponent={
      <View>
        <View>
          <Image style={{
            width: "100%",
            height: 200
          }} source={imageAssets[course?.banner_image]}></Image>
          <Pressable style={{
            position: "absolute",
          }} onPress={
            () => router.back()
          }>
            <Ionicons name="chevron-back-outline" size={34} color="black" /> </Pressable>
        </View>
        <View style={{
          paddingLeft: 20,
          paddingRight: 20
        }}>
          <Text style={{
            fontSize: 22,
            fontWeight: "bold",
            marginTop: 10,
          }}>{course.course_title}</Text>
          <View style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
          }}>
            <Feather name="book-open" size={22} color={Colors.PRIMARY} />
            <Text style={{
              color: Colors.PRIMARY,
              fontSize: 18,
            }}>{course.chapters.length} Chapters</Text>
          </View>

          <Text style={{
            fontWeight: "bold",
            fontSize: 20,
          }}>Description :</Text>
          <Text style={{
            marginBottom: 10,
          }} numberOfLines={3} >{course.description}</Text>
          <Button text={"Start Now"} onPress={undefined} loading={undefined}></Button>
        </View>
        <View style={{
          paddingLeft: 20,
          paddingRight: 20,
        }}>
          <Text style={{
            fontSize: 22,
            fontWeight: "bold",
            marginTop: 10,
          }}>Chapters</Text>

          <FlatList
            data={course.chapters} renderItem={({ index, item }) => (
              <View key={index} style={{
                borderRadius: 10,
                borderWidth: 1,
                borderBlockColor: Colors.PRIMARY,
                padding: 8,
                marginTop: 10,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
                <Pressable onPress={() => {
                  router.push({
                    pathname: "../chapter_view/",
                    params: {
                      contentParams: JSON.stringify(item.contents)
                    }
                  })
                }}>
                  <Text style={{
                    fontWeight: "semibold",
                    fontSize: 18,
                  }}>{index + 1}. {item.chapter_name}</Text>
                </Pressable>
                <Ionicons name="play" size={24} color={Colors.PRIMARY} />
              </View>

            )}></FlatList>
        </View>
      </View >

    }></FlatList>
  )
}
