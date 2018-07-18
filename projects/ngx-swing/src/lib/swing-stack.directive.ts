import { Directive, ContentChildren, QueryList, AfterViewInit, ElementRef } from '@angular/core';
import { SwingCardComponent } from './swing-card.component';
import { Dimension } from './dimension';


@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'swing-stack,[swingStack]'
})
export class SwingStackDirective implements AfterViewInit {

  @ContentChildren(SwingCardComponent) readonly cards = new QueryList<SwingCardComponent>();

  constructor(private elementRef: ElementRef<HTMLElement>) { }

  ngAfterViewInit(): void {
    console.log(this.cards);
  }

  getDimensions(): Dimension {
    return { height: this.elementRef.nativeElement.offsetHeight, width: this.elementRef.nativeElement.offsetWidth };
  }

}
