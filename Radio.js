var Channel = require("./Channel")

module.exports = Radio

function Radio( name ){
  this.name = name || "radio"
  Object.defineProperty(this, "_channels", {
    value: {}
  })
}

Radio.prototype.channelExists = function( channel ){
  return this._channels.hasOwnProperty(channel)
}
Radio.prototype.createChannel = function( channel ){
  return this._channels[channel] || (this._channels[channel] = new Channel(channel))
}
Radio.prototype.deleteChannel = function( channel ){
  return delete this._channels[channel]
}
Radio.prototype.isSubscribed = function( channel, listener ){
  channel = this._channels[channel]
  return channel && channel.isSubscribed(listener)
}
Radio.prototype.publish = function( channel, content ){
  channel = this._channels[channel]
  if( !channel ) return null
  return channel.publish(content)
}
Radio.prototype.subscribe = function( channel, listener ){
  channel = this.createChannel(this, channel)
  channel.subscribe(listener)
  return this
}
Radio.prototype.unsubscribe = function( channel, listener ){
  if( this.channelExists(channel) ) {
    this._channels[channel].unsubscribe(listener)
  }
  return this
}
Radio.prototype.peek = function( channel, listener ){
  if( this.channelExists(channel) ) {
    this._channels[channel].peek(listener)
  }
  return this
}