import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-draft-object',
  templateUrl: './draft-object.component.html',
  styleUrls: ['./draft-object.component.scss']
})
export class DraftObjectComponent implements OnInit {

    user: any = {
        name: 'user',
        age: 'user',
    }

    abuser = this.user;

    clone: any = {};

    heapEmpty: any = {
        // пустой объект
    };

    heapFull: any = {
        girls: 'heapFull',
        money: 'heapFull',
    };

    constructor() { }

    ngOnInit(): void {
        console.log('this.user {}', this.user);
        
        console.log('this.abuser', this.abuser);
        
        this.cloneObject();

        this.abuser.name = 'abuser';
        console.log('this.abuser', this.abuser);
        console.log('this.user {}', this.user);

        this.abuser.game = 'abuser';
        console.log('this.abuser', this.abuser);
        
        console.log('this.heapEmpty', this.heapEmpty);
        console.log('this.heapEmpty', this.heapEmpty, this.isEmpty(this.heapEmpty));
        Object.assign(this.heapEmpty, this.user, this.abuser);
        Object.assign(this.heapFull, this.user, this.abuser);
        console.log('this.heapFull', this.heapFull);
    }

    isEmpty(obj: any) {
        for (let key in obj) {
            // если тело цикла начнет выполняться - значит в объекте есть свойства
            return false;
        }
        return true;
    }

    cloneObject() {
        for (let key in this.user) {
            this.clone[key] = this.user[key]
            
            // if (Object.prototype.hasOwnProperty.call(this.user, key)) {
            //     this.clone[key] = this.user[key];
            // }
        }

        console.log('this.clone', this.clone);
    }
}
