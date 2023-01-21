export enum COMMANDS {
    MOUSE_UP       = 'mouse_up',
    MOUSE_DOWN     = 'mouse_down',
    MOUSE_LEFT     = 'mouse_left',
    MOUSE_RIGHT    = 'mouse_right',
    MOUSE_POSITION = 'mouse_position',
    DRAW_RECTANGLE = 'draw_rectangle',
    DRAW_SQUARE    = 'draw_square',
    DRAW_CIRCLE    = 'draw_circle',
    PRNT_SCRN      = 'prnt_scrn',
}

export enum PORTS {
    HTTP       = 8181,
    WEB_SOCKET = 8080,
}

export const SCREENSHOT_SIZE = 200;

export const RESULT_MESSAGE  = 'Result';
export const SUCCESS_MESSAGE = 'completed successfully';
export const FAILURE_MESSAGE = 'command ended with error';
