using my.bookshop as my from '../db/schema';

@requires: 'authenticated-user'
service CatalogService {

  @restrict: [
    { grant: 'READ', to: 'any' },
    { grant: ['CREATE', 'UPDATE', 'DELETE'], to: 'admin' },
    { grant: 'restock', to: 'admin' },
    { grant: 'getStockValue', to: 'any' }
  ]
  @odata.draft.enabled
  entity Books as projection on my.Books actions {
    action   restock(quantity: Integer) returns Books;
    function getStockValue() returns Decimal(11,2);
  };

  entity Authors as projection on my.Authors;
}