# Radio

## broadcast

Send arguments on a channel.
If the channel doesn't exists nothing happens.

**Parameters**

-   `channel` **(Channel|[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String))** 

Returns **Any** 

## channel

Create a channel if it doesn't exist already
and return the channel.

**Parameters**

-   `channel` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 

Returns **Channel** 

## channelExists

Check if a channel exists.

**Parameters**

-   `channel` **(Channel|[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String))** 

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

## deleteChannel

Delete a channel.

**Parameters**

-   `channel` **(Channel|[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String))** 

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

## emptyChannel

Empty a channel removing every subscriber it holds,
but not deleting the channel itself.
If the channel doesn't exists nothing happens.

**Parameters**

-   `channel` **(Channel|[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String))** 

Returns **Radio** this

## hasSubscribers

Check if a channel has any subscribers.
If the channel doesn't exists it's `false`.

**Parameters**

-   `channel` **(Channel|[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String))** 

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

## isSubscribed

Check if a listener is subscribed to a channel.
If the channel doesn't exists it's `false`.

**Parameters**

-   `channel` **(Channel|[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String))** 
-   `listener` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** 

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

## peek

Subscribe a listener to a channel
that unsubscribes after the first broadcast it receives.
It also creates the channel if it doesn't exists yet.

**Parameters**

-   `channel` **(Channel|[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String))** 
-   `listener` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** 

Returns **Radio** this

## subscribe

Subscribe to a channel with a listener.
It also creates the channel if it doesn't exists yet.

**Parameters**

-   `channel` **(Channel|[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String))** 
-   `listener` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** 

Returns **Radio** this

## unsubscribe

Unsubscribe a listener from a channel.
If the channel doesn't exists nothing happens.

**Parameters**

-   `channel` **(Channel|[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String))** 
-   `listener` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** 

Returns **Radio** this

# Channel

**Extends Array**

Create a channel

**Parameters**

-   `name` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 

## broadcast

Invoke listeners with the given arguments.
Listeners are called in the order they were registered.
If a listener returns anything it breaks the loop and returns that value.

Returns **([boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)|Any)** 

## empty

Clears all listeners from the channel.

Returns **Channel** this

## hasSubscribers

Returns how many listeners are registered on the channel.

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

## isSubscribed

Check if a function is registered as a listener on the channel.

**Parameters**

-   `listener` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** 

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

## peek

Register a listener that will be called only once.

**Parameters**

-   `listener` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** 

Returns **Channel** this

## subscribe

Add a listener to this channel.

**Parameters**

-   `listener` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** 

Returns **Channel** this

## unsubscribe

Remove a listener from the channel

**Parameters**

-   `listener` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** 

Returns **Channel** this
