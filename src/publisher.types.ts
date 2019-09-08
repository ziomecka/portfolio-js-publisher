import {
  Subscriber,
  SubscriberEventCallback,
} from './subscriber';

export type EventName = string;
export type EventData = [SubscriberEventCallback, Subscriber[]];

export type SubscriptionFunctions = (eventName: string, eventCallback: SubscriberEventCallback) => void;
export type PublisherProps = [ unknown, SubscriptionFunctions, SubscriptionFunctions ];
