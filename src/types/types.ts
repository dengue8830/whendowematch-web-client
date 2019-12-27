export interface IUser {
  // socketId: string
  // avatarUrl: string
  id: string
  name: string
  color: string
  connectionStatus: 'connected' | 'disconnected'
}

export interface ISchedule {
  id: string
  title: string
  start: Date
  end: Date
  userId: string
  color: string
}

export enum Errors {
  Unknown = 'Unknown'
}

export interface IOverlap {
  start: Date
  end: Date
}