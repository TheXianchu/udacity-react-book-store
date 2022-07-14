import "./App.css";
import BookTracker from "./components/BookTracker";
import { Routes, Route } from "react-router-dom";
import SearchPage from "./components/search/SearchPage";
import { useCallback, useEffect, useState } from "react";
import { getAll, update } from "./BooksAPI";
import BookShelfContext from "./components/shelf/BookShelfContext";
import BookDetail from "./components/book/BookDetail";

function App() {
  const [libraryBooks, setLibraryBooks] = useState([]);
  const [searchBooks, setSearchBooks] = useState([]);

  const fetchBooks = useCallback(async () => {
    try {
      const books = await getAll();
      if (books) {
        setLibraryBooks(books);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleBookShelfChanged = useCallback(
    async (book, newShelf, setIsLoading) => {
      setIsLoading(true);
      try {
        await update(book, newShelf);
        await fetchBooks();
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    },
    [fetchBooks]
  );

  useEffect(() => {
    (async () => await fetchBooks())();

    return () => {
      setLibraryBooks([]);
      setSearchBooks([]);
    };
  }, []);

  return (
    <div className="app">
      <BookShelfContext.Provider
        value={{
          fetchBooks,
          handleBookShelfChanged,
          libraryBooks,
          searchBooks,
          setSearchBooks,
        }}
      >
        <Routes>
          <Route path="/" element={<BookTracker />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/books/:id" element={<BookDetail />} />
        </Routes>
      </BookShelfContext.Provider>
    </div>
  );
}

export default App;
