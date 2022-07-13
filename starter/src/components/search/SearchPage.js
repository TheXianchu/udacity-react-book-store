import PropTypes from "prop-types";
import { useCallback, useContext, useEffect, useState } from "react";
import { search } from "../../BooksAPI";
import BookShelf from "../BookShelf";
import * as BookShelfTypes from "../BookShelfType";
import BookShelfContext from "../BookShelfContext";

export default function SearchPage({ setHideSearchPage }) {
  const { setSearchBooks } = useContext(BookShelfContext);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    (async () => await handleSearch())();
    return () => {
      setSearchBooks([]);
    };
  }, [searchTerm]);

  const handleSearch = useCallback(async () => {
    try {
      if (searchTerm !== "") {
        const response = await search(searchTerm);
        if (response && !response.error) {
          setSearchBooks(response);
        }
      }
    } catch (error) {
      setSearchBooks([]);
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
          <BookShelf bookShelfType={BookShelfTypes.SEARCH} />
        </ol>
      </div>
    </div>
  );
}

SearchPage.propTypes = {
  setHideSearchPage: PropTypes.func.isRequired,
};
