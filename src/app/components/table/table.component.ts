import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  path = 'products';
  dataSource: any;
  displayedColumns = [];
  data: any;
  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(`http://localhost:2000/${this.path}`).subscribe((res) => {
      this.data = res;
      this.dataSource = new MatTableDataSource(this.data);
      // console.log('dataSource', this.dataSource.filteredData);
      for (let i in this.dataSource.filteredData[0]) {
        // console.log('data column', i);
        if (i != '_id' && i != 'id') {
          this.displayedColumns.push(i);
        }
      }
      // console.log('ELEMENT Data', this.displayedColumns);
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
      // authService.filterData({});
    });
  }

  changePath(path) {
    this.displayedColumns = [];
    this.path = path;
    this.ngOnInit();
  }
}
