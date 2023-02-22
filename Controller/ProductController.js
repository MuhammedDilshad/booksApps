import { authors, books } from "../Assist/Assist.js";
// let authors = [];
// let books = [];

const generateUniqueId = () => {
  return "_" + Math.random().toString(36).substr(2, 9);
};
export const Addbooks = (req, res) => {
  const { authorId, bookName, ISBN } = req.body;
  const author = authors.find((a) => a.id === authorId);
  if (!author) {
    return res.status(400).json({ message: "Author not found" });
  }
  const book = books.find((b) => b.ISBN === ISBN);
  if (book) {
    return res.status(400).json({ message: "Book already exists" });
  }
  const newBook = {
    id: generateUniqueId(),
    authorId,
    bookName,
    ISBN,
  };
  books.push(newBook);
  res.status(201).json(newBook);
};

export const getBooks = (req, res) => {
  res.json(books);
};

export const getBookById = (req, res) => {
  const book = books.find((b) => b.id === req.params.id);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  const author = authors.find((a) => a.id === book.authorId);
  res.json({ ...book, author });
};

export const updateBookById = (req, res) => {
  const { id } = req.params;
  const { authorId, bookName, ISBN } = req.body;
  if (!authorId || !bookName || !ISBN) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const bookIndex = books.findIndex((book) => book.id === id);
  if (bookIndex === -1) {
    return res.status(404).json({ error: "Book not found" });
  }
  if (books.some((book) => book.ISBN === ISBN && book.id !== id)) {
    return res.status(400).json({ error: "ISBN already exists" });
  }
  const author = authors.find((author) => author.id === authorId);
  if (!author) {
    return res.status(400).json({ error: "Author not found" });
  }
  books[bookIndex] = {
    id,
    authorId,
    bookName,
    ISBN,
  };
  res.json(books[bookIndex]);
};

export const deleteBookById = (req, res) => {
  const { id } = req.params;
  const bookIndex = books.findIndex((book) => book.id === id);
  if (bookIndex === -1) {
    return res.status(404).json({ error: "Book not found" });
  }
  books.splice(bookIndex, 1);
  res.sendStatus(204);
};
