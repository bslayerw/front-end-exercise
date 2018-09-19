import reducer from '../reducers';
import {
  ADDITION,
  DIVISION,
  EQUAL,
  IDLE,
  MULTIPLICATION,
  SUBSTRACTION,
} from '../constants';
import {
  CLEAR,
  CLEAR_ALL,
  DELETE,
  INPUT,
  OPERATE,
  TOGGLE_ROMAN,
} from '../actionTypes';

const defaultState = {
  awaitingOperation: true,
  input: 0,
  operation: IDLE,
  pendingOperation: false,
  result: 0,
  roman: false,
};

it('returns a function', () => {
  expect(reducer()).toEqual(expect.any(Function));
});

it('returns the current state', () => {
  expect(reducer()({ foo: 'bar' })).toEqual({ foo: 'bar' });
});

describe('CLEAR_ALL', () => {
  it('resets all state', () => {
    expect(reducer({ type: CLEAR_ALL, reset: defaultState })({})).toEqual(
      defaultState
    );
  });
});

describe('CLEAR', () => {
  it('resets the input', () => {
    expect(
      reducer({ type: CLEAR })({
        awaitingOperation: false,
        input: 2,
        operation: ADDITION,
        pendingOperation: false,
        result: 1,
        roman: true,
      })
    ).toEqual({ input: 0 });
  });
});

describe('DELETE', () => {
  describe('when the current input is set', () => {
    it('removes the last input character', () => {
      expect(
        reducer({ type: DELETE })({ ...defaultState, input: 1234 })
      ).toEqual({ input: 123 });
    });
  });
});

describe('INPUT', () => {
  describe('with roman numerals disabled', () => {
    it('enables awaiting operation and sets the input', () => {
      expect(reducer({ type: INPUT, which: 50 })(defaultState)).toEqual({
        awaitingOperation: true,
        input: 2,
      });
    });
  });

  describe('with roman numerals enabled', () => {
    it('enables awaiting operation and sets the input', () => {
      expect(
        reducer({ type: INPUT, which: 68 })({
          ...defaultState,
          input: 'X',
          roman: true,
        })
      ).toEqual({
        awaitingOperation: true,
        input: 'XD',
      });
    });
  });

  describe('when not awaiting operation', () => {
    it('sets the input to the passed character', () => {
      expect(
        reducer({ type: INPUT, which: 50 })({
          ...defaultState,
          input: 5,
          awaitingOperation: false,
        })
      ).toEqual({
        awaitingOperation: true,
        input: 2,
      });
    });
  });

  describe('when awaiting operation', () => {
    it('appends the passed character to the current input', () => {
      expect(
        reducer({ type: INPUT, which: 50 })({
          ...defaultState,
          input: 5,
          awaitingOperation: true,
        })
      ).toEqual({
        awaitingOperation: true,
        input: 52,
      });
    });
  });
});

describe('OPERATE', () => {
  it('performs initial operation', () => {
    expect(
      reducer({ type: OPERATE, operation: ADDITION })({
        ...defaultState,
        awaitingOperation: true,
        operation: IDLE,
        input: 10,
        result: 0,
      })
    ).toEqual({
      awaitingOperation: false,
      input: 0,
      operation: ADDITION,
      pendingOperation: true,
      result: 10,
      roman: false,
    });
  });

  it('performs addition', () => {
    expect(
      reducer({ type: OPERATE, operation: SUBSTRACTION })({
        ...defaultState,
        input: 10,
        operation: ADDITION,
        result: 5,
      })
    ).toEqual({
      awaitingOperation: false,
      input: 5,
      operation: SUBSTRACTION,
      pendingOperation: true,
      result: 15,
      roman: false,
    });
  });

  it('performs substraction', () => {
    expect(
      reducer({ type: OPERATE, operation: ADDITION })({
        ...defaultState,
        input: 10,
        operation: SUBSTRACTION,
        result: 5,
      })
    ).toEqual({
      awaitingOperation: false,
      input: 5,
      operation: ADDITION,
      pendingOperation: true,
      result: -5,
      roman: false,
    });
  });

  it('performs multiplication', () => {
    expect(
      reducer({ type: OPERATE, operation: ADDITION })({
        ...defaultState,
        input: 10,
        operation: MULTIPLICATION,
        result: 5,
      })
    ).toEqual({
      awaitingOperation: false,
      input: 5,
      operation: ADDITION,
      pendingOperation: true,
      result: 50,
      roman: false,
    });
  });

  it('performs division', () => {
    expect(
      reducer({ type: OPERATE, operation: ADDITION })({
        ...defaultState,
        input: 10,
        operation: DIVISION,
        result: 5,
      })
    ).toEqual({
      awaitingOperation: false,
      input: 5,
      operation: ADDITION,
      pendingOperation: true,
      result: 0.5,
      roman: false,
    });
  });

  // FAIL - Replace `it.skip` below with `it` and repair the failing test
  it.skip('performs equal', () => {
    expect(
      reducer({ type: OPERATE, operation: EQUAL })({
        ...defaultState,
        input: 10,
        operation: ADDITION,
        result: 5,
      })
    ).toEqual({
      awaitingOperation: false,
      input: 10,
      operation: ADDITION,
      pendingOperation: false,
      result: 15,
      roman: false,
    });
  });
});

describe('TOGGLE_ROMAN', () => {
  describe('when invalid roman input', () => {
    it('disables roman numerals', () => {
      expect(
        reducer({ type: TOGGLE_ROMAN })({
          ...defaultState,
          input: 0,
          roman: false,
        })
      ).toEqual({
        input: 0,
        roman: false,
      });
    });
  });

  describe('when valid roman input but invalid roman result and not awaiting operation', () => {
    it('disables roman numerals', () => {
      expect(
        reducer({ type: TOGGLE_ROMAN })({
          ...defaultState,
          awaitingOperation: false,
          input: 0,
          roman: false,
        })
      ).toEqual({
        input: 0,
        roman: false,
      });
    });
  });

  describe('when valid roman input and valid roman result', () => {
    it('enables roman numerals when disabled', () => {
      expect(
        reducer({ type: TOGGLE_ROMAN })({
          ...defaultState,
          awaitingOperation: false,
          input: 5,
          result: 10,
          roman: false,
        })
      ).toEqual({
        input: 'V',
        roman: true,
      });
    });

    it('disables roman numerals when enabled', () => {
      expect(
        reducer({ type: TOGGLE_ROMAN })({
          ...defaultState,
          awaitingOperation: false,
          input: 'V',
          result: 10,
          roman: true,
        })
      ).toEqual({
        input: 5,
        roman: false,
      });
    });
  });

  describe('when valid roman input and awaiting operation', () => {
    it('enables roman numerals when disabled', () => {
      expect(
        reducer({ type: TOGGLE_ROMAN })({
          ...defaultState,
          awaitingOperation: true,
          input: 5,
          result: 0,
          roman: false,
        })
      ).toEqual({
        input: 'V',
        roman: true,
      });
    });

    it('disables roman numerals when enabled', () => {
      expect(
        reducer({ type: TOGGLE_ROMAN })({
          ...defaultState,
          awaitingOperation: true,
          input: 'V',
          result: 0,
          roman: true,
        })
      ).toEqual({
        input: 5,
        roman: false,
      });
    });
  });

  describe('Bug fix', () => {
    it('calculator should return 0 when input is entirely deleted: [https://github.com/HealthTeacher/front-end-exercise/issues/2]', () => {
      expect(reducer({ type: DELETE })({ ...defaultState, input: 1 })).toEqual({
        input: 0,
      });
    });
  });
});
