import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export default function SearchPage({ setHideSearchPage, handleSearchTerm }) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm !== "") {
      handleSearchTerm(searchTerm);
    }

    return () => {
      // Reset Search term to empty once you exit the search page
      handleSearchTerm("");
    };
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
        <ol className="books-grid"></ol>
      </div>
    </div>
  );
}

SearchPage.propTypes = {
  setHideSearchPage: PropTypes.func.isRequired,
  handleSearchTerm: PropTypes.func.isRequired,
};
