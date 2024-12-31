import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentazioneComponent } from './presentazione.component';

describe('PresentazioneComponent', () => {
  let component: PresentazioneComponent;
  let fixture: ComponentFixture<PresentazioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresentazioneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresentazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
