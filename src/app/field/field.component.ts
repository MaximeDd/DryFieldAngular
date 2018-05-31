import {Component, Input, OnInit} from '@angular/core';
import {Field} from '../model/field.model';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {

  @Input()
  field: Field;

  constructor() {
  }

  floor(num: number) {
    return Math.floor(num);
  }

  ngOnInit() {
  }

}
