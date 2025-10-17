import parseCustomDelimiter from './parseCustomDelimiter';

const separateNumbers = (input) => {
  // 커스텀 구분자 사용
  if (input.startsWith('//')) {
    const { customDelimiter, newString } = parseCustomDelimiter(input);
    return newString.split(customDelimiter).map(Number);
  }

  // 기본 구분자 사용
  return input.split(/[,:]/).map(Number);
};

export default separateNumbers;
