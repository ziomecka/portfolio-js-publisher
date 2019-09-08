import { Subscriber } from './subscriber';

export type EventCallback = (event: Event) => void;

export type EventName = string;
export type EventData = [EventCallback, Subscriber[]];
export type EmitterInstance = Record<string, unknown>;

export type SubscriptionFunctions = (eventName: string, eventCallback: EventCallback) => void;
export type PublisherProps = [ EmitterInstance, string, string ];

export const isValidEmitter = (
    emitterInstance: Record<string, unknown>,
    addListenerMethodName: string,
    removeListenerMethodName: string
): emitterInstance is EmitterInstance => {
  return (
    typeof emitterInstance[ addListenerMethodName ] === 'function' &&
    typeof emitterInstance[ removeListenerMethodName ] === 'function'
  );
};