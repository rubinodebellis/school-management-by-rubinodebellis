import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsciteComponent } from './uscite.component';

describe('UsciteComponent', () => {
  let component: UsciteComponent;
  let fixture: ComponentFixture<UsciteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsciteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsciteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
