import { Component } from 'react';
import css from './Searchbar.module.css';
import PropTypes from "prop-types"

export class Searchbar extends Component {

   
  render() {
    return (
      <div>
        <header className={css.searchbar}>
          <form className={css.form} onSubmit={this.props.handleSearch}>
            <button type="submit" className={css.button}>
              <span className={css.label}>Search</span>
            </button>

            <input
            name='input'
              className={css.input}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </form>
        </header>
      </div>
    );
  }
}


Searchbar.propTypes = {
    handleSearch: PropTypes.func.isRequired,
}