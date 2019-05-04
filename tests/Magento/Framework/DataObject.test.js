const {expect} = require('chai');
var should = require("should");
var DataObject = require('../../../lib/Magento/Framework/DataObject');


describe('Checking features on Magento\Framework\DataObject', function(){
    it("should allow users to instantiate via factory for proxy effects", function(){
        var object = DataObject.factory();
        expect(object).to.be.an('Object');
    });

    it("should allow users to exersize magic get/set functions", function(){
        var object = new DataObject;
        var valueToTest = "foo's value"
        object.setFoo(valueToTest);
        object.getFoo().should.be.equal(valueToTest);
    });
});

