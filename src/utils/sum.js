const sum = (numbers) => {
  return numbers.reduce((acc, number) => (acc += number), 0);
};

export default sum;
