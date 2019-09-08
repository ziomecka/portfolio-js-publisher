module.exports = function () {
  this.callsCount = 0;
  this.callback = () => this.callsCount++;
};