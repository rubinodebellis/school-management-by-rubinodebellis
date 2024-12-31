import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfiloGiteComponent } from './profilo-gite.component';

describe('ProfiloGiteComponent', () => {
  let component: ProfiloGiteComponent;
  let fixture: ComponentFixture<ProfiloGiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfiloGiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfiloGiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
