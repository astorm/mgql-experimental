const {expect} = require('chai');
var should = require("should");
var Page = require('../../../../lib/Magento/Cms/Model/Page');


describe('Checking features on Magento\Framework\Page', function(){
    it("should allow users to load a model", function(){
        var page = Page.factory();
        expect(page).to.be.an('Object');

        var data = page.load(1);
        expect(data).to.be.an('Object');
    });

    it("should allow us to pass null as id to load", function(){
        var page = Page.factory();

        var data = page.load(null);
        expect(data).to.be.an('Object');
    });
});


