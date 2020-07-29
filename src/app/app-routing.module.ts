import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomFormComponent } from './custom-form/custom-form.component';


const routes: Routes = [
  { path: 'home', component:CustomFormComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
