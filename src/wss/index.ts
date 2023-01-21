import { WebSocketServer } from 'ws';

import { commandHandler } from './commands';

import { FAILURE_MESSAGE, RESULT_MESSAGE } from "../constants";

export const startWebSocketServer = (port: number) => {
    const wss = new WebSocketServer({ port });

    wss.on('listening', () => {
        console.log(`WebSocket server `)
    });

    wss.on('connection', (ws, req) => {
        console.log(`WebSocket`)

        ws.on('message', async (data) => {
            const [ command, ...params ] = data.toString().split(' ');
            console.log(`Received ${command} command from client with '${params}' params`);

            try {
                const result = await commandHandler(command, params.join(' '));
                console.log(`${RESULT_MESSAGE}: ${result}`);

                ws.send(result);
            } catch(error) {
                console.log(`${command} ${FAILURE_MESSAGE}: ${error.message}`);
            }
        });
    });


    wss.on('close', () => {
        console.log('close')
    });

    wss.on('error', () => {
        console.log('error')
    });
};
