import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  login = '';
  password = '';
  session = '';
  key = 'a9fb7d0b-d818-4e24-d499-dda5cb02dc6f';

  private requestUrl = 'https://testportal2.agentology.ru/api/agentology/';

  public exampleUsersService: Array<any>;

  @Output() outputSession: EventEmitter<any> = new EventEmitter(); // передаем сессию для отображения компонентов

  constructor(private dataService: DataService) {
    this.exampleUsersService = this.dataService.getData();
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
      operation: 'user.authorization',
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
      let jsonResponse = await response;
      jsonResponse.json().then(azaza => {
        if(azaza.success) {
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

  async logOut () {
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
      let json = await response;
      json.json().then(azaza => {
        if(azaza.success) {
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