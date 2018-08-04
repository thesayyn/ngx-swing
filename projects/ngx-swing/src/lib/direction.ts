import { Offset } from "./offset";

export enum Direction{
  Left = 'Left',
  Right = 'Right',
  Up = 'Up',
  Down = 'Down'
}

export function calculateDirection(offset: Offset): Direction {
  if( offset.y === 0 || offset.x === 0 ) {
    throw zeroOffsetError();
  }
  const horizontalDirection = offset.x < 0 ? Direction.Left : Direction.Right;
  const verticalDirection = offset.y < 0 ? Direction.Up : Direction.Down;
  return Math.abs(offset.x) > Math.abs(offset.y) ? horizontalDirection : verticalDirection;
}

export function zeroOffsetError(): Error {
  return new Error( `Offset.x and Offset.y must be lower or greater than zero.` );
}