# Minimal JSX Framework

This is a very small project meant to allow you to use JSX with VanillaJS.
All the ESLint, Babel, and Webpack configuration that you will need is included. 

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

## Project Structure

```
.
├── .babelrc
├── .eslintrc.yml
├── .gitignore
├── LICENSE
├── README.md
├── package.json
├── src
│   ├── assets
│   │   ├── index.html
│   │   ├── normalize.css
│   │   └── skeleton.css
│   ├── components
│   │   ├── CountingButton
│   │   │   ├── CountingButton.jsx
│   │   │   └── style.css
│   │   └── Title.jsx
│   ├── index.jsx
│   └── jsx-runtime.js
└── webpack.config.js
```


---

## TODO

* Figure out how to have webpack auto-include the import statement in each JSX file (https://babeljs.io/docs/en/babel-preset-react#react-automatic-runtime)
* Add nginx / docker support for super easy deploys
* We are exporting gzipped files, have nginx support those
* Figure out a scheme for static site generation




