import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import About from "../../images/about.jpg";

const PlantDetail = () => {
  const mahasiswa = [
    "Alifian",
    "Muhammad Farrel Ekaputra",
    "Muhammad Zidan Maali",
    "Gumilang Ali Mahfuzh",
    "Irzhafran Ridho Pradana",
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tentang Kami</Text>
      <Image source={About} style={styles.image} />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          "PENGEMBANGAN SMART FARMING SYSTEM BERBASIS INTERNET OF THINGS UNTUK
          PERAWATAN KEBUN AGRO PURWOSARI SEMARANG SEBAGAI IMPLEMENTASI PROGRAM
          SUSTAINABLE DEVELOPMENT GOALS."
        </Text>
        <Text style={styles.sectionContent}>
          Ketua Pengabdian:{" "}
          </Text>
          <Text style={styles.bold}>Dr. Feddy Setio Pribadi, S.Pd., M.T.</Text>
  
        <Text style={styles.sectionContent}>
          Anggota Mahasiswa:
          {mahasiswa.map((mahasiswa, index) => (
            <Text key={index} style={styles.mahasiswaName}>
              {"\n"}{mahasiswa}
            </Text>
          ))}
        </Text>
      </View>
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
    height: 150,
    marginBottom: 16,
    borderRadius: 8,
  },
  section: {
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  sectionContent: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 8,
  },
  bold: {
    fontWeight: "bold",
    color: "#666",
  },
  mahasiswaName: {
    fontWeight: "normal",
    color: "#666",
  },
});

export default PlantDetail;
