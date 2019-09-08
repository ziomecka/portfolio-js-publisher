import { EventCallback } from './_types';

type SubscriberInstance = Record<string, unknown>;

export class Subscriber {
  public eventCallback: EventCallback;
  constructor (eventCallback: EventCallback, subscriberInstance?: SubscriberInstance) {
    this.eventCallback = eventCallback.bind(subscriberInstance);
  }
}
