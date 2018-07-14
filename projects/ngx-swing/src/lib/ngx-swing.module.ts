import { NgModule } from '@angular/core';
import { SwingStackDirective } from './swing-stack.directive';
import { SwingCardComponent } from './swing-card.component';

@NgModule({
  declarations: [
    SwingStackDirective,
    SwingCardComponent
  ],
  exports: [
    SwingStackDirective,
    SwingCardComponent
  ]
})
export class NgxSwingModule { }
