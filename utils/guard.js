function throwIfUndefinedOrNull(paramName, paramValue) {
  if (typeof paramValue === 'undefined' || paramValue === null) {
    throw new Error(`Parameter '${paramName}' should be not undefined nor null`);
  }
}

function throwIfFalsy(paramName, paramValue) {
  if (!paramValue) {
    throw new Error(`Parameter '${paramName}' should have truthy value`);
  }
}

module.exports = {
  throwIfUndefinedOrNull,
  throwIfFalsy
};