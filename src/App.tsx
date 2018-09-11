import * as React from 'react';
import './App.css';

import { INJECT_KEY } from './constants';
import { KategloClass } from './services/KategloService';
import { inject, observer } from 'mobx-react';
import { KategloResponse } from './responses/KategloResponse';
import { WordTree } from './components/WordTree';

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

  fetchWord = (word: string) => {
    this.props[INJECT_KEY.KATEGLO]!.fetchWord(word)
      .then(response => {
        this.state.responses!.push(response.data);
        this.setState({ responses: this.state.responses!.reverse() });
      })
      .catch(error => alert(error));
  }

  splitPhrase = (phrase: string) => {
    let words: string[] = phrase.split(' ');
    this.setState({ words });
  }

  process = (words: string[]) => {
    this.setState({ responses: [] });
    words!.map((value) => {
      this.fetchWord(value);
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
              this.splitPhrase(this.state.phrase!);
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
