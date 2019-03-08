"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dateFnsTz = require("date-fns-tz");

var _atoms = require("../../atoms");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DateFnsTz =
/*#__PURE__*/
function () {
  function DateFnsTz(region) {
    _classCallCheck(this, DateFnsTz);

    this.tz = new _atoms.DateFnsTzInfo(region);
  }

  _createClass(DateFnsTz, [{
    key: "parseTime",
    value: function parseTime(utcDateTime) {
      var formatString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'BBBB p';
      return this.format(utcDateTime, formatString, {
        locale: this.tz.language,
        timeZone: this.tz.language.timeZone,
        awareOfUnicodeTokens: true
      });
    }
  }, {
    key: "format",
    value: function format(utcDateTime, formatString) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
        locale: this.tz.language,
        timeZone: this.tz.language.timeZone,
        awareOfUnicodeTokens: true
      };
      var localDateTime = (0, _dateFnsTz.utcToZonedTime)(utcDateTime, this.tz.language.timeZone);
      return (0, _dateFnsTz.format)(localDateTime, formatString, options);
    }
  }, {
    key: "toDate",
    value: function toDate(dateTime) {
      return (0, _dateFnsTz.toDate)(dateTime, {
        timeZone: this.tz.language.timeZone
      });
    }
  }, {
    key: "zonedTimeToUtc",
    value: function zonedTimeToUtc(zonedTime) {
      return (0, _dateFnsTz.zonedTimeToUtc)(zonedTime, this.tz.language.timeZone);
    } // NOTE: deprecated

  }, {
    key: "utcToZonedTime",
    value: function utcToZonedTime(utcDateTime) {
      // eslint-disable-next-line no-console
      console.log('this method is deprecated'); // eslint-disable-next-line no-console

      console.log('please use .toDate()');
      return (0, _dateFnsTz.utcToZonedTime)(utcDateTime, this.tz.language.timeZone);
    }
  }]);

  return DateFnsTz;
}();

exports.default = DateFnsTz;