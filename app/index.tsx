import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
export default function Index() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <Text style={{
        textAlign: "center"
      }}>Welcome to School AI</Text>

      <Pressable
        onPress={
          () => {
            router.push("/auth/SignUpScreen")
          }
        }
      >
        <Text style={{
          textAlign: "center"
        }}>Sign Up</Text>
      </Pressable>
    </View>
  );
}
