import { View, Text, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Page1() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {/* Icon */}
      <Ionicons name="document-text" size={50} color="purple" style={{ marginBottom: 10 }} />
      
      {/* Teks Page 1 */}
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Welcome to Page 1</Text>
      
      {/* Tombol kembali ke Home */}
      <Button
        title="Back to Home"
        onPress={() => {
          router.push("/"); // atau router.back() untuk kembali ke halaman sebelumnya
        }}
      />
    </View>
  );
}
