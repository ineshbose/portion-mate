import * as React from 'react';
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
import {
  ImageProps,
  ListRenderItemInfo,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useAppContext } from '../contexts/AppContext';
import { Journal, Journals } from '../types/api';
import { deleteJournal, getJournals } from '../api/journals';
import { IconOptions } from '../types';

const TODAY = new Date();

export default function JournalPage() {
  const {
    headerAction,
    helpers: { setHeaderAction },
  } = useAppContext();
  const isAction = headerAction === 'Journal';
  const [fetched, setFetched] = React.useState<boolean>(false);
  const [journals, setJournals] = React.useState<Journals>([]);
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
      const newJournals = journals.filter(
        (journal) => journal.id !== selectedJournal.id
      );

      await deleteJournal(selectedJournal);
      setJournals(newJournals);
    }

    setSelectedJournal(undefined);
  };

  const renderItem = (info: ListRenderItemInfo<Journal>) => (
    <Card style={styles.item} onPress={() => setSelectedJournal(info.item)}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontSize: 30, marginRight: 10 }}>
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
    <SafeAreaView style={{ flex: 1 }}>
      {isAction ? (
        <Layout
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
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
        <Layout style={{ flex: 1 }}>
          <TopNavigation
            alignment="center"
            title={
              selectedJournal ? 'Journal Entry' : date.toLocaleDateString()
            }
            accessoryLeft={accessoryLeft}
            accessoryRight={accessoryRight}
          />
          {selectedJournal ? (
            <ScrollView style={{ padding: 10 }}>
              <View style={{ flexDirection: 'row', marginTop: 40 }}>
                <Text category="label">Time</Text>
                <Text style={{ marginHorizontal: 10 }}>
                  {new Date(selectedJournal.entry_time).toDateString()}
                </Text>
                <Text>
                  {new Date(selectedJournal.entry_time).toLocaleTimeString()}
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text category="label">Meal</Text>
                <Text style={{ marginHorizontal: 10 }}>
                  {selectedJournal.meal}
                </Text>
              </View>
              <Text style={{ marginTop: 40 }}>{selectedJournal.content}</Text>
            </ScrollView>
          ) : journals.length > 0 ? (
            <List data={journals} renderItem={renderItem} />
          ) : (
            <Layout style={styles.noResourceContainer}>
              <Text style={styles.noResourceTitle}>{'No journals added'}</Text>
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
  noResourceContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  noResourceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  item: {
    marginVertical: 8,
  },
  itemHeader: {
    height: 220,
  },
  itemContent: {
    marginVertical: 8,
  },
  itemFooter: {
    flexDirection: 'row',
    marginHorizontal: -8,
  },
  itemAuthoringContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
});
