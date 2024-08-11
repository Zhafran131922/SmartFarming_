import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import AddKaryawan from "./addKaryawan";

const StatusKaryawan = () => {
  const [karyawan, setKaryawan] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchKaryawan = async () => {
      try {
        const response = await fetch("http://192.168.18.22:3000/api/admin/get/karyawan");
        const data = await response.json();
        setKaryawan(data);
      } catch (error) {
        console.error("Error fetching karyawan:", error);
      }
    };
    fetchKaryawan();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        {karyawan.map((karyawan, index) => (
          <View key={index} style={styles.plantCard}>
            <Image
              source={require("../../../images/tomat.jpg")}
              style={styles.plantImage}
            />
            <View style={styles.plantDetails}>
              <Text style={styles.karyawan}>{karyawan.name}</Text>
              <Text style={styles.area}>{karyawan.area}</Text>
            </View>
          </View>
        ))}
        <View style={styles.bottomSpace} />
      </ScrollView>
      <TouchableOpacity
        style={styles.circle}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>

      <AddKaryawan modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  karyawan: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  area: {
    fontSize: 17,
    marginLeft: 10,
    backgroundColor: "#2F4C2F",
    color: "#fff",
    padding: 5,
    borderRadius: 10,
    alignSelf: "flex-start",
    flexShrink: 1,
  },
  plantStatus: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginLeft: 10,
  },

  plantIcon: {
    marginRight: -5,
  },
  circle: {
    backgroundColor: "#163020",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  plus: {
    color: "#FFFFFF",
    fontSize: 30,
  },
  bottomSpace: {
    height: 50,
  },
});

export default StatusKaryawan;
