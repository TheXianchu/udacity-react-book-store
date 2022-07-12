import { CURRENTLY_READING, WANT_TO_READ, READ } from "../BookShelfType";
import PropTypes from "prop-types";
import { useMemo } from "react";
import BookCover from "./BookCover";

export default function Book({ handleBookShelfChange, bookShelfType, book }) {
  const determineOptions = useMemo(() => {
    const options = [{ value: "none", label: "Move to..." }];

    switch (bookShelfType) {
      case CURRENTLY_READING:
        options.push({ value: "wantToRead", label: "Want to Read" });
        options.push({ value: "read", label: "Read" });
        break;
      case WANT_TO_READ:
        options.push({ value: "currentlyReading", label: "Currently Reading" });
        options.push({ value: "read", label: "Read" });
        break;
      case READ:
        options.push({ value: "currentlyReading", label: "Currently Reading" });
        options.push({ value: "wantToRead", label: "Want to Read" });
        break;
    }
    options.push({ value: "none", label: "None" });

    return options;
  }, [bookShelfType]);

  return (
    <div className="book">
      <div className="book-top">
        {book.imageLinks ? <BookCover imageLinks={book.imageLinks} /> : null}
        <div className="book-shelf-changer">
          <select
            onChange={(event) =>
              handleBookShelfChange(book, event.target.value)
            }
            value={book.shelf}
          >
            {determineOptions.map((option, index) => {
              return (
                <option
                  value={option.value}
                  disabled={option.label === "Move to..."}
                  key={index}
                >
                  {option.label}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors}</div>
    </div>
  );
}

Book.propTypes = {
  handleBookShelfChange: PropTypes.func.isRequired,
  bookShelfType: PropTypes.string.isRequired,
  book: PropTypes.object.isRequired,
};
