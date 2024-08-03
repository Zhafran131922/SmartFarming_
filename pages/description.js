import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import editIcon from "../images/edit2.png";
import deleteIcon from "../images/delete.png";
import AddPlant from "./addPlant";

const PlantDetail = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tomat</Text>
      <View style={styles.imagePlaceholder} />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Area</Text>
        <Text style={styles.sectionContent}>
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Deskripsi</Text>
        <Text style={styles.sectionContent}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
          <Image source={editIcon} style={styles.editIcon} />
          <Text style={styles.buttonEditText}>Edit Tanaman</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.deleteButton}>
          <Image source={deleteIcon} style={styles.deleteIcon} />
          <Text style={styles.buttonDeleteText}>Hapus Tanaman</Text>
        </TouchableOpacity>
      </View>     
      <AddPlant
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
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
