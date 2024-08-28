import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useAuth } from "../../../components/AuthContext";
import deleteIcon from "../../../images/delete.png";

const KaryawanDetail = ({ navigation }) => {
  const route = useRoute();
  const { karyawan } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [currentKaryawan, setCurrentKaryawan] = useState(karyawan);
  const { deleteKaryawan } = useAuth();
  const [karyawanData, setKaryawanData] = useState(null);
  const { token } = useAuth();

  const handleSave = async (updatedKaryawan) => {
    try {
      const response = await fetch(
        `https://smart-farming-mu5mgd7zh-alifians-projects-30bb1aa5.vercel.app/api/admin/get/users/${karyawanId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedKaryawan),
        }
      );

      if (response.ok) {
        console.log("Karyawan updated successfully");
        setCurrentKaryawan(updatedKaryawan);
        setModalVisible(false);
      } else {
        console.error("Failed to update karyawan");
      }
    } catch (error) {
      console.error("Error updating karyawan:", error);
    }
  };

  useEffect(() => {
    if (karyawan) {
      setCurrentKaryawan(karyawan);
    }
  }, [karyawan]);

  const fetchKaryawanData = async () => {
    try {
      const response = await fetch(
        "https://smart-farming-mu5mgd7zh-alifians-projects-30bb1aa5.vercel.app/api/admin/get/tanaman"
      );
      const data = await response.json();

      const formattedData = Object.values(data).map((karyawan) => ({
        id: karyawan.id,
        username: karyawan.username,
        areaKaryawan: karyawan.areaKaryawan,
        email: karyawan.email,
      }));

      console.log("Formatted karyawan data:", formattedData);

      setKaryawanData(formattedData);
    } catch (error) {
      console.error("Error fetching karyawan data:", error);
    }
  };

  useEffect(() => {
    fetchKaryawanData();
  }, []);

  const handleDeleteKaryawan = () => {
    Alert.alert(
      "Konfirmasi Hapus",
      "Apakah Anda yakin ingin menghapus karyawan ini?",
      [
        {
          text: "Tidak",
          onPress: () => console.log("Hapus dibatalkan"),
          style: "cancel"
        },
        {
          text: "Ya",
          onPress: async () => {
            try {
              await deleteKaryawan(currentKaryawan.id);
              navigation.goBack();
            } catch (error) {
              console.error('Error deleting karyawan:', error);
            }
          }
        }
      ]
    );
  };
  
  console.log("Received karyawan data:", karyawan);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{currentKaryawan.username}</Text>
      <View style={styles.imagePlaceholder} />
      <View style={styles.sectionEmail}>
        <Text style={styles.sectionTitle}>Email</Text>
        <Text style={styles.sectionContent}>{currentKaryawan.email}</Text>
      </View>
      <View style={styles.sectionArea}>
        <Text style={styles.sectionTitle}>Area Karyawan</Text>
        <Text style={styles.sectionContent}>
          {currentKaryawan.areaKaryawan}
        </Text>
      </View>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteKaryawan}>
          <Image source={deleteIcon} style={styles.deleteIcon} />
          <Text style={styles.buttonDeleteText}>Hapus Kayawan</Text>
        </TouchableOpacity>
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
    alignSelf: "center",
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
    backgroundColor: "#B6C4B6",
    marginBottom: 16,
    borderRadius: 100,
    alignSelf: "center",
  },
  sectionEmail: {
    marginTop: 16,
    marginBottom: 16,
    backgroundColor: "#E0E0E0",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionArea: {
    marginBottom: 16,
    backgroundColor: "#E0E0E0",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  sectionTitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 20,
    fontWeight: "bold", 
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

export default KaryawanDetail;
