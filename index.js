/*API Reference:
  .handlers: (Object) Contain a function handlers
  .do(dataInput(required), function1, function2, function3...): run functions synchronously.
*/



module.exports = function (configHandlers) { // configHandlers: {handlerName: function(parameters...) {actions...}};
  var defaultHandlers = {
    error: function (data) {
      return 'ERROR: ' + data;
    }
  };
  function doit () {
    var callbacks = Array.prototype.slice.call(arguments);
    var data = callbacks.shift();
    var handlers = this.handlers;

    function error() {
      var args = Array.prototype.slice.call(arguments);
      handler = args.shift();
      handlers[handler].apply(this, args);
    };

    function done () {
      callback = callbacks.shift();
      if (callback) {
        var args = Array.prototype.slice.call(arguments);
        args.push(function(){done.apply(this, Array.prototype.slice.call(arguments));});
        args.push(function(){error.apply(this, Array.prototype.slice.call(arguments));});
        callback.apply(this, args);
      };
    };

    done(data);
  };

  return {
    handlers: configHandlers || defaultHandlers,
    do: doit}
};
