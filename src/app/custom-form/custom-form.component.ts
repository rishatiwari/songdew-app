import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.css']
})
export class CustomFormComponent implements OnInit {
  
  customForm:FormGroup;
  constructor() { 

    this.customForm = new FormGroup( {
      fname: new FormControl(''),
      lname:new FormControl('')
    });
  }

  ngOnInit(): void {
  }

}
