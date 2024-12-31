import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiteComponent } from './gite.component';

describe('GiteComponent', () => {
  let component: GiteComponent;
  let fixture: ComponentFixture<GiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
