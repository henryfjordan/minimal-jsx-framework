'use strict';

import { render } from './jsx-runtime.js';
import Hapi from '@hapi/hapi';
import { jsx as _jsx } from "./jsx-runtime.js";
import { jsxs as _jsxs } from "./jsx-runtime.js";
export const escapeHtml = unsafe => {
  if (unsafe && typeof unsafe === 'string') return unsafe.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
  return unsafe;
};
export class HTMLElementSSR {
  constructor(tag) {
    this.tagName = tag;
    const selfClosing = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
    this.nodeType = 1;

    if (selfClosing.indexOf(tag) >= 0) {
      this._ssr = `<${tag} />`;
      this.isSelfClosing = true;
    } else {
      this._ssr = `<${tag}></${tag}>`;
    }
  }

  get outerHTML() {
    return this.toString();
  }

  get innerHTML() {
    return this.innerText;
  }

  set innerHTML(text) {
    this.innerText = text;
  }

  get innerText() {
    const reg = /(^<[^>]+>)(.+)?(<\/[a-z0-9]+>$|\/>$)/gm;
    return reg.exec(this._ssr)?.[2] || '';
  }

  set innerText(text) {
    const reg = /(^<[^>]+>)(.+)?(<\/[a-z0-9]+>$|\/>$)/gm;
    this._ssr = this._ssr.replace(reg, `$1${text}$3`);
  }

  getAttribute(_name) {
    return null;
  }

  get classList() {
    const element = this._ssr;
    const classesRegex = /^<\w+.+(\sclass=")([^"]+)"/gm;
    return {
      add: name => {
        this.setAttribute('class', name);
      },
      entries: {
        get length() {
          const classes = classesRegex.exec(element);
          if (classes && classes[2]) return classes[2].split(' ').length;
          return 0;
        }

      }
    };
  }

  toString() {
    return this._ssr;
  }

  setAttributeNS(_namespace, name, value) {
    this.setAttribute(name, value);
  }

  setAttribute(name, value) {
    if (this.isSelfClosing) this._ssr = this._ssr.replace(/(^<[a-z0-9]+ )(.+)/gm, `$1${escapeHtml(name)}="${escapeHtml(value)}" $2`);else this._ssr = this._ssr.replace(/(^<[^>]+)(.+)/gm, `$1 ${escapeHtml(name)}="${escapeHtml(value)}"$2`);
  }

  append(child) {
    this.appendChild(child);
  }

  appendChild(child) {
    const index = this._ssr.lastIndexOf('</');

    this._ssr = this._ssr.substring(0, index) + child + this._ssr.substring(index);
  }

  get children() {
    const reg = /<([a-z0-9]+)((?!<\/\1).)*<\/\1>/gms;
    const array = [];
    let match;

    while ((match = reg.exec(this.innerHTML)) !== null) {
      array.push(match[0].replace(/[\s]+/gm, ' '));
    }

    return array;
  }

  addEventListener(_type, _listener, _options) {}

}

class DocumentSSR {
  createElement(tag) {
    return new HTMLElementSSR(tag);
  }

}

globalThis.document = new DocumentSSR();

const Title = props => _jsxs("div", {
  children: [_jsx("h1", {
    id: "foo",
    children: props.title
  }), _jsx("p", {
    children: props.subtitle
  })]
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
      return render(() => _jsx(Title, {
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