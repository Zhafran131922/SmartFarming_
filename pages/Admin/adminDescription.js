import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import editIcon from "../../images/edit2.png";
import deleteIcon from "../../images/delete.png";
import AddPlant from "../addPlant";
import AdminEditPlant from "./adminEditPlant";
import { useAuth } from "../../components/AuthContext";

const PlantDetail = ({ navigation }) => {
  const route = useRoute();
  const { plant } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPlant, setCurrentPlant] = useState(plant);

  const [plantData, setPlantData] = useState(null);
  const { token } = useAuth();

  const handleSave = async (updatedPlant) => {
    try {
      const response = await fetch(
        `http://192.168.18.22:3000/api/admin/update/tanaman/${currentPlant.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(updatedPlant),
        }
      );

      if (response.ok) {
        console.log("Plant updated successfully");
        setCurrentPlant(updatedPlant);
        setModalVisible(false);
      } else {
        console.error("Failed to update plant");
      }
    } catch (error) {
      console.error("Error updating plant:", error);
    }
  };
  
  useEffect(() => {
    if (plant) {
      setCurrentPlant(plant);
    }
  }, [plant]);

  const fetchPlantData = async () => {
    try {
      const response = await fetch(
        "http://192.168.18.22:3000/api/admin/get/tanaman"
      );
      const data = await response.json();

      const formattedData = Object.values(data).map((plant) => ({
        id: plant.id,
        name: plant.name,
        area: plant.area,
        description: plant.description,
      }));

      console.log("Formatted plant data:", formattedData);

      setPlantData(formattedData);
    } catch (error) {
      console.error("Error fetching plant data:", error);
    }
  };

  useEffect(() => {
    fetchPlantData();
  }, []);

  console.log("Received plant data:", plant);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{currentPlant.name}</Text>
      <View style={styles.imagePlaceholder} />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Area</Text>
        <Text style={styles.sectionContent}>{currentPlant.area}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Deskripsi</Text>
        <Text style={styles.sectionContent}>{currentPlant.description}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setModalVisible(true)}
        >
          <Image source={editIcon} style={styles.editIcon} />
          <Text style={styles.buttonEditText}>Edit Tanaman</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.deleteButton}>
          <Image source={deleteIcon} style={styles.deleteIcon} />
          <Text style={styles.buttonDeleteText}>Hapus Tanaman</Text>
        </TouchableOpacity>
      </View>
      <AdminEditPlant
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        plant={currentPlant}
        onSave={handleSave}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  imagePlaceholder: {
    width: "100%",
    height: 150,
    backgroundColor: "#B6C4B6",
    marginBottom: 16,
    borderRadius: 8,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 14,
    color: "#666",
    textAlign: "justify",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
    marginTop: 40,
  },
  editButton: {
    backgroundColor: "#203B26",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  editIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  deleteIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: "#fff",
    borderColor: "#203B26",
    borderWidth: 3,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonEditText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonDeleteText: {
    color: "#203B26",
    fontSize: 16,
    fontWeight: "bold",
  },
  divider: {
    width: 20,
  },
});

export default PlantDetail;
