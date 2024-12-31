import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfiloProfessoriComponent } from './profilo-professori.component';

describe('ProfiloProfessoriComponent', () => {
  let component: ProfiloProfessoriComponent;
  let fixture: ComponentFixture<ProfiloProfessoriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfiloProfessoriComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfiloProfessoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
