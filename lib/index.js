'use strict';

import { render } from 'jsx-runtime/jsx-runtime';
import DocumentSSR from './dom.js';
import Hapi from '@hapi/hapi';
import { jsx as _jsx } from "jsx-runtime/jsx-runtime";
import { jsxs as _jsxs } from "jsx-runtime/jsx-runtime";
globalThis.document = new DocumentSSR();

const CountingButton = () => {
  let state = {
    count: 0
  };

  let incr = elem => {
    state.count += 1;
    elem.innerText = state.count;
  };

  let Button = () => {
    let button = _jsx("button", {
      onClick: () => incr(button),
      children: state.count
    });

    return button;
  };

  return _jsx(Button, {});
};

const Title = props => _jsxs("div", {
  children: [_jsx("h1", {
    id: "foo",
    children: props.title
  }), _jsx("p", {
    children: props.subtitle
  }), _jsx(CountingButton, {})]
});

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  });
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return render(_jsx(Title, {
        title: "TITLE",
        subtitle: "subtitle"
      })).toString();
    }
  });
  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});
init();