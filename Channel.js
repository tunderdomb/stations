var Message = require("./Message")

module.exports = Channel

function Channel( name ){
  this.name = name
}

Channel.prototype = []

Channel.prototype.poll = function(  ){
  var args = arguments
  var result = null
  this.some(function( listener ){
    result = listener.apply(null, args)
    return result != null
  })
  return result
}
Channel.prototype.broadcast = function(  ){
  var args = arguments
  var err = null
  this.some(function( listener ){
    err = listener.apply(null, args)
    return err != null
  })
  return err || false
}
Channel.prototype.publish = function( content ){
  if( !this.length ) {
    return null
  }
  var message = new Message(this.name, content)
  this.some(function( listener ){
    listener(message)
    return message.cancelled
  })
  return message
}
Channel.prototype.subscribe = function( listener ){
  this.push(listener)
  return this
}
Channel.prototype.isSubscribed = function( listener ){
  return !!~this.indexOf(listener)
}
Channel.prototype.unsubscribe = function( listener ){
  var i = this.indexOf(listener)
  if( ~i ) this.splice(i, 1)
  return this
}
Channel.prototype.peek = function( listener ){
  var channel = this
  this.subscribe(function proxy(  ){
    listener.apply(channel, arguments)
    channel.unsubscribe(proxy)
  })
  return this
}
