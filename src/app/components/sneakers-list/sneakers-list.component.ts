import {Component, OnInit} from '@angular/core';
import {SneakerService} from "../../services/sneaker.service";
import {Sneaker} from "../../models/sneaker";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-sneakers-all-list',
  templateUrl: './sneakers-list.component.html',
  styleUrls: ['./sneakers-list.component.css']
})
export class SneakersListComponent implements OnInit {

  sneakers: Sneaker[] = [];
  pageSize: number = 24;
  pageNumber: number = 0;
  totalElements: number = 0;
  searchTerm: string = "";
  request: string = "";
  order: string = "";
  sneakerSizes: string[] =
    ['35', '36', '36.5', '37', '37.5', '38', '38.5', '39', '39.5',
      '40', '40.5', '41', '41.5', '42', '42.5', '43', '43.5',
      '44', '44.5', '45', '45.5', '46', '46.5', '47', '47.5'];
  selectedCheckBox = -1;
  sneakerSizeSelected: string = "";


  constructor(private sneakerService: SneakerService) {
  }

  ngOnInit(): void {
    this.request = "/listPageable?page=0&size=24";
    this.getProducts(this.request);
  }

  public search(term: any): void {
    this.searchTerm = term;
    if (this.searchTerm == "") {
      this.getProducts("/listPageable?page=0&size=24")
    } else {
      this.request = `/searchPageable/${this.searchTerm}?page=0&size=24`
      this.sneakerService.getPage(this.request).subscribe(data => {
          this.sneakers = data['content'];
          this.totalElements = data['totalElements'];
        }
        , error => {
          console.log(error.error.message);
        }
      );
    }
  }

  nextPage(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex;
    if (this.searchTerm == "") {
      this.request = `/listPageable?page=${event.pageIndex.toString()}&size=${event.pageSize.toString()}&sort=${this.order}&shoesSize=${this.sneakerSizeSelected}`
    } else {
      this.request = `/searchPageable/${this.searchTerm}?page=${event.pageIndex.toString()}&size=${event.pageSize.toString()}&sort=${this.order}&shoesSize=${this.sneakerSizeSelected}`
    }
    this.getProducts(this.request);

  }

  public getProducts(request: string) {
    this.sneakerService.getPage(request)
      .subscribe(data => {
          this.sneakers = data['content'];
          this.totalElements = data['totalElements'];
        }
        , error => {
          console.log(error.error.message);
        }
      );
  }

  public sortProducts(order: string) {
    this.order = order;
    if (this.searchTerm == "") {
      if (this.sneakerSizeSelected) {
        this.request = `/listPageable?page=${this.pageNumber.toString()}
        &size=${this.pageSize.toString()}&sort=${this.order}&shoesSize=${this.sneakerSizeSelected}`
      } else {
        this.request = `/listPageable?page=${this.pageNumber.toString()}
        &size=${this.pageSize.toString()}&sort=${this.order}`
      }
    } else {
      if (this.sneakerSizeSelected) {
        this.request = `/searchPageable/${this.searchTerm}?page=${this.pageNumber.toString()}
        &size=${this.pageSize.toString()}&sort=${this.order}&shoesSize=${this.sneakerSizeSelected}`
      } else {
        this.request = `/searchPageable/${this.searchTerm}?page=${this.pageNumber.toString()}
        &size=${this.pageSize.toString()}&sort=${this.order}`
      }
    }
    this.getProducts(this.request);
  }

  selectedSearch(searchProduct: string) {
    this.search(searchProduct);
  }

  selectedBrand(searchProduct: string) {
    this.search(searchProduct);
  }

  onChangeSneakerSize(sneakerSizeSelected: string) {
    this.sneakerSizeSelected = sneakerSizeSelected;
    if (this.searchTerm == "") {
      if (this.order) {
        this.request = `/listPageable?page=${this.pageNumber.toString()}
        &size=${this.pageSize.toString()}&sort=${this.order}&shoesSize=${this.sneakerSizeSelected}`
      } else {
        this.request = `/listPageable?page=${this.pageNumber.toString()}
        &size=${this.pageSize.toString()}&shoesSize=${this.sneakerSizeSelected}`
      }
    } else {
      if (this.sneakerSizeSelected) {
        this.request = `/searchPageable/${this.searchTerm}?page=${this.pageNumber.toString()}
        &size=${this.pageSize.toString()}&sort=${this.order}&shoesSize=${this.sneakerSizeSelected}`
      } else {
        this.request = `/searchPageable/${this.searchTerm}?page=${this.pageNumber.toString()}
        &size=${this.pageSize.toString()}&sort=${this.order}`
      }
    }
    this.getProducts(this.request);
  }

  orderSetNull() {
    this.order = ""
    if (this.searchTerm == "") {
      this.request = `/listPageable?page=${this.pageNumber.toString()}
      &size=${this.pageSize.toString()}&sort=${this.order}&shoesSize=${this.sneakerSizeSelected}`
    } else {
      this.request = `/searchPageable/${this.searchTerm}?page=${this.pageNumber.toString()}
      &size=${this.pageSize.toString()}&sort=${this.order}&shoesSize=${this.sneakerSizeSelected}`
    }
    this.getProducts(this.request)
  }

  sizeSetNull() {
    this.sneakerSizeSelected = ""
    if (this.searchTerm == "") {
      this.request = `/listPageable?page=${this.pageNumber.toString()}
      &size=${this.pageSize.toString()}&sort=${this.order}&shoesSize=${this.sneakerSizeSelected}`
    } else {
      this.request = `/searchPageable/${this.searchTerm}?page=${this.pageNumber.toString()}
      &size=${this.pageSize.toString()}&sort=${this.order}&shoesSize=${this.sneakerSizeSelected}`
    }
    this.getProducts(this.request)
  }

  searchTermSetNull() {
    this.searchTerm = ""
    this.request = `/listPageable?page=${this.pageNumber.toString()}
    &size=${this.pageSize.toString()}&sort=${this.order}&shoesSize=${this.sneakerSizeSelected}`
    this.getProducts(this.request)
  }
}
