import BookCover from "./BookCover";
import { useLocation } from "react-router-dom";

export default function BookDetail() {
  const location = useLocation();
  const { book } = location.state;

  return book ? (
    <div className="book">
      <div className="book-top">
        {book.imageLinks ? <BookCover imageLinks={book.imageLinks} /> : null}
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors}</div>
    </div>
  ) : null;
}
