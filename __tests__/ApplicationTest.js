import App from '../src/App.js';
import { MissionUtils } from '@woowacourse/mission-utils';

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();
  return logSpy;
};

describe('문자열 계산기', () => {
  test('기본 구분자 사용', async () => {
    const inputs = ['1:2,3'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 6'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('커스텀 구분자 사용', async () => {
    const inputs = ['//;\n1'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 1'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('빈 문자열 입력 시 결과는 0', async () => {
    const inputs = [''];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 0'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('음수가 입력되면 예외 발생', async () => {
    const inputs = ['-1,2,3'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow(
      '[ERROR] 음수는 입력할 수 없습니다.'
    );
  });

  test('커스텀 구분자 선언 형식이 잘못된 경우 예외 발생', async () => {
    const inputs = ['//;m1;2;3'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow(
      '[ERROR] 커스텀 구분자 선언 형식이 잘못되었습니다.'
    );
  });

  test('숫자가 아닌 문자가 포함될 경우 예외 발생', async () => {
    const inputs = ['1:2:a'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow(
      '[ERROR] 숫자가 입력되지 않았습니다.'
    );
  });

  test('구분자만 입력한 경우 예외 발생', async () => {
    const inputs = [':::'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR] 구분자만 입력하였습니다.');
  });

  test('숫자와 구분자 순서가 잘못된 경우 예외 발생', async () => {
    const inputs = [':1:2:'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow(
      '[ERROR] 숫자와 구분자의 순서가 잘못되었습니다.'
    );
  });
});
