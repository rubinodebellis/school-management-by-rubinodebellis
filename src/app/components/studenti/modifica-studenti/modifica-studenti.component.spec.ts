import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaStudentiComponent } from './modifica-studenti.component';

describe('ModificaStudentiComponent', () => {
  let component: ModificaStudentiComponent;
  let fixture: ComponentFixture<ModificaStudentiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificaStudentiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificaStudentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
