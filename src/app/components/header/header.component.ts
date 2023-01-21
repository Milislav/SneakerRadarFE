import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output("select")
  private searchEventEmitter: EventEmitter<string> = new EventEmitter<string>();

  @Output("selectBrand")
  private brandEventEmitter: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  searchSelected(option: string) {
    this.searchEventEmitter.emit(option);
  }

  brandSelected(option: string) {
    this.brandEventEmitter.emit(option);
  }
}
