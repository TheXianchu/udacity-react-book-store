import BookCover from "./BookCover";
import { Link, useLocation } from "react-router-dom";

export default function BookDetail() {
  const location = useLocation();
  const { book, fromSearchPage } = location.state;

  return book ? (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="centered">
        <div className="list-books-content">
          <div className="book">
            <div className="book-top">
              {book.imageLinks ? (
                <BookCover imageLinks={book.imageLinks} />
              ) : null}
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors}</div>
          </div>
        </div>
        {book.averageRating && <h3>Rating: {book.averageRating}</h3>}

        {book.description && (
          <div className="line-break">{book.description}</div>
        )}
      </div>

      <div className="return-detail">
        <Link to={fromSearchPage ? "/search" : "/"}>Close</Link>
      </div>
    </div>
  ) : null;
}
