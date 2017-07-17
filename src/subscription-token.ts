import { IObservers } from './observers'

/**
 * A token for subjects to unsubscribe from observer notifications
 *
 * @export
 * @interface ISubscriptionToken
 */
export interface ISubscriptionToken {
  id: number
  unsubscribe: () => void
}

/**
 * Generate and return an ISubscriptionToken
 *
 * @export
 * @param {IObservers} observers
 * @param {number} id
 * @returns {ISubscriptionToken}
 */
export function subscriptionToken(
    observers: IObservers,
    id: number): ISubscriptionToken {
  return { id, unsubscribe() {
    delete observers[id]
  }}
}
