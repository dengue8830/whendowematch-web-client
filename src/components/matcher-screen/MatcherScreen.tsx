import * as React from 'react';
import { ConnectedUsers } from './connected-users/ConnectedUsers';
import { Calendar } from './Calendar';
import { Results } from './results/Results';

interface IProps {}

export function MatcherScreen(props: IProps) {
  return (
    <>
      <ConnectedUsers />
      <Calendar />
      <Results />
    </>
  );
}
