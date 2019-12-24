import React from 'react';
import styled from 'styled-components';
import { Text, NoteText } from '../base/Text';
import { ConnectedUserItem } from './ConncetedUserItem';
import { useDidMount } from '../../utils/hooksUtils';
import { socket } from '../../socket';
import { IUser } from '../../types/types';

interface IConnectedUsersProps {

}

function useUsers() {
  const [users, setUsers] = React.useState<IUser[]>([]);

  useDidMount(() => {
    socket.on('newUser', (user) => {
      setUsers(prev => [...prev, user]);
    });
    socket.emit('getUsers');
    socket.on('currentUsers', function (users: IUser[]) {
      setUsers(users);
    });
  });

  return {
    users
  }
}

export function ConnectedUsers(props: IConnectedUsersProps) {
  const { users } = useUsers();
  return (
    <Container>
      <Title>connected users</Title>
      {
        users.map(item => (<ConnectedUserItem name={item.name || 'unknown'} />))
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