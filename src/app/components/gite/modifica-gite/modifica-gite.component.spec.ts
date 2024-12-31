import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaGiteComponent } from './modifica-gite.component';

describe('ModificaGiteComponent', () => {
  let component: ModificaGiteComponent;
  let fixture: ComponentFixture<ModificaGiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificaGiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificaGiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
