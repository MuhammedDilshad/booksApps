import { authors, books } from "../Assist/Assist.js";
console.log(authors, "authorskim");
// let authors = [];
// let books = [];

// const generateUniqueId = () => {
//   return "_" + Math.random().toString(36).substr(2, 9);
// };
function generateId() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

export const loginUser = (req, res) => {
  // console.log("111111111111");
  const { name } = req.body;
  const existingAuthor = authors.find((author) => author.name === name);
  if (existingAuthor) {
    return res.status(409).json({ message: "Author name already exists" });
  }

  const newAuthor = { id: generateId(), name };
  // console.log(newAuthor, "newAuthor");
  authors.push(newAuthor);
  res.status(201).json(newAuthor);
};

export const getAuthers = (req, res) => {
  res.json(authors);
};

export const getAuthorbyId = (req, res) => {
  console.log(req.params.id);
  console.log("authors", authors);
  const author = authors.find((a) => a.id === req.params.id);
  console.log("author", author);

  if (!author) {
    return res.status(404).json({ message: "Author not found" });
  }
  const authorBooks = books.filter((b) => b.authorId === req.params.id);
  // console.log(authorBooks, "authorBooks");
  res.json({ author, books: authorBooks });
};

export const updateAuthorById = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  const authorIndex = authors.findIndex((author) => author.id === id);
  if (authorIndex === -1) {
    return res.status(404).json({ error: "Author not found" });
  }
  if (authors.some((author) => author.name === name && author.id !== id)) {
    return res.status(400).json({ error: "Author name already exists" });
  }
  authors[authorIndex].name = name;
  res.json(authors[authorIndex]);
};

export const deleteAuthorById = (req, res) => {
  const { id } = req.params;
  const authorIndex = authors.findIndex((author) => author.id === id);
  if (authorIndex === -1) {
    return res.status(404).json({ error: "Author not found" });
  }
  books.filter((book) => book.authorId !== id);
  const author = authors.splice(authorIndex, 1)[0];
  res.json(author);
};
