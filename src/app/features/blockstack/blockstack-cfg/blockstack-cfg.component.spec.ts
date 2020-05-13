import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockstackCfgComponent } from './blockstack-cfg.component';

describe('BlockstackCfgComponent', () => {
  let component: BlockstackCfgComponent;
  let fixture: ComponentFixture<BlockstackCfgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockstackCfgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockstackCfgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
