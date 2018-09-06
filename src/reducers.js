import {
  ADDITION,
  DIVISION,
  EQUAL,
  MULTIPLICATION,
  SUBSTRACTION,
} from './constants';
import {
  CLEAR,
  CLEAR_ALL,
  DELETE,
  OPERATE,
  INPUT,
  TOGGLE_ROMAN,
} from './actionTypes';
import { decimalize, romanize, validRomanNumeral } from './utils';

const calculateResult = action => (state, props) => {
  switch (state.operation) {
    case ADDITION:
      return state.result + decimalize(state.input);
    case SUBSTRACTION:
      return state.result - decimalize(state.input);
    case MULTIPLICATION:
      return state.result * decimalize(state.input);
    case DIVISION:
      return state.result / decimalize(state.input);
    default:
      return decimalize(state.input);
  }
};

export default (action = {}) => (state, props) => {
  switch (action.type) {
    case CLEAR_ALL:
      return action.reset;
    case CLEAR:
      return { input: 0 };
    case DELETE:
      return {
        input: parseInt(state.input.toString().slice(0, -1)),
      };
    case INPUT:
      const char = String.fromCharCode(action.which);
      const input = state.awaitingOperation ? state.input + char : char;
      return {
        awaitingOperation: true,
        input: state.roman ? input : parseInt(input),
      };
    case OPERATE:
      const result = calculateResult(action)(state, props);
      const newInput = action.operation === EQUAL ? state.input : state.result;
      return {
        awaitingOperation: false,
        input: validRomanNumeral(result) ? newInput : decimalize(newInput),
        operation: action.operation,
        pendingOperation: action.operation !== EQUAL,
        result,
        roman: validRomanNumeral(result) ? state.roman : false,
      };
    case TOGGLE_ROMAN:
      return !state.roman &&
        validRomanNumeral(state.input) &&
        (validRomanNumeral(state.result) || state.awaitingOperation)
        ? {
            input: romanize(state.input),
            roman: true,
          }
        : {
            input: decimalize(state.input),
            roman: false,
          };
    default:
      return state;
  }
};
