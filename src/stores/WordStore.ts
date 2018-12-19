import { observable, action } from 'mobx';
import { KategloResponse } from 'src/responses/KategloResponse';
import { Kateglo } from 'src/services/KategloService';

class WordStoreClass {
  @observable
  words: string[];

  @observable
  responses: KategloResponse[];

  @action
  fetchWord = (word: string): void => {
    Kateglo.fetchWord(word)
      .then(response => {{
        this.responses = response.data.reverse;
        this.responses.reverse();
      }})
      .catch(error => {
        alert(error);
      });
  }
}

export const WordStore = new WordStoreClass();