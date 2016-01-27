var Channel = require("../Channel")
var assert = require("chai").assert

describe("Channel", function(  ){

  it("should be an Array instance", function(  ){
    var channel = new Channel()
    assert.instanceOf(channel, Array)
  })
  it("should be array-like", function(  ){
    var channel = new Channel()
    assert.typeOf(channel.length, "number")
  })
  it("should be empty initially", function(  ){
    var channel = new Channel()
    assert.equal(channel.length, 0)
  })
  it("should have an optional name property", function(  ){
    var channel = new Channel()
    assert.typeOf(channel.name, "string")
  })
  it("should have the name passed in", function(  ){
    var channel = new Channel("channel")
    assert.equal(channel.name, "channel")
  })

  describe("subscribe", function(  ){
    it("should return this", function(  ){
      var channel = new Channel("channel")
      var ret = channel.subscribe(function(  ){})
      assert.equal(channel, ret)
    })
    it("should increment length", function(  ){
      var channel = new Channel("channel")
      var n = 0
      do{
        assert.equal(channel.length, n++)
        channel.subscribe(function(  ){})
      }
      while( n < 10 )
    })
    it("should register a listener only once", function(  ){
      var channel = new Channel("channel")
      var n = -1
      function subscriber(  ){}

      while( ++n < 10 ){
        channel.subscribe(subscriber)
      }

      assert.lengthOf(channel, 1)
    })
  })
  describe("isSubscribed", function(  ){
    it("should return a boolean", function(  ){
      var channel = new Channel("channel")
      var ret = channel.isSubscribed()
      assert.typeOf(ret, "boolean")
    })
    it("should correctly tell if a function is a subscriber", function(  ){
      var channel = new Channel("channel")
      var ret = channel.isSubscribed()
      assert.equal(ret, false)
      ret = channel.isSubscribed(function(  ){})
      assert.equal(ret, false)
      function subscriber(  ){}
      channel.subscribe(subscriber)
      ret = channel.isSubscribed(subscriber)
      assert.equal(ret, true)
    })
  })

  describe("unsubscribe", function(  ){
    it("should return this", function(  ){
      var channel = new Channel("channel")
      var ret = channel.unsubscribe(function(  ){})
      assert.equal(channel, ret)
    })
    it("should decrement length", function(  ){
      var channel = new Channel("channel")
      var n = 0

      do{
        assert.equal(channel.length, n++)
        channel.subscribe(function(  ){})
      }
      while( n < 10 )

      while( n > 0 ){
        channel.unsubscribe(channel[n])
        assert.equal(channel.length, n--)
      }
    })
    it("should do nothing if the listener is already unsubbed", function(  ){
      var channel = new Channel("channel")
      function subscriber(  ){}
      channel.subscribe(subscriber)
      assert.equal(channel.length, 1)
      channel.unsubscribe(subscriber)
      assert.equal(channel.length, 0)
      channel.unsubscribe(subscriber)
      assert.equal(channel.length, 0)
    })
  })

  describe("empty", function(  ){
    it("should return this", function(  ){
      var channel = new Channel("channel")
      var ret = channel.empty()
      assert.equal(channel, ret)
    })
    it("should return length to 0", function(  ){
      var channel = new Channel("channel")
      function subscriber(  ){}
      channel.subscribe(subscriber)
      channel.empty()
      assert.equal(channel.length, 0)
    })
    it("should reflect on `isSubscribed`", function(  ){
      var channel = new Channel("channel")
      function subscriber(  ){}
      channel.subscribe(subscriber)
      channel.empty()
      var ret = channel.isSubscribed(subscriber)
      assert.equal(ret, false)
    })
  })

  describe("broadcast", function(  ){
    it("should return false if no error or interruption occurred", function(  ){
      var channel = new Channel("channel")
      var ret = channel.broadcast()
      assert.equal(ret, false)
    })
    it("should return the same object that interrupted the broadcast", function(  ){
      var channel = new Channel("channel")
      var err = new Error("something")
      channel.subscribe(function(  ){
        return err
      })
      var ret = channel.broadcast()
      assert.equal(ret, err)
    })
    it("should iterate over all subscribers", function(  ){
      var channel = new Channel()
      var i = -1
      var n = -1
      var l = 10

      do{
        channel.subscribe(function subscriber(  ){
          ++i
        })
      }
      while( ++n < l )

      channel.broadcast()
      assert.equal(i, l)
    })
    it("should iterate until an error is returned", function(  ){
      var channel = new Channel()
      var i = -1
      var n = -1
      var l = 10
      var errorIndex = 4

      do{
        if( n == errorIndex ){
          channel.subscribe(function errorSubscriber(  ){
            return new Error("error")
          })
        }
        else {
          channel.subscribe(function subscriber(  ){
            ++i
          })
        }
      }
      while( ++n < l )

      channel.broadcast()
      assert.equal(i, errorIndex)
    })
  })

  describe("peek", function(  ){
    it("should increment length", function(  ){
      var channel = new Channel()
      channel.peek(function(  ){})
      assert.equal(channel.length, 1)
    })
    it("should reflect on `isSubscribed`", function(  ){
      var channel = new Channel()
      function subscriber(  ){}
      channel.peek(subscriber)
      assert.isTrue(channel.isSubscribed(subscriber))
    })
    it("should unsubscribe after a broadcast", function(  ){
      var channel = new Channel()
      function subscriber(  ){}
      channel.peek(subscriber)
      channel.broadcast()
      assert.isFalse(channel.isSubscribed(subscriber))
    })
    it("should iterate over all subscribers", function(  ){
      var channel = new Channel()
      var i = -1
      var n = -1
      var l = 10

      do{
        channel.peek(function subscriber(  ){
          ++i
        })
      }
      while( ++n < l )

      channel.broadcast()
      assert.equal(i, l)
    })
  })

})
