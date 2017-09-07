import { Injectable } from '@angular/core';
import { Book } from './app.book';

@Injectable()
export class BookService {
  constructor() { }

  getCategories() {
    return ['Horror', 'Comedy', 'Science-Fiction', 'Drama'];
  }

  getBook() {
    return new Book(18, 'Sample Title', '', this.getCategories[0], 'Optional Subtitle');;
  }
}