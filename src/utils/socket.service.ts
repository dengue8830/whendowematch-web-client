import io from 'socket.io-client';

class SocketService {
  socket?: SocketIOClient.Socket
  token: string = ''

  setCredentials(token: string) {
    this.token = token;
  }

  connect() {
    this.socket = io('http://localhost:3001', { query: { token: this.token } });
    // this.socket.on('connect', function () { console.log('connected'); });
    // this.socket.on('disconnect', function () { console.log('disconnected'); });
  }

  on(event: string, callback) {
    this.socket && this.socket.on(event, callback);
  }

  emit(event: string, params?) {
    this.socket && this.socket.emit(event, params);
  }
}

export const socketService = new SocketService();