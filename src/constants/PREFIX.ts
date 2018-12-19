export const PREFIX = /^(meng)|(me)|(per)|(ber)|(ter)|(di)|(ke)|(peng)|(se)/g;
export const ALLOMORPH = /^(ny)/g;
export const ALLOMORPH_RULES = [
  {
    prefix: 'me',
    match: 'ny',
    replace: 's'
  }
];