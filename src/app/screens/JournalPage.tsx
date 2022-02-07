import React from 'react';
import {
  ImageProps,
  ListRenderItemInfo,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {
  Button,
  Calendar,
  Card,
  Icon,
  Layout,
  List,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { useAppContext } from '../contexts/AppContext';
import { deleteJournal, getJournals } from '../api/journals';
import { Journal, Journals } from '../types/api';
import { IconOptions } from '../types';

const TODAY = new Date();

export default function JournalPage() {
  const {
    journals,
    headerAction,
    helpers: { setJournals, setHeaderAction },
  } = useAppContext();
  const isAction = headerAction === 'Journal';
  const [fetched, setFetched] = React.useState<boolean>(false);
  const [selectedJournal, setSelectedJournal] = React.useState<Journal>();
  const [date, setDate] = React.useState<Date>(TODAY);

  React.useEffect(() => {
    const getItems = async () => {
      if (!fetched) {
        setJournals((await getJournals()) as Journals);
        setFetched(true);
      }
    };

    getItems();
  }, [fetched, setJournals, setFetched]);

  const removeJournal = async () => {
    if (selectedJournal) {
      const newJournals = journals?.filter(
        (journal) => journal.id !== selectedJournal.id
      );

      await deleteJournal(selectedJournal);
      setJournals(newJournals);
    }

    setSelectedJournal(undefined);
  };

  const renderItem = (info: ListRenderItemInfo<Journal>) => (
    <Card style={styles.item} onPress={() => setSelectedJournal(info.item)}>
      <View style={styles.flexRow}>
        <Text style={styles.itemDate}>
          {new Date(info.item.entry_time).toLocaleTimeString().slice(0, 5)}
        </Text>
        <Text category="h3">{info.item.meal}</Text>
      </View>
      <Text>{`${info.item.content.substring(0, 82)}...`}</Text>
    </Card>
  );

  const renderActionIcon = (
    props: Partial<ImageProps> | undefined,
    name: IconOptions
  ) => <Icon key={name} name={name} {...props} />;

  const accessoryLeft = (props: {} | undefined) => {
    const prevDay = new Date(date);
    prevDay.setDate(prevDay.getDate() - 1);

    return selectedJournal ? (
      <TopNavigationAction
        icon={(p) => renderActionIcon(p, 'arrow-back')}
        onPress={() => setSelectedJournal(undefined)}
        {...props}
      />
    ) : (
      <Button
        appearance="ghost"
        status="basic"
        accessoryLeft={(p) => renderActionIcon(p, 'arrow-back')}
        onPress={() => setDate(prevDay)}
      >
        {prevDay.toLocaleDateString()}
      </Button>
    );
  };

  const accessoryRight = (props: {} | undefined) => {
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);

    return selectedJournal ? (
      <TopNavigationAction
        icon={(p) => renderActionIcon(p, 'delete')}
        onPress={removeJournal}
        {...props}
      />
    ) : TODAY >= nextDay ? (
      <Button
        appearance="ghost"
        status="basic"
        accessoryRight={(p) => renderActionIcon(p, 'arrow-forward')}
        onPress={() => setDate(nextDay)}
      >
        {nextDay.toLocaleDateString()}
      </Button>
    ) : (
      <></>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {isAction ? (
        <Layout style={[styles.container, styles.centerContent]}>
          <Calendar
            date={date}
            max={TODAY}
            onSelect={(D) => {
              setDate(D);
              setHeaderAction(undefined);
            }}
          />
        </Layout>
      ) : (
        <Layout style={styles.container}>
          <TopNavigation
            alignment="center"
            title={
              selectedJournal ? 'Journal Entry' : date.toLocaleDateString()
            }
            accessoryLeft={accessoryLeft}
            accessoryRight={accessoryRight}
          />
          {selectedJournal ? (
            <ScrollView style={styles.selectedJournalContainer}>
              <View style={[styles.flexRow, styles.journalInfo]}>
                <Text category="label">Time</Text>
                <Text style={styles.horizontalMargin}>
                  {new Date(selectedJournal.entry_time).toDateString()}
                </Text>
                <Text>
                  {new Date(selectedJournal.entry_time).toLocaleTimeString()}
                </Text>
              </View>
              <View style={styles.flexRow}>
                <Text category="label">Meal</Text>
                <Text style={styles.horizontalMargin}>
                  {selectedJournal.meal}
                </Text>
              </View>
              <Text style={styles.journalContent}>
                {selectedJournal.content}
              </Text>
            </ScrollView>
          ) : journals && journals.length > 0 ? (
            <List data={journals} renderItem={renderItem} />
          ) : (
            <Layout
              style={[
                styles.container,
                styles.centerContent,
                styles.noJournalContainer,
              ]}
            >
              <Text style={styles.noJournalTitle}>{'No journals added'}</Text>
            </Layout>
          )}
        </Layout>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  noJournalContainer: {
    padding: 20,
  },
  noJournalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  item: {
    marginVertical: 8,
  },
  itemDate: {
    fontSize: 30,
    marginRight: 10,
  },
  selectedJournalContainer: {
    padding: 10,
  },
  flexRow: {
    flexDirection: 'row',
  },
  journalInfo: {
    marginTop: 40,
  },
  horizontalMargin: {
    marginHorizontal: 10,
  },
  journalContent: {
    marginTop: 40,
  },
});
