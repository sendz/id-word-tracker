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
          Origin: {this.props.word.origin}
        </div>
        <div>
          Word: {this.props.word.kateglo ? this.props.word.kateglo.phrase : 'Tidak Ditemukan'}
        </div>
        {this.props.word.kateglo.root && this.props.word.kateglo.root.length > 0 ?
          <div>
            Root: {this.props.word.kateglo.root[0].root_phrase}<br />
          </div>
          : null
        }
        <div>
          Prefix: {this.props.word.prefix! || this.props.word.origin!.split(this.props.word.kateglo.phrase)[0] || this.props.word.origin!.split(this.props.word.kateglo.root[0].root_phrase)[0]}<br />
          Suffix: {this.props.word.suffix! || this.props.word.origin!.split(this.props.word.kateglo.phrase)[1] || this.props.word.origin!.split(this.props.word.kateglo.root[0].root_phrase)[1]}<br />
          Infix: {this.props.word.infix! || ''}<br />
        </div>
        <div>
          Category: {this.props.word.kateglo ? this.props.word.kateglo.lex_class_name : 'Tidak Ditemukan'}
        </div>
      </div>
    );
  }
}