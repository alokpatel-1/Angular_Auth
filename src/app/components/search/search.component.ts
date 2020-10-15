import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchKey = new FormControl('');
  searchList;
  filteredData;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
  handleSearch() {
    this.authService.handlesearch(this.searchKey.value).subscribe((res) => {
      this.searchList = res;
    });
  }
  submitSearch() {
    if (this.searchKey.value != '') {
      this.authService.handlesearch(this.searchKey.value).subscribe((res) => {
        this.filteredData = res;
        this.searchList = '';
      });
    }
  }
  selectedItem(appName: any) {
    this.searchKey.setValue(appName);
    this.searchList = '';
    this.filteredData = '';
    this.submitSearch();
  }

  removeSearchList() {
    this.searchList = '';
  }
}
