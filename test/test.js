var assert = require('assert')
var next = require('../index.js');

describe('next unit tests', function () {
  describe('initial tests', function () {
    it('next() create an object', function () {
      assert.equal(typeof next(), 'object')
    });
    it('handlers object created', function () {
      assert.equal(typeof next().handlers, 'object')
    });
    it('default error handle created', function () {
      assert.equal(typeof next().handlers.error, 'function')
    });
    it('do method created', function () {
      assert.equal(typeof next().do, 'function')
    });
    it('direct check default error handle', function () {
      assert.deepEqual(next().handlers.error('unit test'), 'ERROR: unit test')
    })
  })
  describe('use tests', function () {

    describe('handlers tests', function () {
      it('custom handle created', function () {
        assert.deepEqual(next({
          custom: function(data) {return 'Custom: ' + data}
        }).handlers.custom('unit test'), 'Custom: unit test')
      });
      it('default handle doesn\'t exist', function () {
        assert.deepEqual(next({
          custom: function(data) {return 'Custom: ' + data}
        }).handlers.error, undefined)
      });
    });
    describe('input data tests', function () {
      it('input Number works correctly', function () {
        next().do(500, function (data) {
          assert.deepEqual(data, 500);
        });
      })
      it('input String works correctly', function () {
        next().do('unit test', function (data) {
          assert.deepEqual(data, 'unit test');
        });
      })
      it('input Array works correctly', function () {
        next().do([2, 'String'], function (data) {
          assert.deepEqual(data, [2, 'String']);
        });
      })
      it('input Object works correctly', function () {
        next().do({unit: 'test' }, function (data) {
          assert.deepEqual(data, {unit: 'test'});
        });
      })
      it('input Boolean works correctly', function () {
        next().do(true, function (data) {
          assert.deepEqual(data, true);
        });
      })
      it('input null works correctly', function () {
        next().do(null, function (data) {
          assert.deepEqual(data, null);
        });
      })
      it('input undefined works correctly', function () {
        next().do(undefined, function (data) {
          assert.deepEqual(data, undefined);
        });
      })
    });
    describe('input var tests', function () {
      it('input Number in var works correctly', function () {
        var input = 500;
        next().do(input, function (data) {
          assert.deepEqual(data, input);
        });
      })
      it('input String in var works correctly', function () {
        var input = 'String';
        next().do(input, function (data) {
          assert.deepEqual(data, input);
        });
      })
      it('input Array in var works correctly', function () {
        var input = [2, 'String'];
        next().do(input, function (data) {
          assert.deepEqual(data, input);
        });
      })
      it('input Object in var works correctly', function () {
        var input = {unit: 'test'};
        next().do(input, function (data) {
          assert.deepEqual(data, input);
        });
      })
      it('input Boolean in var works correctly', function () {
        var input = false;
        next().do(input, function (data) {
          assert.deepEqual(data, input);
        });
      })
      it('input null in var works correctly', function () {
        var input = null;
        next().do(input, function (data) {
          assert.deepEqual(data, input);
        });
      })
      it('input undefined var works correctly', function () {
        var input = undefined;
        next().do(input, function (data) {
          assert.deepEqual(data, input);
        });
      })

    });
    describe('callback test', function () {
      next().do('unit test',
        function (data, next) {
          it('one callback test', function (done) {
          next(done, data)
          })
        },
        function (done, data) {
          assert.deepEqual(data, 'unit test')
          done();
        }
      )

      next().do('unit test',
        function (data, next) {
          it('two callback test', function (done) {
          next(done, data)
          })
        },
        function (done, data, next) {
          next(done, data)
        },
        function (done, data) {
          assert.deepEqual(data, 'unit test')
          done();
        }
      )

      next({
        error: function(done, data){
          assert.deepEqual(data, 'unit test');
          done();
        }
      }).do('unit test',
        function (data, next, error) {
          it('callback test to error handle', function (done) {
          error('error', done, data)
          })
        },
        function (done, data) {
          assert.deepEqual(data, 'error')
          done();
        }
      )
    })
  })
})
