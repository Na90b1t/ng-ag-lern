import { Component, OnInit } from '@angular/core';
import { SalesAccountingService } from 'src/app/service/sales-accounting.service';

@Component({
    selector: 'app-sales-accounting',
    templateUrl: './sales-accounting.component.html',
    styleUrls: ['./sales-accounting.component.scss'],
    providers: [SalesAccountingService]
    })
    export class SalesAccountingComponent implements OnInit {

    contractData: any; // объект для получения данных с сервера

    userData: any = [
        {
            city: 'Москва',
        }
    ]

    constructor() { }

    ngOnInit(): void {
        this.contractData = this.userData;
    }

}
