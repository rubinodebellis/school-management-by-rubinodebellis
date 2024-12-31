import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfiloOrganigrammaComponent } from './profilo-organigramma.component';

describe('ProfiloOrganigrammaComponent', () => {
  let component: ProfiloOrganigrammaComponent;
  let fixture: ComponentFixture<ProfiloOrganigrammaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfiloOrganigrammaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfiloOrganigrammaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
