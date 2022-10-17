import { Component, Input } from '@angular/core';
import { DataService } from './data.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [DataService]
})
export class AppComponent {
    session: any = '';
    @Input() programmSelected: any;

    constructor() { }

    ngOnInit(): void {
        this.checkSession();

        this.getProgramm();
    }

    checkSession() {
        this.session = sessionStorage.getItem('session');
    }

    getProgramm() {
        this.programmSelected = JSON.parse(localStorage.getItem('programmSelected') || "''");
        console.log('programmSelected in app (parent) comp', this.programmSelected, typeof this.programmSelected);
    }
}
