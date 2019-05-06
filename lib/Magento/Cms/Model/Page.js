const util = require('util')
const StdClass = require('../../../StdClass')
const AbstractModel = require('../../../Magento/Framework/Model/AbstractModel')
const Page = function () {
    Page.super_.call(this)
    this.constants = {
        NOROUTE_PAGE_ID:'no-route'
    }

    // defaults
    this._idFieldName = 'id'
}

Page.factory = function factory () {
    //@todo the setter/getters from DataObject
    return new Page();
}
util.inherits(Page, AbstractModel)
// public function load($id, $field = null)
Page.prototype.load = function load (id, field) {
    if (id === null) {
        return this.noRoutePage();
    }
    return Page.super_.prototype.load.apply(this, [id, field])
    // return parent::load($id, $field);
}

Page.prototype.noRoutePage = function () {
    // @TODO: real constants
    return this.load(this.constants['NOROUTE_PAGE_ID'], this.getIdFieldName());
}

Page.prototype.getIdFieldName = function () {
    return this._idFieldName;
}

module.exports = Page
