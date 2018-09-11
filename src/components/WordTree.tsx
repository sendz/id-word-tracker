import * as React from 'react';
import { KategloResponse } from '../responses/KategloResponse';

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
          Kata: {this.props.word.kateglo.phrase}
        </div>
        <div>
          Kategori: {this.props.word.kateglo.lex_class_name}
        </div>
      </div>
    );
  }
}