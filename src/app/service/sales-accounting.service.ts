import { Injectable } from '@angular/core';
import { CONTRACT_SAVE, KEY, REQUEST_URL } from '../constants/constants';

@Injectable({
    providedIn: 'root'
})

export class SalesAccountingService {
    // Структура объекта request
/*     public userData: any = {
        content: {
            // Данные программы не привязаны, пока не сделал их заполение из ответа.
            contractData: {
                product: {
                    code: '',
                    name: '',
                    premium: null,
                }
            },

            // Данные страхователя привязаны, но чтобы не вводить их руками оставляю заполенными
            policyHolder: {
                lastName: 'Фамилия',
                firstName: 'Имя',
                middleName: '',
                dob: '01.01.2000',
                phone: '89003334455',
                email: 'sj-smirnov@mail.ru',
                city: 'Москва',
            }
        }
    } */

    contractData: any;

    constructor() {}

    /* async getInsuredData(type: string): Promise<string> {
        const response = await fetch(
            `${environment().documentUrl}documents/product/${type}/conditionibus.htm`,
        );
        const insuredData = await response.text();
        return insuredData;
    } */

    async getSales() {
        let register = {
            key: KEY,
            operation: 'products.list.all',
            data: {
                session: sessionStorage.getItem('session') || '',
            }
        };

        console.log('register', register);

        const formData: FormData = new FormData(); // использует этот формат данных для передачи их в с соответствии с API.
        formData.append('key', register.key);
        formData.append('operation', register.operation);
        formData.append('data', JSON.stringify(register.data));

        let response = await fetch(REQUEST_URL, {
            method: 'POST',
            body: formData
        });
        console.log('response:', response);

        if (response.ok) {
            let responseJson = response;
            responseJson.json().then(data => {
                console.log('success:', typeof data, data);
                if (data.success) {
                    console.log('data.success:', data.success);
                    // this.contractData = data.result; // получаем data response
                    // console.log('contractData:', this.contractData);
                    console.log('data.result:', data.result);
                } else {
                    alert('sales:' + ' ' + data.success);
                }
            });

            return responseJson;
        } else {
            alert('Ошибка HTTP: ' + response.status);
            return; //
        }
    }

}
