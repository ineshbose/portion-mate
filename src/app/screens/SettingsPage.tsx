import React from 'react';
import {
  ImageProps,
  Pressable,
  PressableProps,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Divider,
  Icon,
  Input,
  Layout,
  Modal,
  Text,
  TextProps,
  Toggle,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { useAppContext } from '../contexts/AppContext';
import { useThemeContext } from '../contexts/ThemeContext';
import { deleteUser, updateUser } from '../api/user';
import { RootTabScreenProps } from '../types/navigation';
import { IconOptions } from '../types';
import { passwordAccessory } from './Auth/FormStyle';

type SettingProps = PressableProps & {
  hint: string;
  hintProps?: TextProps;
  children?: React.ReactNode;
};

function Setting(props: SettingProps) {
  const { hint, hintProps, children, ...pressableProps } = props;

  return (
    <>
      <Pressable {...pressableProps} style={styles.setting}>
        <Text {...hintProps} category="s2">
          {hint}
        </Text>
        {children}
      </Pressable>
      <Divider />
    </>
  );
}

function SettingSection(props: SettingProps) {
  const { hint, hintProps, children } = props;

  return (
    <>
      <View style={styles.setting}>
        <Text {...hintProps} category="s2">
          {hint}
        </Text>
      </View>
      <Divider />
      <View style={styles.section}>{children}</View>
      <Divider />
    </>
  );
}

export default function SettingsPage({
  navigation,
}: RootTabScreenProps<'Settings'>) {
  const {
    user,
    helpers: { setUser, signOut },
  } = useAppContext();
  const { switchTheme, theme } = useThemeContext();

  const [forename, setForename] = React.useState<string>('');
  const [surname, setSurname] = React.useState<string>('');
  const [age, setAge] = React.useState<number>(0);
  const [height, setHeight] = React.useState<number>(0);
  const [weight, setWeight] = React.useState<number>(0);

  const [oldPassword, setOldPassword] = React.useState<string>('');
  const [newPassword, setNewPassword] = React.useState<string>('');
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');
  const [passwordVisibility, setPasswordVisibility] =
    React.useState<boolean>(false);

  const [error, setError] = React.useState<any>();

  const [warnModalVisibility, setWarnModalVisibility] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    if (user) {
      setForename(user.forename || '');
      setSurname(user.surname || '');
      setAge(user.age || 0);
      setHeight(user.height || 0);
      setWeight(user.weight || 0);
    }
  }, [user, setForename, setSurname, setAge, setHeight, setWeight]);

  const strToNum = (val: string) => {
    return parseInt(val.match(/\d+/g)?.join('') || '0');
  };

  const resetFields = () => {
    setError(undefined);
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const updateProfile = async () => {
    if (user) {
      const newUser = {
        ...user,
        forename,
        surname,
        picture: null,
        age,
        height,
        weight,
      };
      await updateUser({
        ...newUser,
        old_password: oldPassword,
        password: newPassword,
      })
        .then(resetFields)
        .catch(setError);
      setUser(newUser);
    }
  };

  const renderActionIcon = (
    props: Partial<ImageProps> | undefined,
    name: IconOptions
  ) => <Icon key={name} name={name} {...props} />;

  const renderMoreAction = (props: {} | undefined) => (
    <TopNavigationAction
      icon={(p) => renderActionIcon(p, 'save')}
      onPress={updateProfile}
      {...props}
    />
  );

  const renderBackAction = (props: {} | undefined) => (
    <TopNavigationAction
      icon={(p) => renderActionIcon(p, 'arrow-back')}
      onPress={() => navigation.goBack()}
      {...props}
    />
  );

  const cardHeader = (props: ViewProps | undefined) => (
    <View {...props}>
      <Text category="s2">Are you sure?</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Layout style={styles.container}>
        {user ? (
          <>
            <TopNavigation
              alignment="center"
              title="Settings"
              accessoryLeft={renderBackAction}
              accessoryRight={renderMoreAction}
            />
            <ScrollView>
              <SettingSection hint="Edit Profile">
                <Avatar
                  source={{
                    uri: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp',
                  }}
                  size="giant"
                  style={styles.avatar}
                />
                <Input
                  placeholder="forename"
                  value={forename}
                  onChangeText={setForename}
                />
                <Input
                  placeholder="surname"
                  value={surname}
                  onChangeText={setSurname}
                />
                <Input
                  placeholder="age"
                  value={`${age || ''}`}
                  onChangeText={(t) => setAge(strToNum(t))}
                />
                <Input
                  placeholder="height (cm)"
                  value={`${height || ''}`}
                  onChangeText={(t) => setHeight(strToNum(t))}
                />
                <Input
                  placeholder="weight (cm)"
                  value={`${weight || ''}`}
                  onChangeText={(t) => setWeight(strToNum(t))}
                />
              </SettingSection>
              <SettingSection hint="Change Password">
                <Input
                  placeholder="current password"
                  onChangeText={setOldPassword}
                  secureTextEntry={!passwordVisibility}
                  accessoryRight={(props) =>
                    passwordAccessory(
                      props,
                      setPasswordVisibility,
                      passwordVisibility
                    )
                  }
                  value={oldPassword}
                  caption={error?.old_password}
                  status={error?.old_password ? 'danger' : 'basic'}
                />
                <Input
                  placeholder="new password"
                  onChangeText={setNewPassword}
                  secureTextEntry={!passwordVisibility}
                  accessoryRight={(props) =>
                    passwordAccessory(
                      props,
                      setPasswordVisibility,
                      passwordVisibility
                    )
                  }
                  value={newPassword}
                  caption={error?.password}
                  status={error?.password ? 'danger' : 'basic'}
                />
                <Input
                  placeholder="repeat password"
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!passwordVisibility}
                  accessoryRight={(props) =>
                    passwordAccessory(
                      props,
                      setPasswordVisibility,
                      passwordVisibility
                    )
                  }
                  value={confirmPassword}
                  caption={
                    error?.confirmPassword ||
                    (confirmPassword && confirmPassword !== newPassword
                      ? 'Does not match with your password.'
                      : '')
                  }
                  status={
                    error?.confirmPassword ||
                    (confirmPassword && confirmPassword !== newPassword)
                      ? 'danger'
                      : 'basic'
                  }
                />
              </SettingSection>
              <Setting hint="Notifications" />
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
              <Setting
                hint="Delete Account"
                hintProps={{ status: 'danger' }}
                onPress={() => setWarnModalVisibility(true)}
              />
              <Modal
                visible={warnModalVisibility}
                backdropStyle={styles.alertBackdrop}
                onBackdropPress={() => setWarnModalVisibility(false)}
              >
                <Card
                  status="danger"
                  style={[styles.container, styles.cardMargin]}
                  header={cardHeader}
                >
                  <Button
                    status="danger"
                    onPress={() => {
                      deleteUser(user);
                      signOut();
                    }}
                  >
                    Confirm
                  </Button>
                  <Button
                    appearance="ghost"
                    status="basic"
                    onPress={() => setWarnModalVisibility(false)}
                  >
                    Cancel
                  </Button>
                </Card>
              </Modal>
            </ScrollView>
          </>
        ) : (
          <Layout style={[styles.container, styles.noSettingsContainer]}>
            <Text style={styles.noSettingsTitle}>
              {'Something went wrong. Please login.'}
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
  setting: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  section: {
    marginTop: 20,
    marginBottom: 40,
    alignContent: 'center',
    marginHorizontal: 10,
  },
  avatar: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  cardMargin: {
    margin: 2,
  },
  alertBackdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  noSettingsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  noSettingsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
