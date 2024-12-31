import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfiloUsciteComponent } from './profilo-uscite.component';

describe('ProfiloUsciteComponent', () => {
  let component: ProfiloUsciteComponent;
  let fixture: ComponentFixture<ProfiloUsciteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfiloUsciteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfiloUsciteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
