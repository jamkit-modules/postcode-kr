var module = (function() {
    const webjs = require("webjs-helper");

    var _id = "", _dir_path = "", _handlers = [];
    var _web_loaded = false;

    function _on_web_loaded(data) {
        if (data["url"].startsWith("http://localhost")) {
            webjs.import(_dir_path + "/postcode.js");
            
            _handlers.forEach(function(handler) {
                handler();
            });

            _web_loaded = true, _handlers = [];  
        }
    }

    return {
        initialize: function(id) {
            var web_prefix = id.replace(".", "_");
            var dir_path = this.__ENV__["dir-path"];

            global[web_prefix + "__on_web_loaded"] = function(data) {
                _on_web_loaded(data);
            }

            webjs.initialize(id + ".web", "__$_bridge");
            view.object(id).action("load", { 
                "filename": dir_path + "/web.sbml",
                "dir-path": dir_path,
                "web-id": id, 
                "web-prefix": web_prefix
            });

            _id = id, _dir_path = dir_path;

            return this;
        },

        search_postcode: function() {
            return new Promise(function(resolve, reject) {
                var handler = function() {
                    webjs.call("searchPostcode")
                        .then(function(result) {
                            resolve(result);
                        })
                        .catch(function(error) {
                            reject(error);
                        });
                }

                _web_loaded ? handler() : _handlers.push(handler);
            });
        },
    }
})();

__MODULE__ = module;
