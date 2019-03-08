"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var projectPath = '../../../../../../';

var result = _dotenv.default.config({
  path: _path.default.resolve(__dirname, projectPath, '.env')
});

if (result.error) {
  throw result.error;
}