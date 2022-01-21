import * as React from 'react';
import { Card } from '@ui-kitten/components';
import Logo from './Logo';

export default function AuthForm({
  children,
}: {
  children: (JSX.Element | undefined)[];
}) {
  return (
    <Card>
      <Logo />
      {children}
    </Card>
  );
}
