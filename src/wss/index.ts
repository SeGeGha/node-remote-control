import { WebSocketServer } from 'ws';

import { commandHandler } from './commandHandler';

import { PORTS } from '../constants';

export const startWebSocketServer = (port: number) => {
    const wss = new WebSocketServer({ port: PORTS.WEB_SOCKET });

    wss.on('listening', () => {
        console.log(`WebSocket server `)
    });

    wss.on('connection', (ws, req) => {
        console.log(`WebSocket`)

        ws.on('message', async (data) => {
            const [ command, ...params ] = data.toString().split(' ');
            console.log(`Received command from client: command - ${command}, params - ${params}`);

            try {
                const result = await commandHandler(command, params.join(' '));
                console.log(result)

                if (result) ws.send(result);
            } catch(error) {
                console.log(error.message);
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
