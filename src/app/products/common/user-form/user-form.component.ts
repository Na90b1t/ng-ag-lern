import { Component, OnInit } from '@angular/core';
import { JuridicalServiceService } from 'src/app/service/juridical-service.service';
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

    public customPatterns = { 'S': { pattern: new RegExp('\[a-zA-Z\]+') } };

    rusPatterns = new RegExp('\[а-яА-Я\]+');

    maskOptions = {
        mask: '+{7}(000)000-00-00'
    };

    public userData: any; // для объекта из сервиса с данными формы пользователя

    policyHolder: any = {}; // для сокращения записи пути в шаблоне в дальнейшем

    constructor(public juridicalServiceService: JuridicalServiceService) {
        this.userData = this.juridicalServiceService.userData; // получаю обьект из с первоначальными данными из сервиса
    }

    ngOnInit(): void {
        this.userData = this.juridicalServiceService.getUserData(); // получаем из сервиса объект с данными формы пользователя
        this.policyHolder = this.userData.content.policyHolder; // сокращение пути (использую в шаблоне) переносится сюда, потому что если это был бы выше, то объект перепишется, а привязка осталась бы к старому
    }

    dateChange($event: { target: { value: any; }; }) {
        console.log('dateChange($event)', $event.target.value);
    }

    saveUserData() {
        localStorage.setItem('userData', JSON.stringify(this.userData)); // сохраняем объект с данными формы пользователя
        console.log('saveUserData: start');
    }
}
