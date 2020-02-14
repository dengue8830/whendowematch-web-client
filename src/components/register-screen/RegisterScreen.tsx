import * as React from 'react';
import { sstorage } from '../../utils/storage';
import { useHistory } from 'react-router';
import { http } from '../../utils/http';
import { socketService } from '../../utils/socket.service';
import { apis } from '../../utils/apis';

interface IProps {}

export function RegisterScreen(props: IProps) {
  const [name, setName] = React.useState('');
  const [color, setColor] = React.useState('teal');
  const history = useHistory();

  function onNameChange(e) {
    setName(e.target.value);
  }

  function onColorChange(e) {
    setColor(e.target.value);
  }

  async function onClickGo(e) {
    const res = await apis.register({ name, color });
    sstorage.setUser(res.user);
    http.setCredentials(res.token);
    sstorage.setToken(res.token);
    socketService.setCredentials(res.token);
    socketService.connect();
    history.push('/');
  }

  return (
    <div>
      <input
        name='username'
        value={name}
        onChange={onNameChange}
        placeholder='Choose a nickname'
      />
      <input
        value={color}
        onChange={onColorChange}
        placeholder='Choose a color'
      />
      <button name='go' onClick={onClickGo}>
        GO!
      </button>
    </div>
  );
}
