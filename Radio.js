var Channel = require("./Channel")

module.exports = Radio

/**
 * @constructor Radio
 * @member {Array} channels
 * */
function Radio() {
  this.channels = []
}

/**
 * Create a channel if it doesn't exist already
 * and return the channel.
 *
 * @param {String} channel
 * @return {Channel}
 * */
Radio.prototype.channel = function(channel) {
  return this.channels[channel]
      || (this.channels[channel] = new Channel(channel))
}

/**
 * Check if a channel exists.
 *
 * @param {Channel|String} channel
 * @return {boolean}
 * */
Radio.prototype.channelExists = function(channel) {
  return !!channel && (typeof channel == "string"
          ? this.channels.hasOwnProperty(channel)
          : this.channels.hasOwnProperty(channel.name))
}

/**
 * Delete a channel.
 *
 * @param {Channel|String} channel
 * @return {boolean}
 * */
Radio.prototype.deleteChannel = function(channel) {
  if (channel instanceof Channel) {
    return delete this.channels[channel.name]
  }
  return delete this.channels[channel]
}

/**
 * Check if a channel has any subscribers.
 * If the channel doesn't exists it's `false`.
 *
 * @param {Channel|String} channel
 * @return {boolean}
 * */
Radio.prototype.hasSubscribers = function(channel) {
  return this.channelExists(channel) && this.channel(channel).hasSubscribers()
}

/**
 * Check if a listener is subscribed to a channel.
 * If the channel doesn't exists it's `false`.
 *
 * @param {Channel|String} channel
 * @param {Function} listener
 * @return {boolean}
 * */
Radio.prototype.isSubscribed = function(channel, listener) {
  return this.channelExists(channel) && this.channel(channel).isSubscribed(listener)
}

/**
 * Send arguments on a channel.
 * If the channel doesn't exists nothing happens.
 *
 * @alias broadcast
 * @param {Channel|String} channel
 * @return {*}
 * */
Radio.prototype.publish = function(channel) {
  if (this.channelExists(channel)) {
    channel = this.channel(channel)
    var args = [].slice.call(arguments, 1)
    return channel.broadcast.apply(channel, args)
  }
  return false
}
Radio.prototype.broadcast = Radio.prototype.publish

/**
 * Subscribe to a channel with a listener.
 * It also creates the channel if it doesn't exists yet.
 *
 * @param {Channel|String} channel
 * @param {Function} listener
 * @return {Radio} this
 * */
Radio.prototype.subscribe = function(channel, listener) {
  this.channel(channel).subscribe(listener)
  return this
}

/**
 * Unsubscribe a listener from a channel.
 * If the channel doesn't exists nothing happens.
 *
 * @param {Channel|String} channel
 * @param {Function} listener
 * @return {Radio} this
 * */
Radio.prototype.unsubscribe = function(channel, listener) {
  if (this.channelExists(channel)) {
    this.channel(channel).unsubscribe(listener)
  }
  return this
}

/**
 * Subscribe a listener to a channel
 * that unsubscribes after the first broadcast it receives.
 * It also creates the channel if it doesn't exists yet.
 *
 * @param {Channel|String} channel
 * @param {Function} listener
 * @return {Radio} this
 * */
Radio.prototype.peek = function(channel, listener) {
  this.channel(channel).peek(listener)
  return this
}

/**
 * Empty a channel removing every subscriber it holds,
 * but not deleting the channel itself.
 * If the channel doesn't exists nothing happens.
 *
 * @param {Channel|String} channel
 * @return {Radio} this
 * */
Radio.prototype.emptyChannel = function(channel) {
  if (this.channelExists(channel)) {
    this.channel(channel).empty()
  }
  return this
}
