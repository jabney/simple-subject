import { TNotifyCallback } from './notify-callback'

export interface IObservers {
  [id: number]: TNotifyCallback
}
