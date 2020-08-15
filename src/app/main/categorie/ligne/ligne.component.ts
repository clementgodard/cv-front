import { Component, OnInit, Input } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-ligne',
  templateUrl: './ligne.component.html',
  styleUrls: ['./ligne.component.scss']
})
export class LigneComponent implements OnInit {

  @Input()
  public ligne: any;
  faStar = faStar;
  faStarEmpty = faStarEmpty;

  constructor() { }

  ngOnInit(): void {
    // console.log(this.ligne);
  }

}
