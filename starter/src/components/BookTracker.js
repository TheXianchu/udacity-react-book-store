import BookShelf from "./BookShelf";
import * as BookShelfTypes from "./BookShelfType";
import { Link } from "react-router-dom";

export default function BookTracker() {
  return (
    <>
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf bookShelfType={BookShelfTypes.CURRENTLY_READING} />
            <BookShelf bookShelfType={BookShelfTypes.WANT_TO_READ} />
            <BookShelf bookShelfType={BookShelfTypes.READ} />
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
      </div>
    </>
  );
}
