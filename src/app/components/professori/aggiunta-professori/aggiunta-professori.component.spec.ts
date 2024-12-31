import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiuntaProfessoriComponent } from './aggiunta-professori.component';

describe('AggiuntaProfessoriComponent', () => {
  let component: AggiuntaProfessoriComponent;
  let fixture: ComponentFixture<AggiuntaProfessoriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AggiuntaProfessoriComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AggiuntaProfessoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
