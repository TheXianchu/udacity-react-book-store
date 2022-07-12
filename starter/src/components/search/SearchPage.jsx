import PropTypes from "prop-types";

export default function SearchPage({ setHideSearchPage, searchTerm, handleSearchTerm }) {
	return (
		<div className="search-books">
			<div className="search-books-bar">
				<a className="close-search" onClick={() => setHideSearchPage(false)}>
					Close
				</a>
				<div className="search-books-input-wrapper">
					<input
						type="text"
						placeholder="Search by title, author, or ISBN"
						value={searchTerm}
						onChange={event => handleSearchTerm(event.target.value)}
					/>
				</div>
			</div>
			<div className="search-books-results">
				<ol className="books-grid"></ol>
			</div>
		</div>
	);
}

SearchPage.propTypes = {
	setHideSearchPage: PropTypes.func.isRequired,
	searchTerm: PropTypes.string.isRequired,
	handleSearchTerm: PropTypes.func.isRequired,
};
