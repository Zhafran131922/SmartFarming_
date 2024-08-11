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
import Email from "../images/email.png";
import Password from "../images/password.png";
import CustomTextInput from "../components/CustomTextInput";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../components/AuthContext";



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const { setToken } = useAuth();

  const screenHeight = Dimensions.get("window").height;

  const navigateToRegister = () => {
    navigation.navigate("Register");
  };

  const navigateToDashboard = (role) => {
    if (role === "admin") {
      navigation.navigate("AdminDashboard");
    } else {
      navigation.navigate("Dashboard");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://192.168.18.22:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the token
        setToken(data.token);
        Alert.alert("Success", "Logged in successfully!");
        console.log("Token:", data.token);
        console.log("Role:", data.role);
        navigateToDashboard(data.role);
      } else {
        Alert.alert("Error", data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Failed to login. Please try again later.");
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
      <Text style={styles.welcomeText}>SELAMAT DATANG!!</Text>
      <View style={[styles.innerContainer, { height: screenHeight * 0.4 }]}>
        <View style={styles.inputContainer}>
          <CustomTextInput
            placeholder="Username/Email"
            value={email}
            onChangeText={setEmail}
            imageSource={Email}
          />
          <CustomTextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            imageSource={Password}
          />
        </View>
        <TouchableOpacity style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPassword}>Lupa password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogin}>
          <LinearGradient
            colors={["#163020", "#0f1e14"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.loginButton}
          >
            <Text style={styles.loginButtonText}>Masuk</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.registerText}>
            Tidak punya akun?{" "}
            <Text style={styles.registerLink} onPress={navigateToRegister}>
              Registrasi
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
    fontWeight: "bold",
    color: "white",
    marginBottom: 25,
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
    fontWeight: "bold",
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

export default Login;
