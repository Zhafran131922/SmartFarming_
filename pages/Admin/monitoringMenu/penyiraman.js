import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "../../../components/ThemeContext";
import { useAuth } from "../../../components/AuthContext";

const Penyiraman = () => {
  const { colors } = useTheme();
  const { token } = useAuth();
  const [plantData, setPlantData] = useState([]);

  useEffect(() => {
    const fetchPlantData = async () => {
      try {
        const response = await fetch(
          "http://192.168.18.22:3000/api/admin/get/tanaman",
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
          watered: plant.watered || false,
          fertilized: plant.fertilized || false,
          image: plant.image || getPlantImage({ name: plant.name }),
        }));

        setPlantData(plants);
      } catch (error) {
        console.error("Error fetching plant data:", error);
      }
    };

    fetchPlantData();
  }, [token]);

  const getPlantImage = (plant) => {
    if (plant.image) {
      return { uri: plant.image };
    } else {
      switch (plant.name) {
        case "Tomat":
          return require("../../../images/tomat.jpg");
        case "Pepaya":
          return require("../../../images/tomat.jpg");
        case "Jeruk":
          return require("../../../images/tomat.jpg");
        default:
          return require("../../../images/tomat.jpg");
      }
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
        {plantData.map((plant, index) => (
          <View key={index} style={[styles.plantCard, { backgroundColor: colors.card }]}>
            <Image source={plant.image} style={styles.plantImage} />
            <View style={styles.plantDetails}>
              <Text style={[styles.plantName, { color: colors.text }]}>{plant.name}</Text>
              <View style={styles.plantStatus}>
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
                    {plant.watered ? "Sudah disiram" : "Belum disiram"}
                  </Text>
                  </View>
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
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  page: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
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
  statusItem: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
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
});

export default Penyiraman;
