import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiuntaStudentiComponent } from './aggiunta-studenti.component';

describe('AggiuntaStudentiComponent', () => {
  let component: AggiuntaStudentiComponent;
  let fixture: ComponentFixture<AggiuntaStudentiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AggiuntaStudentiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AggiuntaStudentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
