import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  data;
  sortDataInDecendingOrder = false;
  sortDataInAscendingOrder = true;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getDatafromJson().subscribe((res) => {
      this.data = res;
    });
  }

  sortInDecendingOrder() {
    this.sortDataInAscendingOrder = true;
    this.sortDataInDecendingOrder = false;
    console.log('data', this.data);

    console.log('sortInDecendingOrder');
  }
  sortInAscendingOrder() {
    this.sortDataInDecendingOrder = true;
    this.sortDataInAscendingOrder = false;

    console.log('data', this.data);
    console.log('sortInAscendingOrder');
  }
}
