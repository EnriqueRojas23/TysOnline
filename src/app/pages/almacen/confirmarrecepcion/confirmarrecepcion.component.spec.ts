import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarrecepcionComponent } from './confirmarrecepcion.component';

describe('ConfirmarrecepcionComponent', () => {
  let component: ConfirmarrecepcionComponent;
  let fixture: ComponentFixture<ConfirmarrecepcionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmarrecepcionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarrecepcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
