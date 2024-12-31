import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaProfessoriComponent } from './modifica-professori.component';

describe('ModificaProfessoriComponent', () => {
  let component: ModificaProfessoriComponent;
  let fixture: ComponentFixture<ModificaProfessoriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificaProfessoriComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificaProfessoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
