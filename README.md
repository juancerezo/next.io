# next.io
No more hell. Callbacks made easy, with error handlers and more.

##Deprecated: This project has been discontinued.

This was an experiment to understand how to run callbacks one by one, without nested functions.
You can continue using the `next.io` package. But, I recommend you use `async` for production projects. 

### Unit test command (require mocha):

Install mocha globally:
```
npm install -g mocha
```

Unit test command:
```
npm test
```
-------------------

## Using next.io:

### Simple use:

##### Preparing:
``` javascript
var next = require ('next.io');
var to = next();
```

##### Running async functions:
``` javascript
to.do('data input', //required, ever you can use null
  function (data, next) {
    //some async
    next(output);
  },
  function (data, next) {
    //some async
    next(output);
  },
  function (data) {
    //whatever you want
  }
);
```

### Use with handlers

##### Preparing:

``` javascript
var next = require ('next.io');
var to = next({ // handlers
  error: function (data) {
    //do something
  }
});
```

##### Running async functions with error handlers:

``` javascript
to.do('data input', //required, ever you can use null
  function (data, next) {
    //some async without possible errors
    next(output);
  },
  function (data, next, error) {
    //some async with possible errors
    if (err) {
    error('error', err) // 'error' is a handler name
    } else {next(output);}
  },
  function (data) {
    //whatever you want
  }
);
```

### Example:

``` javascript
var fs   = require ('fs');
var next = require ('next.io');
var to   = next({

  error: function(data) {
    console.log('ERROR: ' + data);
  }
});

function readFile (path, next, error) {
  fs.readFile(path, 'utf-8', function (err, data) {
    if (err) {
      error('error', err)
    } else {
     next(data);
    }
  });
};

function consoleFile (data) {
  console.log(data);
};

to.do('./example.txt', readFile, consoleFile);
```
