import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfiloClassiComponent } from './profilo-classi.component';

describe('ProfiloClassiComponent', () => {
  let component: ProfiloClassiComponent;
  let fixture: ComponentFixture<ProfiloClassiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfiloClassiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfiloClassiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
