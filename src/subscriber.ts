export type EventCallback = (event: Event) => void;

export class Subscriber {
  public eventCallback: EventCallback;
  constructor (eventCallback: EventCallback, subscriberInstance?: Record<string, unknown>) {
    this.eventCallback = eventCallback.bind(subscriberInstance);
  }
}