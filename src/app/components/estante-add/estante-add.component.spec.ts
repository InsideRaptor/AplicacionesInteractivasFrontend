import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstanteAddComponent } from './estante-add.component';

describe('EstanteAddComponent', () => {
  let component: EstanteAddComponent;
  let fixture: ComponentFixture<EstanteAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstanteAddComponent]
    });
    fixture = TestBed.createComponent(EstanteAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
