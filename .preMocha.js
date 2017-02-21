require('ts-node').register();
require('jsdom-global')();

global.window.DOMParser = window.DOMParser;
global.window.matchMedia = window.matchMedia || function() {
    return {
        matches : false,
        addListener : function() {},
        removeListener: function() {}
    };
};
