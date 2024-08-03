import React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";

const MasaPanen = () => {
  const plantData = [
    {
      name: "Jeruk",
      date: "2023-05-01",
      image: require("../../images/tomat.jpg"),
    },
    {
      name: "Cabai",
      date: "2023-05-01",
      image: require("../../images/tomat.jpg"),
    },
    {
      name: "Timun",
      date: "2023-05-01",
      image: require("../../images/tomat.jpg"),
    },
    {
      name: "Timun",
      date: "2023-05-01",
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
              <Text style={styles.plantName}>{plant.name}</Text>
              <View style={styles.panen}>
                <Text style={styles.dateLabel}>{`Siap Panen:`}</Text>
                <Text style={styles.dateValue}>{plant.date}</Text>
              </View>
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
  plantName: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    top: -10,
  },
  panen: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  area: {
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: 10,
  },
  dateLabel: {
    fontSize: 17,
    marginLeft: 10,
    color: "black",
  },
  dateValue: {
    fontSize: 17,
    marginLeft: 10,
    color: "red",
  },
  plantStatus: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginLeft: 10,
  },
  plantStatusText: {
    padding: 10,
    borderRadius: 5,
    color: "white",
    marginLeft: 10,
  },
  plantIcon: {
    marginRight: -5,
  },
});

export default MasaPanen;
