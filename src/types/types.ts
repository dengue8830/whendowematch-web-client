export interface IUser {
  // socketId: string
  // avatarUrl: string
  id: string
  name: string
  color: string
  connectionStatus: 'connected' | 'disconnected'
}

export interface IEvent {
  title: string
  start: Date
  end: Date
}

export enum Errors {
  Unknown = 'Unknown'
}