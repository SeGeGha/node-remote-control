import { WebSocketServer, createWebSocketStream } from 'ws';

import { commandHandler } from './commands';

import { FAILURE_MESSAGE, RESULT_MESSAGE, APP_ERROR_MESSAGE } from '../constants';

export const startWebSocketServer = (port: number) => {
    console.log(`Start webSocket server on the ${port} port!`);

    const wss = new WebSocketServer({ port });

    wss.on('connection', (ws, req) => {
        const ip = req.socket.remoteAddress;

        console.log(`Connected new user with ${ip} ip. Total clients count: ${wss.clients.size}`);

        const duplex = createWebSocketStream(ws, {
            decodeStrings: false,
            encoding: 'utf8',
        });

        duplex.on('data', async (data: string) => {
            const [ command, ...params ] = data.toString().split(' ');
            console.log(`Received ${command} command from client with '${params}' params`);

            try {
                const result = await commandHandler(command, params.join(' '));
                console.log(`${RESULT_MESSAGE}: ${result}`);

                duplex.write(result);
            } catch(error) {
                console.log(`${command} ${FAILURE_MESSAGE}: ${error.message}`);
            }
        });

        duplex.on('error', error => console.log(`${APP_ERROR_MESSAGE}: ${error.message}`));

        ws.on('close', () => {
            console.log(`Client ${ip} disconnected. Total clients count: ${wss.clients.size}`);

            duplex.destroy();
        });

    });

    wss.on('error', error => console.log(`${APP_ERROR_MESSAGE}: ${error.message}`));

    process.on('SIGINT', () => {
        console.log('Close webSocket server with all clients connection');

        wss.clients.forEach(client => client.close());

        wss.close(() => process.exit());
    });
};

