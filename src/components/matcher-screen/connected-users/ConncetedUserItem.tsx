import * as React from 'react';
import styled from 'styled-components';
import { Text } from '../../base/Text';
import { IUser } from '../../../types/types';

interface IProps {
  user: IUser;
}

export function ConnectedUserItem(props: IProps) {
  return (
    <Text>
      {props.user.name} ({props.user.connectionStatus})
    </Text>
  );
}

// const Avatar = styled.image`
//   width: 60px;
//   height: 60px;
//   border-radius: 30px;
//   /* testing porpuses */
//   background-color: teal;
// `
