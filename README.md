stations
========

It's a radio!
Use this to include an app level event bus into your app.

Providers are baked in "messages".
They can be used to register persistent logic and provide/request them.
Like app settings or app level constant/static methods.

Messages can be cancelled, which stops propagation.
If a message is cancelled, no other listeners will reach it.


```js
var stations = require("stations")

// the module exports a function that returns a Radio instance
radio = stations("")

// constructors are exposed for inheritance
var radio = new stations.Radio("")
var channel = new stations.Channel("")
var message = new stations.Message({})

```

## Radio

```js
var radio = stations("name")
```

#### `name`

**type** `String` The radio's name (optional)

```js
radio.name
```

#### channelExists( *String* `channel` )

**return** `boolean` true if the channel is registered

`channel` the channel name to check

```js
radio.channelExists("")
```

#### createChannel( *String* `channel` )

**return** `Channel` the channel instance created

`channel` the channel name

```js
var channel = radio.createChannel("")
```

#### deleteChannel( *String* `channel` )

**return** `boolean` true if the channel was deleted,
                     false if it never existed before

`channel` the channel name to delete

```js
radio.deleteChannel("")
```

#### publish( *String* `channel`, *Object* `content` )

**return** `Message` the message object passed to listeners

`channel` the channel to broadcast the message

`content` any content

```js
var message = radio.publish("", {})
```

#### subscribe( *String* `channel`, *Function* `listener` )

**return** `Radio` the radio instance this method was called on (`this`)

`channel` the channel to subscribe

`listener` the callback to call on messages.
           Listeners receive a `Message` object as the only argument

```js
radio.subscribe("", function listener( message ){
  // ...
})
```

#### unsubscribe( *String* `channel`, *Function* `listener` )

**return** `Radio` the radio instance this method was called on (`this`)

`channel` the channel to unsubscribe

`listener` the listener to unsubscribe

```js
radio.unsubscribe("", listener)
```

#### peek( *String* `channel`, *Function* `listener` )

Peek into a channel once and unsubscribe from it immediately.

**return** `Radio` the radio instance this method was called on (`this`)

`channel` the channel to peek into

`listener` the listener to call on `publish()`.
           Listeners receive a `Message` object as the only argument

```js
radio.peek("", function( message ){
  // will execute only once, when `publish()` is called
})
```

## Providers

#### providerExists( *String* `name` )

**return** `boolean` true if the provider exists

`name` the provider name to check

```js
radio.providerExists("")
```

#### provide( *String* `name`, *Function* `provider` )

**return** `undefined`

`name` the provider name

`provider` the provider function to store

```js
radio.provide("", function provider( ... ){
  // ...
})
```

#### request( *String* `name` )

**return** `Function` the requested provider

`name` the provider to request

```js
var provider = channel.request("")
provider(...)
```


## Channel

```js
var channel = radio.createChannel("")
```

Channels are array instances and you can use array methods on them.

```js
channel instanceOf Array === true
```

#### publish( *Object* `content` )

**return** `Message` the message passed to listeners

`content` any content

```js
channel.publish({})
```

#### subscribe( *Function* `listener` )

**return** `Channel` the Channel instance this method was called on (`this`)

`listener` the callback to call on messages.
           Listeners receive a `Message` object as the only argument

```js
channel.subscribe(function( message ){
  // ...
})
```

#### unsubscribe( *Function* `listener` )

**return** `Channel` the Channel instance this method was called on (`this`)

`listener` the callback to call on messages

```js
channel.unsubscribe(listener)
```

#### peek( *Function* `listener` )

Peek into the channel once and unsubscribe from it immediately.

**return** `Channel` the Channel instance this method was called on (`this`)

`listener` the listener to call on `publish()`.
           Listeners receive a `Message` object as the only argument
```js
radio.peek("", function( message ){
  // will execute only once, when `publish()` is called
})
```

## Message

Messages are passed to listeners and wrap the data they carry.

#### `content`

**type** `any` the content passed to `publish(...)`

```js
message.content
```

#### `cancelled`

**type** `boolean` true if the message was cancelled

```js
message.cancelled
```

#### cancel(  )

**return** `undefined`

```js
radio.subscribe("", function listener( message ){
  message.cancel()
})
```

