import { readInput, printResult } from './util.js';

class App {
  async run() {
    const input = await readInput();
    printResult(input);
  }
}

export default App;
