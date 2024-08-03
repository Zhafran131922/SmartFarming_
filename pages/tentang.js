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
import About from "../images/about.png"; 

const PlantDetail = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tentang Kami</Text>
     <Image source={About} style={styles.image} />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Kebun Agro Purwosari Semarang</Text>
        <Text style={styles.sectionContent}>
        Agro Purwosari merupakan Kebun Dinas kedua yang dikembangkan 
        menjadi Agro Wisata sejak tahun 2017. Terletak di Jl. Kedungjangan 
        RT 5 RW 3, Kelurahan Purwosari, Kecamatan Mijen, Kota Semarang. 
        Koordinator Kebun 1 orang mengkoordinir Agro Purwosari seluas 8 hektar 
        yang terbagi menjadi 4 wilayah/block kebun yaitu (A, B, C, dan D).
        </Text>
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
  image: {
    width: "100%",
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
    textAlign: "center",
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
