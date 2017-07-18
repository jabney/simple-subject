import { TNotifyCallback } from './notify-callback'

/**
 * A map of id -> callback for storing subscribers to a subject.
 *
 * @export
 * @interface IObservers
 */
export interface IObservers {
  [id: number]: TNotifyCallback
}
