var should = require("should");
var StdClass = require('../lib/stdClass');


describe("Checking features on stdClass", function(){
    it("should allow users to instantiate it and set data", function(){
        var object = new StdClass;
        object.foo = "bar";
        object.foo.should.be.equal("bar");
    });
});
