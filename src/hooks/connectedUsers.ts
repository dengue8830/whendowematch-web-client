import * as React from "react";
import { useImmer } from "use-immer";
import { useDidMount } from "../utils/hooksUtils";
import { socketService } from "../utils/socket.service";
import { IUser } from "../types/types";

export function useUsers() {
  const [users, setUsers] = useImmer<IUser[]>([]);

  useDidMount(() => {
    socketService.on("userConnected", user => {
      setUsers(draft => {
        let existingUser = draft.find(u => u.id === user.id);
        if (existingUser) {
          Object.assign(existingUser, user);
          return draft;
        } else {
          return [...draft, user];
        }
      });
    });
    socketService.on("userDisconnected", user => {
      setUsers(draft => {
        const u = draft.find(u => u.id === user.id);
        if (u) u.connectionStatus = "disconnected";
        return draft;
      });
    });
    socketService.emit("getUsers");
    socketService.on("getUsers", function(users: IUser[]) {
      setUsers(() => users);
    });
  });

  return {
    users
  };
}
