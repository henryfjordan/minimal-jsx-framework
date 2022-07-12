# Minimal JSX Framework

This is a very small project meant to allow you to use JSX with VanillaJS.
All the ESLint, Babel, and Webpack configuration that you will need is included. 

TODO: this is all old


## Getting started

Run the following commands to get your project running:
```bash
git clone git@github.com/henryfjordan/minimal-jsx-framework.git <project>
cd <project>

npm install

npm run watch
```

Now you can start modifying whatever you like! `src/index.jsx` is the main entrypoint for the app.

__Important Note: You must import `createElement` at the start of each JSX file! See index.jsx for an example__

## Commands

* `npm run watch` will start `webpack-dev-server` and open the project in your browser
* `npm run build` will build your project in production mode

