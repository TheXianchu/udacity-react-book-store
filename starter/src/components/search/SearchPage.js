import { useCallback, useContext, useEffect, useState } from "react";
import { search } from "../../BooksAPI";
import BookShelf from "../BookShelf";
import * as BookShelfTypes from "../BookShelfType";
import BookShelfContext from "../BookShelfContext";
import { Link } from "react-router-dom";

export default function SearchPage() {
  const { setSearchBooks } = useContext(BookShelfContext);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = useCallback(async () => {
    try {
      if (searchTerm.length > 0) {
        const response = await search(searchTerm);
        if (response && !response.error) {
          setSearchBooks(response);
        }
      } else {
        setSearchBooks([]);
      }
    } catch (error) {
      setSearchBooks([]);
      console.error(error);
    }
  }, [searchTerm, setSearchBooks]);

  useEffect(() => {
    (async () => await handleSearch())();
    return () => {
      setSearchBooks([]);
    };
  }, [handleSearch, searchTerm, setSearchBooks]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
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
