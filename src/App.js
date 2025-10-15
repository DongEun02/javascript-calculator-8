import { readInput, printResult, separateNumbers } from './util.js';

class App {
  async run() {
    const input = await readInput();

    const numbers = separateNumbers(input);

    printResult(numbers);
  }
}

export default App;
