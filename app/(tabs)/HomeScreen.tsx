import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/header'
import Colors from '../constant/Color'
import NoCourse from '../components/NoCourse'
import supabase from '../initSupabase'
import { UserDetailContext } from '../context/UserDetailContext'
import CourseList from '../components/CourseList'
import PracticeSection from '../components/PracticeSection'
import CourseProgress from '../components/CourseProgress'

export default function HomeScreen() {
  const [courseList, setCourseList] = useState([]);
  const { userDetail } = useContext(UserDetailContext);
  const getCourses = async () => {
    try {
      if (!userDetail?.email) {
        throw new Error("User email not found");
      }

      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("created_by", userDetail.email);
      if (error) {
        throw error;
      }
      setCourseList(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
      return [];
    }
  };
  useEffect(() => { getCourses() }, [courseList])
  return (
    <View style={{
      padding: 10,
      backgroundColor: Colors.WHITE,
      flex: 1,
    }}>
      <Header></Header>
      {
        courseList.length == 0 ? <NoCourse /> :
          <View>
            <CourseProgress courseList={courseList}></CourseProgress>
            <PracticeSection></PracticeSection>
            <CourseList courseList={courseList} />
          </View>

      }
    </View>

  )
}
