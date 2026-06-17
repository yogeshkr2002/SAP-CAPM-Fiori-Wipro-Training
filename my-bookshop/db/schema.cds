namespace my.bookshop;

entity Books {
  key ID      : UUID;
  title       : String(111) not null;
  descr       : String(1111);
  stock       : Integer default 0;
  price       : Decimal(9,2) @assert.range: [0, 99999];
  currency    : String(3) default 'USD';
  stockValue  : Decimal(11,2) = stock * price;
  author      : Association to Authors;
}

entity Authors {
  key ID    : UUID;
  name      : String(111) not null;
  books     : Association to many Books on books.author = $self;
}