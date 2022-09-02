import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
    this.login = JSON.parse(localStorage.getItem('login azaza') || '');
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

    const formData: FormData = new FormData();
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
          console.log('authorization', azaza.success);
          localStorage.setItem('login azaza', JSON.stringify(authorization.data.login));
          sessionStorage.setItem('session azaza', azaza.result.session);
          this.session = sessionStorage.getItem('session azaza') || '';
          this.password = '';
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

    const formData: FormData = new FormData();
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
          console.log('logout', azaza.success);
          this.session = '';
            console.log('this.session', typeof this.session, this.session);
          sessionStorage.removeItem('session azaza');
            console.log('this.session', typeof sessionStorage.getItem('session azaza') || '', sessionStorage.getItem('session azaza') || '');
        } else {
          alert('Error:' + ' ' + azaza.error?.code);
        }
      });
    } else {
      alert("Ошибка HTTP: " + response.status);
    }
  }
}