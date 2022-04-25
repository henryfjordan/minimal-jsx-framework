export const escapeHtml = (unsafe) => {
  if (unsafe && typeof unsafe === "string")
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  return unsafe;
};

export class HTMLElementSSR {
  constructor(tag) {
    this.tagName = tag;

    const selfClosing = [
      "area",
      "base",
      "br",
      "col",
      "embed",
      "hr",
      "img",
      "input",
      "link",
      "meta",
      "param",
      "source",
      "track",
      "wbr",
    ];

    if (selfClosing.indexOf(tag) >= 0) {
      this._ssr = `<${tag} />`;
      this.isSelfClosing = true;
    } else {
      this._ssr = `<${tag}></${tag}>`;
    }
  }

  toString() {
    return this._ssr;
  }

  setAttribute(name, value) {
    if (this.isSelfClosing)
      this._ssr = this._ssr.replace(
        /(^<[a-z0-9]+ )(.+)/gm,
        `$1${escapeHtml(name)}="${escapeHtml(value)}" $2`
      );
    else
      this._ssr = this._ssr.replace(
        /(^<[^>]+)(.+)/gm,
        `$1 ${escapeHtml(name)}="${escapeHtml(value)}"$2`
      );
  }

  append(child) {
    const index = this._ssr.lastIndexOf("</");
    this._ssr =
      this._ssr.substring(0, index) + child + this._ssr.substring(index);
  }

  get children() {
    const reg = /<([a-z0-9]+)((?!<\/\1).)*<\/\1>/gms;
    const array = [];
    let match;

    while ((match = reg.exec(this.innerHTML)) !== null) {
      array.push(match[0].replace(/[\s]+/gm, " "));
    }

    return array;
  }

  addEventListener(_type, _listener, _options) {
    console.log("event listener", _type, _listener, _options);

    if (this.isSelfClosing)
      this._ssr = this._ssr.replace(
        /(^<[a-z0-9]+ )(.+)/gm,
        `$1on${_type}="${_listener}" $2`
      );
    else
      this._ssr = this._ssr.replace(
        /(^<[^>]+)(.+)/gm,
        `$1 on${_type}="${_listener}"$2`
      );
  }
}

export default class DocumentSSR {
  createElement(tag) {
    return new HTMLElementSSR(tag);
  }
}
