import { WebSocketServer } from 'ws';

import { commandHandler } from './commands';

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
                console.log(`Result: ${result}`);

                if (result) ws.send(result);
            } catch(error) {
                console.log(`Command ended with an error: ${error.message}`);
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
