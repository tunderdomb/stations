var Channel = require("./Channel")

module.exports = Radio

function Radio( name ){
  this.name = name || "radio"
  this._channels = {}
  this._providers = {}
}

Radio.prototype.channelExists = function( channel ){
  return this._channels.hasOwnProperty(channel)
}
Radio.prototype.createChannel = function( channel ){
  return this[channel] || (this[channel] = new Channel(channel))
}
Radio.prototype.deleteChannel = function( channel ){
  return delete this._channels[channel]
}
Radio.prototype.publish = function( channel, content ){
  channel = this._channels[channel]
  if( !channel ) return null
  return channel.publish(content)
}
Radio.prototype.subscribe = function( channel, listener ){
  channel = this.createChannel(this, channel)
  return channel.subscribe(listener)
}
Radio.prototype.unsubscribe = function( channel, listener ){
  if( this.channelExists(channel) ) {
    this._channels[channel].unsubscribe(listener)
  }
  return this
}

Radio.prototype.providerExists = function( name ){
  return this._providers.hasOwnProperty(name)
}
Radio.prototype.provide = function( name, provider ){
  this._providers[name] = provider
}
Radio.prototype.request = function( name ){
  return this._providers[name]
}