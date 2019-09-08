import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TorsoComponent } from './torso.component';

describe('TorsoComponent', () => {
  let component: TorsoComponent;
  let fixture: ComponentFixture<TorsoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TorsoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TorsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
