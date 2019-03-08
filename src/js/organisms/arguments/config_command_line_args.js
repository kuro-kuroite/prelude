import { commandLineArgs, commandLineUsage } from '../../atoms';

export default function configCommandLineArgs(
  optionDefinitions,
  sections,
  argv,
) {
  process.argv = argv;
  const options = commandLineArgs(optionDefinitions);
  if (options.help) {
    const usage = commandLineUsage(sections);
    // eslint-disable-next-line no-console
    console.log(usage);
    process.exit(0);
  }
  return options;
}
