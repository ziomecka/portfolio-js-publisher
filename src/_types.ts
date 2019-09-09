import { Subscriber } from './subscriber';

// EventCallback is generic, thus generic type of Event can be used (e.g. type React.Events )
export type EventCallback<P = {}> = (event: P & Event) => void;

export type EventName = string;
export type EventData = [EventCallback, Subscriber[]];

interface ObjectI { [ key: string ]: unknown };
export type EmitterInstance = ObjectI | Record<number | string | symbol, unknown>;
export type SubscriberInstance = Record<number | string | symbol, unknown>;

export type SubscriptionFunctions = (eventName: string, eventCallback: EventCallback) => void;
export type PublisherProps = [ EmitterInstance, string, string ];

export type UnsubscribeFunction = () => void;

export const isValidEmitter = (
  emitterInstance: EmitterInstance,
  addListenerMethodName: string,
  removeListenerMethodName: string
  ): emitterInstance is EmitterInstance => {

  return (
    addListenerMethodName in emitterInstance &&
    removeListenerMethodName in emitterInstance &&
    typeof emitterInstance[ addListenerMethodName ] === 'function' &&
    typeof emitterInstance[ removeListenerMethodName ] === 'function'
  );
};
