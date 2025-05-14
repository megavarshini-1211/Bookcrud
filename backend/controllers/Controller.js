const Book = require('../models/Model');

// Get all books
exports.getBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};

// Add book
exports.addBook = async (req, res) => {
  const book = await Book.create(req.body);
  res.json(book);
};

// Update book
exports.updateBook = async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(book);
};

// Delete book
exports.deleteBook = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: 'Book deleted' });
};