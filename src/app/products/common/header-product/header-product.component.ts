import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

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

    objRequest = { // Структура объекта request
        content: {
            // Данные программы не привязаны, пока не сделал их заполение из ответа, заполняю их тут в зависимости от выбора программы
            contractData: {
                product: {
                    code: '',
                    name: '',
                    premium: 0,
                }
            },
            // Данные страхователя привязаны, но чтобы не вводить их руками оставляю заполенными
            policyHolder: {
                lastName: 'Киров',
                firstName: 'Матвей',
                middleName: '',
                dob: '01.01.2001',
                phone: '89003334455',
                email: 'sj-smirnov@mail.ru',
                city: 'Москва',
            }
        }
    }

    // сокращаем запись пути
    product = this.objRequest.content.contractData.product;

    constructor(private authService: AuthService) {
        this.title = this.authService.title;
        this.key = this.authService.key;
        this.operation = this.authService.contractSave;
        this.requestUrl = this.authService.requestUrl;
    }

    ngOnInit(): void {}

    async saveContract() {
        this.product.code = JSON.parse(localStorage.getItem('programmName') || '"optimal"');
        this.objRequest = JSON.parse(localStorage.getItem('userData') || '" "');

        console.log('userData', this.objRequest);

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
                request: this.objRequest,
            }
        }

        console.log('save', save); // данные + введенные пользователем и отправляемые на сервер

        const formData: FormData = new FormData(); // использует этот формат данных для передачи их в с соответствии с API.
        formData.append('key', save.key);
        formData.append('operation', save.operation);
        formData.append('data', JSON.stringify(save.data));

        console.log('const formData:', formData);

        let response = await fetch(this.requestUrl, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            let responseJson = await response;
            responseJson.json().then(azaza => {
                if (azaza.success) {
                    console.log('Success save', azaza.success);
                    console.log('azaza', azaza);
                    this.documentCode = azaza.documentCode;
                } else {
                    alert('Error save:' + ' ' + azaza.error?.code);
                    console.log('Error save', azaza);
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
                    console.log('Success open', azaza.success);
                    console.log('Success open', azaza);
                } else {
                    alert('Error open:' + ' ' + azaza.error?.code);
                    console.log('Error open', azaza);
                }
            });
        } else {
            alert('Ошибка HTTP: ' + response.status);
        }
    }
}
