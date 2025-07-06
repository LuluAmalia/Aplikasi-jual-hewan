import { View, Text, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {/* Icon Home */}
      <Ionicons name="home" size={50} color="blue" style={{ marginBottom: 10 }} />
      
      {/* Teks Home */}
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Home</Text>
      
      {/* Tombol Navigasi */}
      <Button
        title="Go to Page 1"
        onPress={() => {
          router.push("/page1");
        }}
      />
    </View>
  );
}
