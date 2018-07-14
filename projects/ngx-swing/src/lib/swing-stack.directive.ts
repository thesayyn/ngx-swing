import { Directive, ContentChildren, QueryList, AfterViewInit } from '@angular/core';
import { SwingCardComponent } from './swing-card.component';


@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[swingStack]'
})
export class SwingStackDirective implements AfterViewInit {

  @ContentChildren(SwingCardComponent) readonly cards = new QueryList<SwingCardComponent>();

  constructor() { }

  ngAfterViewInit(): void {
    console.log(this.cards);
  }

}
