# MyReads Project

Welcome to my React Book store project. In this project, you can categorize your own books, depending on their status. You can search for books and view its details. If you want to add a book to your collection, you only need to click the buttons next to a book to move it.
If you search for a book that is already in your possession, you won't be able to add it again, but instead, it will display its status in your library.

## TL;DR

- install all project dependencies with `npm install`
- start the server with `npm start`

## How to use
Once you open the page, you will see an overview of books. Here you can move the books to other categories, or search for new books to add to your shelves.

## What You're Getting

```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── components # This folder contains all the custom components with their own re-usable usage
    │   ├── book
    │   │   ├── Book.js # The basic outline of a book, including the buttons to move the books to a different category
    │   │   ├── BookCover.js # The cover of the book, thus it's image
    │   │   ├── BookDetail.js # The detail page of a book, this will include more information than the basic Book.js file and is used in the detail page
    │   ├── search
    │   │   ├── SearchPage.js # The search functionality for the app, here you can search for books that are fetched through the BooksAPI
    │   ├── shelf
    │   │   ├── BookShelf.js # The outline of your shelf, this contains all books that are connected to this type of bookshelf, where the type is derrived from BookShelfType
    │   │   ├── BookShelfContext.js # A context, which can be used to passthrough objects, functions and more in the library
    │   │   ├── BookShelfType.js # A interface with types, to determine where the books should be placed
    │   ├── BookTracker.js # This is where all the BookShelves are created
    ├── App.css # Styles for your app. Feel free to customize this as you desire.
    ├── App.js # This is the root of your app. Contains static HTML right now.
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── icons # Helpful images for your app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   ├── arrow-back-menu.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

- [`getAll`](#getall)
- [`update`](#update)
- [`search`](#search)

### `getAll`

Method Signature:

```js
getAll();
```

- Returns a Promise which resolves to a JSON object containing a collection of book objects.
- This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf);
```

- book: `<Object>` containing at minimum an `id` attribute
- shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]
- Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query);
```

- query: `<String>`
- Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
- These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Contributing

- Created by Darryll de Quillettes, for a Udacity assignment.
