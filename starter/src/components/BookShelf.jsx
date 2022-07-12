import PropTypes from "prop-types";
import Book from "./book/Book";
import { useMemo } from "react";
import { CURRENTLY_READING, READ, WANT_TO_READ } from "./BookShelfType";

export default function Bookshelf({ books, bookShelfType }) {
	const generateTitle = useMemo(() => {
		switch (bookShelfType) {
			case CURRENTLY_READING:
				return "Currently Reading";
			case WANT_TO_READ:
				return "Want To Read";
			case READ:
				return "Read";
		}
	}, [bookShelfType]);

	return (
		<div className="bookshelf">
			<h2 className="bookshelf-title">{generateTitle}</h2>
			<div className="bookshelf-books">
				<ol className="books-grid">
					<li>
						{books.map(book => {
							return <Book bookShelfType={bookShelfType} book={book} />;
						})}
					</li>
				</ol>
			</div>
		</div>
	);
}

Bookshelf.propTypes = {
	books: PropTypes.array.isRequired,
	bookShelfType: PropTypes.number.isRequired,
};
