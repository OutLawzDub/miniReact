 
'use strict'

function type_check_v1(input, type) {
    if (input === null) return type === "null";
    if (Array.isArray(input)) return type === "array";
    return typeof input === type;
}

function type_check_v2(input, conf = {type: "", value: "", enum: []}) {
    if (type_check_v1(conf, "string"))
        return type_check_v1(input, conf)
    if (Object.prototype.hasOwnProperty.call(conf, "type") && !type_check_v1(input, conf.type))
        return false
    if (Object.prototype.hasOwnProperty.call(conf, "value") && JSON.stringify(input) !== JSON.stringify(conf.value))
        return false
    return !(Object.prototype.hasOwnProperty.call(conf, "enum") &&
        conf.enum.filter(e => JSON.stringify(e) === JSON.stringify(input)).length === 0)
}

function type_check(input, conf = {type: "", properties: {}, value: "", enum: []}) {
    if (Object.prototype.hasOwnProperty.call(conf, "type") && type_check_v1(input, conf.type)) {
        if (Object.prototype.hasOwnProperty.call(conf, "properties")) {
            for (let propName in conf.properties) {
                if (!type_check(input[propName], conf.properties[propName]))
                    return false
            }
            return true
        }
    }
    return type_check_v2(input, conf)
}
