import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import Color from '../constant/Color';
import { useRouter } from 'expo-router';
import supabase from '../initSupabase';
export default function SignInScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signUp = async () => {
    const {
      data,
      error
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      console.error(error.message);
      return;

    }

    if (data?.user) {
      const { error: insertError } = await supabase.from("users").insert({
        id: data.user.id,
        email: email,
        full_name: name
      });
      if (insertError) {
        console.error(insertError.message);
        return;
      }
      console.log("User detail saved successfully");

      router.replace("/auth/LoginScreen");
    }


  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Account  </Text>
      <TextInput style={styles.textInput}
        onChangeText={(value) => {
          setName(value)
        }}
        placeholder='Full Name'></TextInput>
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
          signUp()
        }}
      >
        <Text style={[styles.title, { color: Color.WHITE }]}>Sign Up</Text>
      </Pressable >

      <View style={{
        display: "flex",
        flexDirection: "row",
        paddingTop: 10
      }}>
        <Text>Already have an account? </Text>
        <Pressable onPress={() => {
          router.replace("/auth/LoginScreen");
        }}>
          <Text style={{
            color: Color.PRIMARY
          }}>Login</Text>
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
    paddingTop: 150,
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
});

