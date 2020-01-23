import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { Results } from './Results';
import { socketService } from '../../../utils/socket.service';
import { companyStyles } from '../../../styles/theme';
import { ThemeProvider } from 'styled-components';
import { act } from 'react-dom/test-utils';
import moment from 'moment';

jest.mock('../../../utils/socket.service', () => {
  const callbacks = {};
  return {
    socketService: {
      on(event: string, callback) {
        callbacks[event] = callback;
      },
      emit(eventName, event) {},
      _simulateIncomingEvent(eventName, event) {
        callbacks[eventName](event);
      }
    }
  };
});

companyStyles.setStyles({
  contrastPrimaryColor: 'white',
  primaryColor: 'teal',
  theme: 'white'
});

describe('Results', () => {
  test('Should show an empty message', () => {
    const { getByText, getByTestId } = render(
      <ThemeProvider theme={companyStyles.styles}>
        <Results />
      </ThemeProvider>
    );
    act(() => {
      socketService._simulateIncomingEvent('addSchedule', {
        id: '1',
        title: 'hello',
        start: moment.utc().toDate(),
        end: moment
          .utc()
          .add(1, 'hour')
          .toDate(),
        userId: '1',
        color: 'teal'
      });
    });
    expect(getByTestId('empty-message')).toBeInTheDocument();
  });

  test('Should show an overlap schedule', () => {
    const { getByText, getByTestId } = render(
      <ThemeProvider theme={companyStyles.styles}>
        <Results />
      </ThemeProvider>
    );
    act(() => {
      socketService._simulateIncomingEvent('addSchedule', {
        id: '1',
        title: 'hello',
        start: moment.utc().toDate(),
        end: moment
          .utc()
          .add(1, 'hour')
          .toDate(),
        userId: '1',
        color: 'teal'
      });
      socketService._simulateIncomingEvent('addSchedule', {
        id: '2',
        title: 'this should overlap',
        start: moment
          .utc()
          .add(0.5, 'hours')
          .toDate(),
        end: moment
          .utc()
          .add(1.5, 'hours')
          .toDate(),
        userId: '1',
        color: 'teal'
      });
    });
    expect(getByTestId('result-item')).toBeInTheDocument();
  });
});
