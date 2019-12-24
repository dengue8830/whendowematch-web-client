import * as React from 'react';
import styled from 'styled-components';

interface IProps {

}

export function ConnectedUserItem(props: IProps) {
  return <Avatar />;
}

const Avatar = styled.image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  /* testing porpuses */
  background-color: teal;
`