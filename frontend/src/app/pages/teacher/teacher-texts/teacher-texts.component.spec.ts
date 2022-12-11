import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherTextsComponent } from './teacher-texts.component';

describe('TeacherTextsComponent', () => {
  let component: TeacherTextsComponent;
  let fixture: ComponentFixture<TeacherTextsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherTextsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherTextsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
