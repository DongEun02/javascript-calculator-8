import readInput from './utils/readInput.js';
import validateInput from './utils/validateInput.js';
import separateNumbers from './utils/separateNumbers.js';
import sum from './utils/sum.js';
import printResult from './utils/printResult.js';

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
