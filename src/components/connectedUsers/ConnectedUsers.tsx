import React from "react";
import styled from "styled-components";
import { Text, NoteText } from "../base/Text";
import { ConnectedUserItem } from "./ConncetedUserItem";
import { useUsers } from "../../hooks/connectedUsers";

interface IConnectedUsersProps {}

export function ConnectedUsers(props: IConnectedUsersProps) {
  const { users } = useUsers();
  return (
    <Container>
      <Title>Users</Title>
      {users.map(item => (
        <ConnectedUserItem key={item.id} user={item} />
      ))}
      {!users.length && <NoteText>no connected users</NoteText>}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px;
  align-self: center;
  align-items: center;
`;
const Title = styled(Text)`
  font-size: 30px;
  font-weight: 500;
`;
