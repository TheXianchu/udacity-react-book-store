import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { search } from "../../BooksAPI";
import BookShelf from "../BookShelf";
import * as BookShelfTypes from "../BookShelfType";

export default function SearchPage({ setHideSearchPage }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    (async () => await handleSearch())();
    return () => {
      setBooks([]);
    };
  }, [searchTerm]);

  const handleSearch = useCallback(async () => {
    try {
      if (searchTerm !== "") {
        const response = await search(searchTerm);
        if (response && !response.error) {
          setBooks(response);
        }
      }
    } catch (error) {
      setBooks([]);
      console.error(error);
    }
  }, [searchTerm]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <a className="close-search" onClick={() => setHideSearchPage(false)}>
          Close
        </a>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          <BookShelf bookShelfType={BookShelfTypes.SEARCH} books={books} />
        </ol>
      </div>
    </div>
  );
}

SearchPage.propTypes = {
  setHideSearchPage: PropTypes.func.isRequired,
};
