import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderProductComponent } from './header-product.component';

@NgModule({
    declarations: [
        HeaderProductComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        HeaderProductComponent,
]
})
export class HeaderProductModule { }
