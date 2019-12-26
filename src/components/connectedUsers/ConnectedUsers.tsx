import React from 'react';
import styled from 'styled-components';
import { Text, NoteText } from '../base/Text';
import { ConnectedUserItem } from './ConncetedUserItem';
import { useDidMount } from '../../utils/hooksUtils';
import { socketService } from '../../utils/socket.service';
import { IUser } from '../../types/types';
import { useImmer } from 'use-immer';

interface IConnectedUsersProps {

}

function useUsers() {
  const [users, setUsers] = useImmer<IUser[]>([]);

  useDidMount(() => {
    socketService.on('userConnected', (user) => {
      console.log('userConnected', user);
      setUsers(draft => {
        let existingUser = draft.find(u => u.id === user.id);
        if (existingUser) {
          Object.assign(existingUser, user);
          // existingUser.connectionStatus = 'connected';
          // existingUser = {...user};
          return draft;
        } else {
          return [...draft, user];
        }
      });
    });
    socketService.on('userDisconnected', (user) => {
      console.log('userDisconnected', user);
      setUsers(draft => {
        const u = draft.find(u => u.id === user.id);
        if (u) u.connectionStatus = 'disconnected';
        return draft;
      });
    });
    socketService.emit('getUsers');
    socketService.on('getUsers', function (users: IUser[]) {
      console.log('users', users);
      setUsers(() => users);
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
        users.map(item => (<ConnectedUserItem key={item.id} user={item} />))
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