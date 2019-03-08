import commandLineArgs from 'command-line-args';

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

export default commandLineArgs;
