import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTextsComponent } from './student-texts.component';

describe('StudentTextsComponent', () => {
  let component: StudentTextsComponent;
  let fixture: ComponentFixture<StudentTextsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentTextsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentTextsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
