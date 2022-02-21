import React from 'react';
import {
  Linking,
  ListRenderItemInfo,
  SafeAreaView,
  ScrollView,
  View,
  ViewProps,
} from 'react-native';
import {
  Button,
  ButtonGroup,
  Card,
  Layout,
  List,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import Markdown from 'react-native-markdown-display';
import { useAppContext } from '../../contexts';
import { bookmarkResource, getResources } from '../../api/resources';
import { Resource, Resources } from '../../types/api';
import { getItems, renderIcon } from '../../constants/helpers';
import createStyle from '../../constants/Styles';

export default function ResourcesPage() {
  const { headerAction } = useAppContext();
  const isAction = headerAction === 'Resources';
  const [fetched, setFetched] = React.useState<boolean>(false);
  const [resources, setResources] = React.useState<Resources>([]);
  const [selectedResource, setSelectedResource] = React.useState<Resource>();

  React.useEffect(() => {
    // const getItems = async () => {
    //   if (!fetched) {
    //     setResources(await getResources());
    //     setFetched(true);
    //   }
    // };

    // getItems();
    getItems(
      { fetched, setFetched },
      { fetchItems: getResources, setItems: setResources }
    );
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

  const renderMoreAction = (props: {} | undefined) =>
    selectedResource ? (
      <ButtonGroup {...props} appearance="ghost" status="basic">
        <Button
          accessoryLeft={(p) =>
            renderIcon(p, selectedResource.bookmarked ? 'star' : 'star-outline')
          }
          onPress={() => bookmarkAction(selectedResource)}
        />
        <Button
          accessoryLeft={(p) => renderIcon(p, 'open-in-new')}
          onPress={() => Linking.openURL(selectedResource.link)}
        />
      </ButtonGroup>
    ) : (
      <></>
    );

  const renderBackAction = (props: {} | undefined) => (
    <TopNavigationAction
      icon={(p) => renderIcon(p, 'arrow-back')}
      onPress={() => setSelectedResource(undefined)}
      {...props}
    />
  );

  const renderItemFooter = (
    props: ViewProps | undefined,
    info: ListRenderItemInfo<Resource>
  ) => (
    <View {...props} style={[styles.itemFooter, styles.flexDirectionRow]}>
      <View
        style={[
          styles.flex1,
          styles.justifyContentCenter,
          styles.marginHorizontal1,
        ]}
      >
        <Text category="s2">{info.item.author}</Text>
        <Text appearance="hint" category="c1">
          {info.item.date_published}
        </Text>
      </View>
      <Button
        appearance="ghost"
        status="basic"
        accessoryLeft={(p) =>
          renderIcon(p, info.item.bookmarked ? 'star' : 'star-outline')
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
    <SafeAreaView style={styles.flex1}>
      <Layout style={styles.flex1}>
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
              <Text>
                <Markdown
                  style={{
                    body: styles.contentContainer,
                    image: styles.contentImage,
                  }}
                >
                  {selectedResource.content}
                </Markdown>
              </Text>
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
          <Layout
            style={[
              styles.flex1,
              styles.alignItemsCenter,
              styles.justifyContentCenter,
              styles.padding2,
            ]}
          >
            <Text style={styles.noResourceTitle}>
              {'No resources available'}
            </Text>
          </Layout>
        )}
      </Layout>
    </SafeAreaView>
  );
}

const styles = createStyle({
  contentContainer: {
    paddingHorizontal: 10,
  },
  contentImage: {
    flex: 1,
    maxWidth: 400,
    margin: 'auto',
  },
  noResourceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  item: {
    marginVertical: 8,
  },
  itemFooter: {
    marginHorizontal: -8,
  },
});
