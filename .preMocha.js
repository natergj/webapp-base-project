require('ts-node').register({
  compilerOptions: {
    jsx: "react",
    target: "es5",
    module: "commonjs"
  },
});
require('jsdom-global')();

global.window.DOMParser = window.DOMParser;
global.window.matchMedia = window.matchMedia || function() {
  return {
    matches : false,
    addListener : function() {},
    removeListener: function() {}
  };
};
