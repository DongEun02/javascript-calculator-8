import { Console } from '@woowacourse/mission-utils';

export const readInput = async () => {
  const input = await Console.readLineAsync('덧셈할 문자열을 입력해 주세요.');
  return input;
};

export const printResult = (result) => {
  Console.print(`결과 : ${result}`);
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

export const validateInput = (input) => {
  const numbers = separateNumbers(input);

  // 구분자만 입력한 경우
  if (numbers.length > 1 && numbers.every((n) => n === 0))
    throw new Error(`[ERROR] 구분자만 입력하였습니다.`);

  // 커스텀 구분자 선언 형식이 잘못된 경우
  if (input.startsWith('//')) {
    input = input.replace(/\\n/g, '\n');
    const endIndex = input.indexOf('\n');
    if (endIndex === -1)
      throw new Error('[ERROR] 커스텀 구분자 선언 형식이 잘못되었습니다.');
  }

  // 숫자가 아닌 문자를 입력한 경우
  numbers.forEach((n) => {
    if (isNaN(n)) throw new Error(`[ERROR] 숫자가 입력되지 않았습니다.`);
  });

  // 숫자와 구분자의 순서가 잘못된 경우
  if (numbers.some((n) => n === 0) && numbers.length > 1)
    throw new Error(`[ERROR] 숫자와 구분자의 순서가 잘못되었습니다.`);

  // 음수를 입력한 경우
  numbers.forEach((n) => {
    if (n < 0) throw new Error('[ERROR] 음수는 입력할 수 없습니다.');
  });
};
