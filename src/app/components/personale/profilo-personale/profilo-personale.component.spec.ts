import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfiloPersonaleComponent } from './profilo-personale.component';

describe('ProfiloPersonaleComponent', () => {
  let component: ProfiloPersonaleComponent;
  let fixture: ComponentFixture<ProfiloPersonaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfiloPersonaleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfiloPersonaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
