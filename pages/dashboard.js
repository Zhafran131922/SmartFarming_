import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl, // Import RefreshControl
} from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../components/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import Watered from "../images/siram.png";
import Fertilized from "../images/pupuk.png";
import { useAuth } from "../components/AuthContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [plantData, setPlantData] = useState([]);
  const [refreshing, setRefreshing] = useState(false); // State untuk kontrol refresh
  const navigation = useNavigation();
  const { token } = useAuth();

  const fetchPlantData = async () => {
    try {
      const username = await AsyncStorage.getItem('username');
      const response = await fetch(
        `https://smart-farming-mu5mgd7zh-alifians-projects-30bb1aa5.vercel.app/api/user/tanaman/by-username/${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      const plants = Object.values(data).map((plant) => ({
        id: plant.id,
        name: plant.name,
        area: plant.area,
        username: plant.username,
        description: plant.description,
        watered: true,
        fertilized: true,
        image: require("../images/tomat.jpg"),
      }));

      setPlantData(plants);
    } catch (error) {
      console.error("Error fetching plant data:", error);
    }
  };

  useEffect(() => {
    fetchPlantData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPlantData();
    setRefreshing(false);
  };

  const NavigateToDescription = (selectedPlant) => {
    const matchingPlant = plantData.find(
      (plant) => plant.name === selectedPlant.name
    );

    if (matchingPlant) {
      navigation.navigate("Description", {
        plant: {
          id: matchingPlant.id,
          name: matchingPlant.name,
          area: matchingPlant.area,
          description: matchingPlant.description,
        },
      });
    } else {
      console.error("No matching plant found!");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={[styles.scrollViewContent, { backgroundColor: colors.background }]}
        refreshControl={ // Menambahkan RefreshControl di sini
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
            <View style={styles.spacing} />
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
            onPress={() => NavigateToDescription(plant)}
          >
            <Image source={plant.image} style={styles.plantImage} />
            <View style={styles.plantDetails}>
              <Text style={[styles.plantName, { color: colors.text }]}>
                {plant.name}
              </Text>
              <View style={styles.plantStatus}>
                <View style={styles.watered}>
                  <Image source={Watered} style={styles.plantIcon} />
                  <Text
                    style={[
                      styles.plantStatusWateredText,
                      styles.wateredText,
                    ]}
                  >
                    Sudah disiram
                  </Text>
                </View>

                <View style={styles.fertilized}>
                  <Image source={Fertilized} style={styles.plantIcon} />
                  <Text
                    style={[
                      styles.plantStatusFertilizedText,
                      styles.fertilizedText,
                    ]}
                  >
                    Sudah dipupuk
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    paddingBottom: 70, 
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
  plantStatusWateredText: {
    padding: 6,
    borderRadius: 5,
    color: "#01316B",
    fontWeight: "lighter",
    marginLeft: 10,
    fontSize: 13,
  },
  plantStatusFertilizedText: {
    padding: 6,
    borderRadius: 5,
    color: "#683200",
    marginLeft: 10,
    fontWeight: "lighter",
    fontSize: 13,
  },
  watered: {
    backgroundColor: "#73D2D8",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 1,
    borderRadius: 20,
    width: 140,
    paddingHorizontal: 10,
  },
  fertilized: {
    backgroundColor: "#D8B673",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
    borderRadius: 20,
    width: 140,
    paddingHorizontal: 10,
  },
  plantIcon: {
    marginRight: -5,
    width: 20,
    height: 20,

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
