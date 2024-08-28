import React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";

const StatusKaryawan = () => {
  const plantData = [
    {
      name: "Karyawan 1",
      area: "Area 1",
      image: require("../../images/tomat.jpg"),
    },
    {
      name: "Karyawan 2",
      area: "Area 2",
      image: require("../../images/tomat.jpg"),
    },
    {
      name: "Karyawan 3",
      area: "Area 3",
      image: require("../../images/tomat.jpg"),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        {plantData.map((plant, index) => (
          <View key={index} style={styles.plantCard}>
            <Image source={plant.image} style={styles.plantImage} />
            <View style={styles.plantDetails}>
              <Text style={styles.karyawan}>{plant.name}</Text>
              <Text style={styles.area}>{plant.area}</Text>
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
    fontSize: 16,
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
});

export default StatusKaryawan;
