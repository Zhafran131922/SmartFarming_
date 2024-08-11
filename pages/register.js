import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Alert,
} from "react-native";
import Logo from "../images/logo2.png";
import Password from "../images/password.png";
import Username from "../images/username.png";
import CustomTextInput from "../components/CustomTextInput";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const screenHeight = Dimensions.get("window").height;

  const navigateToLogin = () => {
    navigation.navigate("Dashboard");
  };

  const handleRegister = async () => {
    try {
      const response = await fetch("http://192.168.18.22:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: "user",
          email: email,
          password: password,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        Alert.alert("Success", data.message);
        navigateToLogin(); // Navigate to login screen on successful registration
      } else {
        Alert.alert("Error", data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Registration error:", error);  // Log the error for debugging
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
      <View style={styles.logoContainer}></View>
      <Text style={styles.welcomeText}>REGISTRASI</Text>
      <View style={[styles.innerContainer, { height: screenHeight * 0.45 }]}>
        <View style={styles.inputContainer}>
          <CustomTextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            imageSource={Username}
          />
          <CustomTextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            imageSource={Password}
          />
        </View>
        <TouchableOpacity onPress={handleRegister}>
          <LinearGradient
            colors={["#163020", "#0f1e14"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.loginButton}
          >
            <Text style={styles.loginButtonText}>Registrasi</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.registerText}>
            Sudah punya akun?{" "}
            <Text style={styles.registerLink} onPress={navigateToLogin}>
              Masuk
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e392a",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 80,
    position: "absolute",
    top: 20,
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
  inputContainer: {
    width: "100%",
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  forgotPasswordContainer: {
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  forgotPassword: {
    color: "#1e392a",
    alignItems: "flex-start",
    width: "100%",
  },
  loginButton: {
    backgroundColor: "#0a5826",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 50,
    marginBottom: 20,
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
  },
  registerText: {
    color: "black",
    fontWeight: "bold",
  },
  registerLink: {
    color: "#0a5826",
    textDecorationLine: "underline",
  },
});

export default Register;
