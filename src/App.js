import { readInput, printResult, separateNumbers, sum } from './util.js';

class App {
  async run() {
    const input = await readInput();

    const numbers = separateNumbers(input);

    const result = sum(numbers);

    printResult(result);
  }
}

export default App;
