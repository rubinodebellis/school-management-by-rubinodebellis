import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfiloStudentiComponent } from './profilo-studenti.component';

describe('ProfiloStudentiComponent', () => {
  let component: ProfiloStudentiComponent;
  let fixture: ComponentFixture<ProfiloStudentiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfiloStudentiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfiloStudentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
