import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Settings from '../../container-components/settings';
import { history } from '../../helpers';
import GearImage from './images/gear.svg';
import LogoutImage from './images/logout.svg';
import Trophy from './images/trophy.svg'
import Avatar from '../avatar';
import Timer from '../timer';

import './styles.scss';

class Toolbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSettings: true
    };

    this.handleSettings = this.handleSettings.bind(this);
    this.logout = this.logout.bind(this);
    this.history = this.history.bind(this);
  }

  handleSettings(_event) {
    this.setState({
      showSettings: !this.state.showSettings
    });
  }

  logout() {
    history.push('/login');
  }

  history() {
    history.push('/history');
  }

  render() {
    const {
      minesLeft,
      isOpening,
      isTicking,
      isGameOver,
      onReset,
      hasWon,
      timeSpent,
      user
    } = this.props;
    return (
      <div className="toolbar">
        <Settings
          isOpen={this.state.showSettings}
          onClose={this.handleSettings}
        />
        <div className="toolbar_name"><h3>Hi {user && user.firstName}!</h3></div>
        <div className="toolbar_count">{minesLeft}</div>
        <Avatar
          className="toolbar__avatar"
          hasWon={hasWon}
          isOpening={isOpening}
          isTicking={isTicking}
          isGameOver={isGameOver}
          onClick={onReset}
        />
        <div className="toolbar_time">
          <Timer seconds={timeSpent} />
        </div>
        <div className="toolbar_history">
          <div onClick={this.history}><Trophy width={55} height={30} /></div>
        </div>
        <div className="toolbar__settings">
          <button
            className="toolbar__settings__button"
            onClick={this.handleSettings}
          >
            <GearImage width={55} height={30} />
          </button>
        </div>
        <div className="toolbar_logout">
          <div onClick={this.logout}><LogoutImage width={55} height={30} /></div>
        </div>
      </div>
    );
  }
}

Toolbar.defaultProps = {
  onReset() { },
  minesLeft: 0,
  isGameOver: false,
  isTicking: false,
  isOpening: true,
  hasWon: false,
  timeSpent: 0,
  startTime: new Date().getTime()
};

Toolbar.propTypes = {
  onReset: PropTypes.func,
  minesLeft: PropTypes.number,
  hasWon: PropTypes.bool,
  isTicking: PropTypes.bool,
  isOpening: PropTypes.bool,
  isGameOver: PropTypes.bool,
  timeSpent: PropTypes.number,
  startTime: PropTypes.number,
};

export default Toolbar;
