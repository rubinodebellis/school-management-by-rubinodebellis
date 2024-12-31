import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiuntaClubComponent } from './aggiunta-club.component';

describe('AggiuntaClubComponent', () => {
  let component: AggiuntaClubComponent;
  let fixture: ComponentFixture<AggiuntaClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AggiuntaClubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AggiuntaClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
