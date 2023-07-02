import { FcSearch } from 'react-icons/fc';
import Notiflix from 'notiflix';

import css from './Searchbar.module.css';

export const Searchbar = ({ getImagesTopic }) => {
  const onSubmit = e => {
    e.preventDefault();

    const value = e.target.elements.topic.value.trim();
    if (value.length !== 0) {
      getImagesTopic(value);
    } else {
      Notiflix.Notify.failure('Enter something to search images');
    }

    e.target.reset();
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={onSubmit}>
        <button type="submit" className={css['SearchForm-button']}>
          <FcSearch size={20} />
          <span className={css['SearchForm-button-label']}>Search</span>
        </button>

        <input
          name="topic"
          className={css['SearchForm-input']}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
