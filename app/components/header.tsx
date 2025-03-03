import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { UserDetailContext } from '../context/UserDetailContext'
import Ionicons from '@expo/vector-icons/Ionicons';
export default function Header() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  return (
    <View style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    }}>
      <View>
        <Text style={{
          fontSize: 18,
        }}>
          Welcome
        </Text>
        <Text style={{
          fontSize: 25,
          fontWeight: "bold",
        }}>
          {userDetail.full_name ?? 'Guest'}
        </Text>
      </View>
      <TouchableOpacity onPress={() => { }}>
        <Ionicons style={{
          padding: 5
        }} name="add-circle-outline" size={35} color="black" />
      </TouchableOpacity>
    </View>
  )
}
