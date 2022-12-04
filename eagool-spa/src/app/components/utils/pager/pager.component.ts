import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css'],
})
export class PagerComponent {
  currentPage: number = 1;
  @Output() page = new EventEmitter<number>();

  toPrevPage() {
    this.currentPage--;
    this.page.emit(this.currentPage);
  }
  
  toNextPage() {
    this.currentPage++;
    this.page.emit(this.currentPage);
  }
}
