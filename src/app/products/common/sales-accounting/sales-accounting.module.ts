import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesAccountingComponent } from './sales-accounting.component';

@NgModule({
    declarations: [
        SalesAccountingComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        SalesAccountingComponent
    ]
})
export class SalesAccountingModule { }
