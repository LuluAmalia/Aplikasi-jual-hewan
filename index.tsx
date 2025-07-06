import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

type ScreenType = "login" | "register" | "home" | "list";

interface Item {
  name: string;
  price: string;
  status: "sukses" | "gagal";
}

export default function App(): JSX.Element {
  const [screen, setScreen] = useState<ScreenType>("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = () => {
    if (username === "user" && password === "123") {
      setScreen("home");
    } else {
      alert("Login gagal. Silakan daftar dulu.");
    }
  };

  const handleRegister = () => {
    if (username && password && password === confirmPassword) {
      alert("Registrasi berhasil. Silakan login.");
      setScreen("login");
    } else {
      alert("Periksa kembali isian Anda.");
    }
  };

  if (screen === "home") {
    return (
      <View style={styles.homeContainer}>
        <Ionicons name="home" size={40} color="white" style={{ marginBottom: 10 }} />
        <Text style={styles.homeTitle}>Home</Text>
        <Image
          source={{ uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" }}
          style={styles.logo}
        />
        <TouchableOpacity onPress={() => setScreen("list")} style={styles.button}>
          <Text style={styles.buttonText}>Lihat Daftar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (screen === "list") {
    const items: Item[] = [
      { name: "Pikachu", price: "Rp 15.000", status: "sukses" },
      { name: "Pikachu", price: "Rp 15.000", status: "gagal" },
      { name: "Pikachu", price: "Rp 15.000", status: "sukses" },
      { name: "Pikachu", price: "Rp 15.000", status: "gagal" },
      { name: "Pikachu", price: "Rp 15.000", status: "sukses" },
    ];

    return (
      <ScrollView contentContainerStyle={styles.listContainer}>
        <Text style={styles.listTitle}>Daftar Item</Text>
        {items.map((item, index) => (
          <View key={index} style={styles.listItem}>
            <Image
              source={{ uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" }}
              style={styles.listImage}
            />
            <View style={styles.listContent}>
              <Text style={styles.listName}>{item.name}</Text>
              <Text style={styles.listPrice}>{item.price}</Text>
              <Text
                style={[
                  styles.listStatus,
                  { color: item.status === "sukses" ? "green" : "red" },
                ]}
              >
                {item.status}
              </Text>
            </View>
          </View>
        ))}
        <TouchableOpacity style={styles.button} onPress={() => setScreen("home")}>
          <Text style={styles.buttonText}>Kembali</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  if (screen === "register") {
    return (
      <LinearGradient colors={["#ADD8E6", "#87CEEB"]} style={styles.gradientContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Register</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setScreen("login")}>
            <Text style={styles.registerText}>Sudah punya akun? Login</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={["#ADD8E6", "#87CEEB"]} style={styles.gradientContainer}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setScreen("register")}>
          <Text style={styles.registerText}>Belum punya akun? Daftar</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    width: "80%",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerText: {
    color: "#007bff",
    fontSize: 16,
    marginTop: 20,
  },
  homeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2c3e50",
    padding: 20,
  },
  homeTitle: {
    fontSize: 26,
    color: "white",
    fontWeight: "bold",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  listContainer: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  listTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    width: "100%",
  },
  listImage: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  listContent: {
    flex: 1,
  },
  listName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  listPrice: {
    fontSize: 16,
    color: "#555",
  },
  listStatus: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
