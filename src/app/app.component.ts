import { Component, Input } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [AuthService]
})
export class AppComponent {
    public session: string | null;
    @Input() programmSelected: any;

    constructor(private authService: AuthService) {
        this.session = this.authService.session;
    }

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
