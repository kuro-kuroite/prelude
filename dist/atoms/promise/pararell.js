"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pararels;

function pararels() {
  for (var _len = arguments.length, promises = new Array(_len), _key = 0; _key < _len; _key++) {
    promises[_key] = arguments[_key];
  }

  return Promise.all(promises.map(function (p) {
    return p();
  }));
}