import * as React from 'react';
import {
  ImageProps,
  Linking,
  ListRenderItemInfo,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
import {
  Button,
  ButtonGroup,
  Card,
  Icon,
  Layout,
  List,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import Markdown from 'react-native-markdown-display';
import { Resource, Resources } from '../types/api';
import { bookmarkResource, getResources } from '../api/resources';
import { IconOptions } from '../types';
import { useAppContext } from '../contexts/AppContext';

export default function ResourcesPage() {
  const { headerAction } = useAppContext();
  const isAction = headerAction === 'Resources';
  const [fetched, setFetched] = React.useState<boolean>(false);
  const [resources, setResources] = React.useState<Resources>([]);
  const [selectedResource, setSelectedResource] = React.useState<Resource>();

  React.useEffect(() => {
    const getItems = async () => {
      if (!fetched) {
        setResources((await getResources()) as Resources);
        setFetched(true);
      }
    };

    getItems();
  }, [fetched, setResources, setFetched]);

  const bookmarkAction = async (resource: Resource) => {
    const resourceIdx = resources.indexOf(resource);
    const newResource = { ...resource };
    const newResources = [...resources];

    await bookmarkResource(resource);
    newResource.bookmarked = !resource.bookmarked;

    if (selectedResource) {
      setSelectedResource(newResource);
    }

    newResources[resourceIdx] = newResource;
    setResources(newResources);
  };

  const renderActionIcon = (
    props: Partial<ImageProps> | undefined,
    name: IconOptions
  ) => <Icon key={name} name={name} {...props} />;

  const renderMoreAction = (props: {} | undefined) =>
    selectedResource ? (
      <ButtonGroup {...props} appearance="ghost" status="basic">
        <Button
          accessoryLeft={(p) =>
            renderActionIcon(
              p,
              selectedResource.bookmarked ? 'star' : 'star-outline'
            )
          }
          onPress={() => bookmarkAction(selectedResource)}
        />
        <Button
          accessoryLeft={(p) => renderActionIcon(p, 'open-in-new')}
          onPress={() => Linking.openURL(selectedResource.link)}
        />
      </ButtonGroup>
    ) : (
      <></>
    );

  const renderBackAction = (props: {} | undefined) => (
    <TopNavigationAction
      icon={(p) => renderActionIcon(p, 'arrow-back')}
      onPress={() => setSelectedResource(undefined)}
      {...props}
    />
  );

  const renderItemFooter = (
    props: ViewProps | undefined,
    info: ListRenderItemInfo<Resource>
  ) => (
    <View {...props} style={styles.itemFooter}>
      <View style={styles.itemAuthoringContainer}>
        <Text category="s2">{info.item.author}</Text>
        <Text appearance="hint" category="c1">
          {info.item.date_published}
        </Text>
      </View>
      <Button
        appearance="ghost"
        status="basic"
        accessoryLeft={(p) =>
          renderActionIcon(p, info.item.bookmarked ? 'star' : 'star-outline')
        }
        onPress={() => bookmarkAction(info.item)}
      />
    </View>
  );

  const renderItem = (info: ListRenderItemInfo<Resource>) => (
    <Card
      style={styles.item}
      footer={(p) => renderItemFooter(p, info)}
      onPress={() => setSelectedResource(info.item)}
    >
      <Text category="h2">{info.item.title}</Text>
      <Text>
        <Markdown>{`${info.item.content.substring(0, 82)}...`}</Markdown>
      </Text>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Layout style={styles.container}>
        {selectedResource ? (
          <>
            <TopNavigation
              alignment="center"
              title={selectedResource.title}
              subtitle={`${selectedResource.author} | ${selectedResource.date_published}`}
              accessoryLeft={renderBackAction}
              accessoryRight={renderMoreAction}
            />
            <ScrollView>
              <Markdown style={{ body: { paddingHorizontal: 10 } }}>
                {selectedResource.content}
              </Markdown>
            </ScrollView>
          </>
        ) : resources.length > 0 ? (
          <List
            data={resources.filter((resource) =>
              isAction ? resource.bookmarked : true
            )}
            renderItem={renderItem}
          />
        ) : (
          <Layout style={styles.noResourceContainer}>
            <Text style={styles.noResourceTitle}>
              {'No resources available'}
            </Text>
          </Layout>
        )}
      </Layout>
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
