import * as React from "react";
import { sstorage } from "../../utils/storage";
import { useHistory } from "react-router";
import { http } from "../../utils/http";
import { socketService } from "../../utils/socket.service";
import { IUser } from "../../types/types";

interface IProps {}

export function Register(props: IProps) {
  const [name, setName] = React.useState("");
  const [color, setColor] = React.useState("teal");
  const history = useHistory();

  function onNameChange(e) {
    setName(e.target.value);
  }

  function onColorChange(e) {
    setColor(e.target.value);
  }

  async function onClickGo(e) {
    const user = { name, color };
    // await http.get('http://localhost:3001/api/auth/');
    const res = await http.post<{ token; user: IUser }>(
      "http://localhost:3001/api/auth/register",
      user
    );
    sstorage.setUser(res.data.user);
    http.setCredentials(res.data.token);
    sstorage.setToken(res.data.token);
    socketService.setCredentials(res.data.token);
    socketService.connect();
    history.push("/");
  }

  return (
    <div>
      <input
        value={name}
        onChange={onNameChange}
        placeholder="Choose a nickname"
      />
      <input
        value={color}
        onChange={onColorChange}
        placeholder="Choose a color"
      />
      <button onClick={onClickGo}>GO!</button>
    </div>
  );
}
