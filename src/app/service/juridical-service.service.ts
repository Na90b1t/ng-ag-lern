import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class JuridicalServiceService {

    // захардкоренные значения
    public readonly objService: Object = {
            service1: 'Устная правовая консультация',
            service2: 'Доверь переговоры юристу',
            service3: 'Звонок юриста от имени клиента',
            service4: 'Подача документов в соответствующие инстанции',
        }

    // захардкоренные значения
    public readonly objPeriod: Object[] = [ // ? почему массив с объектами может иметь тип object или any, а не Array ?
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

    constructor() { }
}
