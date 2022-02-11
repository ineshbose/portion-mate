import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Button, Input, Layout, TopNavigation } from '@ui-kitten/components';
import FAB from '../../components/FAB';
import HomePage from '../BottomTab/HomePage';
import { useAppContext } from '../../contexts';
import { createJournal } from '../../api/journals';
import { FormError } from '../../types/api';
import { NavProps, RootActionParamList } from '../../types/navigation';

const yesterdayDate = new Date();
yesterdayDate.setDate(yesterdayDate.getDate() + 1);
const YESTERDAY = yesterdayDate.toISOString().slice(0, 10);

const todayDate = new Date();
const TODAY = todayDate.toISOString().slice(0, 10);

const tomorrowDate = new Date();
tomorrowDate.setDate(tomorrowDate.getDate() + 1);
const TOMORROW = tomorrowDate.toISOString().slice(0, 10);

const INTERVAL_TIMES = {
  LAST_NIGHT: new Date(`${YESTERDAY}T22:00:00`),
  MORNING: new Date(`${TODAY}T05:00:00`),
  AFTERNOON: new Date(`${TODAY}T12:00:00`),
  EVENING: new Date(`${TODAY}T17:00:00`),
  NIGHT: new Date(`${TODAY}T22:00:00`),
  NEXT_MORNING: new Date(`${TOMORROW}T05:00:00`),
};

export default function AddJournal({
  navigation,
}: NavProps<RootActionParamList, 'Journal'>) {
  const {
    journals = [],
    helpers: { setJournals },
  } = useAppContext();
  const [meal, setMeal] = React.useState<string>('');
  const [time, setTime] = React.useState<Date>(todayDate);
  const [content, setContent] = React.useState<string>('');
  const [error, setError] = React.useState<FormError | any>();

  const goBack = () => navigation.goBack();

  const recommendedMeal = () => {
    let mealName = '';

    if (
      (time >= INTERVAL_TIMES.LAST_NIGHT && time < INTERVAL_TIMES.MORNING) ||
      (time >= INTERVAL_TIMES.NIGHT && time < INTERVAL_TIMES.NEXT_MORNING)
    ) {
      mealName = 'Midnight Snack';
    } else if (
      time >= INTERVAL_TIMES.MORNING &&
      time < INTERVAL_TIMES.AFTERNOON
    ) {
      mealName = 'Breakfast';
    } else if (
      time >= INTERVAL_TIMES.AFTERNOON &&
      time < INTERVAL_TIMES.EVENING
    ) {
      mealName = 'Lunch';
    } else if (time >= INTERVAL_TIMES.EVENING && time < INTERVAL_TIMES.NIGHT) {
      mealName = 'Dinner';
    }

    return mealName;
  };

  const logEntry = async () => {
    const newJournal = await createJournal({
      meal,
      entry_time: time.toISOString(),
      content,
    });
    setJournals([...journals, newJournal]);
    goBack();
  };

  const renderCancelAccessory = (props: {} | undefined) => (
    <Button appearance="ghost" status="basic" {...props} onPress={goBack}>
      Cancel
    </Button>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Layout style={styles.container}>
        <TopNavigation
          alignment="start"
          title="Journal Entry"
          accessoryRight={renderCancelAccessory}
        />
        <View style={styles.formContainer}>
          <Input
            placeholder={recommendedMeal() || 'meal'}
            onChangeText={setMeal}
            caption={error?.meal}
            status={error?.meal ? 'danger' : 'basic'}
            size="large"
          />
          <Input
            placeholder="time"
            value={`${time.toDateString()} ${time.toLocaleTimeString()}`}
            onChangeText={(t) => setTime(new Date(t))}
            style={styles.timeInput}
            size="large"
            disabled
          />
        </View>
        <Input
          multiline
          placeholder="journal entry..."
          onChangeText={setContent}
          textStyle={styles.journalEntryText}
          style={styles.journalEntry}
        />
      </Layout>
      <HomePage />
      <FAB
        floatingIcon="check"
        color="green"
        onPressMain={() =>
          meal ? logEntry() : setError({ meal: 'This field is required.' })
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flexDirection: 'row',
    margin: 10,
  },
  timeInput: {
    marginHorizontal: 5,
  },
  journalEntry: {
    margin: 10,
  },
  journalEntryText: {
    minHeight: 100,
  },
});
