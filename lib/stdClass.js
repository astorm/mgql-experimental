const util = require('util')

var StdClass = function() {

}

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

module.exports = StdClass
