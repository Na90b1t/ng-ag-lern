import { Component, OnInit } from '@angular/core';
import { KEY, REQUEST_URL } from 'src/app/constants/constants';
import { AuthService } from 'src/app/service/auth.service';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.scss']
})

export class LogoutComponent implements OnInit {
    session: string = '';
    private readonly operation: string;

    constructor(private authService: AuthService) {
        this.operation = this.authService.operationLOGOUT;
    }

    ngOnInit(): void {}

    async logOut() {
        let logout = {
            key: KEY,
            operation:  this.operation,
            data: {
                session: sessionStorage.getItem('session') || '',
            },
        };

        const formData: FormData = new FormData(); // использует этот формат данных для передачи их в с соответствии с API.
        formData.append('key', logout.key);
        formData.append('operation', logout.operation);
        formData.append('data', JSON.stringify(logout.data));

        let response = await fetch(REQUEST_URL, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            let responseJson = await response;
            responseJson.json().then(data => {
                if (data.success) {
                    console.log('logout:', data.success); // подтверждение разлогина.
                    this.session = ''; // сброс сессии, поскольку был разлогин.
                    sessionStorage.removeItem('session'); // очистка сессии из сторожа, поскольку был разлогин.
                } else {
                    alert('Error:' + ' ' + data.error?.code);
                }
            });
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    }
}
