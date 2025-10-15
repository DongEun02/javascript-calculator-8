import {
  readInput,
  printResult,
  separateNumbers,
  sum,
  validateInput,
} from './util.js';

class App {
  async run() {
    const input = await readInput();

    validateInput(input);

    const numbers = separateNumbers(input);

    const result = sum(numbers);

    printResult(result);
  }
}

export default App;
