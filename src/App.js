import readInput from './utils/readInput';
import validateInput from './utils/validateInput';
import separateNumbers from './utils/separateNumbers';
import sum from './utils/sum';
import printResult from './utils/printResult';

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
