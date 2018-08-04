import { calculateDirection, Direction, zeroOffsetError } from "./direction";

describe('direction', ()=> {

    it('should return Direction.Left', ()=> {
        expect(calculateDirection({ x: -5, y: 2 })).toBe(Direction.Left)
    })

    it('should return Direction.Right', ()=> {
        expect(calculateDirection({ x: 5, y: 2 })).toBe(Direction.Right)
    })

    it('should return Direction.Up', ()=> {
        expect(calculateDirection({ x: 2, y: -5 })).toBe(Direction.Up)
    })

    it('should return Direction.Down', ()=> {
        expect(calculateDirection({ x: 2, y: 5 })).toBe(Direction.Down)
    })

    it('should throw zero offset error', ()=> {
        expect(() => calculateDirection({ x: 0, y: 0 })).toThrow(zeroOffsetError());
    })
})