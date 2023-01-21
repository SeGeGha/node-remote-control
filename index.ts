import { startHttpServer } from './src/httpServer';
import { startWebSocketServer } from './src/wss';

import { PORTS } from './src/constants';

startHttpServer(PORTS.HTTP);
startWebSocketServer(PORTS.WEB_SOCKET);
