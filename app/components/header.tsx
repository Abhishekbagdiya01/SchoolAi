import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { UserDetailContext } from '../context/UserDetailContext'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
export default function Header() {
  const { userDetail } = useContext(UserDetailContext);
  // useEffect(() => {
  //   console.log("Component received userDetail:", userDetail);
  // }, [userDetail])
  const router = useRouter();
  return (
    <View style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    }}>
      <View style={
        {
          marginTop: 10
        }
      }>
        <Text style={{
          fontSize: 18,
        }}>
          Welcome
        </Text>
        <Text style={{
          fontSize: 25,
          fontWeight: "bold",
        }}>
          {userDetail?.full_name ?? 'Guest'}
        </Text>
      </View>
      <TouchableOpacity onPress={() => {
        router.push('/add_course')
      }}>
        <Ionicons style={{
          padding: 5
        }} name="add-circle-outline" size={35} color="black" />
      </TouchableOpacity>
    </View>
  )
}
