import { Component } from '@angular/core';
import { CardStateEvent, OffsetStateEvent } from 'ngx-swing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  cardStateChanged(event: CardStateEvent) {
    console.log('card state changed!', event)
  }

  offsetStateChanged(event: OffsetStateEvent) {
    console.log('offset state changed!', event)
  }
}
