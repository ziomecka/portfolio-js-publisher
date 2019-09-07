export type SubscriberEventCallback = (event: Event) => void;

export class Subscriber {
  public eventCallback: SubscriberEventCallback;
  constructor (eventCallback: SubscriberEventCallback, subscriberInstance?: Record<string, unknown>) {
    this.eventCallback = eventCallback.bind(subscriberInstance);
  }
}