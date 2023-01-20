import { down, left, mouse, right, up } from '@nut-tree/nut-js';

const directionHandlers = { up, down, left, right };

export const move = (direction: string, offset: number) => mouse.move(directionHandlers[direction](offset));

export const getPosition = () => mouse.getPosition();
