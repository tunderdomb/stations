module.exports = Channel

/**
 * Create a channel
 *
 * @extends Array
 * @constructor Channel
 * @param {String} name
 * */
function Channel(name) {
  this.name = name || ""
}

Channel.prototype = []
Channel.prototype.constructor = Channel

/**
 * Invoke listeners with the given arguments.
 * Listeners are called in the order they were registered.
 * If a listener returns anything it breaks the loop and returns that value.
 *
 * @alias broadcast
 * @return {boolean|*}
 * */
Channel.prototype.publish = function() {
  var listeners = this.slice()
  var l = listeners.length
  if (!l) {
    return false
  }

  var err = null
  var i = -1
  var listener

  while (++i < l) {
    listener = listeners[i]
    if (listener.proxy) listener = listener.proxy
    err = listener.apply(null, arguments)
    if (err != null) return err
  }

  return false
}
Channel.prototype.broadcast = Channel.prototype.publish

/**
 * Add a listener to this channel.
 *
 * @param {Function} listener
 * @return {Channel} this
 * */
Channel.prototype.subscribe = function(listener) {
  if (typeof listener != "function") {
    console.warn("Listener is not a function", listener)
    return this
  }

  if (!this.isSubscribed(listener)) {
    this.push(listener)
  }

  return this
}

/**
 * Remove a listener from the channel
 *
 * @param {Function} listener
 * @return {Channel} this
 * */
Channel.prototype.unsubscribe = function(listener) {
  var i = this.indexOf(listener)
  if (~i) this.splice(i, 1)
  return this
}

/**
 * Register a listener that will be called only once.
 *
 * @param {Function} listener
 * @return {Channel} this
 * */
Channel.prototype.peek = function(listener) {
  var channel = this

  // piggyback on the listener
  listener.proxy = function proxy() {
    var ret = listener.apply(null, arguments)
    channel.unsubscribe(listener)
    return ret
  }
  this.subscribe(listener)

  return this
}

/**
 * Check if a function is registered as a listener on the channel.
 *
 * @param {Function} listener
 * @return {boolean}
 * */
Channel.prototype.isSubscribed = function(listener) {
  return !!(listener && ~this.indexOf(listener))
}

/**
 * Returns how many listeners are registered on the channel.
 *
 * @return {boolean}
 * */
Channel.prototype.hasSubscribers = function() {
  return this.length > 0
}

/**
 * Clears all listeners from the channel.
 *
 * @return {Channel} this
 * */
Channel.prototype.empty = function() {
  this.splice(0)
  return this
}
