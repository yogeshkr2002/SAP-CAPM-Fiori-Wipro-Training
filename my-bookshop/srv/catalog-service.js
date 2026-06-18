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

  // --- Phase 2: Custom action ---
  this.on('restock', Books, async (req) => {
    const { quantity } = req.data;
    const bookId = req.params[0].ID ?? req.params[0];

    if (quantity == null || quantity <= 0) {
      return req.error(400, 'Quantity must be a positive number.');
    }

    const book = await SELECT.one.from(Books).where({ ID: bookId });
    if (!book) {
      return req.error(404, `Book ${bookId} not found.`);
    }

    const newStock = book.stock + quantity;

    await UPDATE(Books).set({ stock: newStock }).where({ ID: bookId });

    return await SELECT.one.from(Books).where({ ID: bookId });
  });

  // --- Phase 2: Custom function ---
  this.on('getStockValue', Books, async (req) => {
    const bookId = req.params[0].ID ?? req.params[0];

    const book = await SELECT.one.from(Books).where({ ID: bookId });
    if (!book) {
      return req.error(404, `Book ${bookId} not found.`);
    }

    return book.stockValue;
  });

});