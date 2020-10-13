import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css'],
})
export class SortComponent implements OnInit {
  constructor(private authService: AuthService) {}
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['id', 'product', 'rating', 'price'];
  dataSource: any;

  ngOnInit(): void {
    this.authService.getDatafromJson().subscribe((res) => {
      let tableData: any = res;
      this.dataSource = new MatTableDataSource(tableData);
      this.dataSource.sort = this.sort;
    });
  }
}
