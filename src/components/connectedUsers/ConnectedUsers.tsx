import React from 'react';
import styled from 'styled-components';
import { Text, NoteText } from '../base/Text';
import { ConnectedUserItem } from './ConncetedUserItem';

interface IConnectedUsersProps {

}

export function ConnectedUsers(props: IConnectedUsersProps) {
  const [users, setusers] = React.useState([]);
  return (
    <Container>
      <Title>connected users</Title>
      {
        users.map(item => (<ConnectedUserItem />))
      }
      {
        !users.length &&
        <NoteText>no connected users</NoteText>
      }
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px;
  align-self: center;
  align-items: center;
`
const Title = styled(Text)`
  font-size: 30px;
  font-weight: 500;
`