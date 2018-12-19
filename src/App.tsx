import * as React from 'react';
import './App.css';

import { INJECT_KEY } from './constants';
import { KategloClass } from './services/KategloService';
import { inject, observer } from 'mobx-react';
import { KategloResponse } from './responses/KategloResponse';
import { WordTree } from './components/WordTree';
import { WordHelper } from './helpers/WordHelper';

interface Props {
  [INJECT_KEY.KATEGLO]?: KategloClass;
}

interface State {
  phrase?: string;
  words?: string[];
  responses?: KategloResponse[];
}

@observer
@inject(
  INJECT_KEY.KATEGLO
)
class App extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      phrase: '',
      words: [],
      responses: []
    };
  }

  collectData = (word: string) => {
    this.props[INJECT_KEY.KATEGLO]!.fetchWord(word)
      .then(response => {
        if (response.data.kateglo) {
          const data = { ...response.data, origin: word };
          this.state.responses!.push(data);
          this.setState({ responses: this.state.responses!.reverse() });
        } else {
          const wordWithoutPrefix = WordHelper.removePrefix(word).word;
          this.props[INJECT_KEY.KATEGLO]!.fetchWord(wordWithoutPrefix)
            .then(responsePrefix => {
              if (responsePrefix.data.kateglo) {
                const data = { ...responsePrefix.data, origin: word, prefix: WordHelper.removePrefix(word).prefix };
                this.state.responses!.push(data);
                this.setState({ responses: this.state.responses!.reverse() });
              } else {
                const wordWithoutSuffix = WordHelper.removeSuffix(word).word;
                this.props[INJECT_KEY.KATEGLO]!.fetchWord(wordWithoutSuffix)
                  .then(responseSuffix => {
                    if (responseSuffix.data.kateglo) {
                      const data = { ...responseSuffix.data, origin: word, suffix: WordHelper.removeSuffix(wordWithoutPrefix).suffix };
                      this.state.responses!.push(data);
                      this.setState({ responses: this.state.responses!.reverse() });
                    } else {
                      const wordWithoutInfix = WordHelper.removeInfix(wordWithoutSuffix).word;
                      this.props[INJECT_KEY.KATEGLO]!.fetchWord(wordWithoutInfix)
                        .then(responseInfix => {
                          if (responseInfix.data.kateglo) {
                            const data = { ...responseInfix.data, origin: word, infix: WordHelper.removeInfix(wordWithoutInfix) };
                            this.state.responses!.push(data);
                            this.setState({ responses: this.state.responses!.reverse() });
                          }
                        });
                    }
                  });

              }
            });
        }
      });
  }

  process = (words: string[]) => {
    this.setState({ responses: [] });
    words!.map((value) => {
      this.collectData(value);
    });
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">NLP Tree Finder</h1>
        </header>
        <p className="App-intro">
          To get started, type any phrase and click find.
        </p>
        <div>
          <textarea
            style={{ width: 600, display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
            onChange={event => {
              if (this.state.responses!.length > 0) {
                this.setState({ responses: [] });
              }
              this.setState({ phrase: event.target.value });
            }}
            onBlur={() => {
              this.setState({ words: WordHelper.splitPhrase(this.state.phrase!) });
            }}
            value={this.state.phrase}
          />
          <button
            onClick={() => this.process(this.state.words!)}
          >
            Find
          </button>
        </div>
        <div>
          Total Kata: {this.state.responses!.length}
        </div>
        {this.state.responses!.length > 0 ?
          this.state.responses!.reverse().map((value, index) => <WordTree key={index} word={value} />)
          : null
        }
      </div>
    );
  }
}

export default App;
