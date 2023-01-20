import { startHttpServer } from './src/httpServer/index';
import { startWebSocketServer } from './src/wss/index';

import { PORTS } from './src/constants';

startHttpServer(PORTS.HTTP);
startWebSocketServer(PORTS.WEB_SOCKET);
