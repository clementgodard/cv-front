import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargementComponent } from './chargement.component';

describe('ChargementComponent', () => {
  let component: ChargementComponent;
  let fixture: ComponentFixture<ChargementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
