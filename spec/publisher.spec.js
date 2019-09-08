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
  const addListenerMethodName = 'addListener';
  const removeListenerMethodName = 'removeListener';

  global.eventCallback = () => {};

  beforeEach(function () {
    sinon.spy( eventEmitterStub, addListenerMethodName);
    sinon.spy( eventEmitterStub, removeListenerMethodName);
    sinon.spy( global, 'eventCallback' );
  });

  afterEach(function () {
    eventEmitterStub.removeAllListeners();
    eventEmitterStub[ addListenerMethodName ].restore();
    eventEmitterStub[ removeListenerMethodName ].restore();

    global.eventCallback.restore();
  });

  it('subscribes to event', function () {
    // given
    const publisher = new Publisher(eventEmitterStub, addListenerMethodName, removeListenerMethodName);

    // when
    publisher.subscribe(fooEventName, eventCallback);

    // then
    const { args: [ passedEventName, passedCallback ] } = eventEmitterStub[ addListenerMethodName ].getCalls()[ 0 ];

    expect(eventEmitterStub[ addListenerMethodName ]).toBeCalledOnce;
    expect(passedEventName).toBe(fooEventName);
    expect(typeof passedCallback).toBe('function');
  });

  it('unsubscribes from event', () => {
    // given
    const publisher = new Publisher(eventEmitterStub, addListenerMethodName, removeListenerMethodName);

    // when
    const unsubscribe = publisher.subscribe(barEventName, eventCallback);
    unsubscribe();

    // then
    const { args: [ eventName, callback ] } = eventEmitterStub[ removeListenerMethodName ].getCalls()[ 0 ];

    expect(eventEmitterStub[ removeListenerMethodName ]).toBeCalledOnce;
    expect(eventName).toBe(barEventName);
    expect(typeof callback).toBe('function');
  });

  it('unsubscribes from all events', () => {
    // given
    const publisher = new Publisher(eventEmitterStub, addListenerMethodName, removeListenerMethodName);

    // when
    publisher.subscribe(barEventName, eventCallback);
    publisher.subscribe(fooEventName, eventCallback);

    publisher.unsubscribeAll();

    // then
    const { args: [ firstPassedEventName, firstPassedCallback ] } = eventEmitterStub[ removeListenerMethodName ].getCalls()[ 0 ];
    const { args: [ secondPassedEventName, secondCallback ] } = eventEmitterStub[ removeListenerMethodName ].getCalls()[ 1 ];

    expect(eventEmitterStub[ removeListenerMethodName ]).toBeCalledTwice;

    expect(firstPassedEventName).toBe(barEventName);
    expect(typeof firstPassedCallback).toBe('function');
    expect(secondPassedEventName).toBe(fooEventName);
    expect(typeof secondCallback).toBe('function');
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

  it('throws Error if receives invalid eventEmitter', () => {
    // then
    expect(() => new Publisher(eventEmitterStub, 'someFooMethod', 'someBarMethod'))
      .toThrowError('Publisher received incorrect arguments');
  });
});