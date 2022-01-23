import * as React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Layout, Tab, TabBar } from '@ui-kitten/components';
import { PieChart } from 'react-native-chart-kit';
import ScreenLayout from '../constants/Layout';
import { useAppContext } from '../contexts/AppContext';
import { PortionItem, TrackItem } from '../types/api';
import { useThemeContext } from '../contexts/ThemeContext';

const chartConfig = {
  backgroundColor: '#e26a00',
  backgroundGradientFrom: '#fb8c00',
  backgroundGradientTo: '#ffa726',
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};

export default function StatsPage() {
  const { items, headerAction } = useAppContext();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isAction = headerAction === 'Stats';
  const { theme } = useThemeContext();
  const [frequency, setFrequency] = React.useState<number>(0);

  const renderPieData = (item: TrackItem) => ({
    name: (item.item as PortionItem).name,
    population: item.logs?.length || 0,
    color: `#${(((Math.random() + 2) * 16777216) | 0).toString(16).slice(1)}`,
    legendFontColor: theme === 'light' ? '#00000' : '#ffffff',
    legendFontSize: 15,
  });

  return (
    <SafeAreaView style={styles.container}>
      <Layout style={styles.container}>
        <TabBar selectedIndex={frequency} onSelect={setFrequency}>
          <Tab title="DAILY" />
          <Tab title="WEEKLY" disabled />
          <Tab title="MONTHLY" disabled />
        </TabBar>
        <ScrollView>
          <PieChart
            data={items ? items.map(renderPieData) : []}
            width={ScreenLayout.window.width}
            height={220}
            chartConfig={chartConfig}
            paddingLeft="15"
            backgroundColor="transparent"
            accessor="population"
          />
        </ScrollView>
      </Layout>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
