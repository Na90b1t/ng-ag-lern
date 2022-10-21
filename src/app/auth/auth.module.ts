import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { OutputComponent } from './output/output.component';

@NgModule({
    declarations: [
        AuthComponent,
        OutputComponent,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        AuthComponent,
        OutputComponent,
    ]
})
export class AuthModule { }
