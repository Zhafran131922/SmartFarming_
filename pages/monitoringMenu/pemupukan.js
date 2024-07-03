import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Pemupukan = () => {
    return (
        <View style={styles.container}>
            <Text>Pemupukan</Text>
        </View>
    );
};

styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default Pemupukan;