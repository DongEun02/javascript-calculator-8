import { Console } from '@woowacourse/mission-utils';

export const readInput = async () => {
  Console.print('덧셈할 문자열을 입력해 주세요.');
  const input = await Console.readLineAsync('');
  return input;
};

export const printResult = (result) => {
  Console.print(`결과: ${result}`);
};

export const separateNumbers = (input) => {
  // 커스텀 구분자 사용
  if (input.startsWith('//')) {
    input = input.replace(/\\n/g, '\n');
    const endIndex = input.indexOf('\n');
    const customDelimiter = input.slice(2, endIndex);
    const newString = input.slice(endIndex + 1);
    return newString.split(customDelimiter).map(Number);
  }

  // 기본 구분자 사용
  return input.split(/[,:]/).map(Number);
};

export const sum = (numbers) => {
  return numbers.reduce((acc, number) => (acc += number), 0);
};
