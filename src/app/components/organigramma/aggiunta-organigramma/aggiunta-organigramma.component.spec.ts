import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiuntaOrganigrammaComponent } from './aggiunta-organigramma.component';

describe('AggiuntaOrganigrammaComponent', () => {
  let component: AggiuntaOrganigrammaComponent;
  let fixture: ComponentFixture<AggiuntaOrganigrammaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AggiuntaOrganigrammaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AggiuntaOrganigrammaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
