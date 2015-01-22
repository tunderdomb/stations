var Message = require("./Message")

module.exports = Channel

function Channel( name ){
  this.name = name
}

Channel.prototype = []
Channel.prototype.publish = function( content ){
  var message = new Message(this.name, content)
  if( this.length ) {
    return message
  }
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
Channel.prototype.unsubscribe = function( listener ){
  var i = this.indexOf(listener)
  if( ~i ) this.splice(i, 1)
  return this
}
Channel.prototype.peek = function( listener ){
  this.subscribe(function proxy(  ){
    listener.apply(this, arguments)
    this.unsubscribe(proxy)
  }.bind(this))
  return this
}
