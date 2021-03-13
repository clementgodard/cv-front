import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LigneFormComponent } from './ligne-form.component';

describe('LigneFormComponent', () => {
  let component: LigneFormComponent;
  let fixture: ComponentFixture<LigneFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LigneFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LigneFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
