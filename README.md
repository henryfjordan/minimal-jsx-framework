# Minimal JSX Framework

This is a very small project meant to allow you to use JSX with VanillaJS.
All the ESLint, Babel, and Webpack configuration that you will need is included by example.
The most important aspects of the project are in the `jsx-runtime/` folder

## Getting started

Run the following commands to get your project running:
```bash
git clone git@github.com/henryfjordan/minimal-jsx-framework.git <project>
cd <project>

npm --prefix render-in-browser install
npm --prefix server-side-render install
```

Now you can start modifying whatever you like! `src/index.jsx` is the main entrypoint for each of the apps.

## Commands

* `npm --prefix render-in-browser run build` will run webpack to build the `render-in-browser` example
* `npm --prefix render-in-browser run watch` will start the live `webpack-dev-server` and open the `render-in-browser` example in your browser
* `npm --prefix server-side-render run start` will build and run the `server-side-render` example server
