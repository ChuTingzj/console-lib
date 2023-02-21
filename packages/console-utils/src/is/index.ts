export const enum EVariableType {
  'String',
  'Number',
  'Boolean',
  'Null',
  'Undefined',
  'Set',
  'Map',
  'Symbol',
  'Object',
  'Function',
  'Array'
}
export function getVariableType(variable: any): keyof typeof EVariableType
export function getVariableType(variable: any) {
  return (<any>Object.prototype.toString.call(variable)).match(/[a-zA-Z]+(?=])/g)[0];
}
export const isArray = (variable: any) => getVariableType(variable) === 'Array';
export const isString = (variable: any) => getVariableType(variable) === 'String';
export const isNumber = (variable: any) => getVariableType(variable) === 'Number';
export const isBoolean = (variable: any) => getVariableType(variable) === 'Boolean';
export const isNull = (variable: any) => getVariableType(variable) === 'Null';
export const isUndefined = (variable: any) => getVariableType(variable) === 'Undefined';
export const isSet = (variable: any) => getVariableType(variable) === 'Set';
export const isMap = (variable: any) => getVariableType(variable) === 'Map';
export const isSymbol = (variable: any) => getVariableType(variable) === 'Symbol';
export const isObject = (variable: any) => getVariableType(variable) === 'Object';
export const isFunction = (variable: any) => getVariableType(variable) === 'Function';
