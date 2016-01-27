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
