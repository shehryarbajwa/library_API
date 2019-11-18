const express = require('express');
const bookRouter = express.Router();
const sql = require('mssql');
const debug = require('debug')('app:bookRoutes.js')

function router(nav) {
  const books = [
    {
      title: 'War and Peace',
      genre: 'Historical Fiction',
      author: 'Leo Tolstoy',
      read: false
    },
    {
      title: 'A Dance of Dragons',
      genre: 'Literary Fiction',
      author: 'George R.R Martin',
      read: false
    },
    {
      title: 'Kite Runner',
      genre: 'Romantic Fiction',
      author: 'Khalid Hosseini',
      read: false
    },
    {
      title: 'A Feast for Crows',
      genre: 'Literary Fiction',
      author: 'George R.R Martin',
      read: false
    }
  ]

  bookRouter.route('/')
    .get((_req, res) => {
      (async function query() {
        const request = new sql.Request();
        const { recordset } = await request.query('select * from books;')
        debug(recordset);
        res.render(
          'bookListView',
          {
            nav,
            title: 'Library',
            books_display: recordset[0]
          }
        );
      }());
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      (async function query() {
        const { id } = req.params;
        const request = new sql.Request();
        const { recordset } = await request.input('id', sql.Int, id)
          .query('select * from books where id = @id;');
        // eslint-disable-next-line no-undef
        debug(recordset);
        res.render(
          'bookView',
          {
            nav,
            title: 'Library',
            books_display: recordset[0]
          }
        );
      }());
    });
  return bookRouter;
}

module.exports = router;