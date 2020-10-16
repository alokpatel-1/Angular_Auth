import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css'],
})
export class DatatableComponent implements OnInit {
  @Input() displayedColumns: any;
  @Input() dataSource: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
}
