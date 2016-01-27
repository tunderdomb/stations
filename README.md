stations [![Build Status](https://travis-ci.org/tunderdomb/stations.svg)](https://travis-ci.org/tunderdomb/stations)
========

It's a radio! It's a pub/sub!

[Radio docs](docs/Radio.md)
[Channel docs](docs/Channel.md)

```js
var Radio = require("stations")

var radio = new Radio()

radio.subscribe("name", function listener(a, b, c){})
radio.publish("name", a, b, c)
radio.unsubscribe("name", listener)
radio.peek("name", listener)
radio.channelExists("name")
radio.deleteChannel("name")
radio.emptyChannel("name")
radio.hasSubscribers("name")
radio.isSubscribed("name", listener)
radio.channel("name")
```
