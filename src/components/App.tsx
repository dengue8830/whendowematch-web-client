import React from 'react';
import './App.css';
import { ConnectedUsers } from './connectedUsers/ConnectedUsers';
import { Calendar } from './Calendar';
import { Results } from './results/Results';
import styled from 'styled-components';

export function App() {
  return (
    <Container>
      <ConnectedUsers />
      <Calendar />
      <Results />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`