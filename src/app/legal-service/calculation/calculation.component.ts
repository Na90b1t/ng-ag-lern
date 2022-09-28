import { Component, Input, OnInit } from '@angular/core';
// import { NgxMaskModule, IConfig } from 'ngx-mask';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.scss']
})
export class CalculationComponent implements OnInit {

  private requestUrl = 'https://testportal2.agentology.ru/api/agentology/'; // адрес сервера для взаимодествия с помощью API
  key = 'a9fb7d0b-d818-4e24-d499-dda5cb02dc6f'; // ключ API
  documentCode = ''; // guid сохраненного документа,
  documentNumber = ''; // Номер договора
  programmSelected: boolean | undefined;

  emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  objRequest = { // Структура объекта request
    content:{ 
      // Данные программы не привязаны, пока не сделал их заполение из ответа.
      contractData:{  
          product:  {
            code: 'optimal',
            name: 'Оптимальный',
            premium: 3000,
          }
      },
      // Данные страхователя привязаны, но чтобы не вводить их руками оставляю заполенными
      policyHolder: {  
          lastName: '',
          firstName: 'Иван',
          middleName: 'Иванович',
          dob: '',
          phone: '89003334455',
          email: 'w@mail.ru',
          city: 'NY',
      }
    }
  }

  public customPatterns = { 'S': { pattern: new RegExp('\[a-zA-Z\]')} };

  maskOptions = {
    mask: '+{7}(000)000-00-00'
  };

  policyHolder = this.objRequest.content.policyHolder;

  @Input() session: any;

  constructor() { }

  ngOnInit(): void {
  }

  dateChange($event: { target: { value: any; }; }) {
    console.log('dateChange($event)', $event.target.value);
  }

  async saveContract() {
    let save = {
      key: this.key,
      operation: 'contract.save',
      data: {
        session: sessionStorage.getItem('session azaza') || '',
        product: 'juridicalService',
        // documentCode: 'guid документа, если требуется пересохранение, иначе не передавать данный параметр',
        request: this.objRequest,
      }
    }

    console.log('save', save); // данные + введенные пользователем т отправляемые на сервер

    const formData: FormData = new FormData(); // использует этот формат данных для передачи их в с соответствии с API.
    formData.append('key', save.key);
    formData.append('operation', save.operation);
    formData.append('data', JSON.stringify(save.data));

    let response = await fetch(this.requestUrl, {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      let json = await response;
      json.json().then(azaza => {
        if(azaza.success) {
          console.log('Success save', azaza.success);
          console.log('azaza', azaza);
          this.documentCode = azaza.documentCode;
        } else {
          alert('Error save:' + ' ' + azaza.error?.code);
          console.log('Error save', azaza);
        }
      });
    } else {
      alert('Ошибка HTTP: ' + response.status);
    }
  }

  async openContract() {
    let open = {
      key: this.key,
      operation: 'contract.open',
      data: {
        session: sessionStorage.getItem('session azaza') || '',
        code: this.documentCode,
      }
    }

    console.log('open', open);

    const formData: FormData = new FormData();
    formData.append('key', open.key);
    formData.append('operation', open.operation);
    formData.append('data', JSON.stringify(open.data));

    let response = await fetch(this.requestUrl, {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      let json = await response;
      json.json().then(azaza => {
        if(azaza.success) {
          console.log('Success open', azaza.success);
          console.log('Success open', azaza);
        } else {
          alert('Error open:' + ' ' + azaza.error?.code);
          console.log('Error open', azaza);
        }
      });
    } else {
      alert('Ошибка HTTP: ' + response.status);
    }
  }
}
