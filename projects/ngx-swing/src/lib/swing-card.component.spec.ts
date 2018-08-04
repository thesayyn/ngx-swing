import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


import { SwingCardComponent, CardState } from './swing-card.component';
import { NgxSwingModule } from './ngx-swing.module';
import { Offset } from './offset';

describe('SwingCardComponent', () => {
  let component: SwingCardComponent;
  let fixture: ComponentFixture<SwingCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        NoopAnimationsModule,
        NgxSwingModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be CardState.free', () => {
    expect(component.cardState).toBe(CardState.free);
  });

  it('should throw out Card', () => {
    const offset: Offset = { x: 1, y: -1 };
    const spy = spyOn(component, 'throwOut');
    component.throwOut(offset);
    expect(spy).toHaveBeenCalled();
  });
});
