import { View, Text, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Progress from 'react-native-progress';
import Button from '../components/shared/Button';
import Colors from '../constant/Color';
export default function ChapterView() {
  const route = useRouter();
  const { contentParams } = useLocalSearchParams()
  const content = JSON.parse(contentParams);
  console.log(content);

  const [currentPage, setCurrentPage] = useState(0);
  const getProgress = (currentPage) => {
    const progress = (currentPage / content.length);
    return progress
  }
  return (
    <View style={{
      padding: 25,
      flex: 1,
      backgroundColor: Colors.WHITE,
    }}>
      <Progress.Bar width={Dimensions.get('window').width * 0.8} progress={getProgress(currentPage)} />
      <Text style={{
        marginTop: 10,
        fontSize: 25,
        fontWeight: "bold"
      }}>{content[currentPage]?.topic}</Text>
      <Text style={{
        fontSize: 20
      }}>{content[currentPage]?.explain}</Text>
      <Text style={{
        fontSize: 20,
        marginTop: 10
      }}>Example :</Text>
      <View style={{

        padding: 10,
        backgroundColor: Colors.LIGHTGREY,
        borderRadius: 15,
      }}>
        <Text style={{
          fontSize: 18,
        }}>{content[currentPage]?.example}</Text>
        {content[currentPage]?.code ? <Text style={{
          fontSize: 18,
          backgroundColor: Colors.BLACK,
          color: Colors.WHITE,
          padding: 10,
          marginTop: 5,
          borderRadius: 15,
        }}>{content[currentPage]?.code}</Text> : null
        } </View>
      <View style={{
        position: "absolute",
        bottom: 30,
        width: "100%",
        left: 25,
      }}>
        {content.length - 1 != currentPage ?
          <Button text={"Next"} onPress={() => setCurrentPage(currentPage + 1)} loading={undefined} ></Button>
          :
          <Button text={"Finish"} onPress={() => route.back()} loading={undefined} ></Button>}
      </View>
    </View>
  )
}
