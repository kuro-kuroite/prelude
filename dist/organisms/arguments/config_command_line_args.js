"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configCommandLineArgs;

var _atoms = require("../../atoms");

function configCommandLineArgs(optionDefinitions, sections) {
  var options = (0, _atoms.commandLineArgs)(optionDefinitions);

  if (options.help) {
    var usage = (0, _atoms.commandLineUsage)(sections); // eslint-disable-next-line no-console

    console.log(usage);
    process.exit(0);
  }
}