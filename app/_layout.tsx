import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import supabase from "./initSupabase";
import { StatusBar } from "react-native";
import { UserDetailContext } from "./context/UserDetailContext";
export default function RootLayout() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userDetail, setUserDetail] = useState();
  const router = useRouter();
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        setUser(session.user)
        const { data, error } = await supabase.from("users").select("*").eq("id", session.user.id).single();
        if (!error && data) {
          setUserDetail(data)
          router.replace("/(tabs)/HomeScreen");
        }
      } else {
        router.replace("./index.tsx")
      }
      setLoading(false);
    };

    checkSession();
  }, []);
  return <UserDetailContext.Provider value={{
    userDetail, setUserDetail
  }}>
    <StatusBar barStyle="dark-content"></StatusBar>
    <Stack
      screenOptions={
        {
          headerShown: false
        }
      }
    >
    </Stack>

  </UserDetailContext.Provider>;
}
