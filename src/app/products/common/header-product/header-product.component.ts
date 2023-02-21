import { Component, OnInit } from '@angular/core';
import { CONTRACT_OPEN, CONTRACT_SAVE, KEY, REQUEST_URL } from 'src/app/constants/constants';
import { JuridicalServiceService } from 'src/app/service/juridical-service.service';

@Component({
    selector: 'app-header-product',
    templateUrl: './header-product.component.html',
    styleUrls: ['./header-product.component.scss']
})

export class HeaderProductComponent implements OnInit {
    public readonly title: string;

    documentCode = ''; // guid сохраненного документа,
    // documentNumber = ''; // Номер договора (не используется)

    public userData: any; // для объекта из сервиса с данными формы пользователя

    product: any = {}; // для сокращения записи пути в шаблоне в дальнейшем

    constructor(public juridicalServiceService: JuridicalServiceService) {
        this.title = this.juridicalServiceService.title;
        this.userData = this.juridicalServiceService.getUserData();
        // сокращаем запись пути
        this.product = this.userData.content.contractData.product;
    }

    ngOnInit(): void {}

    async saveContract() {
        this.product.code = JSON.parse(localStorage.getItem('programmName') || '"optimal"');

        if (this.product.code === 'optimal') {
            this.product.name = 'Оптимальный',
            this.product.premium = 3000
        } else {
            this.product.name = 'Расширенный',
            this.product.premium = 6000
        }

        // console.log('product:', this.product);

        let save = {
            key: KEY,
            operation: CONTRACT_SAVE,
            data: {
                session: sessionStorage.getItem('session') || '',
                product: 'juridicalService',
                // documentCode: 'guid документа, если требуется пересохранение, иначе не передавать данный параметр',
                request: this.userData,
            }
        }

        // console.log('save:', save); // данные + введенные пользователем и отправляемые на сервер

        const formData: FormData = new FormData(); // использует этот формат данных для передачи их в с соответствии с API.
        formData.append('key', save.key);
        formData.append('operation', save.operation);
        formData.append('data', JSON.stringify(save.data));

        let response = await fetch(REQUEST_URL, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            let responseJson = await response;
            responseJson.json().then(data => {
                if (data.success) {
                    console.log('save:', data.success);
                    this.documentCode = data.documentCode;
                } else {
                    alert('Error:' + ' ' + data.error?.code);
                }
            });
        } else {
            alert('Ошибка HTTP: ' + response.status);
        }
    }

    async openContract() {
        let open = {
            key: KEY,
            operation: CONTRACT_OPEN,
            data: {
                session: sessionStorage.getItem('session') || '',
                code: this.documentCode,
            }
        }

        const formData: FormData = new FormData();
        formData.append('key', open.key);
        formData.append('operation', open.operation);
        formData.append('data', JSON.stringify(open.data));

        let response = await fetch(REQUEST_URL, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            let responseJson = await response;
            responseJson.json().then(data => {
                if (data.success) {
                    console.log('open:', data.success);
                } else {
                    alert('Error:' + ' ' + data.error?.code);
                }
            });
        } else {
            alert('Ошибка HTTP: ' + response.status);
        }
    }
}
