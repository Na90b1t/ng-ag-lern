import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  session: any = '';

  constructor() { }

  ngOnInit(): void { }

  checkSession() {
    this.session = sessionStorage.getItem('session azaza');
  }
}
