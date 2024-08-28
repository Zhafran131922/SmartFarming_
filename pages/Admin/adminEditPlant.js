import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const EditPlant = ({
  modalVisible,
  setModalVisible,
  plant,
  onSave = () => {},
  token,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (plant) {
      setName(plant.name);
      setDescription(plant.description);
      setUsername(plant.username);
    }
  }, [plant]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://smart-farming-mu5mgd7zh-alifians-projects-30bb1aa5.vercel.app/api/admin/getUser/users"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        const usersList = Object.values(data).map((user) => ({
          id: user.id,
          username: user.username,
          area: user.areaKaryawan,
        }));
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
        Alert.alert("Error", "Failed to fetch users.");
      }
    };

    fetchUsers();
  }, []);

  const handleSave = async () => {
    if (!name || !description || !username) {
      Alert.alert("Validation Error", "Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(
        `https://smart-farming-mu5mgd7zh-alifians-projects-30bb1aa5.vercel.app/api/admin/update/tanaman/${plant.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            description,
            username,
          }),
        }
      );

      const contentType = response.headers.get("Content-Type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
        if (!response.ok) {
          console.error("Server error:", data);
          Alert.alert("Error", `Failed to update plant: ${data.message || "Unknown error"}`);
          return;
        }
      } else {
        const textResponse = await response.text();
        if (response.ok) {
          const updatedPlant = {
            id: plant.id,
            name,
            description,
            username,
            watered: true,
            fertilized: true,
            image: require("../../images/tomat.jpg"),
          };

          onSave(updatedPlant);
          setModalVisible(false);
        } else {
          console.error("Unexpected response type. Response text:", textResponse);
          Alert.alert("Error", "Failed to update plant.");
        }
        return;
      }
    } catch (error) {
      console.error("Error:", error.message || error);
      Alert.alert("Error", "Failed to update plant.");
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
            <Text style={styles.modalTitle}>Edit Tanaman</Text>
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
          <Picker
            selectedValue={username}
            onValueChange={(itemValue) => setUsername(itemValue)}
            style={styles.picker}
          >
            {users.length > 0 ? (
              users.map((user, index) => (
                <Picker.Item
                  key={index}
                  label={`${user.username} (${user.area})`}
                  value={user.username}
                />
              ))
            ) : (
              <Picker.Item label="No users available" value="" />
            )}
          </Picker>
          <TextInput
            style={styles.input}
            placeholder="Deskripsi"
            value={description}
            onChangeText={setDescription}
          />
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
    borderWidth: 1,
    borderColor: "#ddd",
    marginVertical: 10,
    borderRadius: 5,
    height: 50,
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

export default EditPlant;
