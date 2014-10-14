
module.exports = function read(stream, cb) {
  return typeof stream.read == 'function'
    ? read2(stream, cb)
    : read1(stream, cb);
};

function read1(stream, cb) {
  if (!stream.readable) return cb();

  stream.on('data', ondata);
  stream.on('error', onerror);
  stream.on('end', onend);

  function ondata(data) {
    stream.pause();
    cleanup();
    cb(null, data);
  }

  function onerror(err) {
    cleanup();
    cb(err);
  }

  function onend(data) {
    cleanup();
    cb(null, data);
  }

  function cleanup() {
    stream.removeListener('data', ondata);
    stream.removeListener('error', onerror);
    stream.removeListener('end', onend);
  }
}

function read2(stream, cb) {
  if (!stream.readable) return cb();

  function onreadable() {
    cleanup();
    check();
  }

  function onend() {
    cleanup();
    cb(null, null);
  }

  function onerror(err) {
    cleanup();
    cb(err);
  }

  function listen() {
    stream.on('readable', onreadable);
    stream.on('end', onend);
    stream.on('error', onerror);
  }

  function cleanup() {
    stream.removeListener('readable', onreadable);
    stream.removeListener('end', onend);
    stream.removeListener('error', onerror);
  }

  function check() {
    var buf = stream.read();
    if (buf) cb(null, buf);
    else listen();
  }

  check();
}

