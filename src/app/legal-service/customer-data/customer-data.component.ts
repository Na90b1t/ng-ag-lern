import { Input, Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-customer-data',
    templateUrl: './customer-data.component.html',
    styleUrls: ['./customer-data.component.scss']
})
export class CustomerDataComponent implements OnInit {
    key = 'a9fb7d0b-d818-4e24-d499-dda5cb02dc6f'; // ключ API

    private requestUrl = 'https://testportal2.agentology.ru/api/agentology/'; // адрес сервера для взаимодествия с помощью API

    contractData: any; // объект с массивом доступных программ

    programmName = 'optimal'; // программа по умолчанию

    programmSelected: object = {};

    // захардкоренные значения
    objService = {
        service1: 'Устная правовая консультация',
        service2: 'Доверь переговоры юристу',
        service3: 'Звонок юриста от имени клиента',
        service4: 'Подача документов в соответствующие инстанции',
    }

    // захардкоренные значения
    objPeriod = [
        {
            period1: '6 раз в год',
            period2: '2 раза в год',
            period3: '1 раз в год',
            period4: '-',
        },
        {
            period1: 'Безлимитно',
            period2: '4 раз в год',
            period3: 'Безлимитно',
            period4: '4 раз в год',
        }
    ]

    // maskOptions = {
    //   mask: '+{7}(000)000-00-00'
    // };

    @Input() session: any;
        @Output() outputProgrammSelected: EventEmitter<any> = new EventEmitter(); // создали событие для получения данных в родительском компоненте

    constructor() { }

    ngOnInit(): void {
        this.programmName = JSON.parse(localStorage.getItem('programmName') || '"optimal"'); // получаем выбранную программу из сторожа или по умолчанию
            // this.programmName = JSON.parse(localStorage.getItem('programmSelected') || '"optimal"'); // получаем выбранную программу из сторожа или по умолчанию
        this.getAvailablePrograms(); // передаем данные на сервер и выводим список программ из ответа + добавляем захардкоренные значения.
    }

    selectedProgramm(key: string) { // принимаем параметр передаваемый по клику
            this.outputProgrammSelected.emit(); // вызываем событие для выбора программы в родительском компоненте
        this.programmName = key; // сравниваем значение параметра со значением в элементе массива, тем самым подтверждая совпадение, что и приводит нас к выполнению условия для провешивания класса.
        localStorage.setItem('programmName', JSON.stringify(key)); // сохраняем ключ по которому будем определять выбранную программу 
    }

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
            let responseJson = await response;
            responseJson.json().then(azaza => {
                console.log('Ответ системы azaza:', azaza);
                if (azaza.success) {
                    console.log('azaza.success', azaza.success);
                    console.log('this.contractData', this.contractData); // наша переменная для списка программ, в которой пока ничего нет (undifined).
                    this.contractData = azaza.result; // получаем список программ
                    console.log('this.contractData = azaza.result', this.contractData); // теперь есть данные из ответа плюс, уже те, что добавляются после(ниже цикл), из-за того что объект это ссылка.
                    console.log('this.contractData', Object.assign([], this.contractData)); // копируем обьект для логирования, до его изменения.

                    for (let i = 0; i < this.contractData.length; i++) {
                        this.contractData[i] = {
                            ...this.contractData[i],
                            ...this.objService,
                            ...this.objPeriod[i],
                        };
                    }

                    console.log('update contractData', this.contractData);

                    this.programmSelected = this.contractData;

                    console.log('this.programmSelected', this.programmSelected);

                        localStorage.setItem('programmSelected', JSON.stringify(this.programmSelected)); // сохраяем все данные программы в сторож, чтобы потом СРАЗУ использовать в друггом компоненте без лишних действий.

                } else {
                    console.log('azaza.success:' + ' ' + azaza.success);
                }
            });
        } else {
            console.log('Ошибка HTTP: ' + response.status);
        }
    }
}
