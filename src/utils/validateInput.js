import separateNumbers from './separateNumbers.js';
import parseCustomDelimiter from './parseCustomDelimiter.js';

const ERROR_MESSAGES = {
  ONLY_DELIMITERS: '[ERROR] 구분자만 입력하였습니다.',
  INVALID_CUSTOM_DELIMITER_FORMAT:
    '[ERROR] 커스텀 구분자 선언 형식이 잘못되었습니다.',
  INVALID_DELIMITER_OR_CHARACTER:
    '[ERROR] 잘못된 구분자 또는 문자가 입력되었습니다.',
  INCORRECT_NUMBER_DELIMITER_ORDER:
    '[ERROR] 숫자와 구분자의 순서가 잘못되었습니다.',
  NO_NUMBER_AFTER_DELIMITER: '[ERROR] 구분자 뒤에 숫자가 없습니다.',
  NO_NUMBER_BETWEEN_DELIMITERS: '[ERROR] 구분자 사이에 숫자가 없습니다.',
  NEGATIVE_NUMBER: '[ERROR] 음수는 입력할 수 없습니다.',
};

const validateInput = (input) => {
  const numbers = separateNumbers(input);

  // 구분자만 입력한 경우
  if (numbers.length > 1 && numbers.every((n) => n === 0))
    throw new Error(ERROR_MESSAGES.ONLY_DELIMITERS);

  // 커스텀 구분자 선언 형식이 잘못된 경우
  if (input.startsWith('//')) {
    input = input.replace(/\\n/g, '\n');
    const endIndex = input.indexOf('\n');
    if (endIndex === -1)
      throw new Error(ERROR_MESSAGES.INVALID_CUSTOM_DELIMITER_FORMAT);
  }

  // 잘못된 구분자를 입력하거나 숫자가 아닌 문자를 입력한 경우
  numbers.forEach((n) => {
    if (isNaN(n))
      throw new Error(ERROR_MESSAGES.INVALID_DELIMITER_OR_CHARACTER);
  });

  // 숫자와 구분자의 순서가 잘못된 경우
  if (
    (input.startsWith(',') || input.startsWith(':')) &&
    (input.endsWith(',') || input.endsWith(':'))
  )
    throw new Error(ERROR_MESSAGES.INCORRECT_NUMBER_DELIMITER_ORDER);
  else if (input.startsWith('//')) {
    const { customDelimiter, newString } = parseCustomDelimiter(input);
    if (
      newString.startsWith(customDelimiter) &&
      newString.endsWith(customDelimiter)
    )
      throw new Error(ERROR_MESSAGES.INCORRECT_NUMBER_DELIMITER_ORDER);
  }

  // 구분자 뒤에 숫자가 없는 경우(마지막이 구분자인 경우)
  if (input.endsWith(',') || input.endsWith(':'))
    throw new Error(ERROR_MESSAGES.NO_NUMBER_AFTER_DELIMITER);
  if (input.startsWith('//')) {
    const { customDelimiter, newString } = parseCustomDelimiter(input);
    if (newString.endsWith(customDelimiter))
      throw new Error(ERROR_MESSAGES.NO_NUMBER_AFTER_DELIMITER);
  }

  // 구분자 사이에 숫자가 없는 경우
  if (
    input.includes(',,') ||
    input.includes('::') ||
    input.includes(',:') ||
    input.includes(':,')
  )
    throw new Error(ERROR_MESSAGES.NO_NUMBER_BETWEEN_DELIMITERS);
  else if (input.startsWith('//')) {
    const { customDelimiter, newString } = parseCustomDelimiter(input);
    const doubleDelimiter = customDelimiter + customDelimiter;
    if (newString.includes(doubleDelimiter))
      throw new Error(ERROR_MESSAGES.NO_NUMBER_BETWEEN_DELIMITERS);
  }

  // 음수를 입력한 경우
  numbers.forEach((n) => {
    if (n < 0) throw new Error(ERROR_MESSAGES.NEGATIVE_NUMBER);
  });
};

export default validateInput;
