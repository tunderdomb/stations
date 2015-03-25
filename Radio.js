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
Radio.prototype.channel = function( name ){
  return this._channels[name]
}
Radio.prototype.createChannel = function( channel ){
  return this._channels[channel] || (this._channels[channel] = new Channel(channel))
}
Radio.prototype.deleteChannel = function( channel ){
  if( channel instanceof Channel ){
    return delete this._channels[channel.name]
  }
  return delete this._channels[channel]
}
Radio.prototype.isSubscribed = function( channel, listener ){
  channel = this._channels[channel]
  return channel && channel.isSubscribed(listener)
}
Radio.prototype.hasSubscribers = function( channel ){
  return this.channelExists(channel) && this.channel(channel).hasSubscribers()
}
Radio.prototype.poll = function( channel ){
  channel = this._channels[channel]
  if( !channel ) return null
  var args = [].slice.call(arguments, 1)
  return channel.poll.apply(channel, args)
}
Radio.prototype.broadcast = function( channel ){
  channel = this._channels[channel]
  if( !channel ) return null
  var args = [].slice.call(arguments, 1)
  return channel.broadcast.apply(channel, args)
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
  var radio = this
  channel = this.createChannel(channel)
  channel.peek(function(  ){
    listener.apply(this, arguments)
    if( !channel.length ) radio.deleteChannel(channel)
  })
  return this
}
Radio.prototype.emptyChannels = function(  ){
  for( var name in this._channels ){
    if( this._channels.hasOwnProperty(name) && this.channelExists(name) ){
      this.channel(name).empty()
      this.deleteChannel(name)
    }
  }
}