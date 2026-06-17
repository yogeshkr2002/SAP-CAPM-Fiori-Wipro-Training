const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {

  const { Books } = this.entities;

  // BEFORE hook: runs before the actual CREATE happens
  this.before('CREATE', Books, async (req) => {
    if (req.data.stock < 0) {
      req.reject(400, 'Stock cannot be negative');
    }
  });

  // AFTER hook: runs after READ, lets you reshape the response
  this.after('READ', Books, (books) => {
    const list = Array.isArray(books) ? books : [books];
    list.forEach(book => {
      book.title = book.title?.toUpperCase();
    });
  });

  // ON handler: completely overrides default behavior for this event
  this.on('UPDATE', Books, async (req, next) => {
    console.log(`Book ${req.params[0]} is being updated with:`, req.data);
    return next(); // delegate back to default CAP logic after logging
  });

});