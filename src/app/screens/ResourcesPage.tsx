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
import { getResources } from '../api/resources';
import { IconOptions } from '../types';
import { ComponentTabArguments } from '../types/navigation';

export default function ResourcesPage(
  pageProps: ComponentTabArguments<'Resources'>
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isAction } = pageProps;
  const [resources, setResources] = React.useState<Resources>([]);
  const [selectedResource, setSelectedResource] = React.useState<Resource>();

  React.useEffect(() => {
    const getItems = async () => {
      if (!(resources && resources.length > 0)) {
        setResources((await getResources()) as Resources);
      }
    };

    getItems();
  }, [resources, setResources]);

  const renderActionIcon = (
    props: Partial<ImageProps> | undefined,
    name: IconOptions
  ) => <Icon key={name} name={name} {...props} />;

  const renderMoreAction = (props: {} | undefined) => (
    <ButtonGroup {...props} appearance="ghost" status="basic">
      <Button accessoryLeft={(p) => renderActionIcon(p, 'star')} />
      <Button
        accessoryLeft={(p) => renderActionIcon(p, 'open-in-new')}
        onPress={() =>
          Linking.openURL(selectedResource ? selectedResource.link : '')
        }
      />
    </ButtonGroup>
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
        accessoryLeft={(p) => renderActionIcon(p, 'star')}
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
          <List data={resources} renderItem={renderItem} />
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
