import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  TextInput,
  Dimensions,
} from "react-native";

import Logo from "../images/logo2.png";
import CustomTextInput from "../components/CustomTextInput";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "../components/ThemeContext";

const { height: screenHeight } = Dimensions.get("window");

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const { colors } = useTheme();
  const navigation = useNavigation();

  const handleEmailChange = (value) => setEmail(value);
  const handlePasswordChange = (value) => setPassword(value);
  const handleCodeChange = (value) => setCode(value);

  const navigateToLogin = () => navigation.navigate("Login");

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "https://smart-farming-mu5mgd7zh-alifians-projects-30bb1aa5.vercel.app/api/auth/send-reset-code",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", data.message);
      } else {
        Alert.alert("Error", data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Registration error:", error);
      Alert.alert("Error", "Failed to register. Please try again later.");
    }
  };

  return (
    <LinearGradient
      colors={["#163020", "#0f1e14"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Image source={Logo} style={styles.logo} />
      <Text style={styles.welcomeText}>LUPA PASSWORD</Text>

      <View style={[styles.innerContainer, { height: screenHeight * 0.25 }]}>
        <CustomTextInput
          placeholder="Masukan Email"
          value={email}
          onChangeText={handleEmailChange}
          secureTextEntry={false}
        />
        <TouchableOpacity
          onPress={() => {
            handleSubmit();
            navigation.navigate("ResetPassword");
          }}
        >
          <LinearGradient
            colors={["#163020", "#0f1e14"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.resetButton}
          >
            <View style={styles.buttonContent}>
              <Text style={styles.resetButtonText}>Kirim</Text>
              <FontAwesome5 name="paper-plane" size={20} color="white" />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={navigateToLogin} style={styles.loginLink}>
        <Text style={styles.loginLinkText}>Kembali ke Login</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e392a",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  logo: {
    width: 80,
    height: 80,
    top: 10,
    position: "absolute",
  },
  welcomeText: {
    fontSize: 20,
    color: "white",
    marginBottom: 20,
    fontWeight: "bold",
  },
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 30,
    width: "85%",
  },

  input: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D9D9D9",
    padding: 10,
    borderRadius: 50,
    marginBottom: 10,
    width: "100%",
    fontWeight: "bold",
    fontSize: 15,
  },
  resetButton: {
    backgroundColor: "#0a5826",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 50,
    marginBottom: 20,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 18,
    marginRight: 10,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginLink: {
    marginTop: 20,
  },
  loginLinkText: {
    color: "#ffffff",
    textDecorationLine: "underline",
  },
  codeIcon: {
    color: "#121",
    fontSize: 20,
    marginBottom: 20,
  },
});
