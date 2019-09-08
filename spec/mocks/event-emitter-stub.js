const { EventEmitter } = require('events');

class EventEmitterStub extends EventEmitter {
  constructor () {
    super();
    this.on('fooEvent', () => console.log('foo event occurred!'));
    this.on('barEvent', () => console.log('bar event occurred!'));
  }
}

const eventEmitterStub = new EventEmitterStub();

module.exports = eventEmitterStub;

