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
import Monitoring from "./pages/monitoring";
import Settings from "./pages/settings";
import Navbar from "./components/Navbar";
import MasaPanen from "./pages/monitoringMenu/masaPanen";
import Pemupukan from "./pages/monitoringMenu/pemupukan";
import Penyiraman from "./pages/monitoringMenu/penyiraman";
import StatusKaryawan from "./pages/monitoringMenu/statusKaryawan";
import { ThemeProvider, useTheme } from './components/ThemeContect';
import { StatusBar } from 'react-native';

const Stack = createNativeStackNavigator();

const ThemedStatusBar = () => {
  const { isDark } = useTheme();

  return (
    <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
  );
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

  return (
    <ThemeProvider>
      <ThemedStatusBar />
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName="Dashboard">
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Monitoring" component={Monitoring} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="MasaPanen" component={MasaPanen} />
          <Stack.Screen name="Pemupukan" component={Pemupukan} />
          <Stack.Screen name="Penyiraman" component={Penyiraman} />
          <Stack.Screen name="StatusKaryawan" component={StatusKaryawan} />
        </Stack.Navigator>
        {currentRoute !== "Register" && currentRoute !== "Login" && <Navbar />}
      </NavigationContainer>
    </ThemeProvider>
  );
}
