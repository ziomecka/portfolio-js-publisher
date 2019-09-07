# About
* Javascript implementation of publisher subscriber pattern
* Can be used with different event emitters including browser window
* Provides **Publisher** class

# API
## **Publisher**
* Takes arguments: *emitterInstance*, *addEventListener* and *removeEventListener*
* Exposes methods: *subscribe*, *unsubscribeAll* and  *eventSubscribersCount*
* Has property: *subscribersCount*

### Arguments

#### emitterInstance
* Object that will be bound to *addEventListener* and *removeEventListener* as *this* ([see Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind))

#### addEventListener and removeEventListener
* Methods exposed by *emitterInstance* which add and remove event listeners, respectively

### Methods

#### subscribe
* Requires two arguments: *eventName* and *eventCallback*
* Accepts optional argument: *subscriberInstance* that will be bound to *eventCallback* as *this*
* Subscribes *eventCallback* to *eventName*, so whenever event occurs the *eventCallback* is called (with *subscriberInstance* as *this*, if provided)

#### unsubscribeAll
* Unsubscribes all *eventCallbacks* from all *eventNames*
* Runs *removeEventListener* of *emitterInstance* fro all *eventNames*

#### eventSubscriberCount
* Requires argument: *eventName*
* Returns number of *eventCallbacks* subscribed to the *evenName*

### Properties

#### subscribersCount
* Returns number of *eventCallbacks* subscribed to all *evenNames*

# Stack
* Typescript
* Jasmine, chai, sinon
* Babel
* Node (EventEmitter)