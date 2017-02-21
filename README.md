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
|  |__ ts
|  |  |__ modules (see below)
|  |  |__ pages (see below)
|  |  |__ shared-components (component shared across pages)
|  |  |__ utils (utility methods/functions/interfaces)
|  |  |__ app.tsx (main redux application)
|  |  |__ entry.ts (entry point for webpack)
|  |  
|  |__ index.ejs
|
|__ dist
|
|__ node_modules

```

## React Components
> React containers and components should have a single default export.
> 
>  why?   
>  A component is a single thing. Since it is a single thing, having a named export seems redundant.
>  Also, any component that needs to have methods tested or stubbed out for testing will already be a class instance.
>  Since it is a class instance, methods on that instance can easily be stubbed out.


## Redux modules
> modules should be contained within directory structure
>
> why?   
> modules contain many parts. In order to keep things organized and easy to fine,
> separating the modules into their respective parts will be helpful.  Each part
> will be re-exported from a single index.ts file which will be imported as the module.

> I hate index files.
>
> why index files?
>
> The reason index files are so annoying is that in your editor, it's difficult to work
> a bunch of open index files.  However, afte these index files are created, it's unlikely
> that you'll ever need to open them again.

> no logic should go into index.ts, it is for re-exporting the exports of the other files only
>
> Why?
> 
> Because otherwise you'd start hating these index files again.

```
modules
|
|__ module1
|   | _actions.ts 
|   | _constants.ts
|   | _interfaces.ts
|   | _reducer.ts
|   | index.ts
|
|__ module2
|   | _actions.ts 
|   | _constants.ts
|   | _interfaces.ts
|   | _reducer.ts
|   | index.ts
```

## Typescript not Babel (definitely not both)
Typescript allows the use of many features we want while allowing us to transpile down to ES5.
There really is no need for both Typescript and Babel

## Interfaces over models (classes)
Models have typically been classes onto themselves, however these classes have no class methods attached to them.
Since they have no class methods attached to the, they don't serve a purpose outside of providing type safety when initializing a new instance.
This can be accomplished the same way with interfaces. (see the interfaces in the citybik module and asyncActions utility)

## ES6 Modules over Typescript modules/namespaces
With Typescript 2 fully supporting ES6 modules, there is no longer any need to use Typescript modules or namespaces.

## Default vs Named Components
- Redux modules should be named exports
  - able to test exports
  - able to stub internal methods when testing exports
  - import using 'import * as Module' to allow stubbing in test files
- Components and Containers should have a single default export.
  - see reasoning above


# Builds

## Tree Shaking and other code minimization techniques
### new webpack.optimize.UglifyJsPlugin() in webpack prod configuration
vendor.js file went from 3.8M to 1.4M, even with using import * from 'package';

## Cache Busting on prod builds
NODE_ENV is used to determine separate webpack configs. 
During production builds, cache hashes are added to the dist files.

# Development 
webpack dev server
because it's super cool and does live component re-rendering which saves a tremendous amount of time.
