import PropTypes from "prop-types";
import BookCover from "./BookCover";

export default function Book({ handleBookShelfChange, book }) {
  const determineOptions = () => {
    return [
      { value: "none", label: "Move to...", disabled: true },
      { value: "currentlyReading", label: "Currently Reading" },
      { value: "wantToRead", label: "Want to Read" },
      { value: "read", label: "Read" },
      { value: "none", label: "None" },
    ];
  };

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
            {determineOptions().map((option, index) => (
              <option
                value={option.value}
                disabled={option.value === book.shelf || option.disabled}
                key={index}
              >
                {option.label}
              </option>
            ))}
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
  book: PropTypes.object.isRequired,
};
