import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../components/ThemeContext";
import { useAuth } from "../../components/AuthContext";
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import Watered from "../../images/siram.png"; // Add your watering icon here

const MasaPanen = () => {
  const { colors } = useTheme();
  const [plantData, setPlantData] = useState([]);
  const navigation = useNavigation();
  const { token } = useAuth();

  useEffect(() => {
    const fetchPlantData = async () => {
      try {
        const username = await AsyncStorage.getItem('username');

        if (!username) {
          console.error("No username found in AsyncStorage");
          return;
        }

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
          description: plant.description,
          watered: plant.watered || false, // Assuming `watered` status is in the API response
          image: require("../../images/tomat.jpg"), // Update with appropriate images
        }));

        setPlantData(plants);
      } catch (error) {
        console.error("Error fetching plant data:", error);
      }
    };

    fetchPlantData();
  }, [token]);

  const handleWaterPlant = (plantId) => {
    console.log(`Plant ${plantId} watered!`);
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
      >
        {plantData.map((plant, index) => (
          <TouchableOpacity key={index} onPress={() => NavigateToDescription(plant)} style={[styles.plantCard, { backgroundColor: colors.card }]}>
            <Image source={plant.image} style={styles.plantImage} />
            <View style={styles.plantDetails}>
              <Text style={[styles.plantName, { color: colors.text }]}>
                {plant.name}
              </Text>
              <View style={styles.masaPanen}>
                <Text style={styles.textDate}>Siap Panen</Text>
                <Text style={styles.Date}>10/10/2023</Text>
              </View>
            </View>
          </TouchableOpacity>
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
  scrollViewContent: {
    paddingBottom: 70,
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
    flex: 1,
    marginLeft: 20,
  },
  plantName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  plantArea: {
    fontSize: 14,
    marginTop: 5,
  },
  masaPanen: {
    flexDirection: "row",
    marginTop: 10,
  },
  textDate: {
    fontSize: 16,
    fontWeight: "bold",
  },
  Date: {
    fontSize: 16,
    color: "white",
    marginLeft: 10,
    backgroundColor: "#2F4C2F",
    padding: 5,
    borderRadius: 10,
    alignSelf: "flex-start",
    flexShrink: 1,
  },
  plantIcon: {
    marginRight: -5,
    width: 20,
    height: 20,
  },
  watered: {
    backgroundColor: "#73D2D8",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 1,
    marginTop: 8,
    borderRadius: 20,
    width: 140,
    paddingHorizontal: 10,
  },
  plantStatusWateredText: {
    padding: 6,
    borderRadius: 5,
    color: "#01316B",
    fontWeight: "lighter",
    marginLeft: 10,
    fontSize: 13,
  },

});

export default MasaPanen;
