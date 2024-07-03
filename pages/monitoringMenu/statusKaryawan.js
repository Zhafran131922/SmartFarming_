import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';

const StatusKaryawan = () => {
  const plantData = [
    { name: 'Karyawan 1', area:'Area 1', image: require('../../images/tomat.jpg') },
    { name: 'Karyawan 2', area:'Area 2', image: require('../../images/tomat.jpg') },
    { name: 'Karyawan 3', area:'Area 3', image: require('../../images/tomat.jpg') },
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
    backgroundColor: '#fff',
  },
  plantCard: {
    backgroundColor: '#E0E0E0',
    padding: 20,
    borderRadius: 10,
    margin: 10,
    height: 120,
    flexDirection: 'row',
    alignItems: 'center',
  },
  plantImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
  },
  plantDetails: {
    marginLeft: 150,
    justifyContent: 'center',
    marginLeft: 10,
  },
  karyawan: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    top: -10,
  },
  area: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  plantStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginLeft: 10,
  },
  plantStatusText: {
    padding: 10,
    borderRadius: 5,
    color: 'white',
    marginLeft: 10,
  },
  watered: {
    backgroundColor: '#00BCD4',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 1,
    borderRadius: 10,
    width: 120,
    paddingHorizontal: 10,
  },
  plantIcon: {
    marginRight: -5,
  },
});

export default StatusKaryawan;
