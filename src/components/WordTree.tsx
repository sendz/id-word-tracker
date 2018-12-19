import * as React from 'react';
import { KategloResponse } from '../responses/KategloResponse';
import { WordHelper } from 'src/helpers/WordHelper';

interface Props {
  word: KategloResponse;
}

export class WordTree extends React.Component<Props> {
  render() {
    return (
      <div
        style={
          {
            margin: 10,
            padding: 10,
            display: 'inline',
            float: 'left',
            border: '1px solid grey'
          }
        }
      >
        <div>
          Origin: {this.props.word.origin}
        </div>
        <div>
          Word: {this.props.word.kateglo ? this.props.word.kateglo.phrase : 'Tidak Ditemukan'}
        </div>
        {this.props.word.kateglo.root.length > 0 ?
          <div>
            Root: {this.props.word.kateglo.root[0].root_phrase}<br/>
            Prefix: {WordHelper.findPrefix(this.props.word.origin).prefix! || ''}<br/>
            Suffix: {WordHelper.findSuffix(this.props.word.origin).suffix! || ''}<br/>
            Infix: {WordHelper.findInfix(this.props.word.origin).infix! || ''}<br/>
          </div>
          : null
        }
        <div>
          Category: {this.props.word.kateglo ? this.props.word.kateglo.lex_class_name : 'Tidak Ditemukan'}
        </div>
      </div>
    );
  }
}