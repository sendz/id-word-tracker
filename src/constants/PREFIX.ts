export const PREFIX = /^(meng)|(me)|(per)|(ber)|(ter)|(di)|(ke)|(peng)|(se)/g;
export const ALLOMORPH = /()/g;
export const RULES = [
  {
    hook: /(me)/g,
    tails: /(ny)/
  }
];