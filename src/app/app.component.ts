import { Component } from '@angular/core';
import { Book } from './app.book';
import { BookService } from './app.book.service';

@Component({
  selector: 'my-app',
  providers: [BookService],
  templateUrl: './app.book.html',
})
export class AppComponent  { 
  constructor(private bookService: BookService) { }
  
  name = 'Angular';
  categories: string[];
  model: Book;

  ngOnInit(): void {
    this.categories = this.bookService.getCategories();
    this.model = this.bookService.getBook();
  }
}
