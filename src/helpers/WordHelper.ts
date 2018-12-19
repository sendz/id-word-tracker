import { SYMBOLS } from 'src/constants/SYMBOLS';
import { INFIX } from 'src/constants/INFIX';
import { PREFIX, ALLOMORPH_RULES } from 'src/constants/PREFIX';
import { SUFFIX, SUFFIX_SOURCE } from 'src/constants/SUFFIX';
const removeSuffix = require('remove-suffix');

interface Response {
  infix?: string;
  suffix?: string;
  prefix?: string;
  word: string;
}

class WordHelperClass {
  splitPhrase = (phrase: string): string[] => {
    return phrase.replace(SYMBOLS, '').split(/[\.|\,|\-|\040]/).filter(word => word !== ' ');
  }

  removePrefix = (word: string): Response => {
    let result: string = word;
    if (PREFIX.test(word)) {
      const matches: string[] = word.match(PREFIX)!;
      result = word.slice(matches![0].length);
      ALLOMORPH_RULES.forEach((rule) => {
        if (result.startsWith(rule.match)) {
          result = `${rule.replace}${result.slice(rule.match.length)}`;
        }
      });
    }
    return {
      prefix: word.match(PREFIX) ? word.match(PREFIX)![0] : '',
      word: result
    };
  }

  removeSuffix = (word: string): Response => {
    let result: string = word;
    if (SUFFIX.test(word)) {
      result = removeSuffix(word, SUFFIX_SOURCE)[0];
    }
    return {
      suffix: removeSuffix(word, SUFFIX_SOURCE)[1],
      word: result
    };
  }

  removeInfix = (word: string): Response => {
    const infixPosition: number = word.search(INFIX);
    let result: string = word;
    let infix: string = '';
    if (INFIX.test(word) && infixPosition === 1) {
      result = word.slice(0, 1) + word.slice(3);
      infix = word.slice(1, 3);
    }
    return {
      infix,
      word: result
    };
  }

  findPrefix = (word: string): Response => {
    return {
      prefix: word.match(PREFIX)! ? word.match(PREFIX)![0] : '',
      word: word
    };
  }

  findSuffix = (word: string): Response => {
    const matches: string[] = word.match(SUFFIX)!;
    const suffix: string = matches ? matches[matches.length - 1] : '';
    return {
      suffix,
      word
    };
  }

  findInfix = (word: string): Response => {
    console.log(word, word.match(INFIX));
    return {
      infix: word.match(INFIX)! ? word.match(INFIX)![0] : '',
      word: word
    };
  }
}

export const WordHelper = new WordHelperClass();