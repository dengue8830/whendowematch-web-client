import * as React from 'react';
import styled from 'styled-components';
import { Text } from '../base/Text';

interface IProps {
  name: string
}

export function ConnectedUserItem(props: IProps) {
  return <Text>{props.name}</Text>;
}

// const Avatar = styled.image`
//   width: 60px;
//   height: 60px;
//   border-radius: 30px;
//   /* testing porpuses */
//   background-color: teal;
// `