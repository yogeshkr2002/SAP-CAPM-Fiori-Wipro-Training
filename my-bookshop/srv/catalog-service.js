const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {

  const { Books } = this.entities;

  this.after('READ', Books, (books) => {
    const list = Array.isArray(books) ? books : [books];
    list.forEach(book => {
      book.title = book.title?.toUpperCase();
    });
  });

  this.on('UPDATE', Books, async (req, next) => {
    console.log(`Book ${req.params[0]} is being updated with:`, req.data);
    return next();
  });

});