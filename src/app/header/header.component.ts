import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
/* code for search function */
searchText: string='';
searchTextEntered(searchValue:string){
  this.searchText= searchValue;
}

}
