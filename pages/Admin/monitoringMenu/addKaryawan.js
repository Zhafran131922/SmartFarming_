import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

const AddPlant = ({ modalVisible, setModalVisible }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [area, setArea] = useState("");

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
            <Text style={styles.modalTitle}>Tambah Karyawan</Text>
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
            placeholder="Area"
            value={area}
            onChangeText={setArea}
          />
          <TextInput
            style={[styles.input, styles.input]}
            placeholder="Deskripsi"
            value={description}
            onChangeText={setDescription}
          />
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => {
              setModalVisible(false);
            }}
          >
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
