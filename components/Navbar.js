import React, { useState } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native"; 

import DashboardIcon from "../images/dashboard.png";
import MonitoringIcon from "../images/monitoring.png";
import SettingsIcon from "../images/settings.png";

const Navbar = () => {
  const navigation = useNavigation();
  const [activeIcon, setActiveIcon] = useState("Dashboard");
  const navigateToDashboard = () => {
    setActiveIcon("Dashboard");
    navigation.navigate("Dashboard");
  };

  const navigateToMonitoring = () => {
    setActiveIcon("Monitoring");
    navigation.navigate("Monitoring");
  };

  const navigateToSettings = () => {
    setActiveIcon("Settings");
    navigation.navigate("Settings");
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        style={[
          styles.menuItem,
          activeIcon === "Dashboard" && styles.activeMenuItem,
        ]}
        onPress={navigateToDashboard}
      >
        <Image source={DashboardIcon} style={styles.menuIcon} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.menuItem,
          activeIcon === "Monitoring" && styles.activeMenuItem,
        ]}
        onPress={navigateToMonitoring}
      >
        <Image source={MonitoringIcon} style={styles.menuIcon} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.menuItem,
          activeIcon === "Settings" && styles.activeMenuItem,
        ]}
        onPress={navigateToSettings}
      >
        <Image source={SettingsIcon} style={styles.menuIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    backgroundColor: "#d9d9d9",
    paddingVertical: 10,
    justifyContent: "center",
    position: "absolute",
    bottom: 40,
    width: "45%",
    alignSelf: "center",
    borderRadius: 100,
  },
  menuItem: {
    paddingVertical: 0,
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
  },
  menuIcon: {
    width: 30,
    height: 30,
  },
  activeMenuItem: {
    backgroundColor: "#B6C4B6",
    borderRadius: 100,
    width: 50,
    height: 50,
  },
});

export default Navbar;
