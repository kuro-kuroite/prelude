"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _commandLineUsage = _interopRequireDefault(require("command-line-usage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* like
const sections = [
  {
    header: 'Sample app',
    content: 'this is sample app for command-line-args'
  },
  {
    header: 'Options',
    optionList: optionDefinitions
  }
];
*/
var _default = _commandLineUsage.default;
exports.default = _default;