"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var util = _interopRequireWildcard(require("util"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import * as Promise from 'bluebird';
// HACK: npm lib の時に上手く動かないので以下で代用する
// const fsAsync = Promise.promisifyAll(fs);
var fsAsync = {
  readFile: util.promisify(_fs.default.readFile),
  writeFile: util.promisify(_fs.default.writeFile)
};
var _default = fsAsync;
exports.default = _default;