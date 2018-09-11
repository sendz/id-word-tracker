import axios from 'axios';

export class KategloClass {
  private apiUrl: string = `http://kateglo.com/api.php?format=json`;
  public fetchWord = (word: string) => {
    return axios.get(`${this.apiUrl}&phrase=${word}`);
  }
}

export const Kateglo = new KategloClass();