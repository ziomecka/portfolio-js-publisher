# About
* Javascript implementation of publisher subscriber pattern
* Can be used with different event emitters including browser window
* Provides **Publisher** class

# Installation
`npm i publisher-subscriber-pattern`

# Example

The example uses the browser's *window* object as *emitterInstance*.
Other valid emitter instances can be also used.

```javascript
import { Publisher } from 'publisher-subscriber-pattern';

const publisher = new Publisher(window, window.addEventListener, window.removeEventListener);
```

*Publisher* *subscribe* method returns function, which can be used later to unsubscribe from the event.

```javascript
const unsubscribe = publisher.subscribe('scroll', (event) => {});

// ...foo code...

unsubscribe();
```

# API
## **Publisher**
* Parameters: *emitterInstance*, *addListener*, *removeListener*
* Methods: *subscribe*, *unsubscribeAll*, *eventSubscribersCount*, *subscribersCount*

### Parameters

#### emitterInstance
* Object that will be bound to *addListener* and *removeListener* as *this* ([see Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind))

#### addListener, removeListener
* Methods exposed by *emitterInstance* which *add* and *remove* event listeners, respectively

### Methods

#### subscribe
* Required parameters: *eventName*, *eventCallback*
* Optional parameter: *subscriberInstance* that will be bound to *eventCallback* as *this*
* Subscribes *eventCallback* to *eventName*, so whenever event occurs the *eventCallback* is called (with *subscriberInstance* as *this*, if provided)
* Returns unsubscribe function

#### unsubscribeAll
* Unsubscribes all *eventCallbacks* from all *eventNames*
* Runs *removeListener* of *emitterInstance* fro all *eventNames*

#### eventSubscriberCount
* Required parameter: *eventName*
* Returns number of *eventCallbacks* subscribed to the *evenName*

#### subscribersCount
* Returns number of *eventCallbacks* subscribed to all *evenNames*

# Dependencies

## Production dependencies
* Package has no production dependencies

## Main development dependencies
* Typescript
* Jasmine, chai, sinon
* Babel
* Node (EventEmitter)