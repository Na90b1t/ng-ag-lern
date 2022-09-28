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

  @Output() outputSession: EventEmitter<any> = new EventEmitter();

  constructor(private dataService: DataService) {
    this.exampleUsersService = this.dataService.getData();
  }

  ngOnInit(): void {
    localStorage.setItem('login azaza', JSON.stringify(''));
    this.login = JSON.parse(localStorage.getItem('login azaza') || '');
  }

  loginSession() {
    this.outputSession.emit();
  }

  async requestApi() {
    let authorization = {
      key: this.key,
      operation: 'user.authorization',
      data: {
        "login": this.login,
        "password": this.password
        }
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
      let json = await response;
      json.json().then(azaza => {
        if(azaza.success) {
          console.log('authorization response', azaza); // ответ на авторизацию.
          console.log('authorization', azaza.success); // подтверждение авторизации.
          localStorage.setItem('login azaza', JSON.stringify(authorization.data.login));
          sessionStorage.setItem('session azaza', azaza.result.session);
          this.session = sessionStorage.getItem('session azaza') || '';
          this.password = ''; // сброс пароля после входа.
          this.loginSession(); // передача события в родительский компонент.
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
      data: {"session": sessionStorage.getItem('session azaza') || ''}
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
          sessionStorage.removeItem('session azaza'); // очистка сессии из сторожа, поскольку был разлогин.
        } else {
          alert('Error:' + ' ' + azaza.error?.code);
        }
      });
    } else {
      alert("Ошибка HTTP: " + response.status);
    }
  }
}