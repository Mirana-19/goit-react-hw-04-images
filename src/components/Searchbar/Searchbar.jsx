import { useState } from 'react';

export function Searchbar({ onFormSubmit }) {
  const [query, setQuery] = useState('');

  const onSubmit = e => {
    e.preventDefault();

    onFormSubmit(query);
    setQuery('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={onSubmit}>
        <input
          onChange={e => setQuery(e.target.value)}
          value={query}
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />

        <button type="submit" className="Button">
          <span className="button-label">Search</span>
        </button>
      </form>
    </header>
  );
}
