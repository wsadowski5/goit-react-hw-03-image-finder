import { Component } from 'react';

import css from './Modal.module.css';

export class Modal extends Component {
  render() {
    return (
      <div className={css.overlay} onClick={this.props.handleClose}>
        <div className={css.modal}>
          <img src={this.props.modalImage} alt="" />
        </div>
      </div>
    );
  }
}
