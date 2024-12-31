import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaOrganigrammaComponent } from './modifica-organigramma.component';

describe('ModificaOrganigrammaComponent', () => {
  let component: ModificaOrganigrammaComponent;
  let fixture: ComponentFixture<ModificaOrganigrammaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificaOrganigrammaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificaOrganigrammaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
