import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ligne',
  templateUrl: './ligne.component.html',
  styleUrls: ['./ligne.component.scss']
})
export class LigneComponent implements OnInit {

  @Input()
  public ligne: any;
  // faStar = faStar;
  // faStarEmpty = faStarEmpty;

  constructor() { }

  ngOnInit(): void { }

}
