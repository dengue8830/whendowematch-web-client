import io from 'socket.io-client';
import { config } from './config';

class SocketService {
  socket?: SocketIOClient.Socket;
  token: string = '';

  setCredentials(token: string) {
    this.token = token;
  }

  connect() {
    this.socket = io(config.socketServer, { query: { token: this.token } });
    // this.socket.on('connect', function () { console.log('connected'); });
    // this.socket.on('disconnect', function () { console.log('disconnected'); });
  }

  on(event: string, callback) {
    this.socket && this.socket.on(event, callback);
  }

  emit(event: string, params?) {
    this.socket && this.socket.emit(event, params);
  }

  /** For testing porpuses. Simulates a server event. */
  _simulateIncomingEvent(eventName, eventData) {}
}

export const socketService = new SocketService();
