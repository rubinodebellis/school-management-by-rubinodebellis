import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiuntaSpeseComponent } from './aggiunta-spese.component';

describe('AggiuntaSpeseComponent', () => {
  let component: AggiuntaSpeseComponent;
  let fixture: ComponentFixture<AggiuntaSpeseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AggiuntaSpeseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AggiuntaSpeseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
