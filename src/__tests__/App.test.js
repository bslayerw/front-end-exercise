import App from '../App';
import React from 'react';
import {
  ADDITION,
  DIVISION,
  EQUAL,
  MULTIPLICATION,
  SUBSTRACTION,
} from '../constants';
import {
  CLEAR_ALL,
  CLEAR,
  DELETE,
  INPUT,
  OPERATE,
  TOGGLE_ROMAN,
} from '../actionTypes';
import { shallow } from 'enzyme';

jest.mock('../reducers', () => action => action);

const focus = jest.fn();

const decimalKeys = {
  0: 48,
  1: 49,
  2: 50,
  3: 51,
  4: 52,
  5: 53,
  6: 54,
  7: 55,
  8: 56,
  9: 57,
};
const romanKeys = { I: 67, V: 68, X: 73, L: 76, C: 77, D: 86, M: 88 };

describe('render', () => {
  beforeEach(() => {
    jest.spyOn(React, 'createRef').mockImplementation(() => ({
      current: { focus },
    }));
  });

  it('includes the current operation', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({ operation: ADDITION });

    expect(wrapper.containsMatchingElement('Addition')).toBeTruthy();
  });

  it('includes the roman numeral status', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({ roman: true });

    expect(wrapper.containsMatchingElement('Roman')).toBeTruthy();
  });

  it('includes the current input when awaiting an operation', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({ awaitingOperation: true, input: 10, result: 20 });

    expect(wrapper.containsMatchingElement(10)).toBeTruthy();
  });

  it('includes the current result when not awaiting an operation', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({ awaitingOperation: false, input: 10, result: 20 });

    expect(wrapper.containsMatchingElement(20)).toBeTruthy();
  });

  describe('when roman numerals enabled', () => {
    it('includes the roman numeral input when awaiting operation', () => {
      const wrapper = shallow(<App />);
      wrapper.setState({
        awaitingOperation: true,
        input: 'X',
        result: 20,
        roman: true,
      });

      expect(wrapper.containsMatchingElement('X')).toBeTruthy();
    });

    it('includes the roman numeral result when not awaiting operation', () => {
      const wrapper = shallow(<App />);
      wrapper.setState({
        awaitingOperation: false,
        input: 'X',
        result: 20,
        roman: true,
      });

      expect(wrapper.containsMatchingElement('XX')).toBeTruthy();
    });
  });
});

describe('componentDidMount', () => {
  beforeEach(() => {
    jest.spyOn(React, 'createRef').mockImplementation(() => ({
      current: { focus },
    }));
  });

  it('focuses the container element', () => {
    shallow(<App />);

    expect(focus).toHaveBeenCalledTimes(1);
  });
});

describe('handleKeyDown', () => {
  let wrapper, instance;

  describe('sets state with', () => {
    beforeEach(() => {
      jest.spyOn(React, 'createRef').mockImplementation(() => ({
        current: { focus },
      }));
      wrapper = shallow(<App />);
      instance = wrapper.instance();
      jest.spyOn(instance, 'setState').mockImplementation(() => {});
    });

    it('TOGGLE_ROMAN action when R key', () => {
      instance.handleKeyDown({ which: 82 });
      expect(instance.setState).toHaveBeenCalledWith({
        type: TOGGLE_ROMAN,
      });
    });

    it('CLEAR_ALL action when ALT and ESC keys', () => {
      instance.handleKeyDown({ which: 27, altKey: true });
      expect(instance.setState).toHaveBeenCalledWith({
        type: CLEAR_ALL,
        reset: expect.any(Object),
      });
    });

    it('CLEAR action when ESC key', () => {
      instance.handleKeyDown({ which: 27 });
      expect(instance.setState).toHaveBeenCalledWith({
        type: CLEAR,
      });
    });

    it('DELETE action when DEL key', () => {
      instance.handleKeyDown({ which: 8 });
      expect(instance.setState).toHaveBeenCalledWith({
        type: DELETE,
      });
    });

    it('OPERATE action with ADDITION when + key', () => {
      instance.handleKeyDown({ which: 187, shiftKey: true });
      expect(instance.setState).toHaveBeenCalledWith({
        type: OPERATE,
        operation: ADDITION,
      });
    });

    it('OPERATE action with SUBSTRACTION action when - key', () => {
      instance.handleKeyDown({ which: 189 });
      expect(instance.setState).toHaveBeenCalledWith({
        type: OPERATE,
        operation: SUBSTRACTION,
      });
    });

    it('OPERATE action with MULTIPLICATION action when * key', () => {
      instance.handleKeyDown({ which: 56, shiftKey: true });
      expect(instance.setState).toHaveBeenCalledWith({
        type: OPERATE,
        operation: MULTIPLICATION,
      });
    });

    it('OPERATE action with DIVISION action when / key', () => {
      instance.handleKeyDown({ which: 191 });
      expect(instance.setState).toHaveBeenCalledWith({
        type: OPERATE,
        operation: DIVISION,
      });
    });

    it('EQUAL action when RETURN key', () => {
      instance.handleKeyDown({ which: 13 });
      expect(instance.setState).toHaveBeenCalledWith({
        type: OPERATE,
        operation: EQUAL,
      });
    });

    it('EQUAL action when = key', () => {
      instance.handleKeyDown({ which: 187 });
      expect(instance.setState).toHaveBeenCalledWith({
        type: OPERATE,
        operation: EQUAL,
      });
    });
  });

  describe('when roman numerics disabled', () => {
    beforeEach(() => {
      jest.spyOn(React, 'createRef').mockImplementation(() => ({
        current: { focus },
      }));
      wrapper = shallow(<App />);
      instance = wrapper.instance();
      jest.spyOn(instance, 'setState').mockImplementation(() => {});
    });

    Object.keys(decimalKeys).forEach(which => {
      it(`sets state with INPUT when ${which} key`, () => {
        instance.handleKeyDown({ which: decimalKeys[which] });

        expect(instance.setState).toHaveBeenCalledWith({
          type: INPUT,
          which: decimalKeys[which],
        });
      });
    });

    Object.keys(romanKeys).forEach(which => {
      it(`does not set state when ${which} key`, () => {
        instance.handleKeyDown({ which: romanKeys[which] });

        expect(instance.setState).not.toHaveBeenCalled();
      });
    });
  });

  describe('when roman numerics enabled', () => {
    beforeEach(() => {
      jest.spyOn(React, 'createRef').mockImplementation(() => ({
        current: { focus },
      }));
      wrapper = shallow(<App />);
      wrapper.setState({ roman: true });
      instance = wrapper.instance();
      jest.spyOn(instance, 'setState').mockImplementation(() => {});
    });

    Object.keys(decimalKeys).forEach(which => {
      it(`does not set state when ${which} key`, () => {
        instance.handleKeyDown({ which: decimalKeys[which] });

        expect(instance.setState).not.toHaveBeenCalled();
      });
    });

    Object.keys(romanKeys).forEach(which => {
      it(`sets state with INPUT when ${which} key`, () => {
        instance.handleKeyDown({ which: romanKeys[which] });

        expect(instance.setState).toHaveBeenCalledWith({
          type: INPUT,
          which: romanKeys[which],
        });
      });
    });
  });
});
