import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaClassiComponent } from './modifica-classi.component';

describe('ModificaClassiComponent', () => {
  let component: ModificaClassiComponent;
  let fixture: ComponentFixture<ModificaClassiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificaClassiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificaClassiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
