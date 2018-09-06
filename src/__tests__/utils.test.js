import * as utils from '../utils';

describe('romanize', () => {
  it('throws for non-number values', () => {
    expect(() => utils.romanize('foo')).toThrowErrorMatchingInlineSnapshot(
      `"Expected first argument to be a number."`
    );
  });

  it('converts a decimal numeral to roman', () => {
    expect(utils.romanize(42)).toEqual('XLII');
  });
});

describe('decimalize', () => {
  it('returns number values unchanged', () => {
    expect(utils.decimalize(20)).toEqual(20);
  });

  it('throws for non-string values', () => {
    expect(() => utils.decimalize()).toThrowErrorMatchingInlineSnapshot(
      `"Expected first argument to be a string."`
    );
  });

  it('throws for invalid roman numeral strings', () => {
    expect(() => utils.decimalize('U')).toThrowErrorMatchingInlineSnapshot(
      `"Expected first argument to be a valid roman numeral, received \\"U\\"."`
    );
  });

  it('converts a roman numeral to a decimal', () => {
    expect(utils.decimalize('XXIII')).toEqual(23);
  });

  // FAIL - Replace `it.skip` below with `it` and repair the failing test
  it.skip('converts a subtractive syntax roman numeral to a decimal', () => {
    expect(utils.decimalize('XLIII')).toEqual(43);
  });
});

describe('validRomanNumeral', () => {
  it('returns false for zero', () => {
    expect(utils.validRomanNumeral(0)).toBeFalsy();
  });

  it('returns false for negative numbers', () => {
    expect(utils.validRomanNumeral(-2)).toBeFalsy();
  });

  it('returns false for fractions', () => {
    expect(utils.validRomanNumeral(0.5)).toBeFalsy();
  });

  it('returns true for valid roman numerals', () => {
    expect(utils.validRomanNumeral(5)).toBeTruthy();
  });
});
