import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [DataService]
})
export class AppComponent {
    session: any = '';

    constructor() { }

    ngOnInit(): void {
        this.checkSession();
    }

    checkSession() {
        this.session = sessionStorage.getItem('session');
    }
}
