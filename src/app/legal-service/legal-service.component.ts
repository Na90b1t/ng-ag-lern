import { Input, Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-legal-service',
  templateUrl: './legal-service.component.html',
  styleUrls: ['./legal-service.component.scss']
})
export class LegalServiceComponent implements OnInit {
  key = 'a9fb7d0b-d818-4e24-d499-dda5cb02dc6f'; // ключ API
  documentCode = ''; // guid сохраненного документа,
  documentNumber = ''; // Номер договора

  private requestUrl = 'https://testportal2.agentology.ru/api/agentology/'; // адрес сервера для взаимодествия с помощью API

  contractData = {}; // объект с массивом доступных программ

  objRequest = { // Структура объекта request
    content:{  
      contractData:{  
          product:{                // объект выбранной программы, полученный в числе прочих в запросе доступных программ по продукту 'Юридический сервис' 
             code: 'optimal',       // код программы
             name: 'Оптимальный',   // название программы
             premium: 3000,         // стоимость программы
          }
      },
      // Данные страхователя привязаны, но чтобы не вводить их руками оставляю заполенными
      policyHolder: {  
          lastName: 'Иванов',
          firstName: 'Иван',
          middleName: 'Иванович',
          phone: '89003334455',
          email: 'w@mail.ru',
          city: 'NY',
      }
    }
  }

  policyHolder = this.objRequest.content.policyHolder; // сокращаю часть пути для компактности записи

  @Input() session: any;

  constructor() { }

  ngOnInit(): void { }

  async getAvailablePrograms() {
    let register = {
      key: this.key,
      operation: 'register.get',
      data: {
        register: 'juridicalService',
      },
    };

    const formData: FormData = new FormData(); // использует этот формат данных для передачи их в с соответствии с API.
    formData.append('key', register.key);
    formData.append('operation', register.operation);
    formData.append('data', JSON.stringify(register.data));

    let response = await fetch(this.requestUrl, {
      method: 'POST',
      body: formData
    });
    console.log('response', response);

    if (response.ok) {
      let json = await response;
      json.json().then(azaza => {
        console.log('Ответ системы:', azaza);
        if(azaza.success) {
          console.log('azaza.success', azaza.success);
          this.contractData = azaza.result;
        } else {
          console.log('azaza.success:' + ' ' + azaza.success);
        }
      });
    } else {
      console.log('Ошибка HTTP: ' + response.status);
    }
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

    console.log('save', save);

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
          console.log('Success save', azaza);
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
