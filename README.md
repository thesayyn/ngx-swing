# ngx-swing 🍺

[![npm version](https://badge.fury.io/js/ngx-swing.svg)](https://badge.fury.io/js/ngx-swing) [![npm](https://img.shields.io/npm/dw/ngx-swing.svg)](https://www.npmjs.com/package/ngx-swing)


Angular 6+ compatible swing components 

Demo: <a href="http://ngx-swing.firebaseapp.com" target="new">Click to see<a/>

## Installation

1. Import the module

```javascript
import { NgxSwingModule } from 'ngx-swing';
```

2. Add the module to your NgModule

```javascript
@NgModule({
	...
    imports: [
    	....
        NgxSwingModule
        ....
    ]
})
```

3. Enjoy with components

```html
<div swingStack>
	<div swingCard>Card1</div>
    <div swingCard>Card2</div>
    <div swingCard>Card3</div>
    <div swingCard>Card4</div>
</div>
```

### Road Map

1. Implementing the card events (move, free, throwOut, throwIn)
2. Ability to remove the cards from <b>DOM</b> after throwOut <b>(this is for avoiding from possibly memory leak)</b>
3. Ability to throwOut cards without user interaction.

### ⚡ This project is under active development.