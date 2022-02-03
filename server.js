const express = require('express');
const path = require('path');
const NodeCache = require('node-cache');
const axios = require('axios');

const mainCache = new NodeCache();

const BOOKS_KEY = 'allBooks';
const BOOK_KEY = 'specBook';

const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/book-details', async (req, res) => {
  const bookId = req.query.id;
  
  // TODO: re-retrieve if external data updated
  const cachedBook = mainCache.get(`${BOOK_KEY}-${bookId}`);
  if (cachedBook) {
    return res.send(cachedBook);
  }

  // TODO: error handling
  const fetchedBook = await axios.get(`https://www.anapioficeandfire.com/api/books/${bookId}`);
  const bookData = fetchedBook.data;

  // Just get point of view characters and BE SURE to cache them
  // TODO: improve everything below this, it's pretty yucky
  const promiseStack = bookData.povCharacters.map((charUrl) => {
    const cacheChar = mainCache.get(charUrl);
    if (cacheChar) {
      return Promise.resolve(cacheChar);
    }
    return axios.get(charUrl);
  })
  const charData = await Promise.all(promiseStack);
  
  const returnCharacters = charData.map((char) => {
    const { data } = char;
    if (data?.url) {
      mainCache.set(data.url, data);
    }
    return data;
  })

  res.send({
    book: bookData,
    characters: returnCharacters,
  })
})

app.get('/all-books', async (req, res) => {
  // TODO: re-retrieve if external data updated
  const cachedBooks = mainCache.get(BOOKS_KEY)
  if (cachedBooks) {
    return res.send(cachedBooks);
  }

  // TODO: error handling
  const fetchedBooks = await axios.get('https://www.anapioficeandfire.com/api/books')
  if (fetchedBooks.status === 200) {
    const { data } = fetchedBooks;
    mainCache.set(BOOKS_KEY, data);
    res.send(data);
  }
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 4000);