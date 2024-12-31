import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaPersonaleComponent } from './modifica-personale.component';

describe('ModificaPersonaleComponent', () => {
  let component: ModificaPersonaleComponent;
  let fixture: ComponentFixture<ModificaPersonaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificaPersonaleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificaPersonaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
