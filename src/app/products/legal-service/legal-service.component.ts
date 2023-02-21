import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-legal-service',
    templateUrl: './legal-service.component.html',
    styleUrls: ['./legal-service.component.scss']
})

export class LegalServiceComponent implements OnInit {

    @Input() session: any;

    constructor() {}

    ngOnInit(): void {}
}
