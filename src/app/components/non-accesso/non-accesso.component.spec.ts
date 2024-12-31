import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonAccessoComponent } from './non-accesso.component';

describe('NonAccessoComponent', () => {
  let component: NonAccessoComponent;
  let fixture: ComponentFixture<NonAccessoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NonAccessoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonAccessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
