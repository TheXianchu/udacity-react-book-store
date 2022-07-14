import { useContext, useEffect, useState } from "react";
import { search } from "../../BooksAPI";
import BookShelf from "../BookShelf";
import * as BookShelfTypes from "../BookShelfType";
import BookShelfContext from "../BookShelfContext";
import { Link } from "react-router-dom";
import { useDebouncedCallback } from "@react-hookz/web";
import { RingLoader } from "react-spinners";

export default function SearchPage() {
  const { setSearchBooks } = useContext(BookShelfContext);

  const [searchTerms, setSearchTerms] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = useDebouncedCallback(
    async () => {
      try {
        if (searchTerms.length > 0) {
          const response = await search(searchTerms);
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
      setLoading(false);
    },
    [searchTerms, setSearchBooks],
    1000
  );

  useEffect(() => {
    (async () => {
      setLoading(true);
      await handleSearch();
    })();
    return () => {
      setSearchBooks([]);
      setLoading(false);
    };
  }, [handleSearch, searchTerms, setSearchBooks]);

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
            value={searchTerms}
            onChange={(event) => {
              setSearchTerms(event.target.value);
            }}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {loading ? (
            <div>
              <RingLoader loading={loading} />
            </div>
          ) : (
            <BookShelf bookShelfType={BookShelfTypes.SEARCH} />
          )}
        </ol>
      </div>
    </div>
  );
}
