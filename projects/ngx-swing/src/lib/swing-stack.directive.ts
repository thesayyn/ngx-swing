import { AfterViewInit, ContentChildren, Directive, ElementRef, EventEmitter, Output, QueryList } from '@angular/core';
import { Dimension } from './dimension';
import { CardStateEvent, OffsetStateEvent, SwingCardComponent } from './swing-card.component';
import { takeUntil } from 'rxjs/operators'

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'swing-stack,[swingStack]'
})
export class SwingStackDirective implements AfterViewInit {

  @ContentChildren(SwingCardComponent)
  public readonly cards = new QueryList<SwingCardComponent>();

  @Output() 
  public readonly cardStateChange: EventEmitter<CardStateEvent> = new EventEmitter<CardStateEvent>();

  @Output() 
  public readonly offsetStateChange: EventEmitter<OffsetStateEvent> = new EventEmitter<OffsetStateEvent>();


  private dispose: EventEmitter<void> = new EventEmitter<void>();

  constructor(private elementRef: ElementRef<HTMLElement>) { 
    
  }

  ngAfterViewInit(): void {
    this.cards.changes.subscribe(() => {
      this.dispose.emit();
      this.subscribeCardEvents();
    })
    this.cards.notifyOnChanges();
  }

  subscribeCardEvents(): void {
    this.cards.forEach( card => {
      card.offsetStateChange
      .pipe(
        takeUntil( this.dispose )
      )
      .subscribe( event => {
        this.offsetStateChange.emit({...event, card })
      })

      card.cardStateChange
      .pipe(
        takeUntil( this.dispose )
      )
      .subscribe( event => {
        this.cardStateChange.emit({...event, card })
      })
    })
  }

  getDimensions(): Dimension {
    return { height: this.elementRef.nativeElement.offsetHeight, width: this.elementRef.nativeElement.offsetWidth };
  }

}