import * as React from 'react';

interface IProps {
  children: any
}

export function Button(props: IProps) {
  return <button>{props.children}</button>;
}