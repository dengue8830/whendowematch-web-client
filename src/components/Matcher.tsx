import * as React from 'react';
import { ConnectedUsers } from './connectedUsers/ConnectedUsers';
import { Calendar } from './Calendar';
import { Results } from './results/Results';

interface IProps {

}

export function Matcher(props: IProps) {
  return (
    <>
      <ConnectedUsers />
      <Calendar />
      <Results />
    </>
  );
}