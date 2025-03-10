import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import React, { useContext, useState } from 'react'
import Color from '../constant/Color';
import { useRouter } from 'expo-router';
import supabase from '../initSupabase';
import { UserDetailContext } from '../context/UserDetailContext';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserDetail } = useContext(UserDetailContext);
  const login = async () => {
    const {
      data,
      error
    } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert(error.message);
      return;
    }
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (userError) {
      alert('Failed to fetch user details.');
      console.error('User details fetch error:', userError);
      return;
    }
    setUserDetail(userData);
    console.log(data, error);
    router.replace("/(tabs)/HomeScreen");
    console.log(
      data, error
    );

  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <TextInput style={styles.textInput}
        onChangeText={(value) => {
          setEmail(value)
        }}
        placeholder='Email'></TextInput>
      <TextInput style={styles.textInput}
        onChangeText={(value) => {
          setPassword(value)
        }}

        placeholder='Password' secureTextEntry={true}></TextInput>
      <Pressable style={
        ({ pressed }) => [styles.button, {
          opacity: pressed ? 0.5 : 1
        }
        ]}
        onPress={() => {
          login()
        }}
      >
        <Text style={[styles.title, { color: Color.WHITE }]}>Login</Text>
      </Pressable >

      <View style={{
        display: "flex",
        flexDirection: "row",
        paddingTop: 10
      }}>
        <Text>Don't have an account? </Text>
        <Pressable onPress={() => {
          router.replace("/auth/SignUpScreen");
        }}>
          <Text style={{
            color: Color.PRIMARY
          }}>Sign Up</Text>
        </Pressable>

      </View>
    </View >
  )
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: Color.WHITE,
    alignItems: "center",
    paddingTop: 250,
    padding: 22,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  textInput: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 20,
    padding: 15,
    marginTop: 30
  },
  button: {
    backgroundColor: Color.PRIMARY,
    width: 200,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    width: "100%",
  },
},);
