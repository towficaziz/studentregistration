import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /* code for search function */
  searchValue: string='';

  @Output()
  searchChanged: EventEmitter<string>= new EventEmitter<string>();

  onSearchText(){
    this.searchChanged.emit(this.searchValue);
  }
}
