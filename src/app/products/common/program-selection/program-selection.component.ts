import { Component, OnInit } from '@angular/core';
import { KEY, REGISTER_GET, REQUEST_URL } from 'src/app/constants/constants';
import { JuridicalServiceService } from 'src/app/service/juridical-service.service';

@Component({
    selector: 'app-program-selection',
    templateUrl: './program-selection.component.html',
    styleUrls: ['./program-selection.component.scss']
})

export class ProgramSelectionComponent implements OnInit {
    // захардкоренные значения
    private readonly objService: Object;
    private readonly objPeriod: Object[];

    programmName: string = 'optimal'; // программа по умолчанию

    contractData: any; // объект для получения данных с сервера

    constructor(private juridicalServiceService: JuridicalServiceService) {
        // захардкоренные значения
        this.objService = this.juridicalServiceService.objService;
        this.objPeriod = this.juridicalServiceService.objPeriod;
    }

    ngOnInit(): void {
        this.programmName = JSON.parse(localStorage.getItem('programmName') || '"optimal"'); // получаем имя выбранной программы из сторожа или по умолчанию
        this.getAvailablePrograms(); // передаем данные на сервер и выводим список программ из ответа + добавляем захардкоренные значения.
    }

    async getAvailablePrograms() {
        let register = {
            key: KEY,
            operation: REGISTER_GET,
            data: {
                register: 'juridicalService',
            },
        };

        const formData: FormData = new FormData(); // использует этот формат данных для передачи их в с соответствии с API.
        formData.append('key', register.key);
        formData.append('operation', register.operation);
        formData.append('data', JSON.stringify(register.data));

        let response = await fetch(REQUEST_URL, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            let responseJson = await response;
            responseJson.json().then(data => {
                // console.log('Ответ системы data:', typeof data, data);
                if (data.success) {
                    console.log('get programm:', data.success);
                    // console.log('this.contractData', this.contractData); // наша переменная для списка программ, в которой пока ничего нет (undifined).
                    this.contractData = data.result; // получаем список программ
                    // console.log('this.contractData = data.result', this.contractData); // теперь есть данные из ответа плюс, уже те, что добавляются после(ниже цикл), из-за того что объект это ссылка.
                    // console.log('this.contractData before update', Object.assign([], this.contractData)); // копируем обьект для логирования, до его изменения.
                    // тут мы каждому элементу (объекту) в массиве, добавляем данные из объектов, чтобы дополнить данные из списка программ, которые должны были по хорошему приходить с сервера.
                    for (let i = 0; i < this.contractData.length; i++) {
                        this.contractData[i] = {
                            ...this.contractData[i],
                            ...this.objService,
                            ...this.objPeriod[i],
                        };
                    }
                    // console.log('update contractData', this.contractData);
                } else {
                    alert('get programm:' + ' ' + data.success);
                }
            });
        } else {
            alert('Ошибка HTTP: ' + response.status);
        }
    }

    // метод нужен только для смены значения выбранной программы, при первом запуске оно возмется из переменой со значением берущимся из сторожа или по умолчанию 
    selectedProgramm(key: string) { // принимаем параметр передаваемый по клику
        this.programmName = key; // заносим название программы, чтобы в шаблоне мы сравнивали значение параметра со значением в элементе массива, тем самым подтверждая совпадение, что и приводит нас к выполнению условия для провешивания класса.
        localStorage.setItem('programmName', JSON.stringify(key)); // сохраняем ключ по которому будем определять выбранную программу 
    }
}
