import { Injectable } from '@angular/core';
import { CONTRACT_SAVE, KEY, REQUEST_URL } from '../constants/constants';

@Injectable({
	providedIn: 'root'
	})
	export class SalesAccountingService {

	public readonly contractSave: string = 'contract.save';

	constructor() { }

}
