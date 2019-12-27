import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';

interface IProps {

}

/**
 * Bootstraping the app allows us to use
 * all the basic hooks like routing, etc. directly on <App />
 */
export function Bootstrap(props: IProps) {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}