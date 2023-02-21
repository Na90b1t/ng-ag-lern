import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Сторонние библиотеки
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SimplebarAngularModule } from 'simplebar-angular';
// Компоненты приложения
import { AppComponent } from './app.component';
// import { CustomerDataComponent } from './products/customer-data/customer-data.component';
// Модули приложения
import { AuthModule } from './auth/auth.module';
import { LegalServiceModule } from './products/legal-service/legal-service.module';
import { SalesAccountingModule } from './products/common/sales-accounting/sales-accounting.module';
// Сервис для учебы(черновик), один на все компоненты
import { DraftService } from './draft.service';
// Учебные(черновики) компоненты
import { DraftUserComponent } from './drafts/draft-user/draft-user.component';
import { DraftScrollComponent } from './drafts/draft-scroll/draft-scroll.component';
import { DraftObjectComponent } from './drafts/draft-object/draft-object.component';

@NgModule({
    declarations: [
        AppComponent,
        // CustomerDataComponent,
        DraftUserComponent,
        DraftScrollComponent,
        DraftObjectComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        NgxMaskModule.forRoot(),
        NgScrollbarModule,
        SimplebarAngularModule,
        AuthModule,
        LegalServiceModule,
        SalesAccountingModule
    ],
    providers: [DraftService],
    bootstrap: [AppComponent]
})
export class AppModule { }
