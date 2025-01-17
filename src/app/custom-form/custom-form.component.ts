import { Component, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import * as jsmediatags from 'jsmediatags';

export class Tag {
 type: string;
 value: string; 
}

@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.css']
})
export class CustomFormComponent implements OnInit {
  
  customForm:FormGroup;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  errorMsg:string = "";
  allowAge:boolean = true;
  allowTag:boolean = true;
  tagList:any[] = [];
  fileUploaded: File; 
  fileSize:boolean = true;
  tags:Tag[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('snav', {static: false}) sidenav: MatSidenav;


  constructor(media: MediaMatcher) { 

    this.customForm = new FormGroup( {
      name: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z \-\']+')]),
      age: new FormControl('',[Validators.required, Validators.min(18), Validators.max(120)]),
      email: new FormControl('',[Validators.required, Validators.email]),
      tagDetailList: new FormControl(null,[Validators.required])
    });
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
  }

  close() {
    this.sidenav.close();
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.customForm.controls[controlName].hasError(errorName);
  }

  ageValidator(val):void {
    if(val < 18) {
      this.allowAge = false;
      this.errorMsg = "User must be of 18years to access the site!"
    }
  }

  onRemoveTags(tag: any) {
    let controller = this.customForm.controls['tagDetailList'];
    let index = this.tagList.indexOf(tag, 0);
    if (index > -1) {
      this.tagList.splice(index, 1);
    }
    controller.markAsDirty();
  }
  
  addTags(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;
    if ((value.trim() !== '') && this.tagList.length < 5 ) {
      this.allowTag = true;
      this.tagList.push(value);
      this.customForm.controls['tagDetailList'].markAsDirty();
      input.value = '';
    }
    if(this.tagList.length == 5) {
      this.allowTag = false;
    }
  }


  uploadedFile(event) {
    this.fileSize = true;
    this.fileUploaded = event.target.files[0]; 
    if( Number(((this.fileUploaded.size/1024)/1024).toFixed(4)) > 10 ) {
      this.fileSize = false;
    }
    if(this.fileSize) {
      jsmediatags.read(this.fileUploaded, {
        onSuccess: meta => {
          console.table(meta);
          let allowedTags = [
            "album",
            "artist",
            "genre"
          ];
          console.log(this.tags);
          for (const k in meta.tags) {
            if (allowedTags.includes(k)) {
              const v = meta.tags[k];
              this.tags.push(
                {
                  'type': k,
                  'value': v
                }
              );
            }
          };
        },
        onError: function(error) {
          console.log(':(', error.type, error.info);
        }
      });
    }
  }
}
