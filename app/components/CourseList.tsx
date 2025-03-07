import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { imageAssets } from '../constant/Option'
import Colors from '../constant/Color'
import supabase from '../initSupabase';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';

export default function CourseList({ courseList }) {
  const [chaptersAndContents, setChaptersAndContents] = useState([]);
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const enrichedCourse = await Promise.all(
          // Fetch chapters by CourseId
          courseList.map(async (course) => {
            const { data: chapters, error: chapterError } = await supabase.from("chapters").select("*").eq("course_id", course.id);

            if (chapterError) {
              console.error("Error fetching chapters for course:", chapterError);
              return { ...course, chapters: [] }
            }

            // Fetch contents for each chapter

            const chaptersWithContents = await Promise.all(
              chapters.map(async (chapter) => {
                const { data: contents, error: contentError } = await supabase.from("contents").select("*").eq("chapter_id", chapter.id);

                if (contentError) {
                  console.error("Error fetching contents for chapters:", contentError);
                  return { ...chapter, contents: [] }
                }

                return { ...chapter, contents }
              })
            );
            return { ...course, chapters: chaptersWithContents }
          })
        );
        setChaptersAndContents(enrichedCourse);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };
    if (courseList.length > 0) {
      fetchCourseDetails()
    }
  }, [courseList])
  const router = useRouter();
  return (
    <View style={{
      marginTop: 10
    }} >
      <Text style={{
        fontSize: 25,
        fontWeight: "bold",
      }} >Courses</Text>

      <FlatList horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={courseList} renderItem={({ index, item }) => (
          <TouchableOpacity key={index}
            onPress={() => router.push({
              pathname: "../course_view/",
              params: { courseParams: JSON.stringify(chaptersAndContents[index]) }
            })}
            style={{
              padding: 10,
              backgroundColor: Colors.LIGHTGREY,
              borderRadius: 15,
              width: 260,
              marginRight: 10
            }}>
            <Image
              source={imageAssets[item.banner_image]}
              style={{
                width: "100%",
                height: 150,
                borderRadius: 10,
                marginTop: 10,
              }} ></Image>
            <Text style={{
              fontSize: 18,
              fontWeight: "bold",
              marginTop: 10,
            }} >{item.course_title}</Text>
            <Text>{item.category}</Text>
            <View style={{
              display: "flex",
              flexDirection: "row",
              gap: 4,
              paddingTop: 5,
            }}>
              <Feather name="book-open" size={20} color="black" />
              <Text>{chaptersAndContents.length}  Chapters</Text>
            </View>
          </TouchableOpacity>
        )
        } ></FlatList>

    </View>
  )
}
