import { Subscriber } from './subscriber';

// EventCallback is generic, thus generic type of Event can be used (e.g. type React.Events )
export type EventCallback<P = {}> = (event: P & Event) => void;

export type EventName = string;
export type EventData = [EventCallback, Subscriber[]];
export type EmitterInstance = Record<string | number | symbol, unknown> | Window;

export type SubscriptionFunctions = (eventName: string, eventCallback: EventCallback) => void;
export type PublisherProps = [ EmitterInstance, string, string ];

export type UnsubscribeFunction = () => void;

export const isValidEmitter = (
  emitterInstance: EmitterInstance,
  addListenerMethodName: string | number,
  removeListenerMethodName: string | number
  ): emitterInstance is EmitterInstance => {

  if (emitterInstance instanceof Window) {
    return (
      addListenerMethodName in emitterInstance &&
      removeListenerMethodName in emitterInstance
    );
  }

  const isOfType = (value: unknown, type: 'symbol' | 'function'): boolean => typeof value === type;
  const addMethodName: keyof typeof emitterInstance = addListenerMethodName;
  const removeMethodName: keyof typeof emitterInstance = removeListenerMethodName;

  const addKey = isOfType(addListenerMethodName, 'symbol')
    ? addListenerMethodName
    : addMethodName;

  const removeKey = isOfType(removeListenerMethodName, 'symbol')
    ? removeListenerMethodName
    : removeMethodName;

  return (
    isOfType(emitterInstance[ addKey ], 'function') &&
    isOfType(emitterInstance[ removeKey ], 'function')
  );
};
