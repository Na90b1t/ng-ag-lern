import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-draft-scroll',
  templateUrl: './draft-scroll.component.html',
  styleUrls: ['./draft-scroll.component.scss']
})
export class DraftScrollComponent implements OnInit {

  options = {
    autoHide: false,
  }

  constructor() { }

  ngOnInit(): void {
  }

}
