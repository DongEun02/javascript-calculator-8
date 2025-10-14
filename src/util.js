import { Console } from '@woowacourse/mission-utils';

export const readInput = async () => {
  Console.print('덧셈할 문자열을 입력해 주세요.');
  const input = await Console.readLineAsync('');
  return input;
};

export const printResult = (result) => {
  Console.print(`결과: ${result}`);
};
