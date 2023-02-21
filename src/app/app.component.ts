import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [AuthService]
})
export class AppComponent {
    public session: string | null;

    constructor(private authService: AuthService) {
        this.session = this.authService.session;
    }

    ngOnInit(): void {
        this.getSession();
    }

    getSession() {
        this.session = sessionStorage.getItem('session');
    }
}
