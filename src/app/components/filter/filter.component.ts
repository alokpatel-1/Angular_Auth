import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  filterParams = {};
  category = new FormControl('');
  type = new FormControl('');
  topRated = new FormControl('');
  range = new FormControl('');
  data: any;
  displayedColumns: string[] = [
    'App',
    'Category',
    'Rating',
    'Reviews',
    'Size',
    'Installs',
    'Price',
    'Type',
  ];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.authService.filterData({}).subscribe((res) => {
      this.data = res;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    console.log('data', this.range.value);
  }

  setState(e) {
    // this.filterParams.controls.topRated.setValue(e.checked);
    // console.log(e.checked, this.filterParams.value);
  }

  setParams() {
    if (this.category.value != '') {
      this.filterParams['Category'] = this.category.value;
    }
    if (this.type.value != '') {
      this.filterParams['Type'] = this.type.value;
    }
    if (this.range.value != '') {
      this.filterParams['Rating'] = { $gte: this.range.value };
    }
  }

  HandleFilter() {
    this.setParams();
    this.authService.filterData(this.filterParams).subscribe((res) => {
      this.data = res;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
