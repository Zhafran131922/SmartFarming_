import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import MasaPanen from '../pages/monitoringMenu/masaPanen';
import Pemupukan from '../pages/monitoringMenu/pemupukan';
import Penyiraman from '../pages/monitoringMenu/penyiraman';
import StatusKaryawan from '../pages/monitoringMenu/statusKaryawan';
import { useTheme } from './ThemeContext';

const initialLayout = { width: Dimensions.get('window').width };

const MonitoringMenu= () => {
  const { colors } = useTheme();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'penyiraman', title: 'Penyiraman' },
        { key: 'masaPanen', title: 'Masa Panen' },
        { key: 'statusKaryawan', title: 'Status Karyawan' },
        { key: 'pemupukan', title: 'Pemupukan' },
    ]);

    const renderScene = SceneMap({
        masaPanen: MasaPanen,
        pemupukan: Pemupukan,
        penyiraman: Penyiraman,
        statusKaryawan: StatusKaryawan,
    });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={props => (
        <TabBar
        {...props}
        scrollEnabled
        indicatorStyle={styles.indicator}
        style={[styles.tabBar, { backgroundColor: colors.background }]} 
        labelStyle={[styles.label, { color: colors.text }]} 
        tabStyle={styles.tab}
        renderLabel={({ route, focused, color }) => (
          <View style={[styles.tabView, focused && styles.activeTab]}>
            <Text style={[styles.label, focused && styles.activeLabel]}>{route.title}</Text>
          </View>
        )}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContent: {
    fontSize: 18,
    color: '#000',
  },
  tabBar: {
    backgroundColor: '#FFFFFF',
  },
  indicator: {
    backgroundColor: '#163020',
    height: 0, 
  },
  label: {
    color: '#163020',
    textAlign: 'center',
  },
  tab: {
    width: 'auto',
  },
  tabView: {
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#163020',
    marginHorizontal: -5,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  activeTab: {
    backgroundColor: '#163020',
  },
  activeLabel: {
    color: '#FFFFFF',
  },
});

export default MonitoringMenu;
