import { Component, Input, OnInit } from '@angular/core';
// import { NgxMaskModule, IConfig } from 'ngx-mask';

@Component({
    selector: 'app-calculation',
    templateUrl: './calculation.component.html',
    styleUrls: ['./calculation.component.scss']
})
export class CalculationComponent implements OnInit {

    private requestUrl = 'https://testportal2.agentology.ru/api/agentology/'; // адрес сервера для взаимодествия с помощью API
    key = 'a9fb7d0b-d818-4e24-d499-dda5cb02dc6f'; // ключ API
    documentCode = ''; // guid сохраненного документа,
    documentNumber = ''; // Номер договора

    options = {
        autoHide: false,
    }

    emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    objRequest = { // Структура объекта request
        content: {
            // Данные программы не привязаны, пока не сделал их заполение из ответа.
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
                dob: '01.01.2000',
                phone: '89003334455',
                email: 'sj-smirnov@mail.ru',
                city: 'Москва',
            }
        }
    }

    public customPatterns = { 'S': { pattern: new RegExp('\[a-zA-Z\]+') } };
    rusPatterns = new RegExp('\[а-яА-Я\]+');

    maskOptions = {
        mask: '+{7}(000)000-00-00'
    };

    // сокращаем запись пути
    policyHolder = this.objRequest.content.policyHolder;
    product = this.objRequest.content.contractData.product;

    @Input() session: any;
    @Input() programmSelected: any; // сюда прокину выбранную программу, чтобы потом ее передать в метод сейв

    constructor() { }

    ngOnInit(): void { 
        console.log('programmSelected in calc', this.programmSelected);
        console.log('this.programmSelected[0].code', this.programmSelected[0].code);
        
    }

    dateChange($event: { target: { value: any; }; }) {
        console.log('dateChange($event)', $event.target.value);
    }

    async saveContract() {
        this.product.code = JSON.parse(localStorage.getItem('programmName') || '"optimal"');
        if (this.product.code === 'optimal') {
            this.product.name = 'Оптимальный',
            this.product.premium = 3000
        } else {
            this.product.name = 'Расширенный',
            this.product.premium = 6000
        }

        let save = {
            key: this.key,
            operation: 'contract.save',
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
