import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DraftService {

    public session: string;

    getData(): Array<any> {
        return [
            { lastName: 'lastName1', firstName: 'firstName1' },
            { lastName: 'lastName2', firstName: 'firstName2' },
            { lastName: 'lastName3', firstName: 'firstName3' },
        ]
    }

    constructor() {
        this.session = sessionStorage.getItem('session-service') || '';
    }

    get sessionUser() {
        return this.session;
    }

    set sessionUser(session: any) {
        this.session = session;
        // sessionStorage.setItem('session-service', this.session);
    }

/*  checkSession() {
        this.session = sessionStorage.getItem('session');
    }
*/
}
