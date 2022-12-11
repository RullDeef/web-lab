import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTextsComponent } from './admin-texts.component';

describe('AdminTextsComponent', () => {
  let component: AdminTextsComponent;
  let fixture: ComponentFixture<AdminTextsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTextsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTextsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
