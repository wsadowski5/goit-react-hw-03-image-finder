import { Component } from 'react';
import css from './Searchbar.module.css';
import PropTypes from "prop-types"

export class Searchbar extends Component {

    handleSubmit = event => {
        event.preventDefault()
        const inputValue = event.target[1].value;
        const perPage = 12;
        const pageNumber = 1;
        this.props.handleSearch(inputValue,  pageNumber, perPage) //fetchData
    }
  render() {
    return (
      <div>
        <header className={css.searchbar}>
          <form className={css.form} onSubmit={this.handleSubmit}>
            <button type="submit" className={css.button}>
              <span className={css.label}>Search</span>
            </button>

            <input
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