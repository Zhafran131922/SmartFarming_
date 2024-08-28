import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../components/AuthContext";

const StatusKaryawan = () => {
  const [karyawan, setKaryawan] = useState([]);
  const navigation = useNavigation();
  const { token } = useAuth();

  useEffect(() => {
    const fetchKaryawanData = async () => {
      try {
        const response = await fetch(
          "https://smart-farming-mu5mgd7zh-alifians-projects-30bb1aa5.vercel.app/api/admin/getUser/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
  
        const filteredData  = Object.values(data).map((user) => ({
          id: user.id,
          username: user.username,
          email: user.email,
          areaKaryawan: user.areaKaryawan,
        }));
  
        setKaryawan(filteredData);
      } catch (error) {
        console.error("Error fetching plant data:", error);
      }
    };
  
    fetchKaryawanData();
  }, [token]);

  const navigateToRegister = () => {
    navigation.navigate("Register");
  };


  const AdminDetailKaryawan = (selectedKaryawan) => {
    const matchingKaryawan = karyawan.find(
      (user) => user.username === selectedKaryawan.username
    );
  
    if (matchingKaryawan) {
      navigation.navigate("AdminDetailKaryawan", {
        karyawan: {
          id: matchingKaryawan.id,
          username: matchingKaryawan.username,
          email: matchingKaryawan.email,
          areaKaryawan: matchingKaryawan.areaKaryawan,
        },
      });
    } else {
      console.error("No matching karyawan found!");
    }
  };
  
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        {karyawan.map((karyawan, index) => (
          <TouchableOpacity key={index} style={styles.karyawanCard} onPress={() => AdminDetailKaryawan(karyawan)}>
            <Image
              source={require("../../../images/tomat.jpg")}
              style={styles.karyawanImage}
            />
            <View style={styles.karyawanDetails}>
              <Text style={styles.karyawan}>{karyawan.username}</Text>
              <Text style={styles.area}>{karyawan.areaKaryawan}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.circle} onPress={navigateToRegister}>
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  karyawanCard: {
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
  karyawanImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  karyawanDetails: {
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
  karyawanStatus: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginLeft: 10,
  },

  karyawanIcon: {
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
