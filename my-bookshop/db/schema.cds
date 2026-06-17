namespace my.bookshop;

entity Books {
  key ID    : UUID;
  title     : String(111);
  descr     : String(1111);
  stock     : Integer;
  price     : Decimal(9,2);
  currency  : String(3);
  author    : Association to Authors;
}

entity Authors {
  key ID    : UUID;
  name      : String(111);
  books     : Association to many Books on books.author = $self;
}