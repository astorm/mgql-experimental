const util = require ('util')
const StdClass = require ('../../stdClass')

var DataObject = function() {
}
util.inherits(DataObject, StdClass)

var proxyConfig = {
    get : function(target, prop) {

        if(target[prop] !== undefined) {
            return target[prop]
        }

        return function()  {
            const action = substr(prop, 0,3)
            const args = arguments;

            // console.log(action)
            // console.log(arguments)
            switch (action) {
                case 'get':
                    var key = _underscore(substr(prop,3))
                    var index = arguments[0] ? arguments[0] : null
                    return getData(key, index)
                    // $key = $this->_underscore(substr($method, 3));
                    // $index = isset($args[0]) ? $args[0] : null;
                    // return $this->getData($key, $index);
                case 'set':
                    var key = _underscore(substr(prop, 3));
                    var value = arguments[0] ? arguments[0] : null
                    return setData(key, value);
                case 'uns':
                    // $key = $this->_underscore(substr($method, 3));
                    // return $this->unsetData($key);
                case 'has':
                    // $key = $this->_underscore(substr($method, 3));
                    // return isset($this->_data[$key]);
            }
            throw "Unknown prop or method"
        };
    }
}

DataObject.factory = function() {
    var ret = new Proxy((new DataObject),proxyConfig);
    return ret;
}

module.exports = DataObject
