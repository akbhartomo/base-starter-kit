# Starter Kit v2.0

Web Starter Kit is a gulp compiler for web development. Tools for building a great experience across many devices and performance oriented. Helping you to stay productive following the best practices outlined in Codigo's Web Fundamentals. A solid starting point for both professionals and newcomers to the industry.

## Instructions

##### First Step - Environment Setup

- Install [Node.js](http://nodejs.org/) (4.0.0 or later) or [Yarn](https://yarnpkg.com/en/docs/getting-started) (1.5.0 or later)
- Install [npm](https://www.npmjs.com/) for npm

```sh
$ npm install -g npm
```

- Install [bower](https://bower.io/)

```sh
$ npm install -g bower
```

- Install [gulp](http://gulpjs.com/)

```sh
$ npm install -g gulp-cli
```

##### After Environment Setup

Once you finished setting up the environments, you can [download](http://gitlab.codigo.id/fed/web-starter-kit.git) or clone this repo by requesting for a member. And after you got all the starter kit sources, you can run this -sh to get all the compiler access:

1.  Npm:
```sh
$ npm install
```

2.  Bower:
```sh
$ bower install
```

3.  Run:
And then you can start the compiler with `$ gulp start` command in your project dependency. It will run in `http://localhost:9000`

4.  Build:
```sh
$ gulp build
```

## Structure Lists

The development environment you code:

```
base-starter-kit/
  src/
    fonts/
    images/
    scripts/
      main.js
    styles/
      base/
      components/
      themes/
      utilities/
      vendor/
      main.scss
    favicons.ico
    index.html
  test/
    spec/
      test.js
    index.html
```

## How to Use

When you want to use library like Parallax, Carousel, etc install it using `$ bower install [library name who want install]` then import it in HTML or the page just need it.

For the trigger script, you can edit in `main.js` and bootstraping the trigger script in:

`init: function(){ Here your trigger code. Callback them use this."your function name" }`

Support ES6 (EcmaScript 2015)

## License

MIT License
Copyright (C) 2018 User Experience & Design Codigo, http://ux.codigo.id/
