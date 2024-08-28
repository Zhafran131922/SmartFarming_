import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import editIcon from "../../images/edit2.png";
import deleteIcon from "../../images/delete.png";
import kelembapan from "../../images/siram.png";
import raindrop from "../../images/rain.png";
import AdminEditPlant from "./adminEditPlant";
import { useAuth } from "../../components/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PlantDetail = ({ navigation }) => {
  const route = useRoute();
  const { plant, onEditPlant } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPlant, setCurrentPlant] = useState(plant);
  const [areaKaryawan, setAreaKaryawan] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const { token, deletePlant } = useAuth();

  const handleSave = async (updatedPlant) => {
    try {
      const response = await fetch(
        `https://smart-farming-mu5mgd7zh-alifians-projects-30bb1aa5.vercel.app/api/admin/update/tanaman/${currentPlant.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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

  const fetchAreaKaryawan = useCallback(async (username) => {
    try {
      const response = await fetch(
        "https://smart-farming-mu5mgd7zh-alifians-projects-30bb1aa5.vercel.app/api/admin/getUser/users"
      );
      const data = await response.json();

      const user = data.find((user) => user.username === username);
      if (user) {
        setAreaKaryawan(user.areaKaryawan);
      } else {
        console.error("User not found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const response = await fetch(
        `https://smart-farming-mu5mgd7zh-alifians-projects-30bb1aa5.vercel.app/api/admin/get/tanaman/${currentPlant.id}`
      );
      if (response.ok) {
        const data = await response.json();
        setCurrentPlant(data);

        await AsyncStorage.setItem(
          `currentPlant_${currentPlant.id}`,
          JSON.stringify(data)
        );
      } else {
        const text = await response.text();
        console.error(
          `Error fetching plant data: ${response.status} - ${text}`
        );
      }
      if (currentPlant.username) {
        await fetchAreaKaryawan(currentPlant.username);
      }
    } catch (error) {
      console.error("Error refreshing plant data:", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (plant) {
      setCurrentPlant(plant);
      fetchAreaKaryawan(plant.username);
    }
  }, [plant, fetchAreaKaryawan]);

  useEffect(() => {
    const loadPlantData = async () => {
      try {
        const storedPlant = await AsyncStorage.getItem(
          `currentPlant_${plant.id}`
        );
        if (storedPlant) {
          setCurrentPlant(JSON.parse(storedPlant));
        } else if (plant) {
          setCurrentPlant(plant);
          fetchAreaKaryawan(plant.username);
        }
      } catch (error) {
        console.error("Error loading plant data from AsyncStorage:", error);
      }
    };

    loadPlantData();
  }, [plant, fetchAreaKaryawan]);

  const confirmDelete = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this plant?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Deletion canceled"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: handleDeletePlant,
        },
      ],
      { cancelable: false }
    );
  };

  const handleDeletePlant = async () => {
    try {
      await deletePlant(currentPlant.id);
      navigation.goBack();
    } catch (error) {
      console.error("Error deleting plant:", error);
    }
  };

  const handleEditPlant = (updatedPlant) => {
    onEditPlant(updatedPlant);
    navigation.goBack();
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <Text style={styles.title}>{currentPlant.name}</Text>
      <View style={styles.imagePlaceholder} />
      <View style={styles.iot}>
        <View style={styles.kelembapan}>
          <Image source={kelembapan} style={styles.kelembapanImage} />
          <Text style={styles.sectionContent}>Kelembapan</Text>
          <Text style={styles.sectionContent}>58gr/lb</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.kelembapan}>
          <Image source={raindrop} style={styles.raindropImage} />
          <Text style={styles.sectionContent}>Raindrop</Text>
          <Text style={styles.sectionContent}>58gr/lb</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pemilik</Text>
        <Text style={styles.sectionContent}>{currentPlant.username}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Area</Text>
        <Text style={styles.sectionContent}>{areaKaryawan}</Text>
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
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={confirmDelete}
        >
          <Image source={deleteIcon} style={styles.deleteIcon} />
          <Text style={styles.buttonDeleteText}>Hapus Tanaman</Text>
        </TouchableOpacity>
      </View>
      <AdminEditPlant
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        plant={currentPlant}
        onSave={handleSave}
        onEditPlant={handleEditPlant}
      />
      <View style={styles.bottomSpace} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
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
  iot: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  kelembapan: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 16,
  },
  kelembapanImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    backgroundColor: "#73D2D8",
    marginBottom: 8,
    borderRadius: 100,
  },
  raindropImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    backgroundColor: "#D8B673",
    marginBottom: 8,
    borderRadius: 100,
  },
  divider: {
    width: 100,
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    marginTop: 40,
  },
  editButton: {
    backgroundColor: "#203B26",
    borderColor: "#203B26",
    borderWidth: 3,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
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
  bottomSpace: {
    height: 150,
  },
});

export default PlantDetail;
