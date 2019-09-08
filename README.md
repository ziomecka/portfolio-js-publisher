# About
* Javascript implementation of publisher subscriber pattern
* Can be used with various event emitters including browser's *window* object
* Provides **Publisher** class

# Installation
```javascript
npm i publisher-subscriber-pattern
```

# Example

The example uses the browser's *window* object as *emitterInstance*.
Other valid emitter instances can be also used.

```javascript
import { Publisher } from 'publisher-subscriber-pattern';

const publisher = new Publisher(window, 'addEventListener','removeEventListener');
```

*Publisher's* *subscribe* method returns function, which can be used later to unsubscribe from the publisher's event.

```javascript
const unsubscribe = publisher.subscribe('scroll', (event) => {});

// ...foo code...

unsubscribe();
```

There is also a method *unsubscribeAll* for unsubscribing all subscribers from all emitter's events.

```javascript
publisher.unsubscribeAll();
```

# API
## **Publisher**
* Parameters: *emitterInstance*, *addListenerMethodName*, *removeListenerMethodName*
* Methods: *subscribe*, *unsubscribeAll*, *eventSubscribersCount*, *subscribersCount*

### Parameters

#### emitterInstance
* Object, which exposes *addListener* and *removeListener* methods
* Behind the scenes, the *emitterInstance* is bound to *addListener* and *removeListener* methods as *this* ([see Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind))

#### addListenerMethodName, removeListenerMethodName
* Names of methods exposed by *emitterInstance* which add and remove event listeners, respectively

### Methods

#### subscribe
* Required parameters: *eventName*, *eventCallback*
* Optional parameter: *subscriberInstance*, which will be bound to the *eventCallback* argument as *this* ([see Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind))

* Method subscribes *eventCallback* to *eventName*, so whenever event occurs the *eventCallback* is called
* Returns function for unsubscribing from the event

#### unsubscribeAll
* Unsubscribes all publisher's *eventCallbacks* from all emitter's *eventNames*

#### eventSubscriberCount
* Required parameter: *eventName*
* Returns number of subscribers' *eventCallbacks* subscribed to publisher's *eventName*

#### subscribersCount
* Returns number of subscriber's *eventCallbacks* subscribed to all publisher's *eventNames*

# Dependencies

## Production dependencies
* Package has no production dependencies

## Main development dependencies
* Typescript
* Jasmine, chai, sinon
* Babel
* Node (EventEmitter)