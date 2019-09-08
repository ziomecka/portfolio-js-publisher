import {
  Subscriber,
  SubscriberEventCallback,
} from './subscriber';

export type EventName = string;
export type EventData = [SubscriberEventCallback, Subscriber[]];
export type EmitterInstance = Record<string, unknown>;

export type SubscriptionFunctions = (eventName: string, eventCallback: SubscriberEventCallback) => void;
export type PublisherProps = [ EmitterInstance, string, string ];