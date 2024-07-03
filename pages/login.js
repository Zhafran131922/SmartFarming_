import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import Logo from "../images/logo2.png";
import Email from "../images/email.png";
import Password from "../images/password.png";
import CustomTextInput from "../components/CustomTextInput";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const screenHeight = Dimensions.get("window").height;

  const navigateToRegister = () => {
    navigation.navigate("Register");
  };
  const navigateToDashboard = () => {
    navigation.navigate("Dashboard");
  };

  return (
    <LinearGradient
      colors={["#163020", "#0f1e14"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} />
      </View>
      <Text style={styles.welcomeText}>SELAMAT DATANG!!</Text>
      <View style={[styles.innerContainer, { height: screenHeight * 0.4 }]}>
        <View style={styles.inputContainer}>
          <CustomTextInput
            placeholder="Username/Email"
            value={username}
            onChangeText={setUsername}
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
        <LinearGradient
          colors={["#163020", "#0f1e14"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.loginButton}
        >
          <Text style={styles.loginButtonText} onPress={navigateToDashboard}>
            Masuk
          </Text>
        </LinearGradient>
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
    width: 100,
    height: 100,
    position: "absolute",
    top: -190,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
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
