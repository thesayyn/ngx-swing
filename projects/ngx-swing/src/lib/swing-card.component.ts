import {
  Component,
  HostListener,
  HostBinding,
  ElementRef
} from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { animate, style, trigger, state, transition, AnimationEvent, keyframes, group } from '@angular/animations';
import { Direction } from './direction';
import { Offset } from './offset';
import { Dimension } from './dimension';


@Component({
  // tslint:disable-next-line:component-selector
  selector: '[swingCard]',
  template: `<ng-content></ng-content>`,
  animations: [
    trigger('cardState', [
      transition('* => throwOut',
        animate('700ms',
          keyframes([
            style({ transform: 'translate(0px, 0px) rotate(0deg)' }),
            style({ transform: 'translate({{x}}px, {{y}}px) rotate(0deg)' })
          ])
        )
      ),
      transition('* => throwIn',
        animate('400ms ease-in',
          keyframes([
            style({
              transform: 'translate3d(0, 0, 0) translate(0px, 0px) rotate(0deg)',
              offset: 0.6
            }),
            style({
              transform: 'translate3d(-10px, 0, 0)',
              offset: 0.70,
            }),
            style({
              transform: 'translate3d(2px, 0, 0)',
              offset: 0.80,
            }),
            style({
              transform: 'translate3d(-5px, 0, 0)',
              offset: 0.97,
            }),
          ])
        )
      ),
    ])
  ]
})
export class SwingCardComponent {

  @HostBinding('@cardState') get cardState(): any {
    return { value: this._cardState, params: this._animationParams };
  }

  @HostBinding('style.transform')  get transform(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(
      `translate3d(0, 0, 0) translate(${this._offset.x}px, ${this._offset.y}px) rotate(${this._rotation}deg)`
    );
  }

  private _offset: Offset = { x: 0, y: 0 };
  private _rotation = 0;
  private _lastMove: any = {};

  private _cardState: CardState = CardState.free;
  private _animationParams: any = {};


  constructor(private elementRef: ElementRef<HTMLElement>, private sanitizer: DomSanitizer) {}

  @HostListener('tap')
  test() {
    this._cardState = CardState.throwOut;
    this._animationParams = { x: 5000, y: 5000 };
  }

  @HostListener('panstart')
  panstart(): void {
    this._cardState = CardState.free;
  }

  @HostListener('panmove', ['$event'])
  panmove(event): void {

    const lastX = this._lastMove.deltaX || 0, lastY = this._lastMove.deltaY || 0;

    this._offset = { x: event.deltaX + lastX, y: event.deltaY + lastY };
    this._rotation = this.getRotation(this._offset);


    this._lastMove = event;
  }

  @HostListener('panend', ['$event'])
  panend(event): void {
    const lastX = this._lastMove.deltaX || 0, lastY = this._lastMove.deltaY || 0;
    const offset = { x: event.deltaX + lastX, y: event.deltaY + lastY };
    const isThrowOut = this.getThrowOutConfidence(offset) === 1;
    const direction  = this.getDirection(offset);

    if ( isThrowOut ) {
      this._cardState = CardState.throwOut;
      this._animationParams = offset;
    } else {
      this._cardState = CardState.throwIn;
    }

    console.log(event, this.getThrowOutConfidence(offset));
  }

  @HostListener('@cardState.done', ['$event'])
  stateAnimationDone(event: AnimationEvent): void {
    if ( event.toState === CardState.throwIn ) {
      this._cardState = CardState.free;
      this._offset = { x: 0, y: 0 };
      this._rotation = 0;
    }
  }

  throwIn(): void {

  }

  throwOut(): void {

  }

  getRotation(offset: Offset): number {
    const dimension = this.getDimensions();
    const horizontalOffset = Math.min(Math.max(offset.x / dimension.width, -1), 1);
    const verticalOffset = (offset.y > 0 ? 1 : -1) * Math.min( Math.abs(offset.y) / 100, 1);
    return  horizontalOffset * verticalOffset * 20;
  }

  getDirection(offset: Offset): Direction {
    const horizontalDirection = offset.x < 0 ? Direction.Left : Direction.Right;
    const verticalDirection = offset.y < 0 ? Direction.Up : Direction.Down;
    return Math.abs(offset.x) > Math.abs(offset.y) ? horizontalDirection : verticalDirection;
  }

  getDimensions(): Dimension {
    return { height: this.elementRef.nativeElement.offsetHeight, width: this.elementRef.nativeElement.offsetWidth };
  }

  getThrowOutConfidence(offset: Offset): number {
    const dimension = this.getDimensions();
    const horizontalConfidence = Math.min(
      Math.abs(offset.x) / dimension.width,
      1
    );
    const verticalConfidence = Math.min(
      Math.abs(offset.y) / dimension.height,
      1
    );
    return Math.max(horizontalConfidence, verticalConfidence);
  }
}


export enum CardState {
  throwIn = 'throwIn',
  throwOut = 'throwOut',
  free = 'free'
}
