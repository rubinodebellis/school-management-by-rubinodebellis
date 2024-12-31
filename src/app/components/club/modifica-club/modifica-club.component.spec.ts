import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaClubComponent } from './modifica-club.component';

describe('ModificaClubComponent', () => {
  let component: ModificaClubComponent;
  let fixture: ComponentFixture<ModificaClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificaClubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificaClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
