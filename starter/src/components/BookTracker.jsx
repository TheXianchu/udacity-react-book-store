import SearchPage from "./search/SearchPage";
import Bookshelf from "./BookShelf";
import * as BookShelfTypes from "./BookShelfType";
import { useCallback, useEffect, useState } from "react";
import { getAll, search, update } from "../BooksAPI";
import BookShelfContext from "./BookShelfContext";

export default function BookTracker() {
  const [showSearchPage, setShowSearchPage] = useState(false);
  const [books, setBooks] = useState([]);

  const handleSearchTerm = useCallback(async (searchTerm) => {
    try {
      const books = await search(searchTerm);
      if (books) {
        setBooks(books);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleBookShelfChanged = useCallback(async (book, newShelf) => {
    try {
      await update(book, newShelf);
      await fetchBooks();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchBooks = useCallback(async () => {
    try {
      const books = await getAll();
      if (books) {
        setBooks(books);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    (async () => await fetchBooks())();

    return () => {
      setBooks([]);
    };
  }, []);

  return !showSearchPage ? (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShelfContext.Provider value={{ handleBookShelfChanged }}>
            <Bookshelf
              bookShelfType={BookShelfTypes.CURRENTLY_READING}
              books={books.filter((book) => book.shelf === "currentlyReading")}
            />
            <Bookshelf
              bookShelfType={BookShelfTypes.WANT_TO_READ}
              books={books.filter((book) => book.shelf === "wantToRead")}
            />
            <Bookshelf
              bookShelfType={BookShelfTypes.READ}
              books={books.filter((book) => book.shelf === "read")}
            />
          </BookShelfContext.Provider>
        </div>
        <div className="open-search">
          <a onClick={() => setShowSearchPage(true)}>Add a book</a>
        </div>
      </div>
    </div>
  ) : (
    <SearchPage
      handleSearchTerm={handleSearchTerm}
      setHideSearchPage={setShowSearchPage}
    />
  );
}
