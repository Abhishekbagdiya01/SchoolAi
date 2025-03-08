import { View, Text, TextInput, Pressable } from 'react-native'
import React, { useContext, useState } from 'react'
import Colors from '../constant/Color'
import Button from '../components/shared/Button'
import { GenerateCourseAIModel, GenerateTopicsAIModel } from '../config/AiModel';
import Prompt from '../constant/Prompt';
import supabase from '../initSupabase';
import { UserDetailContext } from '../context/UserDetailContext';
import { useRouter } from 'expo-router';
export default function AddCourse() {
  const [loading, setLoading] = useState(false);
  const [courseLoading, setCourseLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [topicIdea, setTopicIdea] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const router = useRouter();
  const onGenerateTopic = async () => {
    try {
      setLoading(true);
      const prompt = userInput + Prompt.IDEA
      const aiResponse = await GenerateTopicsAIModel.sendMessage(prompt);
      const topicIdea = JSON.parse(aiResponse.response.text());
      setTopicIdea(topicIdea.course_titles);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  }

  const onTopicSelected = (topic: string) => {
    const isExist = selectedTopics.find((selectedTopic) => selectedTopic == topic);
    if (!isExist) {
      setSelectedTopics(prev => [...prev, topic]);
    } else {
      const topics = selectedTopics.filter(item => item != topic);
      setSelectedTopics(topics);
    }
  }

  const isTopicSelected = (topic: string) => {
    const selection = selectedTopics.find(item => item == topic)
    return selection ? true : false
  }
  // const onGenerateCourse = async () => {
  //   try {
  //     setCourseLoading(true);
  //     const prompt = selectedTopics + Prompt.COURSE;
  //     const aiResponse = await GenerateCourseAIModel.sendMessage(prompt);
  //     const courses = JSON.parse(aiResponse.response.text());
  //     console.log(courses);
  //
  //     courses.courses?.forEach(async (course) => {
  //       await supabase.from("course").insert({
  //         ...course,
  //         createdOn: new Date(),
  //         createdBy: userDetail?.email
  //       });
  //     });
  //
  //     setCourseLoading(false)
  //   } catch (error) {
  //     console.log(error);
  //     setCourseLoading(false)
  //   }
  // }

  const onGenerateCourse = async () => {
    try {
      setCourseLoading(true);
      const prompt = selectedTopics + Prompt.COURSE;
      const aiResponse = await GenerateCourseAIModel.sendMessage(prompt);
      const courses = JSON.parse(await aiResponse.response.text());
      console.log(courses);

      for (const course of courses) {
        // Insert course and get ID
        const { data: courseData, error: courseError } = await supabase
          .from("courses")
          .insert({
            course_title: course.courseTitle,
            description: course.description,
            banner_image: course.banner_image,
            category: course.category,
            created_on: new Date(),
            created_by: userDetail?.email || "unknown",
          })
          .select("id")
          .single();

        if (courseError) {
          console.error("Inserting course error:", courseError);
          throw courseError;
        }
        const courseId = courseData.id;

        // Insert chapters
        for (const chapter of course.chapters) {
          const { data: chapterData, error: chapterError } = await supabase
            .from("chapters")
            .insert({
              course_id: courseId,
              chapter_name: chapter.chapterName,
            })
            .select("id")
            .single();

          if (chapterError) throw chapterError;
          const chapterId = chapterData.id;

          // Insert chapter contents
          for (const content of chapter.content) {
            console.log(content);

            const { error } = await supabase.from("contents").insert({
              chapter_id: chapterId,
              topic: content.topic,
              explain: content.explain,
              code: content.code || null,
              example: content.example || null,
            });

            console.log("Error inserting content:", error);
          }
        }

        // Insert quizzes
        for (const quiz of course.quiz) {
          await supabase.from("quizzes").insert({
            course_id: courseId,
            question: quiz.question,
            options: quiz.options,
            correct_ans: quiz.correctAns,
          });
        }

        // Insert flashcards
        for (const flashcard of course.flashcards) {
          await supabase.from("flashcards").insert({
            course_id: courseId,
            front: flashcard.front,
            back: flashcard.back,
          });
        }

        // Insert Q&A
        for (const qa of course.qa) {
          await supabase.from("qa").insert({
            course_id: courseId,
            question: qa.question,
            answer: qa.answer,
          });
        }
      }
      setCourseLoading(false);
      router.replace("/(tabs)/HomeScreen");
    } catch (error) {
      console.log("Error inserting data:", error);
      setCourseLoading(false);
    }
  };
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
        }}
        onChangeText={
          (value) => {
            setUserInput(value)
          }
        }
      ></TextInput>

      <Button text="Generate Topics" type='outline' loading={loading} onPress={onGenerateTopic}></Button>

      <View>
        <Text style={{
          marginTop: 10,
          fontSize: 18,
          fontWeight: "bold"
        }}>Select all the topics which you want to learn - </Text>
      </View>

      <View style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        marginTop: 6,
        marginBottom: 15,
      }}>
        {
          topicIdea.map((topic, index) => (
            <Pressable key={index} style={{
            }}
              onPress={() => onTopicSelected(topic)}
            >
              <Text style={{
                fontSize: 18,
                padding: 7,
                borderRadius: 15,
                borderWidth: 0.4,
                marginTop: 5,
                backgroundColor: isTopicSelected(topic) ? Colors.PRIMARY : null,
                color: isTopicSelected(topic) ? Colors.WHITE : Colors.PRIMARY,
              }} >{topic}</Text>
            </Pressable>
          ))
        }
      </View>

      <Button text="Create Course" loading={courseLoading} onPress={() => onGenerateCourse()}></Button>
    </View>
  )
}
