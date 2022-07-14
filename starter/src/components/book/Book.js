import PropTypes from "prop-types";
import BookCover from "./BookCover";
import { MoonLoader } from "react-spinners";
import { useEffect, useState } from "react";

export default function Book({ handleBookShelfChange, book }) {
  const [isLoading, setIsLoading] = useState(false);

  const determineOptions = () => [
    { value: "move_to", label: "Move to...", disabled: true },
    { value: "currentlyReading", label: "Currently Reading" },
    { value: "wantToRead", label: "Want to Read" },
    { value: "read", label: "Read" },
    { value: "none", label: "None" },
  ];

  useEffect(() => {
    return () => setIsLoading(false);
  }, []);

  return isLoading ? (
    <div className="container">
      <MoonLoader loading={isLoading} />
    </div>
  ) : (
    <div className="book">
      <div className="book-top">
        {book.imageLinks ? <BookCover imageLinks={book.imageLinks} /> : null}
        <div className="book-shelf-changer">
          <select
            onChange={(event) => {
              handleBookShelfChange(book, event.target.value, setIsLoading);
            }}
            value={book.shelf ?? "none"}
          >
            {determineOptions().map((option, index) => (
              <option
                value={option.value}
                disabled={
                  option.value === book.shelf ||
                  (!book.shelf && option.value === "none") ||
                  option.disabled
                }
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
