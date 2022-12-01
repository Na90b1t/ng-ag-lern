import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { KEY, REQUEST_URL } from '../../constants/constants';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent implements OnInit {
    login: string = '';
    password: string = '';
    session: string = '';
    
    private readonly operation: string;

    @Output() outputSession: EventEmitter<any> = new EventEmitter(); // передаем сессию для отображения компонентов

    constructor(private authService: AuthService) {
        this.operation = this.authService.operationAuth;
    }

    ngOnInit(): void {
        this.login = JSON.parse(localStorage.getItem('login') || '" "');
        this.session = sessionStorage.getItem('session') || '';
    }

    loginSession() {
        this.outputSession.emit();
    }

    async requestApi() {
        let authorization = {
            key: KEY,
            operation: this.operation,
            // получаем от ввода пользователя
            data: {
                login: this.login,
                password: this.password,
            },
        };

        const formData: FormData = new FormData(); // использует этот формат данных для передачи их в с соответствии с API.
        formData.append('key', authorization.key);
        formData.append('operation', authorization.operation);
        formData.append('data', JSON.stringify(authorization.data));

        let response = await fetch(REQUEST_URL, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            let responseJson = await response;
            responseJson.json().then(data => {
                if (data.success) {
                    console.log('authorization:', data.success); // подтверждаем что авторизовались
                    this.session = data?.result?.session; // получаем сессию
                    sessionStorage.setItem('session', this.session); // сохраняем сессию в сессионый сторож
                    this.loginSession(); // передача события в родительский компонент.
                    localStorage.setItem('login', JSON.stringify(authorization.data.login));
                    this.password = ''; // сброс пароля после входа.
                } else {
                    alert('Error:' + ' ' + data.error?.code);
                }
            });
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    }
}
