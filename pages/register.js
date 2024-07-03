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
import Telp from "../images/phone.png";
import Username from "../images/username.png";
import CustomTextInput from "../components/CustomTextInput";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const screenHeight = Dimensions.get("window").height;

  const navigateToLogin = () => {
    navigation.navigate("Login");
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
      <Text style={styles.welcomeText}>REGISTRASI</Text>
      <View style={[styles.innerContainer, { height: screenHeight * 0.45 }]}>
        <View style={styles.inputContainer}>
          <CustomTextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            imageSource={Username}
          />
          <CustomTextInput
            placeholder="Email"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            imageSource={Email}
          />
          <CustomTextInput
            placeholder="No.Telp"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            imageSource={Telp}
          />
          <CustomTextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            imageSource={Password}
          />
        </View>
        <LinearGradient
          colors={["#163020", "#0f1e14"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.loginButton}
        >
          <Text style={styles.loginButtonText}>Registrasi</Text>
        </LinearGradient>
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
    width: 100,
    height: 100,
    position: "absolute",
    top: -170,
  },
  welcomeText: {
    fontSize: 24,
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
