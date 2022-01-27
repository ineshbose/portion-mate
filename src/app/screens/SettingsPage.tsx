import * as React from 'react';
import {
  Divider,
  Icon,
  Layout,
  Text,
  Toggle,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {
  ImageProps,
  Pressable,
  PressableProps,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { useThemeContext } from '../contexts/ThemeContext';
import { RootTabScreenProps } from '../types/navigation';
import { IconOptions } from '../types';

type SettingProps = PressableProps & {
  hint: string;
  children?: React.ReactNode;
};

function Setting(props: SettingProps) {
  const { hint, children, ...pressableProps } = props;

  return (
    <React.Fragment>
      <Pressable {...pressableProps} style={styles.setting}>
        <Text category="s2">{hint}</Text>
        {children}
      </Pressable>
      <Divider />
    </React.Fragment>
  );
}

export default function SettingsPage({
  navigation,
}: RootTabScreenProps<'Settings'>) {
  const { switchTheme, theme } = useThemeContext();

  const renderActionIcon = (
    props: Partial<ImageProps> | undefined,
    name: IconOptions
  ) => <Icon key={name} name={name} {...props} />;

  const renderMoreAction = (props: {} | undefined) => (
    <TopNavigationAction icon={(p) => renderActionIcon(p, 'save')} {...props} />
  );

  const renderBackAction = (props: {} | undefined) => (
    <TopNavigationAction
      icon={(p) => renderActionIcon(p, 'arrow-back')}
      onPress={() => navigation.goBack()}
      {...props}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={styles.container}>
        <TopNavigation
          alignment="center"
          title="Settings"
          accessoryLeft={renderBackAction}
          accessoryRight={renderMoreAction}
        />
        <Setting hint="Edit Profile" />
        <Setting hint="Change Password" />
        <Setting hint="Notification" />
        <Setting hint="Privacy" />
        <Setting hint="System Theme" onPress={() => switchTheme()}>
          <Toggle
            status={theme === 'light' ? 'warning' : 'basic'}
            onChange={() => switchTheme()}
            checked={theme === 'light'}
          >
            {theme}
          </Toggle>
        </Setting>
      </Layout>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  setting: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  section: {
    paddingTop: 32,
  },
});
