import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import Description from "./pages/description";
import Monitoring from "./pages/monitoring";
import Settings from "./pages/settings";
import Navbar from "./components/Navbar";
import MasaPanen from "./pages/monitoringMenu/masaPanen";
import Pemupukan from "./pages/monitoringMenu/pemupukan";
import Penyiraman from "./pages/monitoringMenu/penyiraman";
import Tentang from "./pages/tentang";
import StatusKaryawan from "./pages/monitoringMenu/statusKaryawan";
import AdminDashboard from "./pages/Admin/adminDashboard";
import AdminDescription from "./pages/Admin/adminDescription";
import ForgotPassword from "./pages/forgotPassword";
import ResetPassword from "./pages/resetPassword";
import AdminAddPlant from "./pages/Admin/adminAddPlant";
import AdminEditPlant from "./pages/Admin/adminEditPlant";
import AdminNavbar from "./components/AdminNavbar";
import AdminMonitoring from "./pages/Admin/adminMonitoring";
import AdminTentang from "./pages/Admin/adminTentang";
import AdminSettings from "./pages/Admin/adminSettings";
import AdminMasaPanen from "./pages/Admin/monitoringMenu/masaPanen";
import AdminPemupukan from "./pages/Admin/monitoringMenu/pemupukan";
import AdminPenyiraman from "./pages/Admin/monitoringMenu/penyiraman";
import AdminDetailKaryawan from "./pages/Admin/monitoringMenu/karyawanDetail"
import AdminStatusKaryawan from "./pages/Admin/monitoringMenu/statusKaryawan";
import { AuthProvider } from "./components/AuthContext";
import { ThemeProvider, useTheme } from "./components/ThemeContext";
import { StatusBar } from "react-native";

const Stack = createNativeStackNavigator();

const ThemedStatusBar = () => {
  const { isDark } = useTheme();

  return <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />;
};

export default function App() {
  const navigationRef = useNavigationContainerRef();
  const [currentRoute, setCurrentRoute] = useState();

  useEffect(() => {
    const onReady = () => {
      setCurrentRoute(navigationRef.getCurrentRoute().name);
      navigationRef.addListener("state", () => {
        setCurrentRoute(navigationRef.getCurrentRoute().name);
      });
    };

    if (navigationRef.isReady()) {
      onReady();
    } else {
      navigationRef.addListener("ready", onReady);
    }

    return () => {
      navigationRef.removeListener("state", () => {
        setCurrentRoute(navigationRef.getCurrentRoute().name);
      });
    };
  }, [navigationRef]);

  const isAdminRoute = [
    "AdminDashboard",
    "AdminDescription",
    "AdminEditPlant",
    "AdminAddPlant",
    "AdminMonitoring",
    "AdminSettings",
    "AdminMasaPanen",
    "AdminPemupukan",
    "AdminPenyiraman",
    "AdminTentang",
    "AdminStatusKaryawan",
    "AdminDetailKaryawan",
  ].includes(currentRoute);

  return (
    <ThemeProvider>
      <AuthProvider>
        <ThemedStatusBar />
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Monitoring" component={Monitoring} />
            <Stack.Screen name="Description" component={Description} />
            <Stack.Screen name="Tentang" component={Tentang} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="MasaPanen" component={MasaPanen} />
            <Stack.Screen name="Pemupukan" component={Pemupukan} />
            <Stack.Screen name="Penyiraman" component={Penyiraman} />
            <Stack.Screen name="StatusKaryawan" component={StatusKaryawan} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            {/* Admin Page */}
            <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
            <Stack.Screen name="AdminDescription" component={AdminDescription} />
            <Stack.Screen name="AdminEditPlant" component={AdminEditPlant} />
            <Stack.Screen name="AdminAddPlant" component={AdminAddPlant} />
            <Stack.Screen name="AdminMonitoring" component={AdminMonitoring} />
            <Stack.Screen name="AdminDetailKaryawan" component={AdminDetailKaryawan} />
            <Stack.Screen name="AdminSettings" component={AdminSettings} />
            <Stack.Screen name="AdminMasaPanen" component={AdminMasaPanen} />
            <Stack.Screen name="AdminPemupukan" component={AdminPemupukan} />
            <Stack.Screen name="AdminTentang" component={AdminTentang} />
            <Stack.Screen name="AdminPenyiraman" component={AdminPenyiraman} />
            <Stack.Screen name="AdminStatusKaryawan" component={AdminStatusKaryawan} />
          </Stack.Navigator>
          {!["Register", "Login", "ForgotPassword", "ResetPassword"].includes(currentRoute) &&
            (isAdminRoute ? <AdminNavbar /> : <Navbar />)}
        </NavigationContainer>
      </AuthProvider>
    </ThemeProvider>
  );
}
