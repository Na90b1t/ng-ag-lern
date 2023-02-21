import { Component, OnInit } from '@angular/core';
import { DraftService } from 'src/app/draft.service';

@Component({
  selector: 'app-draft-user',
  templateUrl: './draft-user.component.html',
  styleUrls: ['./draft-user.component.scss'],
})
export class DraftUserComponent implements OnInit {

  public draftUsersService: Array<any>;

  constructor(private draftService: DraftService) {
    this.draftUsersService = this.draftService.getData();
  }

  ngOnInit(): void {
  }

}
