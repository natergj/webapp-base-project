# WORK IN PROGRESS

## Project structure
Project structure is set up to promote organization by function rather than type.
i.e. files are not organized by what they are, but rather by what part of the app they are associated with.
```
project
|
|__ src
|  |
|  |__ assets
|  |  |__ fonts
|  |  |__ images
|  |
|  |__ scss
|  |  |__ mixins
|  |  |__ variables
|  |  |__ index.scss
|  |
|  |__ modules (see below)
|  |__ routes (see below)
|  |__ shared-components (component shared across pages)
|  |__ utils (utility methods/functions/interfaces)
|  |__ app.tsx (main redux application)
|  |__ entry.ts (entry point for webpack)
|  |__ index.ejs
|
|__ dist
|
|__ node_modules

```

## Redux

### Middleware over Thunks
With thunks, you're able to do pretty much anything you want. While this flexibility does make it
easier to get your code working we have to remember that it takes much more time to read code than
it does to write it. You may need to go back and troubleshoot or even expand on your workflow and
eventually that flexibility that thunks gave you will become more of a headache. Rather, we keep
to a strict adherance to the purely functional redux flow and use redux middleware to perform
asynchronous actions such as API calls.

### API post processing in the redux reducers
Our middleware is designed to do nothing more than to access an API resource and pass on the error
or response as the payload to a redux action. We then handle any API data post processing in the
reducer before setting the response to state. 

## Typescript and Babel
If Typescript is so great, why do we need Babel?

That's a good question. While Typescript has many great features it does not have feature parity
with Babel. Babel is much more than a simple transpiler that allows you to write code with language
features not yet available in all browsers. Babel has a large community of developers writing plugins
and this project uses one such plugin that allows us to do something similar to webpack tree shaking
with ES5 node modules. That plugin is the babel-plugin-import module which we use to keep our
distribution files small by only using the parts of libraries that we need. For us, this means that
we can use Ant Design without including the Ant Design components that we don't use in our
distributed files. This plugin also works well for node modules such as lodash or custom modules
that you might write for a shared component library.

## Interfaces over models (classes)
Models have typically been classes onto themselves, however these classes have no class methods
attached to them. Since they have no methods attached to them, the classes don't serve a purpose
outside of providing type safety when initializing a new instance of a model.
This can be accomplished the same way with interfaces. (see the interfaces in the citybik module and
asyncActions utility)

## ES6 Modules over Typescript modules/namespaces
With Typescript 2 fully supporting ES6 modules, there is no longer any need to use Typescript
modules or namespaces.

# Builds

## Tree Shaking and other code minimization techniques
### new webpack.optimize.UglifyJsPlugin() in webpack prod configuration
vendor.js file went from 3.8M to 1.4M by including this plugin with beautify set to false and 
removing comments and IE8 support.

### babel-plugin-import
further reduces vendor.js by only included parts of node modules that were includes. This does not
support all node module package, but just on Ant Design the vendor.js file when down another 900K
to 506K.

## Cache Busting on prod builds
NODE_ENV is used to determine separate webpack configs. 
During production builds, cache hashes are added to the dist files.

# Development 
webpack dev server
because it's super cool and does live component re-rendering which saves a tremendous amount of time.
