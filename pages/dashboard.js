import React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons"; // Icons for weather and plant status
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../components/ThemeContect";

const Dashboard = () => {
  const { colors } = useTheme();
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
  ];

  return (
    <View style={[styles.container, {  backgroundColor: colors.background}]}>
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
        <LinearGradient
          colors={["#163020", "#0f1e14"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.weatherCard}
        >
          <Text style={styles.day}>Senin</Text>
          <Text style={styles.time}>10.36</Text>
          <Text style={styles.temperature}>22°C</Text>
          <FontAwesome5
            name="cloud-sun"
            size={40}
            color="white"
            style={styles.weatherIcon}
          />
          <View style={styles.weatherDetails}>
            <View style={styles.weatherDetailItem}>
              <MaterialIcons name="air" size={24} color="white" />
              <Text style={styles.weatherDetailText}>Angin</Text>
              <Text style={styles.weatherDetailValue}>5-6 km/j</Text>
            </View>
            <View style={styles.weatherDetailItem}>
              <MaterialIcons name="speed" size={24} color="white" />
              <Text style={styles.weatherDetailText}>Tekanan</Text>
              <Text style={styles.weatherDetailValue}>1000 MB</Text>
            </View>
            <View style={styles.weatherDetailItem}>
              <MaterialIcons name="opacity" size={24} color="white" />
              <Text style={styles.weatherDetailText}>Kelembaban</Text>
              <Text style={styles.weatherDetailValue}>58%</Text>
            </View>
          </View>
        </LinearGradient>
        {plantData.map((plant, index) => (
          <View key={index} style={[styles.plantCard, { backgroundColor: colors.card }]}>
            <Image source={plant.image} style={styles.plantImage} />
            <View style={styles.plantDetails}>
              <Text style={[styles.plantName, { color: colors.text }]}>{plant.name}</Text>
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
                      Sudah Disiram
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
                      Sudah Dipupuk
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    justifyContent: "space-between",
    marginTop: 20,
  },
  weatherDetailItem: {
    alignItems: "center",
    backgroundColor: "rgba(224, 224, 224, 0.1)",
    padding: 20,
    width: "29%",
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
    padding: 20,
    borderRadius: 10,
    margin: 10,
    height: 120,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  plantImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  plantDetails: {
    marginLeft: 150,
    justifyContent: "center",
    marginLeft: 49,
    left: -40,
    flex:1,
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
    padding: 10,
    borderRadius: 5,
    color: "white",
    marginLeft: 10,
    fontWeight: "bold",
  },
  watered: {
    backgroundColor: "#00BCD4",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 1,
    borderRadius: 10,
    width: 140,
    paddingHorizontal: 10,
  },
  fertilized: {
    backgroundColor: "#FF9800",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
    borderRadius: 10,
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
});

export default Dashboard;
