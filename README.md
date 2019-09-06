# About
* Repository contains javascript implementation of publisher-subscriber pattern
* dist/index.js returns *Publisher* class

# Publisher
* takes arguments: *emitterInstance*, *addEventListener* and *removeEventListener*
* exposes methods: *subscribe*, *unsubscribeAll* and  *eventSubscribersCount*
* has property: *subscribersCount*

## emitterInstance argument
* object that will be bound to *addEventListener* and *removeEventListener* as **this** ([see Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind))

## addEventListener and removeEventListener arguments
* methods exposed by *emitterInstance* which add and remove event listeners, respectively

## subscribe method
* requires two arguments: *eventName* and *eventCallback*
* accepts optional argument: *subscriberInstance* that will be bound to *eventCallback* as **this**
* subscribes *eventCallback* to *eventName*, so whenever event occurs the *eventCallback* is called (with *subscriberInstance* as **this**, if provided)

## unsubscribeAll method
* unsubscribes all *eventCallbacks* from all *eventNames*
* runs *removeEventListener* of *emitterInstance* fro all *eventNames*

## eventSubscriberCount method
* requires argument: *eventName*
* returns number of *eventCallbacks* subscribed to the *evenName*

## subscribersCount method
* returns number of *eventCallbacks* subscribed to all *evenNames*

# Stack
* typescript
* jasmine, chai, sinon
* babel
* node (EventEmitter)

# Description
* I wanted to code library which I will be able to reuse in future projects
