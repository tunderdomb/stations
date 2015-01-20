stations
========

It's a radio!
Use this to include an app level event bus into your app.

Providers are baked in "messages".
They can be used to register persistent logic and provide/request them.
Like app settings or app level constant/static methods.

Messages can be cancelled, which stops propagation.
If a message is cancelled, no other listeners will reach it.

## Radio

### boolean channelExists( String channel )

### Channel createChannel( String channel )

### boolean deleteChannel( String channel )

### Message publish( String channel, Object content )

### Radio subscribe( String channel, Function listener )

### Radio unsubscribe( String channel, Function listener )

### boolean providerExists( String name )

### null provide( String name, Function provider )

### Function request( String name )


## Channel

### Message publish( Object content )

### Channel subscribe( Function listener )

### Channel unsubscribe( Function listener )


## Message

### cancel(  )


