import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { JuridicalServiceService } from 'src/app/service/juridical-service.service';

@Component({
    selector: 'app-header-product',
    templateUrl: './header-product.component.html',
    styleUrls: ['./header-product.component.scss']
})
export class HeaderProductComponent implements OnInit {
    private readonly key: string;
    private readonly operation: string;
    private readonly requestUrl: string;
    public readonly title: string;

    documentCode = ''; // guid сохраненного документа,
    // documentNumber = ''; // Номер договора (не используется)

    public userData: any; // для объекта из сервиса с данными формы пользователя

    product: any = {}; // для сокращения записи пути в шаблоне в дальнейшем

    constructor(private authService: AuthService, public juridicalServiceService: JuridicalServiceService) {
        // тут от authService
        this.title = this.authService.title;
        this.key = this.authService.key;
        this.operation = this.authService.contractSave;
        this.requestUrl = this.authService.requestUrl;
        // тут от juridicalServiceService
        this.userData = this.juridicalServiceService.getUserData();
        // сокращаем запись пути
        this.product = this.userData.content.contractData.product;
    }

    ngOnInit(): void {}

    async saveContract() {
        this.product.code = JSON.parse(localStorage.getItem('programmName') || '"optimal"');
        console.log('this.product.code ', this.product.code);
        console.log('this.product ', this.product);

        if (this.product.code === 'optimal') {
            this.product.name = 'Оптимальный',
            this.product.premium = 3000
        } else {
            this.product.name = 'Расширенный',
            this.product.premium = 6000
        }

        let save = {
            key: this.key,
            operation: this.operation,
            data: {
                session: sessionStorage.getItem('session') || '',
                product: 'juridicalService',
                // documentCode: 'guid документа, если требуется пересохранение, иначе не передавать данный параметр',
                request: this.userData,
            }
        }

        console.log('save', save); // данные + введенные пользователем и отправляемые на сервер

        const formData: FormData = new FormData(); // использует этот формат данных для передачи их в с соответствии с API.
        formData.append('key', save.key);
        formData.append('operation', save.operation);
        formData.append('data', JSON.stringify(save.data));

        // console.log('const formData:', formData);

        let response = await fetch(this.requestUrl, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            let responseJson = await response;
            responseJson.json().then(azaza => {
                if (azaza.success) {
                    // console.log('Success save', azaza.success);
                    console.log('response (azaza)', azaza);
                    this.documentCode = azaza.documentCode;
                } else {
                    alert('Error save:' + ' ' + azaza.error?.code);
                    // console.log('Error save', azaza);
                }
            });
        } else {
            alert('Ошибка HTTP: ' + response.status);
        }
    }

    async openContract() {
        let open = {
            key: this.key,
            operation: 'contract.open',
            data: {
                session: sessionStorage.getItem('session') || '',
                code: this.documentCode,
            }
        }

        console.log('open', open);

        const formData: FormData = new FormData();
        formData.append('key', open.key);
        formData.append('operation', open.operation);
        formData.append('data', JSON.stringify(open.data));

        let response = await fetch(this.requestUrl, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            let responseJson = await response;
            responseJson.json().then(azaza => {
                if (azaza.success) {
                    // console.log('Success open', azaza.success);
                    // console.log('Success open', azaza);
                } else {
                    alert('Error open:' + ' ' + azaza.error?.code);
                    // console.log('Error open', azaza);
                }
            });
        } else {
            alert('Ошибка HTTP: ' + response.status);
        }
    }
}
