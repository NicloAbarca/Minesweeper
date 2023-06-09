import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as appActionCreators from '../../store/actions/app';
import Toolbar from '../../components/toolbar';
import BoardContainer from '../board';
import './styles.scss';

const TASK = Symbol();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpening: true
    };
    this.tick = this.tick.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleCellBlur = this.handleCellBlur.bind(this);
    this.handleCellFocus = this.handleCellFocus.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isTicking && nextProps.isTicking) {
      clearInterval(this[TASK]);
      this[TASK] = setInterval(this.tick, 1000);
    }
    if (nextProps.isGameOver) {
      this.props.handleSaveGame(nextProps)
    }
  }

  componentWillUnmount() {
    clearInterval(this[TASK]);
  }

  handleCellFocus(_event) {
    this.setState({ isOpening: true });
  }

  handleCellBlur(_event) {
    this.setState({ isOpening: false });
  }

  handleReset() {
    if (this.props.isTicking) {
      this.props.appActions.endGame();
    }

    this.props.appActions.newGame();
  }

  tick() {
    if (!this.props.isTicking) {
      return;
    }

    this.props.appActions.incrementTime();
  }

  render() {
    const {
      isGameOver,
      isTicking,
      hasWon,
      mineCount,
      minesLeft,
      timeSpent,
      currentUser
    } = this.props;

    const { isOpening } = this.state;
    const className = classNames({
      app: true,
      app__is_ticking: isTicking
    });

    return (
      <div className={className}>
        <Toolbar
          hasWon={hasWon}
          isOpening={isOpening}
          isTicking={isTicking}
          mineCount={mineCount}
          minesLeft={minesLeft}
          timeSpent={timeSpent}
          onReset={this.handleReset}
          user={currentUser}
        />
        <div className="app__container">
          <BoardContainer
            currentUser={currentUser}
            mineCount={mineCount}
            isTicking={isTicking}
            isGameOver={isGameOver}
            onMouseUp={this.handleCellBlur}
            onMouseDown={this.handleCellFocus}
          />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  hasWon: PropTypes.bool,
  isTicking: PropTypes.bool,
  isGameOver: PropTypes.bool,
  mineCount: PropTypes.number,
  minesLeft: PropTypes.number,
  timeSpent: PropTypes.number,
  appActions: PropTypes.object
};

function mapStateToProps(state) {
  return {
    hasWon: state.get('hasWon'),
    timeSpent: state.get('timeSpent'),
    mineCount: state.get('mineCount'),
    isTicking: state.get('isTicking'),
    minesLeft: state.get('minesLeft'),
    isGameOver: state.get('isGameOver'),
    user: state.get('user')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
