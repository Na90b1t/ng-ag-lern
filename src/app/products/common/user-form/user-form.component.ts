import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
// import { NgxMaskModule, IConfig } from 'ngx-mask';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
    private readonly key: string;
    private readonly operation: string;
    private readonly requestUrl: string;
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
    // product = this.objRequest.content.contractData.product;

    // @Input() programmSelected: any; // сюда прокину выбранную программу, чтобы потом ее передать в метод сейв

    constructor(private authService: AuthService) {
        this.key = this.authService.key;
        this.operation = this.authService.operationRegister;
        this.requestUrl = this.authService.requestUrl;
    }

    ngOnInit(): void { 
        // console.log('programmSelected in calc', this.programmSelected);
        // console.log('this.programmSelected[0].code', this.programmSelected[0].code);
        
    }

    dateChange($event: { target: { value: any; }; }) {
        console.log('dateChange($event)', $event.target.value);
    }
}
