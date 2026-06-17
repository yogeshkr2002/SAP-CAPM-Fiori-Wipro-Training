using my.bookshop as my from '../db/schema';

@requires: 'authenticated-user'
service CatalogService {

  @restrict: [
    { grant: 'READ', to: 'any' },
    { grant: ['CREATE', 'UPDATE', 'DELETE'], to: 'admin' }
  ]
  entity Books as projection on my.Books;

  entity Authors as projection on my.Authors;
}