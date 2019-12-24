import React from 'react';
import './App.css';
import { ConnectedUsers } from './connectedUsers/ConnectedUsers';
import { Calendar } from './Calendar';
import { Results } from './results/Results';
import styled, { ThemeProvider } from 'styled-components';
import { companyStyles } from '../styles/theme';
import 'moment/locale/es';

companyStyles.setStyles({ theme: 'white', primaryColor: '#e91e63', contrastPrimaryColor: 'white' });


export function App() {
  return (
    <ThemeProvider theme={companyStyles.styles}>
      <Container>
        <ConnectedUsers />
        <Calendar />
        <Results />
      </Container>
    </ThemeProvider>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* height: 100vh;
  width: 100vw; */
  background-color: ${props => props.theme.screenColor};
`