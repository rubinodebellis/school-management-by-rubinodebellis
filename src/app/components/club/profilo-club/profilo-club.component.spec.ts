import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfiloClubComponent } from './profilo-club.component';

describe('ProfiloClubComponent', () => {
  let component: ProfiloClubComponent;
  let fixture: ComponentFixture<ProfiloClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfiloClubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfiloClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
