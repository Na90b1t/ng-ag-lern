import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // взято из АПИ
    public readonly requestUrl: string = 'https://testportal2.agentology.ru/api/agentology/';
    public readonly key: string = 'a9fb7d0b-d818-4e24-d499-dda5cb02dc6f';
    public readonly operationAuth: string = 'user.authorization';
    public readonly operationRegister: string = 'register.get';
    public readonly operationContract: string = 'contract.save';

    public readonly session: string; // 
    
    constructor() { 
        this.session = sessionStorage.getItem('session') || '';
    }

    // get sessionAuth() {
    //     return this.session;
    // }

    // set sessionAuth(session: any) {
    //     this.session = session;
    // }
}
