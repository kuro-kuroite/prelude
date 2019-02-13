"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ja = _interopRequireDefault(require("date-fns/locale/ja"));

var _enUS = _interopRequireDefault(require("date-fns/locale/en-US"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DateFnsTzInfo = function DateFnsTzInfo(region) {
  _classCallCheck(this, DateFnsTzInfo);

  this.region = region;

  if (this.region === 'US') {
    this.language = _enUS.default;
    this.language.code = 'en-US';
    this.language.timeZone = 'America/New_York';
  } else if (this.region === 'JP') {
    this.language = _ja.default;
    this.language.code = 'ja-JP';
    this.language.timeZone = 'Asia/Tokyo';
  }
};

exports.default = DateFnsTzInfo;