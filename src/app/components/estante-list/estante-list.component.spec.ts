import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstanteListComponent } from './estante-list.component';

describe('EstanteListComponent', () => {
  let component: EstanteListComponent;
  let fixture: ComponentFixture<EstanteListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstanteListComponent]
    });
    fixture = TestBed.createComponent(EstanteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
