const {addBooks, getBooks, getBookById, editBookById, deleteBookById} = require('./handler');
const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBooks,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getBooks,
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getBookById,
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: editBookById,
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBookById,
    },

]
module.exports = routes;