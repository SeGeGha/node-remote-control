import path from 'path';
import { createReadStream } from 'fs';
import { createServer } from 'http';
import { pipeline } from 'stream/promises';

export const httpServer = createServer(async (req, res) => {
    try {
        const __dirname = path.resolve(path.dirname(''));
        const file_path = __dirname + (req.url === '/' ? '/front/index.html' : '/front' + req.url);

        const readStream = createReadStream(file_path);
        res.writeHead(200, {
            'Content-Type': 'text/html',
        });

        await pipeline(readStream, res);
    } catch (error) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(error));
    }
});
