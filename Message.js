module.exports = Message

function Message( content ){
  this.content = content
  this.cancelled = false
}
Message.prototype.cancel = function(  ){
  this.cancelled = true
}
