import PropTypes from "prop-types";
import Book from "./book/Book";
import { useContext, useMemo } from "react";
import {
  getDefaultLabel,
  READ,
  WANT_TO_READ,
  CURRENTLY_READING,
  SEARCH,
} from "./BookShelfType";
import BookShelfContext from "./BookShelfContext";

export default function BookShelf({ bookShelfType }) {
  const { handleBookShelfChanged, libraryBooks, searchBooks } =
    useContext(BookShelfContext);

  const determineBooks = useMemo(() => {
    switch (bookShelfType) {
      case READ:
      case WANT_TO_READ:
      case CURRENTLY_READING:
        return libraryBooks.filter((book) => book.shelf === bookShelfType);
      case SEARCH:
        return searchBooks;
    }
  }, [libraryBooks, searchBooks, bookShelfType]);

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{getDefaultLabel(bookShelfType)}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {determineBooks.map((book, index) => {
            return (
              <li key={index}>
                <Book
                  book={book}
                  handleBookShelfChange={handleBookShelfChanged}
                />
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

BookShelf.propTypes = {
  bookShelfType: PropTypes.string.isRequired,
};
