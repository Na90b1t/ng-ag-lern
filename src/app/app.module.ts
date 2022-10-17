import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule  }   from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';

import { NgxMaskModule, IConfig } from 'ngx-mask';

import { NgScrollbarModule } from 'ngx-scrollbar';
import { SimplebarAngularModule } from 'simplebar-angular';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CalculationComponent } from './legal-service/calculation/calculation.component';
import { CustomerDataComponent } from './legal-service/customer-data/customer-data.component';

@NgModule({ 
  declarations: [
    AppComponent,
    LoginComponent,
    CalculationComponent,
    CustomerDataComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    NgxMaskModule.forRoot(),
    NgScrollbarModule,
    SimplebarAngularModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
