import * as React from 'react';
import { KategloResponse } from '../responses/KategloResponse';
import { WordHelper } from 'src/helpers/WordHelper';

interface Props {
  word: KategloResponse;
}

export class WordTree extends React.Component<Props> {

  getRoot = (): string => {
    return this.props.word.kateglo!.root!.length > 0 ? this.props.word.kateglo!.root![0].root_phrase : '';
  }

  getPrefixSuffixFromRoot = (root: string): string[] => {
    return this.props.word.kateglo!.root.length > 0 ? this.props.word.origin!.split(root) : this.props.word.origin!.split(this.props.word.kateglo!.phrase).length > 1 ? this.props.word.origin!.split(this.props.word.kateglo!.phrase) : ['', ''];
  }

  getInfixFromRoot = (root: string): string => {
    return this.props.word.kateglo!.root.length > 0 ? WordHelper.removeInfix(root).infix! : '';
  }

  getPrefix = () => {
    return this.props.word.prefix! || this.getPrefixSuffixFromRoot(this.getRoot()).length[0] || '';
  }

  getSuffix = () => {
    return this.props.word.suffix! || this.getPrefixSuffixFromRoot(this.getRoot())[1] || '';
  }

  getInfix = () => {
    return this.props.word.infix! || this.props.word.kateglo!.root.length > 0 ? WordHelper.removeInfix(this.props.word.origin!).infix : this.getInfixFromRoot(this.getRoot()) || '';
  }

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
        {this.props.word.warning ?
          <div style={{ color: 'red' }}>Not Found</div> :
          <>
            <div>
              Word: {this.props.word.kateglo ? this.props.word.kateglo.phrase : 'Tidak Ditemukan'}
            </div>
            {this.props.word.kateglo && this.props.word.kateglo.root && this.props.word.kateglo.root.length > 0 ?
              <div>
                Root: {this.props.word.kateglo.root[0].root_phrase}<br />
              </div>
              : null
            }
            {this.getPrefix() !== '' ? <div>Prefix: {this.getPrefix()}</div> : null}
            {this.getSuffix() !== '' ? <div>Suffix: {this.getSuffix()}</div> : null}
            <div>Infix: {this.getInfix()}</div>
            <div>
              Category: {this.props.word.kateglo ? this.props.word.kateglo.lex_class_name : 'Tidak Ditemukan'}
            </div>
          </>
        }
      </div>
    );
  }
}