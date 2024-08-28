import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Image,
  ScrollView,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../components/ThemeContext";
import { MaterialIcons } from "@expo/vector-icons";

const Settings = () => {
  const navigation = useNavigation();
  const [isNotificationEnabled, setNotificationEnabled] = React.useState(true);
  const [isDarkmodeEnabled, setDarkmodeEnabled] = React.useState(false);
  const { colors, toggleTheme } = useTheme();
  const toggleSwitch = () =>
    setNotificationEnabled((previousState) => !previousState);

  const toggleDarkMode = () => {
    setDarkmodeEnabled((previousState) => !previousState);
    toggleTheme();
  };

  const navigateToTentang = () => {
    navigation.navigate("adminTentang");
  };

  const navigateToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <LinearGradient
          colors={["#163020", "#0f1e14"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.weatherCard}
        >
          <Text style={styles.text}>Pengaturan</Text>
        </LinearGradient>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Akun
          </Text>
          <TouchableOpacity
            style={[styles.optionTop, { backgroundColor: colors.card }]}
          >
            <MaterialIcons
              name="edit-square"
              size={22}
              style={[styles.Icon, { color: colors.text }]}
            />
            <Text style={[styles.optionText, { color: colors.text }]}>
              Edit Profil
            </Text>
            <MaterialIcons
              name="arrow-forward-ios"
              size={14}
              style={[styles.optionIcon, { color: colors.text }]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionBottom, { backgroundColor: colors.card }]}
          >
            <MaterialIcons
              name="rebase-edit"
              size={21}
              style={[styles.Icon, { color: colors.text }]}
            />
            <Text style={[styles.optionText, { color: colors.text }]}>
              Ubah Password
            </Text>
            <MaterialIcons
              name="arrow-forward-ios"
              size={14}
              style={[styles.optionIcon, { color: colors.text }]}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Preferensi
          </Text>
          <TouchableOpacity
            style={[styles.optionTop, { backgroundColor: colors.card }]}
          >
            <MaterialIcons
              name="security"
              size={21}
              style={[styles.Icon, { color: colors.text }]}
            />
            <Text style={[styles.optionText, { color: colors.text }]}>
              Data & Privasi
            </Text>
            <MaterialIcons
              name="arrow-forward-ios"
              size={14}
              style={[styles.optionIcon, { color: colors.text }]}
            />
          </TouchableOpacity>
          <View style={[styles.optionCenter, { backgroundColor: colors.card }]}>
            <MaterialIcons
              name="notifications"
              size={22}
              style={[styles.Icon, { color: colors.text }]}
            />
            <Text style={[styles.optionText, { color: colors.text }]}>
              Notifikasi
            </Text>

            <Switch
              trackColor={{ false: "#163020", true: "#ffffff" }}
              thumbColor={isNotificationEnabled ? "#163020" : "#f4f3f4"}
              onValueChange={toggleSwitch}
              value={isNotificationEnabled}
            />
          </View>
          <View style={[styles.optionBottom, { backgroundColor: colors.card }]}>
            <MaterialIcons
              name="dark-mode"
              size={22}
              style={[styles.Icon, { color: colors.text }]}
            />
            <Text style={[styles.optionText, { color: colors.text }]}>
              Mode Malam
            </Text>

            <Switch
              trackColor={{ false: "#163020", true: "#ffffff" }}
              thumbColor={isDarkmodeEnabled ? "#163020" : "#f4f3f4"}
              onValueChange={toggleDarkMode}
              value={isDarkmodeEnabled}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Dukungan
          </Text>
          <TouchableOpacity
            style={[styles.optionTop, { backgroundColor: colors.card }]}
          >
            <MaterialIcons
              name="help"
              size={21}
              style={[styles.Icon, { color: colors.text }]}
            />
            <Text style={[styles.optionText, { color: colors.text }]}>
              Bantuan
            </Text>
            <MaterialIcons
              name="arrow-forward-ios"
              size={14}
              style={[styles.optionIcon, { color: colors.text }]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionCenter, { backgroundColor: colors.card }]}
          >
            <MaterialIcons
              name="phone-in-talk"
              size={22}
              style={[styles.Icon, { color: colors.text }]}
            />
            <Text style={[styles.optionText, { color: colors.text }]}>
              Hubungi Kami
            </Text>
            <MaterialIcons
              name="arrow-forward-ios"
              size={14}
              style={[styles.optionIcon, { color: colors.text }]}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={navigateToTentang}
            style={[styles.optionBottom, { backgroundColor: colors.card }]}
          >
            <MaterialIcons
              name="info"
              size={21}
              style={[styles.Icon, { color: colors.text }]}
            />
            <Text style={[styles.optionText, { color: colors.text }]}>
              Tentang
            </Text>
            <MaterialIcons
              name="arrow-forward-ios"
              size={14}
              style={[styles.optionIcon, { color: colors.text }]}
            />
          </TouchableOpacity>
        </View>

        <LinearGradient
          colors={["#163020", "#0f1e14"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.logoutButton}
        >
          <TouchableOpacity
            onPress={navigateToLogin}
            style={styles.logoutWidth}
          >
            <Text style={styles.logoutText}>Keluar</Text>
            <Image
              source={require("../../images/logout.png")}
              style={styles.logout}
            />
          </TouchableOpacity>
        </LinearGradient>
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    borderRadius: 5,
  },
  section: {
    marginTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  weatherCard: {
    padding: 20,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  page: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 20,
  },
  optionTop: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: "#f2f2f2",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginBottom: 3,
    width: "90%",
    alignSelf: "center",
  },
  optionBottom: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: "#f2f2f2",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 3,
    width: "90%",
    alignSelf: "center",
  },
  optionCenter: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: "#f2f2f2",
    marginBottom: 3,
    width: "90%",
    alignSelf: "center",
  },
  optionText: {
    fontSize: 16,
    flex: 1,
  },
  optionIcon: {
    width: 20,
    height: 20,
  },
  Icon: {
    width: 20,
    height: 20,
    marginRight: 15,
  },
  logoutButton: {
    paddingVertical: 15,
    borderRadius: 50,
    marginTop: 20,
    alignItems: "center",
    width: "40%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  logoutWidth: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  logout: {
    width: 20,
    height: 20,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  bottomSpacer: {
    height: 100,
  },
  darkmode: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Settings;
