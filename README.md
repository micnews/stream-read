
# stream-read

  Read from a stream, callback style.

## Example

```js
var read = require('stream-read');

var stream = createStreamSomeHow();

read(stream, function(err, data){
  // err => stream emitted "error" event
  // truthy data => stream emitted data
  // `null` data => stream ended
});
```

## Installation

```bash
$ npm install stream-read
```

## License

  MIT

