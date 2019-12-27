import * as React from 'react';

interface IProps {
  message: string
}

export function ErrorScreen(props: IProps) {
  return (
    <div>Ups! {props.message}</div>
  );
}