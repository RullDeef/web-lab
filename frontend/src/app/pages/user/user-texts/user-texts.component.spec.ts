import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTextsComponent } from './user-texts.component';

describe('UserTextsComponent', () => {
  let component: UserTextsComponent;
  let fixture: ComponentFixture<UserTextsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTextsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTextsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
