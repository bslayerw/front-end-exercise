import repeat from 'repeat-string';

var numerals = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1,
};

export const romanize = num => {
  if (typeof num !== 'number') {
    throw Error('Expected first argument to be a number.');
  }

  return Object.keys(numerals).reduce((acc, cur) => {
    acc += repeat(cur, (num / numerals[cur]) >>> 0);
    num %= numerals[cur];
    return acc;
  }, '');
};

export const decimalize = str => {
  if (typeof str === 'number') {
    return str;
  }

  if (typeof str !== 'string') {
    throw Error('Expected first argument to be a string.');
  }

  if (!/^[i,v,x,l,c,d,m,I,V,X,L,C,D,M]+$/.test(str)) {
    throw Error(
      `Expected first argument to be a valid roman numeral, received "${str}".`
    );
  }

  const roman = str.toUpperCase().split('');

  return roman.reduce((acc, cur, i) => {
    const val = numerals[cur];
    acc += val;
    return acc;
  }, 0);
};

export const validRomanNumeral = num => num > 0 && num % 1 === 0;
