import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaSpeseComponent } from './modifica-spese.component';

describe('ModificaSpeseComponent', () => {
  let component: ModificaSpeseComponent;
  let fixture: ComponentFixture<ModificaSpeseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificaSpeseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificaSpeseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
