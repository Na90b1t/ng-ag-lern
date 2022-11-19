import { Component, OnInit } from '@angular/core';
// import { NgxMaskModule, IConfig } from 'ngx-mask';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
    options = {
        autoHide: false,
    }

    emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    objRequest: any = { // Структура объекта request
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
                lastName: '',
                firstName: 'Леонид',
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

    // сокращаем запись пути (использую в шаблоне)
    policyHolder: any = {}; // для сокращения записи в дальнейшем
    constructor() {}

    ngOnInit(): void {
        setTimeout(() =>  this.getUserData());
    }

    dateChange($event: { target: { value: any; }; }) {
        console.log('dateChange($event)', $event.target.value);
    }

    saveUserData() {
        console.log('saveUserData objRequest', this.objRequest);
        localStorage.setItem('userData', JSON.stringify(this.objRequest)); // сохраняем объект с выбранной программой
    }

    getUserData() {
        this.objRequest = JSON.parse(localStorage.getItem('userData') || JSON.stringify(this.objRequest)); // стрингифицирую объект чтобы не сломать парсер и передаю его самого чтобы он всегда был по дефолту (примерно так)
        this.policyHolder = this.objRequest.content.policyHolder; // сокращение пути переносится сюда, потому что если это был бы выше, то объект перепишется, а привязка осталась бы к старому
        console.log('getUserData objRequest', this.objRequest);
    }
}
