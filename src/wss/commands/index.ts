import { printScreen } from './screen';
import { move, getPosition } from './mouse';
import { drawRectangle, drawCircle } from './draw';

import { COMMANDS, SUCCESS_MESSAGE, UNKNOWN_COMMAND_MESSAGE } from '../../constants';

export const commandHandler = async (command: string, params: string) => {
    switch (command) {
        case COMMANDS.MOUSE_UP:
        case COMMANDS.MOUSE_DOWN:
        case COMMANDS.MOUSE_LEFT:
        case COMMANDS.MOUSE_RIGHT: {
            const [ _, direction ] = command.split('_');
            const offset = parseInt(params, 10);

            await move(direction, offset);

            return `${command} ${SUCCESS_MESSAGE}`;
        }
        case COMMANDS.MOUSE_POSITION: {
            const point = await getPosition();

            return `${command} ${point.x},${point.y}`;
        }
        case COMMANDS.DRAW_RECTANGLE:
        case COMMANDS.DRAW_SQUARE: {
            const [ width, length = width ]: number[] = params.split(' ').map(param => parseInt(param, 10));
            const result = await drawRectangle(width, length);

            return `${command} ${result}`;
        }
        case COMMANDS.DRAW_CIRCLE: {
            const radius = parseInt(params, 10);
            const result = await drawCircle(radius);

            return `${command} ${result}`;
        }
        case COMMANDS.PRNT_SCRN: {
            const buffer = await printScreen();

            return `${command} ${buffer.toString('base64')}`
        }
        default: {
            return `${command} - ${UNKNOWN_COMMAND_MESSAGE}`;
        }
    }
};
