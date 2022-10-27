import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent implements OnInit {
    login = '';
    password = '';
    session = '';
    
    private readonly key: string;
    private readonly operation: string;
    private readonly requestUrl: string;

    @Output() outputSession: EventEmitter<any> = new EventEmitter(); // передаем сессию для отображения компонентов

    constructor(private authService: AuthService) {
        this.key = this.authService.key;
        this.operation = this.authService.operationAuth;
        this.requestUrl = this.authService.requestUrl;
    }

    ngOnInit(): void {
        setTimeout(() =>
            this.login = JSON.parse(localStorage.getItem('login') || '')
        );
    }

    loginSession() {
        this.outputSession.emit();
    }

    async requestApi() {
        let authorization = {
            key: this.key,
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

        let response = await fetch(this.requestUrl, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            let responseJson = await response;
            responseJson.json().then(azaza => {
                if (azaza.success) {
                    console.log('azaza.success', azaza.success);
                    this.session = azaza?.result?.session;
                    sessionStorage.setItem('session', this.session);
                    this.loginSession(); // передача события в родительский компонент.
                    localStorage.setItem('login', JSON.stringify(authorization.data.login));
                    this.password = ''; // сброс пароля после входа.
                } else {
                    alert('Error:' + ' ' + azaza.error?.code);
                }
            });
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    }

    async logOut() {
        let logout = {
            key: this.key,
            operation: 'user.logout',
            data: {
                session: sessionStorage.getItem('session') || '',
            },
        };

        const formData: FormData = new FormData(); // использует этот формат данных для передачи их в с соответствии с API.
        formData.append('key', logout.key);
        formData.append('operation', logout.operation);
        formData.append('data', JSON.stringify(logout.data));

        let response = await fetch(this.requestUrl, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            let responseJson = await response;
            responseJson.json().then(azaza => {
                if (azaza.success) {
                    console.log('logout', azaza.success); // подтверждение разлогина.
                    this.session = ''; // сброс сессии, поскольку был разлогин.
                    sessionStorage.removeItem('session'); // очистка сессии из сторожа, поскольку был разлогин.
                } else {
                    alert('Error:' + ' ' + azaza.error?.code);
                }
            });
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    }
}
