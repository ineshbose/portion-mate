import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Calendar, Layout, Tab, TabBar } from '@ui-kitten/components';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart';
import { useAppContext, useThemeContext } from '../../contexts';
import { PortionItem, TrackItem, TrackItems } from '../../types/api';
import Display from '../../constants/Display';
import createStyle from '../../constants/Styles';

const CHART_CONFIG: AbstractChartConfig = {
  backgroundColor: '#e26a00',
  backgroundGradientFrom: '#fb8c00',
  backgroundGradientTo: '#ffa726',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
  propsForLabels: {
    fontFamily: 'Roboto',
  },
};

const todayDate = new Date();
const TODAY = todayDate.toISOString().slice(0, 10);

const tomorrowDate = new Date();
tomorrowDate.setDate(tomorrowDate.getDate() + 1);
const TOMORROW = tomorrowDate.toISOString().slice(0, 10);

const INTERVAL_TIMES = {
  MORNING: new Date(`${TODAY}T05:00:00`),
  AFTERNOON: new Date(`${TODAY}T12:00:00`),
  EVENING: new Date(`${TODAY}T17:00:00`),
  NIGHT: new Date(`${TODAY}T22:00:00`),
  NEXT_MORNING: new Date(`${TOMORROW}T05:00:00`),
};

export default function StatsPage() {
  const { items, headerAction } = useAppContext();
  const isAction = headerAction === 'Stats';
  const { theme } = useThemeContext();
  const {
    window: { width },
  } = Display;
  const [frequency, setFrequency] = React.useState<number>(0);

  const renderPieData = (item: TrackItem) => ({
    name: (item.item as PortionItem).name,
    count: item.logs?.length || 0,
    color: `#${(((Math.random() + 2) * 16777216) | 0).toString(16).slice(1)}`,
    legendFontColor: theme === 'light' ? '#00000' : '#ffffff',
    legendFontSize: 15,
    legendFontFamily: 'Roboto',
  });

  const renderLineData = (trackItems: TrackItems) => {
    const filteredLogs = trackItems.map((item) => {
      const itemLogs = (item.logs || []).map((log) => new Date(log.timestamp));
      return [
        itemLogs.filter(
          (log) =>
            log > INTERVAL_TIMES.MORNING && log < INTERVAL_TIMES.AFTERNOON
        ).length,
        itemLogs.filter(
          (log) =>
            log > INTERVAL_TIMES.AFTERNOON && log < INTERVAL_TIMES.EVENING
        ).length,
        itemLogs.filter(
          (log) => log > INTERVAL_TIMES.EVENING && log < INTERVAL_TIMES.NIGHT
        ).length,
        itemLogs.filter(
          (log) =>
            log > INTERVAL_TIMES.NIGHT && log < INTERVAL_TIMES.NEXT_MORNING
        ).length,
      ];
    });

    const sumArray: number[] = [];
    filteredLogs.forEach((logs) =>
      logs.forEach((num, idx) => {
        sumArray[idx] = (sumArray[idx] || 0) + num;
      })
    );

    return sumArray;
  };

  return (
    <SafeAreaView style={styles.flex1}>
      {isAction ? (
        <Layout
          style={[
            styles.flex1,
            styles.alignItemsCenter,
            styles.justifyContentCenter,
          ]}
        >
          <Calendar max={todayDate} />
        </Layout>
      ) : (
        <Layout style={styles.flex1}>
          <TabBar selectedIndex={frequency} onSelect={setFrequency}>
            <Tab title="DAILY" />
            <Tab title="WEEKLY" disabled />
            <Tab title="MONTHLY" disabled />
          </TabBar>
          <ScrollView>
            <PieChart
              data={items ? items.map(renderPieData) : []}
              width={width}
              height={360}
              chartConfig={CHART_CONFIG}
              paddingLeft="15"
              backgroundColor="transparent"
              accessor="count"
            />
            <LineChart
              data={{
                labels: ['Morning', 'Afternoon', 'Evening', 'Night'],
                datasets: items ? [{ data: renderLineData(items) }] : [],
              }}
              width={width - 50}
              height={360}
              chartConfig={CHART_CONFIG}
              bezier
              style={styles.lineChart}
            />
          </ScrollView>
        </Layout>
      )}
    </SafeAreaView>
  );
}

const styles = createStyle({
  lineChart: {
    borderRadius: 15,
    marginTop: 50,
    marginHorizontal: 20,
  },
});
