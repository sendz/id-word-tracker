import { SYMBOLS } from 'src/constants/SYMBOLS';
import { INFIX } from 'src/constants/INFIX';
import { PREFIX, ALLOMORPH_RULES } from 'src/constants/PREFIX';
import { SUFFIX } from 'src/constants/SUFFIX';

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
    let result = word;
    const matches = word.match(PREFIX);
    if (word.startsWith(PREFIX.source)) {
      result = word.slice(matches![0].length);
      ALLOMORPH_RULES.forEach((rule) => {
        if (result.startsWith(rule.match)) {
          result = `${rule.replace}${word.slice(rule.match.length)}`;
        }
      });
    }
    return {
      prefix: word,
      word: result
    };
  }

  removeSuffix = (word: string): Response => {
    return {
      suffix: word,
      word
    };
  }

  removeInfix = (word: string): Response => {
    const infixPosition: number = word.search(INFIX);
    let result: string = word;
    if (infixPosition === 1) {
      result = word.slice(0, 1) + word.slice(3);
    }
    return {
      infix: word.match(INFIX)![0],
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
    return {
      infix: word.match(INFIX)! ? word.match(INFIX)![0] : '',
      word: word
    };
  }
}

export const WordHelper = new WordHelperClass();