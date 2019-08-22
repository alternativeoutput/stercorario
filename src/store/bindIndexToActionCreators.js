const transformObjectValues = (obj, fn) => {
  var transformed = {}
  Object.keys(obj).forEach(key => {
    transformed[key] = fn(obj[key])
  })
  return transformed
}

export const bindActionAttrs = (args, name, index) => {
    let add = {};
    add[name] = index;
    return Object.assign(args, add);
}

export const bindActionCreator = (actionCreator, name, index) =>
    (...args) => {
        console.log(actionCreator);
        let add = {};
        add[name] = index;
        return Object.assign(actionCreator(...args), add);
    }

const bindActionCreatorMap = (creators, name, index) =>
      transformObjectValues(creators, actionCreator => bindActionCreator(actionCreator, name, index))

const bindIndexToActionCreators = (actionCreators, name, index) => {
    return typeof actionCreators === 'function'
        ? bindActionCreator(actionCreators, name, index)
        : bindActionCreatorMap(actionCreators, name, index)
}

export default bindIndexToActionCreators
