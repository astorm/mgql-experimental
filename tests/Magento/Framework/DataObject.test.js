const {expect} = require('chai');
var should = require("should");
var DataObject = require('../../../lib/Magento/Framework/DataObject');


describe('Checking features on Magento\Framework\DataObject', function(){
    it("should allow users to instantiate via factory for proxy effects", function(){
        var object = DataObject.factory();
        expect(object).to.be.an('Object');
    });

    it("should allow users to exersize magic get/set functions", function(){
        var object = DataObject.factory();
        var valueToTest1 = "foo's value"
        var valueToTest2 = "bar's value"

        object.setFoo(valueToTest1);
        object.setBar(valueToTest2);
        object.getFoo().should.be.equal(valueToTest1);
        object.getBar().should.be.equal(valueToTest2);
        object.getFoo().should.be.equal(valueToTest1);
    });
});

