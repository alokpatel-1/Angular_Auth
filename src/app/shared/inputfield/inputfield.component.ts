import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-inputfield',
  templateUrl: './inputfield.component.html',
  styleUrls: ['./inputfield.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputfieldComponent),
      multi: true,
    },
  ],
})
export class InputfieldComponent implements OnInit {
  @Input() type: String;
  @Input() placeholder: String;
  @Input() label: String;

  fieldValue = '';

  constructor() {}

  ngOnInit(): void {}

  writeValue(value: any): void {}

  propagateChange = (_: any) => {};

  registerOnChange(fn): void {
    this.propagateChange = fn;
  }

  registerOnTouched(): void {}

  onChange(): void {
    this.propagateChange(this.fieldValue);
  }
}
