import PropTypes from "prop-types";
import Book from "./book/Book";
import { useContext } from "react";
import { getDefaultLabel } from "./BookShelfType";
import BookShelfContext from "./BookShelfContext";

export default function Bookshelf({ books, bookShelfType }) {
  const { handleBookShelfChanged } = useContext(BookShelfContext);

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{getDefaultLabel(bookShelfType)}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book, index) => {
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

Bookshelf.propTypes = {
  books: PropTypes.array,
  bookShelfType: PropTypes.string.isRequired,
};
