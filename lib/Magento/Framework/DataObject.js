// @TODO: run through functions and "hand compile" from real DataObject
const util = require ('util')
const StdClass = require ('../../stdClass')

const preg_replace = require('../../php-functions/preg_replace')
const substr = require('../../php-functions/substr')
const strtolower = require('../../php-functions/strToLower')
const trim = require('../../php-functions/trim')
const strpos = require('../../php-functions/strpos')

// constructor function, inherits setup
var DataObject = function() {
    this._data = [];
    StdClass()
}
util.inherits(DataObject, StdClass)

// special constructor function so we can proxy things
DataObject.factory = function() {
    var ret = new Proxy((new DataObject),proxyConfig);
    return ret;
}

// static variables and methods
DataObject._underscoreCache = [];

// object methods
DataObject.prototype._underscore = function(name) {
    if (DataObject._underscoreCache[name]) {
        return DataObject._underscoreCache[name];
    }
    result = strtolower(trim(preg_replace('([A-Z]|[0-9]+)', "_$1", name), '_'));
    DataObject._underscoreCache[name] = result;
    return result;
}

DataObject.prototype.getData = function(key, index) {
    var data = []
    if ('' === key) {
        return this._data;
    }

    /* process a/b/c key as ['a']['b']['c'] */
    if (strpos(key, '/') !== -1) {
        data = getDataByPath(key)
    } else {
        data = this._getData(key);
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
DataObject.prototype.setData = function(key, value) {
    // if ($key === (array)$key) {
    // @TODO: handle array case
    if(false) {
        //$this->_data = $key;
    } else {
        this._data[key] = value
    }
    // @TODO: returning this
    // return $this;
}

DataObject.prototype._getData = function(key) {
    if (this._data[key]) {
        return this._data[key]
    }
    return null
}

var getDataByPath = function() {
    throw "implement me"
}


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
                    var key = this._underscore(substr(prop,3))
                    var index = arguments[0] ? arguments[0] : null
                    return this.getData(key, index)
                    // $key = $this->_underscore(substr($method, 3));
                    // $index = isset($args[0]) ? $args[0] : null;
                    // return $this->getData($key, $index);
                case 'set':
                    var key = this._underscore(substr(prop, 3));
                    var value = arguments[0] ? arguments[0] : null
                    return this.setData(key, value);
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


module.exports = DataObject
