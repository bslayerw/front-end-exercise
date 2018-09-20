import React, { Component } from 'react';

import reduce from './reducers';
import {
  ADDITION,
  DIVISION,
  EQUAL,
  MULTIPLICATION,
  SUBSTRACTION,
} from './constants';
import {
  CLEAR,
  CLEAR_ALL,
  DELETE,
  IDLE,
  OPERATE,
  INPUT,
  TOGGLE_ROMAN,
} from './actionTypes';
import { hot } from 'react-hot-loader';
import { romanize } from './utils';

const initialState = {
  awaitingOperation: true,
  input: 0,
  operation: IDLE,
  pendingOperation: false,
  result: 0,
  roman: false,
};

const styles = {
  container: {
    alignItems: 'stretch',
    backgroundColor: '#fff',
    color: '#000',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center',
    width: '100vw',
  },
  output: {
    alignItems: 'center',
    display: 'flex',
    flex: '1 1 90vh',
    fontFamily:
      '"SF Mono", "Monaco", "Inconsolata", "Fira Mono", "Droid Sans Mono", "Source Code Pro", monospace',
    fontSize: 124,
    justifyContent: 'center',
  },
  statusBar: {
    backgroundColor: '#eee',
    display: 'flex',
    flex: '0 0 auto',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, sans-serif',
  },
  statusItem: {
    flexBasis: '50%',
    padding: 8,
  },
  statusLabel: {
    fontWeight: 'bold',
  },
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown(e) {
    switch (true) {
      case e.which === 82: // r
        this.setState(reduce({ type: TOGGLE_ROMAN }));
        break;
      case e.which === 27 && e.altKey: // alt + esc
        this.setState(reduce({ type: CLEAR_ALL, reset: initialState }));
        break;
      case e.which === 27: // esc
        this.setState(reduce({ type: CLEAR }));
        break;
      case e.which === 8: // del
        this.setState(reduce({ type: DELETE }));
        break;
      case e.which === 187 && e.shiftKey: // +
        this.setState(reduce({ type: OPERATE, operation: ADDITION }));
        break;
      case e.which === 189: // -
        this.setState(reduce({ type: OPERATE, operation: SUBSTRACTION }));
        break;
      case e.which === 56 && e.shiftKey: // *
        this.setState(reduce({ type: OPERATE, operation: MULTIPLICATION }));
        break;
      case e.which === 191: // /
        this.setState(reduce({ type: OPERATE, operation: DIVISION }));
        break;
      case e.which === 13: // return
      case e.which === 187: // =
        this.setState(reduce({ type: OPERATE, operation: EQUAL }));
        break;
      case [67, 68, 73, 76, 77, 86, 88].includes(e.which) && this.state.roman: // i, v, x, l, c, d, m
      case e.which > 47 && e.which < 58 && !this.state.roman: // 0-9
        this.setState(reduce({ type: INPUT, which: e.which }));
        break;
      default:
    }
  }
  componentDidMount() {
    this.focusInput();
  }
  componentDidUpdate() {
    if (this.state.active) {
      this.focusInput();
    }
  }
  focusInput() {
    this.inputNode.focus();
  }

  render() {
    const { awaitingOperation, input, operation, result, roman } = this.state;
    return (
      <div
        ref={node => {
          this.inputNode = node;
        }}
        onKeyDown={this.handleKeyDown}
        style={styles.container}
        tabIndex="-1"
      >
        <div style={styles.output}>
          {awaitingOperation ? input : roman ? romanize(result) : result}
        </div>
        <div style={styles.statusBar}>
          <div style={styles.statusItem}>
            <span style={styles.statusLabel}>Operation:</span>{' '}
            {operation.charAt(0) + operation.substr(1).toLowerCase()}
          </div>
          <div style={styles.statusItem}>
            <span style={styles.statusLabel}>Numerals:</span>{' '}
            {roman ? 'Roman' : 'Decimal'}
          </div>
        </div>
      </div>
    );
  }
}

export default hot(module)(App);
