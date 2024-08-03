import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useTheme } from '../components/ThemeContext'; 
import MonitoringMenu from '../components/MonitoringMenu';
import { LinearGradient } from 'expo-linear-gradient';

const Monitoring = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
        <LinearGradient
          colors={['#163020', '#0f1e14']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.weatherCard}
        >
          <Text style={styles.page}>Monitoring Tanaman</Text>
        </LinearGradient>
        <MonitoringMenu />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  weatherCard: {
    backgroundColor: '#163020',
    padding: 20,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  page: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
});

export default Monitoring;
