import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnknownComponentComponent } from './unknown-component.component';

describe('UnknownComponentComponent', () => {
  let component: UnknownComponentComponent;
  let fixture: ComponentFixture<UnknownComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnknownComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnknownComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
