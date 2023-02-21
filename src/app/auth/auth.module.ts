import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
    declarations: [
        AuthComponent,
        SignInComponent,
        LogoutComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
    ],
    exports: [
        AuthComponent,
        SignInComponent,
    ]
})
export class AuthModule { }
