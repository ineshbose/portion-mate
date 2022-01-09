import * as React from 'react';
import { Card } from 'react-native-elements';
import FormStyle from './FormStyle';
import Logo from './Logo';

export default function AuthForm({
  children,
}: {
  children: (JSX.Element | undefined)[];
}) {
  return (
    <Card containerStyle={FormStyle.container}>
      <Logo />
      {children}
    </Card>
  );
}
