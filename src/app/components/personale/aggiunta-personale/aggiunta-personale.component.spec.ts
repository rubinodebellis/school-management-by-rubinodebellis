import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiuntaPersonaleComponent } from './aggiunta-personale.component';

describe('AggiuntaPersonaleComponent', () => {
  let component: AggiuntaPersonaleComponent;
  let fixture: ComponentFixture<AggiuntaPersonaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AggiuntaPersonaleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AggiuntaPersonaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
