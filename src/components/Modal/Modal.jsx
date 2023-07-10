import { Component } from 'react';

import css from './Modal.module.css';

export class Modal extends Component {
  state = {};

  componentDidMount = () => {
    window.addEventListener('keydown', this.handleEscapeClick);
  };

  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.handleEscapeClick);
  };

  handleEscapeClick = ({ code }) => {
    if (code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { children } = this.props;

    return (
      <div className={css.Overlay} onClick={this.handleBackdropClick}>
        <div className={css.Modal}>{children}</div>
      </div>
    );
  }
}
