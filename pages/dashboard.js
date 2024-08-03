import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../components/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import AddPlant from "./addPlant";

const getCurrentDateTimeWIB = () => {
  const now = new Date();
  const options = { weekday: "long" };
  const day = new Intl.DateTimeFormat("id-ID", options).format(now);

  const localTime = now.getTime();
  const localOffset = now.getTimezoneOffset() * 60000;
  const utc = localTime + localOffset;
  const wib = new Date(utc + 3600000 * 7);

  const hours = wib.getHours().toString().padStart(2, "0");
  const minutes = wib.getMinutes().toString().padStart(2, "0");
  const time = `${hours}:${minutes}`;

  return { day, time };
};

const Dashboard = () => {
  const { colors } = useTheme();
  const [dateTime, setDateTime] = useState(getCurrentDateTimeWIB());
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const NavigateToDescription = () => {
    navigation.navigate("Description");
  };

  const plantData = [
    {
      name: "Tomat",
      watered: true,
      fertilized: true,
      image: require("../images/tomat.jpg"),
    },
    {
      name: "Pepaya",
      watered: true,
      fertilized: true,
      image: require("../images/tomat.jpg"),
    },
    {
      name: "Jeruk",
      watered: true,
      fertilized: true,
      image: require("../images/tomat.jpg"),
    },
    {
      name: "Pepaya",
      watered: true,
      fertilized: true,
      image: require("../images/tomat.jpg"),
    },
    {
      name: "Jeruk",
      watered: true,
      fertilized: true,
      image: require("../images/tomat.jpg"),
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={[styles.scrollViewContent, { backgroundColor: colors.background }]}
      >
        <LinearGradient
          colors={["#163020", "#0f1e14"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.weatherCard}
        >
          <Text style={styles.day}>{dateTime.day}</Text>
          <Text style={styles.time}>{dateTime.time}</Text>
          <Text style={styles.temperature}>22°C</Text>
          <FontAwesome5
            name="cloud-sun"
            size={40}
            color="white"
            style={styles.weatherIcon}
          />
          <View style={styles.weatherDetails}>
            <View style={styles.weatherDetailItem}>
              <MaterialIcons name="speed" size={24} color="white" />
              <Text style={styles.weatherDetailText}>Raindrop</Text>
              <Text style={styles.weatherDetailValue}>1000 mm/h</Text>
            </View>
            <View style={styles.spacing}/>
            <View style={styles.weatherDetailItem}>
              <MaterialIcons name="opacity" size={24} color="white" />
              <Text style={styles.weatherDetailText}>Kelembapan</Text>
              <Text style={styles.weatherDetailValue}>58gr/lb</Text>
            </View>
          </View>
        </LinearGradient>
        {plantData.map((plant, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.plantCard, { backgroundColor: colors.card }]}
            onPress={NavigateToDescription}
          >
            <Image source={plant.image} style={styles.plantImage} />
            <View style={styles.plantDetails}>
              <Text style={[styles.plantName, { color: colors.text }]}>
                {plant.name}
              </Text>
              <View style={styles.plantStatus}>
                {plant.watered && (
                  <View style={styles.watered}>
                    <FontAwesome5
                      name="tint"
                      size={16}
                      color="white"
                      style={styles.plantIcon}
                    />
                    <Text
                      style={[
                        styles.plantStatusText,
                        plant.watered && styles.wateredText,
                      ]}
                    >
                      Sudah disiram
                    </Text>
                  </View>
                )}

                {plant.fertilized && (
                  <View style={styles.fertilized}>
                    <FontAwesome5
                      name="leaf"
                      size={16}
                      color="white"
                      style={styles.plantIcon}
                    />
                    <Text
                      style={[
                        styles.plantStatusText,
                        plant.fertilized && styles.fertilizedText,
                      ]}
                    >
                      Sudah dipupuk
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
        <View style={styles.bottomSpace} />
      </ScrollView>

      <TouchableOpacity style={styles.circle} onPress={() => setModalVisible(true)}>
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>

      <AddPlant
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    paddingBottom: 70, // Add space for floating button
  },
  weatherCard: {
    backgroundColor: "#163020",
    padding: 20,
    borderTopEndRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    height: 300,
  },
  day: {
    fontSize: 18,
    color: "white",
  },
  time: {
    fontSize: 14,
    color: "white",
  },
  temperature: {
    fontSize: 48,
    color: "white",
    fontWeight: "bold",
  },
  weatherIcon: {
    position: "absolute",
    right: 20,
    top: 20,
  },
  weatherDetails: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  spacing: {
    width: 20,
  },
  weatherDetailItem: {
    alignItems: "center",
    backgroundColor: "rgba(224, 224, 224, 0.1)",
    padding: 20,
    width: "40%",
    height: "100%",
    borderRadius: 10,
  },
  weatherDetailText: {
    color: "white",
    marginTop: 5,
  },
  weatherDetailValue: {
    color: "white",
    fontWeight: "bold",
  },
  plantCard: {
    backgroundColor: "#E0E0E0",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    margin: 5,
    height: 90,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  plantImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  plantDetails: {
    marginLeft: 150,
    justifyContent: "center",
    marginLeft: 49,
    left: -40,
    flex: 1,
  },
  plantName: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  plantStatus: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  plantStatusText: {
    padding: 6,
    borderRadius: 5,
    color: "white",
    marginLeft: 10,
    fontSize: 13,
  },
  watered: {
    backgroundColor: "#00BCD4",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 1,
    borderRadius: 20,
    width: 140,
    paddingHorizontal: 10,
  },
  fertilized: {
    backgroundColor: "#FF9800",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
    borderRadius: 20,
    width: 140,
    paddingHorizontal: 10,
  },
  plantIcon: {
    marginRight: -5,
  },
  navbar: {
    flexDirection: "row",
    backgroundColor: "#6200EE",
    paddingVertical: 10,
    justifyContent: "space-around",
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  menuText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  circle: {
    backgroundColor: "#163020",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  plus: {
    color: "#FFFFFF",
    fontSize: 30,
  },
  bottomSpace: {
    height: 50,
  },
});

export default Dashboard;
