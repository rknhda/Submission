const nanoid = require("nanoid");
const books = require("./storage");
const addBooks = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const id = nanoid.nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
    insertedAt,
    updatedAt,
  };
  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;
  if (!name || name === "") {
    return h
      .response({
        status: "fail",
        message: "Gagal menambahkan buku. Mohon isi nama buku",
      })
      .code(400);
  }
  if (readPage > pageCount) {
    return h
      .response({
        status: "fail",
        message:
          "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400);
  }
  if (!isSuccess) {
    return h
      .response({
        status: "fail",
        message: "Gagal menambahkan buku. Mohon isi buku",
      })
      .code(400);
  }
  return h
    .response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: newBook.id,
      },
    })
    .code(201);
};
const getBooks = (request, h) => {
  const { name, reading, finished } = request.query;
   let filteredBooks = books.filter(book => 
    book.id && 
    typeof book.name === 'string' && 
    typeof book.publisher === 'string'
  );

  if (typeof name === 'string') {
    const searchName = name.toLowerCase();
    filteredBooks = filteredBooks.filter(book =>
      book.name.toLowerCase().includes(searchName)
    );
  }

  if (reading === "0" || reading === "1") {
    const isReading = reading === "1";
    filteredBooks = books.filter((book) => book.reading === isReading);
  }

  if (finished === "0" || finished === "1") {
    const isFinished = finished === "1";
    filteredBooks = books.filter(
      (book) => book.finished === isFinished
    );
  }

  return h
    .response({
      status: "success",
      data: {
        books: filteredBooks
          .filter((book) => book.id && book.name && book.publisher)
          .map(({ id, name, publisher }) => ({ id, name, publisher })),
      },
    })
    .code(200);
};
const getBookById = (request, h) => {
  const { bookId } = request.params;
  const book = books.filter((n) => n.id === bookId)[0];
  if (!book) {
    return h
      .response({
        status: "fail",
        message: "Buku tidak ditemukan",
      })
      .code(404);
  }

  return h
    .response({
      status: "success",
      data: {
        book,
      },
    })
    .code(200);
};

const editBookById = (request, h) => {
  const { bookId } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const index = books.findIndex((b) => b.id === bookId);

  if (!name || name === "") {
    return h
      .response({
        status: "fail",
        message: "Gagal memperbarui buku. Mohon isi nama buku",
      })
      .code(400);
  }
  if (readPage > pageCount) {
    return h
      .response({
        status: "fail",
        message:
          "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400);
  }
  if (index === -1) {
    return h
      .response({
        status: "fail",
        message: "Gagal memperbarui buku. Id tidak ditemukan",
      })
      .code(404);
  }
  books[index] = {
    ...books[index],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
    updatedAt,
  };
  return h
    .response({
      status: "success",
      message: "Buku berhasil diperbarui",
    })
    .code(200);
};
const deleteBookById = (request, h) => {
  const { bookId } = request.params;
  const index = books.findIndex((b) => b.id === bookId);
  if (index === -1) {
    return h
      .response({
        status: "fail",
        message: `Buku gagal dihapus. Id tidak ditemukan`,
      })
      .code(404);
  }
  books.splice(index, 1);
  return h
    .response({
      status: "success",
      message: "Buku berhasil dihapus",
    })
    .code(200);
};
module.exports = {
  addBooks,
  getBooks,
  getBookById,
  editBookById,
  deleteBookById,
};
