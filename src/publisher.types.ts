import {
  Subscriber,
  SubscriberEventCallback,
} from './subscriber';

export type EventName = string;
export type EventData = [SubscriberEventCallback, Subscriber[]];
export type EmitterInstance = Record<string, unknown>;

export type SubscriptionFunctions = (eventName: string, eventCallback: SubscriberEventCallback) => void;
export type PublisherProps = [ EmitterInstance, string, string ];

export const isValidEmitter = (emitterInstance: Record<string, unknown>, addListenerMethodName: string, removeListenerMethodName: string): emitterInstance is EmitterInstance => {
  return (
    typeof emitterInstance[ addListenerMethodName ] === 'function' &&
    typeof emitterInstance[ removeListenerMethodName ] === 'function'
  );
};