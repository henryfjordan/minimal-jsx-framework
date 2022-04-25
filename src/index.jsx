'use strict';

import { render } from 'jsx-runtime/jsx-runtime'
import DocumentSSR from './dom.js'

import Hapi from '@hapi/hapi';


globalThis.document = new DocumentSSR()



const CountingButton = () => {
    let state = { count: 0 };

    let incr = (elem) => {
        state.count += 1;
        elem.innerText = state.count;
    }

    let Button = () => {
        let button = (
            <button onClick={() => incr(button)}>
                {state.count}
            </button>
        );

        return button
    }

    return <Button />
}

const Title = (props) => <div>
    <h1 id="foo">{props.title}</h1>
    <p>{props.subtitle}</p>
    <CountingButton />
</div>;



const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            // TODO: static render here!
            return render(<Title title={"TITLE"} subtitle={"subtitle"} />).toString()
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
