var Radio = require("../Radio")
var Channel = require("../Channel")
var assert = require("chai").assert

function r(fn) {
  var count = fn.length
  var radios = []
  while (count) {
    radios.unshift(new Radio("c:" + count))
    --count
  }
  return function() {
    fn.apply(null, radios)
  }
}

describe("Radio", function() {

  describe("channel()", function() {
    it("should create a channel", r(function(r) {
      var channel = r.channel("channel")
      assert.instanceOf(channel, Channel)
    }))
  })
  describe("channelExists()", function() {
    it("should not exist", r(function(r) {
      assert.isFalse(r.channelExists("channel"))
    }))
    it("should exists", r(function(r) {
      r.channel("channel")
      assert.isTrue(r.channelExists("channel"))
    }))
  })
  describe("deleteChannel()", function() {
    it("should delete by name", r(function(r) {
      r.channel("channel")
      assert.isTrue(r.channelExists("channel"))
      r.deleteChannel("channel")
      assert.isFalse(r.channelExists("channel"))
    }))
    it("should delete by Channel", r(function(r) {
      var channel = r.channel("channel")
      assert.isTrue(r.channelExists("channel"))
      r.deleteChannel(channel)
      assert.isFalse(r.channelExists("channel"))
    }))
  })
  describe("hasSubscribers()", function() {
    it("should nave none when no channel provided", r(function(r) {
      assert.isFalse(r.hasSubscribers())
    }))
    it("should have none when channel provided but channel is empty", r(function(r) {
      r.channel("channel")
      assert.isFalse(r.hasSubscribers("channel"))
    }))
    it("should have none when channel provided, but no subscriber is registered", r(function(r) {
      r.channel("channel")
      r.subscribe("channel")
      assert.isFalse(r.hasSubscribers("channel"))
    }))
    it("should report true", r(function(r) {
      var channel = r.channel("channel")
      r.subscribe("channel", function() {
      })
      assert.isTrue(r.hasSubscribers("channel"))
    }))
  })
  describe("isSubscribed()", function() {
    it("should report false when channel doesn't exists", r(function(r) {
      assert.isFalse(r.isSubscribed("channel", function() {
      }))
    }))
    it("should report false false when subscriber is not registered", r(function(r) {
      r.channel("channel")
      assert.isFalse(r.isSubscribed("channel", function() {
      }))
    }))
    it("should report true", r(function(r) {
      function subscriber() {
      }

      var channel = r.channel("channel")
      r.subscribe("channel", subscriber)
      assert.isTrue(r.isSubscribed("channel", subscriber))
    }))
  })
  describe("broadcast()", function() {
    it("should return false if no error or interruption occurred", r(function(r) {
      r.channel("channel")
      assert.isFalse(r.broadcast("channel"))
    }))
    it("should return the same object that interrupted the broadcast", r(function(r) {
      var channel = r.channel("channel")
      var err = new Error("something")
      r.subscribe("channel", function() {
        return err
      })
      var ret = r.broadcast("channel")
      assert.equal(ret, err)
    }))
  })
  describe("subscribe()", function() {
    it("should return this", r(function(r) {
      r.channel("channel")
      var ret = r.subscribe(function() {
      })
      assert.equal(r, ret)
    }))
    it("should register a listener only once", r(function(r) {
      var channel = r.channel("channel")
      var n = -1

      function subscriber() {
      }

      while (++n < 10) {
        r.subscribe("channel", subscriber)
      }

      assert.lengthOf(channel, 1)
    }))
  })
  describe("unsubscribe()", function() {
    it("should return this", r(function(r) {
      r.channel("channel")
      var ret = r.unsubscribe(function() {
      })
      assert.equal(r, ret)
    }))
    it("should do nothing if the listener is already unsubbed", r(function(r) {
      var channel = r.channel("channel")

      function subscriber() {
      }

      r.subscribe("channel", subscriber)
      assert.equal(channel.length, 1)
      r.unsubscribe("channel", subscriber)
      assert.equal(channel.length, 0)
      r.unsubscribe("channel", subscriber)
      assert.equal(channel.length, 0)
    }))
  })
  describe("peek()", function() {
    it("should increment length", r(function(r) {
      var channel = r.channel("channel")
      r.peek("channel", function() {
      })
      assert.equal(channel.length, 1)
    }))
    it("should reflect on `isSubscribed`", r(function(r) {
      var channel = r.channel("chanel")

      function subscriber() {
      }

      r.peek("channel", subscriber)
      assert.isTrue(r.isSubscribed("channel", subscriber))
    }))
    it("should unsubscribe after a broadcast", r(function(r) {
      var channel = r.channel("channel")

      function subscriber() {
      }

      r.peek("channel", subscriber)
      r.broadcast("channel")
      assert.isFalse(r.isSubscribed(subscriber))
    }))
  })
  describe("emptyChannel()", function() {
    it("should return this", r(function(r) {
      var channel = r.channel("channel")
      var ret = r.emptyChannel("channel")
      assert.equal(r, ret)
    }))
    it("should return length to 0", r(function(r) {
      var channel = r.channel("channel")

      function subscriber() {
      }

      r.subscribe("channel", subscriber)
      r.emptyChannel("channel")
      assert.equal(channel.length, 0)
    }))
    it("should reflect on `isSubscribed`", r(function(r) {
      var channel = r.channel("channel")

      function subscriber() {
      }

      r.subscribe("channel", subscriber)
      r.emptyChannel("channel")
      assert.isFalse(r.isSubscribed("channel", subscriber))
    }))
  })

})
