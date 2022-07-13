import SearchPage from "./search/SearchPage";
import BookShelf from "./BookShelf";
import * as BookShelfTypes from "./BookShelfType";
import { useCallback, useEffect, useState } from "react";
import { getAll, update } from "../BooksAPI";
import BookShelfContext from "./BookShelfContext";

export default function BookTracker() {
  const [showSearchPage, setShowSearchPage] = useState(false);
  const [libraryBooks, setLibraryBooks] = useState([]);
  const [searchBooks, setSearchBooks] = useState([]);

  const fetchBooks = useCallback(async () => {
    try {
      const books = await getAll();
      if (books) {
        setLibraryBooks(books);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleBookShelfChanged = useCallback(
    async (book, newShelf) => {
      try {
        await update(book, newShelf);
        await fetchBooks();
      } catch (error) {
        console.error(error);
      }
    },
    [fetchBooks]
  );

  useEffect(() => {
    (async () => await fetchBooks())();

    return () => {
      setLibraryBooks([]);
      setSearchBooks([]);
    };
  }, []);

  return !showSearchPage ? (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShelfContext.Provider
            value={{ handleBookShelfChanged, libraryBooks }}
          >
            <BookShelf bookShelfType={BookShelfTypes.CURRENTLY_READING} />
            <BookShelf bookShelfType={BookShelfTypes.WANT_TO_READ} />
            <BookShelf bookShelfType={BookShelfTypes.READ} />
          </BookShelfContext.Provider>
        </div>
        <div className="open-search">
          <a onClick={() => setShowSearchPage(true)}>Add a book</a>
        </div>
      </div>
    </div>
  ) : (
    <BookShelfContext.Provider
      value={{
        handleBookShelfChanged,
        libraryBooks,
        searchBooks,
        setSearchBooks,
      }}
    >
      <SearchPage setHideSearchPage={setShowSearchPage} />
    </BookShelfContext.Provider>
  );
}
