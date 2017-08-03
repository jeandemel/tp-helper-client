import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TpManagerComponent } from './tp-manager.component';

describe('TpManagerComponent', () => {
  let component: TpManagerComponent;
  let fixture: ComponentFixture<TpManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TpManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
