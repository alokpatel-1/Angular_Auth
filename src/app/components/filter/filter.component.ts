import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
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

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.authService.filterData({}).subscribe((res) => {
      this.data = res;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
    });
    console.log('data', this.category.value);
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
  }

  HandleFilter() {
    this.setParams();
    this.authService.filterData(this.filterParams).subscribe((res) => {
      this.data = res;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
    });
  }
}
