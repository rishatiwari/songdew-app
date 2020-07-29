import { Component, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.css']
})
export class CustomFormComponent implements OnInit {
  
  customForm:FormGroup;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  @ViewChild('snav', {static: false}) sidenav: MatSidenav;


  constructor(media: MediaMatcher) { 

    this.customForm = new FormGroup( {
      fname: new FormControl(''),
      lname:new FormControl('')
    });
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
  }

  close() {
    this.sidenav.close();
  }

}
