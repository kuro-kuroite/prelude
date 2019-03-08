"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _commandLineArgs = _interopRequireDefault(require("command-line-args"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* like
const optionDefinitions = [
  {
    name: 'verbose',
    alias: 'v',
    type: Boolean
  },
  {
    name: 'src',
    type: String,
    defaultOption: true,
    multiple: true,
    description: 'file path'
  },
  {
    name: 'timeout',
    alias: 't',
    type: Number,
    defaultValue: 3,
    description: 'convert timeout'
  },
  {
    name: 'help',
    alias: 'h',
    type: Boolean,
    description: 'show help'
  }
];
*/
var _default = _commandLineArgs.default;
exports.default = _default;