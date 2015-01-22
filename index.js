var Message = require("./Message")
var Channel = require("./Channel")
var Radio = require("./Radio")

/**
 * @return Radio
 * */
function stations( name ){
  return new Radio(name)
}

stations.Message = Message
stations.Channel = Channel
stations.Radio = Radio

module.exports = stations