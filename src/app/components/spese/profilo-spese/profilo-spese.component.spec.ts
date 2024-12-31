import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfiloSpeseComponent } from './profilo-spese.component';

describe('ProfiloSpeseComponent', () => {
  let component: ProfiloSpeseComponent;
  let fixture: ComponentFixture<ProfiloSpeseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfiloSpeseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfiloSpeseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
