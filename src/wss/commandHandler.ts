import { Button, down, left, mouse, Point, right, straightTo, up } from '@nut-tree/nut-js';

import { COMMANDS } from '../constants';

export const commandHandler = async (command: string, params: string) => {
    switch (command) {
        case COMMANDS.MOUSE_UP:
        case COMMANDS.MOUSE_DOWN:
        case COMMANDS.MOUSE_LEFT:
        case COMMANDS.MOUSE_RIGHT: {
            const directionHandlers = { up, down, left, right };
            const [ _, direction ] = command.split('_');
            const offset = parseInt(params, 10);

            await mouse.move(directionHandlers[direction](offset));

            return;
        }
        case COMMANDS.MOUSE_POSITION: {
            const point = await mouse.getPosition();

            return `${command} ${point.x},${point.y}`;
        }
        case COMMANDS.DRAW_RECTANGLE:
        case COMMANDS.DRAW_SQUARE: {
            const [ width, length = width ]: number[] = params.split(' ').map(param => parseInt(param, 10));
            const moveOrders = [
                () => right(width),
                () => down(length),
                () => left(width),
                () => up(length),
            ];

            for (let i = 0; i < moveOrders.length; i++) {
                const moveTo = moveOrders[i];

                await mouse.drag(moveTo());
            }

            return;
        }
        case COMMANDS.DRAW_CIRCLE: {
            const radius = parseInt(params, 10);
            const currentPosition = await mouse.getPosition();
            const circleCenter = new Point(currentPosition.x + radius, currentPosition.y);

            await mouse.pressButton(Button.LEFT);

            for (let i = 0; i <= 2 * Math.PI; i += 0.05) {
                const x = circleCenter.x - radius * Math.cos(i);
                const y = circleCenter.y - radius * Math.sin(i);

                await mouse.move(straightTo(new Point(x, y)));
            }

            await mouse.releaseButton(Button.LEFT);

            break;
        }
        case COMMANDS.PRNT_SCRN: {
            break;
        }
        default: {
            break;
        }
    }
};
