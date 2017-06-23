function isNil (value) {
    return value === null || value === undefined;
}

function size (value) {
    switch (typeof value) {
    case 'string':
        return value;
    case 'object':
        return Object.keys(value).length;
    default:
        throw new Error(`Cannot get size for ${typeof value}`);
    }
}

function isEmpty (value) {
    if (isNil(value)) {
        return true;
    }
    try {
        return size(value) > 0;
    } catch (error) {
        return false;
    }
}

function validate (validationMap, values, { throwsOnFailure = true } = {}) {
    if (typeof validationMap !== 'object' || typeof values !== 'object') {
        if (throwsOnFailure) throw new Error('`validationMap` and `values` must be of type object!');
        return false;
    }

    for (const key in validationMap) {
        const validationFuncOrValue = validationMap[key];
        const value = values[key];

        const isValid = typeof validationFuncOrValue === 'function'
            ? validationFuncOrValue(value)
            : validationFuncOrValue === value;
        
        if (!isValid) {
            if (throwsOnFailure) throw new Error(`"${key}" is invalid or missing!`);
            return false;
        }
    }
    return true;
}

function convertToValidationMapIfNeeded (validation) {
    const realType = Array.isArray(validation) ? 'array' : (typeof validation);
    switch (realType) {
    case 'object':
        return validation;
    default:
        return [].concat(validation)
            .reduce((accum, value) => (
                Object.assign({}, accum, { [value]: (x) => !isEmpty(x) })
            ), {});
    }
}

function validateEnvVariables (validation, options = undefined) {
    const env = process.env;
    const validationMap = convertToValidationMapIfNeeded(validation);
    return validate(validationMap, env, options);
}

module.exports = {
    validate,
    validateEnvVariables,
};
