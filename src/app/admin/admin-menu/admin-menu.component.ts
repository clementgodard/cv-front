import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

  public logout(e: Event): void {
    localStorage.removeItem('credentials');
  }

}
