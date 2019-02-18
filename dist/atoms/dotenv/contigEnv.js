"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configEnv;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var projectPath = '../../../../../../';

function configEnv() {
  var dotEnvPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : projectPath;

  var result = _dotenv.default.config({
    path: _path.default.resolve(__dirname, dotEnvPath, '.env')
  });

  if (result.error) {
    throw result.error;
  }
}