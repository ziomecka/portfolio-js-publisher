import {
  EmitterInstance,
  EventCallback,
  EventData,
  EventName,
  PublisherProps,
  SubscriptionFunctions,
  isValidEmitter
} from './_types';
import { Subscriber } from './subscriber';

export class Publisher {
  private eventData: Map< EventName, EventData>;
  private addEventListener: SubscriptionFunctions;
  private removeEventListener: SubscriptionFunctions;
  constructor (...args: PublisherProps) {
    const [ emitterInstance, addListenerMethodName, removeListenerMethodName ] = args;

    if (!isValidEmitter(emitterInstance, addListenerMethodName, removeListenerMethodName)) {
      throw new Error('Publisher received incorrect arguments');
    }

    this.eventData = new Map([]);

    this.addEventListener =
      ( emitterInstance[ addListenerMethodName ] as SubscriptionFunctions).bind(emitterInstance);

    this.removeEventListener =
      ( emitterInstance[ removeListenerMethodName ] as SubscriptionFunctions).bind(emitterInstance);
  }

  public subscribe = (
    eventName: EventName,
    eventCallback: EventCallback,
    subscriberInstance?: EmitterInstance
  ): () => void => {
    const subscriber = new Subscriber(eventCallback, subscriberInstance);
    let eventData = this.getEventData(eventName);

    if (!eventData) {
      eventData = this.eventData
        .set( eventName, [ this.buildInformSubscribers(eventName), [] ])
        .get(eventName) as EventData;
      this.observeEvent(eventName, eventData);
    }

    eventData[ 1 ].push(subscriber);

    return this.unsubscribe(eventName, subscriber);
  }

  public unsubscribeAll = (): void => {
    Array.from(this.eventData.keys()).forEach(eventName => {
      this.unobserveEvent(eventName);
    });
  }

  public eventSubscribersCount = (eventName: EventName): number => {
    return (this.getSubscribers(eventName) || []).length;
  }

  public subscribersCount = (): number => {
    return Array.from(this.eventData.values()).reduce((count = 0, eventData) => {
      count += eventData[ 1 ].length;
      return count;
    }, 0);
  }

  private getEventData (eventName: EventName): EventData | undefined {
    return this.eventData.get(eventName);
  }

  private getEventCallback (eventName: EventName): EventCallback | undefined {
    return (this.getEventData(eventName) || [])[ 0 ];
  }

  private getSubscribers (eventName: EventName): Subscriber[] | undefined {
    return (this.getEventData(eventName) || [])[ 1 ];
  }

  private buildInformSubscribers = (eventName: EventName): EventCallback => (
    (event: Event): void => {
      (this.getSubscribers(eventName) || [])
        .forEach(subscriber => subscriber.eventCallback(event));
    }
  )

  private unsubscribe = (eventName: EventName, subscriber: Subscriber): (() => void) => {
    return (): void => {
      const subscribersArray = (this.getEventData(eventName) || [])[ 1 ];

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

  private observeEvent = (eventName: EventName, eventData?: EventData): void => {
    const eventCallback = eventData
      ? eventData[ 0 ]
      : this.getEventCallback(eventName);

    if (eventCallback) {
      this.addEventListener(eventName, eventCallback);
    }
  }

  private unobserveEvent = (eventName: EventName): void => {
    this.removeEventListener(eventName, this.getEventCallback(eventName) as EventCallback);

    this.eventData.delete(eventName);
  }
}
