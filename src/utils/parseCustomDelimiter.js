const parseCustomDelimiter = (input) => {
  input = input.replace(/\\n/g, '\n');
  const endIndex = input.indexOf('\n');
  const customDelimiter = input.slice(2, endIndex);
  const newString = input.slice(endIndex + 1);
  return { customDelimiter, newString };
};

export default parseCustomDelimiter;
