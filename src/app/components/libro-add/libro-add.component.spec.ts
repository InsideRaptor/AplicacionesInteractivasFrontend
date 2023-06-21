import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroAddComponent } from './libro-add.component';

describe('LibroAddComponent', () => {
  let component: LibroAddComponent;
  let fixture: ComponentFixture<LibroAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LibroAddComponent]
    });
    fixture = TestBed.createComponent(LibroAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
