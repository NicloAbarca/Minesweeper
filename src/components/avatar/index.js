import PropTypes from 'prop-types';
import React, { Component } from 'react';
import WinnerImage from './images/winner.svg';
import RestingImage from './images/resting.svg';
import GameoverImage from './images/gameover.svg';
import OpeningImage from './images/attempting.svg';
import './styles.scss';

class Avatar extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.onClick && this.props.onClick(event);
  }

  render() {
    let src;
    if (this.props.hasWon) {
      src = <WinnerImage width={55} height={30} />
    } else if (this.props.isGameOver) {
      src = <GameoverImage width={55} height={30} />
    } else if (this.props.isOpening) {
      src = <OpeningImage width={55} height={30} />
    } else {
      src = <RestingImage width={55} height={30} />
    }

    return (
      <button
        className={`avatar ${this.props.className}`}
        onClick={this.handleClick}
      >
        {src}
      </button>
    );
  }
}

Avatar.defaultProps = {
  className: '',
  hasWon: false,
  isOpening: false,
  isGameOver: false,
  onClick() { }
};

Avatar.propTypes = {
  className: PropTypes.string,
  hasWon: PropTypes.bool,
  isOpening: PropTypes.bool,
  isGameOver: PropTypes.bool,
  onClick: PropTypes.func
};

export default Avatar;
