import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiuntaClassiComponent } from './aggiunta-classi.component';

describe('AggiuntaClassiComponent', () => {
  let component: AggiuntaClassiComponent;
  let fixture: ComponentFixture<AggiuntaClassiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AggiuntaClassiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AggiuntaClassiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
