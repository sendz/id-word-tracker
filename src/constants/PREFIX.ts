export const PREFIX = /^(meng)|(me)|(per)|(ber)|(ter)|(di)|(ke)|(peng)|(se)|(memper)|(ke)|(bel)|(pe)|/g;
export const ALLOMORPH = /^(ny)/g;
export const ALLOMORPH_RULES = [
  {
    prefix: 'me',
    match: 'ny',
    replace: 's'
  },
  {
    prefix: 'me',
    match: 'n',
    replace: 't'
  }
];