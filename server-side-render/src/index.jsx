'use strict';

import { DocumentSSR, render } from './dom.js'
import Title from './components/Title.js';
import CountingButton from './components/CountingButton/CountingButton.js';
import Hapi from '@hapi/hapi';

globalThis.document = new DocumentSSR()

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return render(
                <html>
                <body>
                    <Title title={"Demo 2"} subtitle={"subtitle"} />
                    <CountingButton />
                </body>
                </html>
            ).toString()
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
