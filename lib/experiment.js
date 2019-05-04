// @todo: default argumetn values php vs. javascript
// @todo: scoping for variables defined in blocks

const _underscoreCache = [];

var preg_replace = function(pattern, replacement, subject, limit, count) {
    // @TODO: need to parse incoming regular expression for actual flags, strip
    // containing characters, etc.
    const regEx = new RegExp(pattern, 'g')

    return subject.replace(regEx, replacement)
}

var _underscore = function(name) {
    if (_underscoreCache[name]) {
        return _underscoreCache[name];
    }
    result = strtolower(trim(preg_replace('([A-Z]|[0-9]+)', "_$1", name), '_'));
    _underscoreCache[name] = result;
    return result;
}

var substr = function (string, start, end) {
    return string.substr(start, end)
}

var strtolower = function(string) {
    return string.toLowerCase()
}

var trim = function(string, mask) {
    //@TODO: https://stackoverflow.com/questions/26156292/trim-specific-character-from-a-string
    while(string.charAt(0)==mask) {
        string = string.substring(1);
    }

    while(string.charAt(string.length-1)==mask) {
        string = string.substring(0,string.length-1);
    }

    return string;
}

var strpos = function(haystack, needle, offset) {
    //@todo: offset?
    return haystack.indexOf(needle)
}

var _data = [];

var getDataByPath = function() {
throw "implement me"
}

var _getData = function(key) {
    if (_data[key]) {
        return _data[key]
    }
    return null
}

var getData = function(key, index) {
    var data = []
    if ('' === key) {
        return _data;
    }

    /* process a/b/c key as ['a']['b']['c'] */
    if (strpos(key, '/') !== -1) {
        data = getDataByPath(key)
    } else {
        data = _getData(key);
    }
    //@TODO: handle index case
    // if ($index !== null) {
    //     if ($data === (array)$data) {
    //         $data = isset($data[$index]) ? $data[$index] : null;
    //     } elseif (is_string($data)) {
    //         $data = explode(PHP_EOL, $data);
    //         $data = isset($data[$index]) ? $data[$index] : null;
    //     } elseif ($data instanceof \Magento\Framework\DataObject) {
    //         $data = $data->getData($index);
    //     } else {
    //         $data = null;
    //     }
    // }
    return data;
}


var setData = function(key, value) {
    // if ($key === (array)$key) {
    // @TODO: handle array case
    if(false) {
        //$this->_data = $key;
    } else {
        _data[key] = value
    }
    // @TODO: returning this
    // return $this;
}

obj  = new Proxy({},
        { get : function(target, prop) {
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
                throw "wtf mate?"
            };
        }
        });

obj.setScience("Science!")
console.log(obj.getScience())
console.log(_data)

// obj.l = function() {console.log(45);};
// obj.l();       ///45



// --------------------------------------------------

// const util = require('util')
//
// var StdClass = function() {
//     this.test = "hello world"
// }
//
// var Varien_Object = function() {
//     StdClass.call(this);
//
//     new Proxy(this, { get : function(target, prop) {
//             console.log("wtf")
//         }});
// }
//
// util.inherits(Varien_Object,StdClass)
//
// var foo = new Proxy((new Varien_Object),
//         { get : function(target, prop) {
//             console.log("where is my prop")
//         }})
//
// foo.test;
//
// module.exports = StdClass
