import {
  EventCallback,
  Subscriber,
} from './subscriber';

type EventName = string;
type EventData = [EventCallback, Subscriber[]];
export type SubscriptionFunctions = (eventName: string, eventCallback: EventCallback) => void;

export class Publisher {
  private eventData: Map< EventName, EventData>;
  private addEventListener: SubscriptionFunctions;
  private removeEventListener: SubscriptionFunctions;
  constructor (
    emitterInstance: unknown,
    addEventListener: SubscriptionFunctions,
    removeEventListener: SubscriptionFunctions
  ) {
    this.eventData = new Map([]);

    this.addEventListener = addEventListener.bind(emitterInstance);
    this.removeEventListener = removeEventListener.bind(emitterInstance);
  }

  public subscribe = (eventName: EventName, eventCallback: EventCallback, subscriberInstance?: Record<string, unknown>): () => void => {
    const eventData = this.getEventData(eventName);
    const subscriber = new Subscriber(eventCallback, subscriberInstance);

    eventData[ 1 ].push(subscriber);

    this.observeEvent(eventName);
    return this.unsubscribe(eventName, subscriber);
  }

  public unsubscribeAll (): void {
    Array.from(this.eventData.keys()).forEach(eventName => {
      this.unobserveEvent(eventName);
    });
  }

  public eventSubscribersCount (eventName: EventName): number {
    return this.getSubscribers(eventName).length;
  }

  public get subscribersCount (): number {
    return Array.from(this.eventData.values()).reduce((count, eventData) => {
      count += eventData[ 1 ].length;
      return count;
    }, 0);
  }

  private getEventData (eventName: EventName): EventData {
    return (
      this.eventData.get(eventName) ||
      this.eventData.set(eventName, [ this.buildInformSubscribers(eventName), [] ]).get(eventName)
    ) as EventData;
  }

  private getEventCallback (eventName: EventName): EventCallback {
    return this.getEventData(eventName)[ 0 ];
  }

  private getSubscribers (eventName: EventName): Subscriber[] {
    return this.getEventData(eventName)[ 1 ];
  }

  private buildInformSubscribers = (eventName: EventName): EventCallback => (
    (event: Event): void => {
      this.getSubscribers(eventName)
      .forEach(subscriber => subscriber.eventCallback(event));
    }
  )

  private unsubscribe = (eventName: EventName, subscriber: Subscriber): (() => void) => {
    return (): void => {
      const subscribersArray = this.getEventData(eventName)[ 1 ];

      if (subscribersArray) {
        subscribersArray
          .splice(subscribersArray.findIndex(item => item === subscriber), 1);

        if (!subscribersArray.length) {
          this.unobserveEvent(eventName);
        }
      }
      return;
    };
  }

  private observeEvent = (eventName: EventName): void => {
    this.addEventListener(eventName, this.getEventCallback(eventName));
  }

  private unobserveEvent = (eventName: EventName): void => {
    this.removeEventListener(eventName, this.getEventCallback(eventName));
  }
}
