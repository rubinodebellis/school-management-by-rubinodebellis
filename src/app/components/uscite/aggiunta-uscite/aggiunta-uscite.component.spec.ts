import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiuntaUsciteComponent } from './aggiunta-uscite.component';

describe('AggiuntaUsciteComponent', () => {
  let component: AggiuntaUsciteComponent;
  let fixture: ComponentFixture<AggiuntaUsciteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AggiuntaUsciteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AggiuntaUsciteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
