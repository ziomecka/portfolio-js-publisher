# About
* Javascript implementation of publisher subscriber pattern
* Can be used with different event emitters including browser window
* Provides **Publisher** class

# API
## **Publisher**
* Parameters: *emitterInstance*, *addEventListener*, *removeEventListener*
* Methods: *subscribe*, *unsubscribeAll*, *eventSubscribersCount*
* Properties: *subscribersCount*

### Parameters

#### emitterInstance
* Object that will be bound to *addEventListener* and *removeEventListener* as *this* ([see Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind))

#### addEventListener, removeEventListener
* Methods exposed by *emitterInstance* which *add* and *remove* event listeners, respectively

### Methods

#### subscribe
* Required parameters: *eventName*, *eventCallback*
* Optional parameter: *subscriberInstance* that will be bound to *eventCallback* as *this*
* Subscribes *eventCallback* to *eventName*, so whenever event occurs the *eventCallback* is called (with *subscriberInstance* as *this*, if provided)
* Returns unsubscribe function

#### unsubscribeAll
* Unsubscribes all *eventCallbacks* from all *eventNames*
* Runs *removeEventListener* of *emitterInstance* fro all *eventNames*

#### eventSubscriberCount
* Required parameter: *eventName*
* Returns number of *eventCallbacks* subscribed to the *evenName*

### Properties

#### subscribersCount
* Returns number of *eventCallbacks* subscribed to all *evenNames*

# Stack
* Typescript
* Jasmine, chai, sinon
* Babel
* Node (EventEmitter)