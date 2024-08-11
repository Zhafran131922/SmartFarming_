import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AdminSetting() {
  return (
    <View style={styles.container}>
      <Text>Admin Setting</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
