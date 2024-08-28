import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../components/AuthContext";
import { Picker } from "@react-native-picker/picker"; 

const AddPlant = ({ modalVisible, setModalVisible, onAddPlant }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [area, setArea] = useState("");
  const [id, setId] = useState(1);
  const [users, setUsers] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchId = async () => {
      try {
        const lastId = await AsyncStorage.getItem("lastId");
        if (lastId) {
          setId(parseInt(lastId, 10) + 1);
        }
      } catch (error) {
        console.error("Failed to load last ID from AsyncStorage", error);
      }
    };

    fetchId();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://smart-farming-mu5mgd7zh-alifians-projects-30bb1aa5.vercel.app/api/admin/getUser/users"
        );
        const data = await response.json();
        const usersList = Object.values(data).map((user) => ({
          username: user.username,
          area: user.areaKaryawan,
        }));
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSave = async () => {
    try {
      const response = await fetch(
        "https://smart-farming-mu5mgd7zh-alifians-projects-30bb1aa5.vercel.app/api/admin/add/tanaman",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id,
            description,
            name,
            username,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add plant");
      }

      const data = await response.json();

      const newPlant = {
        id: data.id,
        name: name,
        description: description,
        username: username,
        watered: true,
        fertilized: true,
        image: require("../../images/tomat.jpg"),
      };

      onAddPlant(newPlant);
      setModalVisible(false);
    } catch (error) {
      console.error("Error adding plant:", error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalTitleContainer}>
            <Text style={styles.modalTitle}>Tambah Tanaman</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Nama Tanaman"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={[styles.input, styles.input]}
            placeholder="Deskripsi"
            value={description}
            onChangeText={setDescription}
          />
          <Picker
            selectedValue={username}
            onValueChange={(itemValue) => setUsername(itemValue)}
            style={styles.picker}
          >
            {users.map((user, index) => (
              <Picker.Item
                key={index}
                label={`${user.username} (${user.area})`}
                value={user.username}
              />
            ))}
          </Picker>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Simpan</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    width: "100%",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: "#d3d3d3",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  picker: {
    padding: 10,
    marginVertical: 10,
    borderRadius: 50,
    backgroundColor: "#e0e0e0",
    
  },
  uploadButton: {
    backgroundColor: "#e0e0e0",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  uploadButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#163020",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default AddPlant;
