import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiuntaGiteComponent } from './aggiunta-gite.component';

describe('AggiuntaGiteComponent', () => {
  let component: AggiuntaGiteComponent;
  let fixture: ComponentFixture<AggiuntaGiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AggiuntaGiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AggiuntaGiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
