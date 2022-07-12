import { CURRENTLY_READING, WANT_TO_READ, READ } from "../BookShelfType";
import PropTypes from "prop-types";
import { useMemo } from "react";
import BookCover from "./BookCover";

export default function Book({ bookShelfType, book }) {
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
				{book.thumbnail ? <BookCover width={book.width} height={book.height} thumbnail={book.thumbnail} /> : null}
				<div className="book-shelf-changer">
					<select>
						{determineOptions.map(option => {
							return (
								<option value={option.value} disabled={option.value === "none"}>
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
	bookShelfType: PropTypes.number.isRequired,
	book: PropTypes.object.isRequired,
};
