import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  getData(): Array<any> {
    return [
      { lastName: 'lastName1', firstName: 'firstName1' },
      { lastName: 'lastName2', firstName: 'firstName2' },
      { lastName: 'lastName3', firstName: 'firstName3' },
    ]
  }

  constructor() { }
}
