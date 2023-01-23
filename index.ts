import { startHttpServer } from './src/httpServer';
import { startWebSocketServer } from './src/wss';

import { PORTS } from './src/constants';

const httpServer = startHttpServer(PORTS.HTTP);
const wss = startWebSocketServer(PORTS.WEB_SOCKET);

process.on('SIGINT', () => {
    console.log('Close http server and webSocket server with all clients connection');

    wss.clients.forEach(client => client.close());

    wss.close();
    httpServer.close();

    process.exit();
});
