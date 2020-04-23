'use strict';

const _ = use('lodash');
const VanillaSerializer = use('@adonisjs/lucid/src/Lucid/Serializers/Vanilla');

class JsonSerializer extends VanillaSerializer {

    _getRowJSON(modelInstance) {
        const output = _.transform(modelInstance.toObject(), (result, value, key) => {
            result[_.camelCase(key)] = value;
            return result;
        }, {});
        this._attachRelations(modelInstance, output);
        this._attachMeta(modelInstance, output);
        return output;
    }

    _attachMeta(modelInstance, output) {
        if (_.size(modelInstance.$sideLoaded)) {
            output.aggregates = _.clone(_.transform(modelInstance.$sideLoaded, (result, value, key) => {
                result[_.camelCase(key)] = value;
                return result;
            }, {}))
        }
    }
}

module.exports = JsonSerializer;
