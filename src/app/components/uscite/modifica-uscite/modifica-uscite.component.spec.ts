import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaUsciteComponent } from './modifica-uscite.component';

describe('ModificaUsciteComponent', () => {
  let component: ModificaUsciteComponent;
  let fixture: ComponentFixture<ModificaUsciteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificaUsciteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificaUsciteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
