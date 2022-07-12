import "./App.css";
import { useCallback, useState } from "react";
import SearchPage from "./components/search/SearchPage";
import Bookshelf from "./components/BookShelf";
import * as BookShelfTypes from "./components/BookShelfType";

function App() {
	const [showSearchPage, setShowSearchPage] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	const handleSearchTerm = useCallback(
		searchTerm => {
			setSearchTerm(searchTerm);
		},
		[setSearchTerm],
	);

	return (
		<div className="app">
			{showSearchPage ? (
				<SearchPage searchTerm={searchTerm} handleSearchTerm={handleSearchTerm} setHideSearchPage={setShowSearchPage} />
			) : (
				<div className="list-books">
					<div className="list-books-title">
						<h1>MyReads</h1>
					</div>
					<div className="list-books-content">
						<div>
							<Bookshelf bookShelfType={BookShelfTypes.CURRENTLY_READING} books={[]} />
							<Bookshelf bookShelfType={BookShelfTypes.WANT_TO_READ} books={[]} />
							<Bookshelf bookShelfType={BookShelfTypes.READ} books={[]} />
						</div>
						<div className="open-search">
							<a onClick={() => setShowSearchPage(true)}>Add a book</a>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
