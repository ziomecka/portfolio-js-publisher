export type SubscriberEventCallback = (event: Event) => void;
type SubscriberInstance = Record<string, unknown>;

export class Subscriber {
  public eventCallback: SubscriberEventCallback;
  constructor (eventCallback: SubscriberEventCallback, subscriberInstance?: SubscriberInstance) {
    this.eventCallback = eventCallback.bind(subscriberInstance);
  }
}