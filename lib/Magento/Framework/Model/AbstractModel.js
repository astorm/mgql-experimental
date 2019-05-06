const util = require('util')
const StdClass = require('../../../StdClass')
const AbstractModel = function AbstractModel () {

}

AbstractModel.prototype.load = function(modelId, field) {
    return {}
}

util.inherits(AbstractModel, StdClass)

module.exports = AbstractModel;
