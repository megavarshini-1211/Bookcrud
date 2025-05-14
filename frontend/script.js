const form = document.getElementById('bookForm');
const booksDiv = document.getElementById('books');
const searchInput = document.getElementById('search');

let books = [];

const API = 'http://localhost:5000/api/books';

const loadBooks = async () => {
  const res = await fetch(API);
  books = await res.json();
  displayBooks(books);
};

const displayBooks = (list) => {
  booksDiv.innerHTML = '';
  list.forEach(book => {
    const div = document.createElement('div');
    div.className = 'book';
    div.innerHTML = `
      <p><b>Title:</b> <span>${book.title}</span></p>
      <p><b>Author:</b> <span>${book.author}</span></p>
      <button onclick="editBook('${book._id}', '${book.title}', '${book.author}')">Update</button>
      <button onclick="deleteBook('${book._id}')">Delete</button>
    `;
    booksDiv.appendChild(div);
  });
};

form.onsubmit = async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;

  await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, author }),
  });

  form.reset();
  loadBooks();
};

searchInput.oninput = () => {
  const keyword = searchInput.value.toLowerCase();
  const filtered = books.filter(b => b.title.toLowerCase().includes(keyword));
  displayBooks(filtered);
};

window.editBook = async (id, oldTitle, oldAuthor) => {
  const title = prompt('Enter new title:', oldTitle);
  const author = prompt('Enter new author:', oldAuthor);
  if (title && author) {
    await fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, author }),
    }); 
    loadBooks();
  }
};

window.deleteBook = async (id) => {
  if (confirm('Are you sure you want to delete this book?')) {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    loadBooks();
  }
};

loadBooks();
