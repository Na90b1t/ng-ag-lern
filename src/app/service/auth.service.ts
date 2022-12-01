import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    // взято из АПИ
    public readonly operationAuth: string = 'user.authorization';
    public readonly operationLOGOUT: string = 'user.logout';

    public readonly session: string; // для сессии, передается через этот сервис в компоненты

    constructor() { 
        this.session = sessionStorage.getItem('session') || ''; // получаем сессию
    }
}
