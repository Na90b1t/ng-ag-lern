import { Component, Input, OnInit } from '@angular/core';
import { SalesAccountingService } from 'src/app/service/sales-accounting.service';

@Component({
    selector: 'app-sales-accounting',
    templateUrl: './sales-accounting.component.html',
    styleUrls: ['./sales-accounting.component.scss'],
    providers: [SalesAccountingService]
})

export class SalesAccountingComponent implements OnInit {

    @Input() session: any; // для отображения на странице

    contractData: any; // объект для получения данных с сервера
    // product: any;

    constructor(public salesAccountingService: SalesAccountingService) {
        // this.contractData = this.salesAccountingService.getSales();
        this.salesAccountingService.getSales();
        console.log('constructor contractData', this.contractData);

        // сокращаем запись пути
        // this.product = this.contractData.content.contractData.product;
    }

    ngOnInit(): void {
        console.log('ngOnInit contractData', this.contractData);
        // this.contractData = this.salesAccountingService.getSalesPage();
        // console.log('this.contractData', this.contractData);
    }

}
