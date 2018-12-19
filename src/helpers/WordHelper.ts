import { SYMBOLS } from 'src/constants/SYMBOLS';
import { INFIX } from 'src/constants/INFIX';

class WordHelperClass {
  splitPhrase = (phrase: string): string[] => {
    return phrase.replace(SYMBOLS, '').split(/[\.|\,|\-|\040]/).filter(word => word !== ' ');
  }

  removePrefix = (word: string): string => {
    return word;
  }

  removeSuffix = (word: string): string => {
    return word;
  }

  removeInfix = (word: string): string => {
    const infixPosition = word.search(INFIX);
    let result = word;
    if (infixPosition === 1) {
      result = word.slice(0, 1) + word.slice(3);
    }
    return result;
  }
}

export const WordHelper = new WordHelperClass();