export default class StringBuffer {
  constructor() {
    this.string = '';
  }

  concatString(string, delimiter = '\n') {
    if (string === '') {
      return;
    }

    this.string += string + delimiter;
  }
}
