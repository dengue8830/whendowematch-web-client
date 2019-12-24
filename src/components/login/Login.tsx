import * as React from 'react';
import { socket } from '../../socket';
import { sstorage } from '../../utils/storage';
import { useHistory } from 'react-router';

interface IProps {

}

export function Login(props: IProps) {
  const [name, setName] = React.useState('');
  const history = useHistory();

  function onNameChange(e) {
    setName(e.target.value);
  }

  function onClickGo() {
    const user = { name };
    sstorage.setUser(user);
    socket.emit('addUser', user);
    history.push('/');
  }

  return (
    <div>
      <input value={name} onChange={onNameChange} placeholder='Choose a nickname' />
      <button onClick={onClickGo}>GO!</button>
    </div>
  );
}