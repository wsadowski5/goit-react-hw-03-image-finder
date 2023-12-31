import { Component } from 'react';
import css from './Button.module.css';
import PropTypes from 'prop-types';

export class Button extends Component {
  render() {
    return (<div className={css.buttonWrapper}>
      <button type="button" className={css.Button} onClick={this.props.onClick}>
        Load more
      </button>
      </div>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
}