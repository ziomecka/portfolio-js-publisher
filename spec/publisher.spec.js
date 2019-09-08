require('chai');
require('chai-sinon');

const Publisher = require('./config/publisher-babel');
const sinon = require('sinon');
const eventEmitterStub = require('./mocks/event-emitter-stub');

describe('Publisher', () => {
  const fooEventName = 'fooEvent';
  const barEventName = 'barEvent';

  const Subscriber = function () {
    this.calls = 0;
    this.callback = () => this.calls++;
  };

  global.eventCallback = () => {};

  beforeEach(function () {
    sinon.spy( eventEmitterStub, 'addListener');
    sinon.spy( eventEmitterStub, 'removeListener');
    sinon.spy( global, 'eventCallback' );
  });

  afterEach(function () {
    eventEmitterStub.removeAllListeners();
    eventEmitterStub.addListener.restore();
    eventEmitterStub.removeListener.restore();
    global.eventCallback.restore();
  });

  it('subscribes to event', function () {
    // given
    const publisher = new Publisher(eventEmitterStub, eventEmitterStub.addListener, eventEmitterStub.removeListener);

    // when
    publisher.subscribe(fooEventName, eventCallback);

    // then
    const { args: [ eventName, callback ] } = eventEmitterStub.addListener.getCalls()[ 0 ];

    expect(eventEmitterStub.addListener).toBeCalledOnce;
    expect(eventName).toBe(fooEventName);
    expect(typeof callback).toBe('function');
  });

  it('unsubscribes from event', () => {
    // given
    const publisher = new Publisher(eventEmitterStub, eventEmitterStub.addListener, eventEmitterStub.removeListener);

    // when
    const unsubscribe = publisher.subscribe(barEventName, eventCallback);
    unsubscribe();

    // then
    const { args: [ eventName, callback ] } = eventEmitterStub.removeListener.getCalls()[ 0 ];

    expect(eventEmitterStub.removeListener).toBeCalledOnce;
    expect(eventName).toBe(barEventName);
    expect(typeof callback).toBe('function');
  });

  it('unsubscribes from all events', () => {
    // given
    const publisher = new Publisher(eventEmitterStub, eventEmitterStub.addListener, eventEmitterStub.removeListener);

    // when
    publisher.subscribe(barEventName, eventCallback);
    publisher.subscribe(fooEventName, eventCallback);

    publisher.unsubscribeAll();

    // then
    const { args: [ eventName0, callback0 ] } = eventEmitterStub.removeListener.getCalls()[ 0 ];
    const { args: [ eventName1, callback1 ] } = eventEmitterStub.removeListener.getCalls()[ 1 ];
    expect(eventEmitterStub.removeListener).toBeCalledTwice;
    expect(eventName0).toBe(barEventName);
    expect(typeof callback0).toBe('function');
    expect(eventName1).toBe(fooEventName);
    expect(typeof callback1).toBe('function');
  });

  it('informs subscribers about event', () => {
    // given
    const publisher = new Publisher(eventEmitterStub, eventEmitterStub.addListener, eventEmitterStub.removeListener);
    const firstSubscriber = new Subscriber();
    const secondSubscriber = new Subscriber();

    // when
    publisher.subscribe(fooEventName, firstSubscriber.callback, firstSubscriber);
    publisher.subscribe(barEventName, secondSubscriber.callback, secondSubscriber);
    eventEmitterStub.emit(fooEventName);
    eventEmitterStub.emit(barEventName);
    eventEmitterStub.emit(fooEventName);

    // then
    expect(firstSubscriber.calls).toBe(2);
    expect(secondSubscriber.calls).toBe(1);
  });

  it('does not inform subscribers about event', () => {
    // given
    const publisher = new Publisher(eventEmitterStub, eventEmitterStub.addListener, eventEmitterStub.removeListener);
    const firstSubscriber = new Subscriber();
    const secondSubscriber = new Subscriber();

    // when
    publisher.subscribe(fooEventName, firstSubscriber.callback, firstSubscriber);
    publisher.subscribe(barEventName, secondSubscriber.callback, secondSubscriber);
    publisher.unsubscribeAll();
    eventEmitterStub.emit(fooEventName);
    eventEmitterStub.emit(barEventName);
    eventEmitterStub.emit(fooEventName);

    // then
    expect(firstSubscriber.calls).toBe(0);
    expect(secondSubscriber.calls).toBe(0);
  });

  it('returns event subscribers count', () => {
    // given
    const publisher = new Publisher(eventEmitterStub, eventEmitterStub.addListener, eventEmitterStub.removeListener);
    const firstSubscriber = new Subscriber();
    const secondSubscriber = new Subscriber();

    // when
    publisher.subscribe(barEventName, firstSubscriber.callback, firstSubscriber);
    publisher.subscribe(barEventName, secondSubscriber.callback, secondSubscriber);

    // then
    expect(publisher.eventSubscribersCount(barEventName)).toBe(2);
  });

  it('returns all subscribers count', () => {
    // given
    const publisher = new Publisher(eventEmitterStub, eventEmitterStub.addListener, eventEmitterStub.removeListener);
    const firstSubscriber = new Subscriber();
    const secondSubscriber = new Subscriber();

    // when
    publisher.subscribe(barEventName, firstSubscriber.callback, firstSubscriber);
    publisher.subscribe(barEventName, secondSubscriber.callback, secondSubscriber);
    publisher.subscribe(barEventName, secondSubscriber.callback, secondSubscriber);
    publisher.subscribe(fooEventName, secondSubscriber.callback, secondSubscriber);

    // then
    expect(publisher.subscribersCount()).toBe(4);
  });
});