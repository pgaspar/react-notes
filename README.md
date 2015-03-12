# Note Taking App with React

## Try it out

In order to make it super-easy for you to test the app, I'm including the compiled files in `build/`.

This way, you can just open `index.html` on your browser and play.

## Development Setup

Clone this repo and do:

```shell
npm install
npm run watch
# Go to http://localhost:8080/
```

This will install our dependencies and run a small live reload capable server.

That should get you up and running.

### Development Dependencies

Here's a quick rundown of what I'm using for development:

#### [Babel](https://babeljs.io/)

Babel compiles ES6 code to ES5. ES6 is the next Javascript version, whilst ES5 is the one widely supported today.

#### [Browserify](http://browserify.org/)

Browserify allows us to `require('modules')` in Javascript. Although ES6 will do this out of the box, Babel doesn't assume any module-manager by default, so I had to choose one.

Browserify has the added benefit of using the same syntax/behavior as Node.js's `require()`.

#### [Babelify](https://github.com/babel/babelify)

This is a Browserify-compatible transform that lets us run Babel while Browserify is doing its thing.

What ends up happening is something like this:

* Browserify looks into `src/nvalt.jsx` and triggers Babel to decode the ES6 to ES5, so it can make sense of it.
* It then follows the requires and finds every necessary file, decoding it along the way.

With this, we can now compile the source into `build/nvalt.js`, with something along these lines:

```
$(npm bin)/browserify src/nvalt.jsx -t babelify -o build/nvalt.js
```

#### [Watchify](https://github.com/substack/watchify)

Watchify allows us to run the Browserify/Babelify compilation above automatically, every time we save our code files.

So everytime we change a file, the compilation command runs and updates `build/nvalt.js`.

We could manually start Watchify like this:

```
$(npm bin)/watchify src/nvalt.jsx -t babelify -o build/nvalt.js
```

#### [live-server](https://github.com/tapio/live-server)

This package includes a small HTTP server with live reload capability. It watches for changes in the code base and reloads the page in our browser, making development even easier.

We could run live-server manually, but I created a convenience script that merges the Watchify command above with live-server. This script is named `watch` and is defined in `package.json`.

You can execute it like this:

```
npm run watch
```

This should open a window in your browser pointing at `http://localhost:8080/`. If it doesn't, please go there yourself.

Change any source files and your browser should promplty reflect your changes by itself :sunglasses:.
