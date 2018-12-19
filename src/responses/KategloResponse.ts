export interface Definition {
  def_uid: string;
  phrase: string;
  def_num: string;
  lex_class: string;
  def_text: string;
  discipline: string;
  sample: string;
  see?: any;
  updated: string;
  updater: string;
  wikipedia_updated?: any;
  lex_class_ref: string;
}

export interface Root {
  rel_type: string;
  root_phrase: string;
}

export interface Kateglo {
  phrase: string;
  phrase_type: string;
  lex_class: string;
  roget_class?: any;
  pronounciation?: any;
  etymology?: any;
  ref_source: string;
  def_count: string;
  actual_phrase?: any;
  info?: any;
  notes?: any;
  updated: string;
  updater: string;
  created: string;
  creator?: any;
  proverb_updated?: any;
  wikipedia_updated?: any;
  kbbi_updated: string;
  lex_class_name: string;
  roget_name?: any;
  ref_source_name: string;
  lex_class_ref: string;
  root: Root[];
  definition: Definition[];
  reference: any[];
  proverbs: any[];
}

export interface KategloResponse {
  origin?: string;
  prefix?: string;
  suffix?: string;
  infix?: string;
  kateglo: Kateglo;
}
