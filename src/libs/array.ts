import { GenericObject } from 'types';
import { isObject } from './object';

export const flattenArray = <T>(arr: T[], key = 'children'): T[] =>
  arr.reduce((acc: T[], value: T) => {
    acc.push(value);

    if (value[key]) {
      acc = acc.concat(flattenArray(value[key], key));
      delete value[key];
    }

    return acc;
  }, []);

export const isArray = (arr): boolean => arr && Array.isArray(arr);

export const isEqual = (value, other, prop = 'text'): boolean => {
  // Get the value type
  const type = Object.prototype.toString.call(value);

  // If the two objects are not the same type, return false
  if (type !== Object.prototype.toString.call(other)) return false;

  // If items are not an object or array, return false
  if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;

  // Compare the length of the length of the two items
  const valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
  const otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
  if (valueLen !== otherLen) return false;

  if (type === '[object Array]') {
    for (let i = 0; i < valueLen; i++) {
      if (
        (isObject(value[i]) && value[i] && prop in value[i] && value[i][prop] !== other[i][prop]) ||
        (!isObject(value[i]) && value[i] !== other[i])
      ) {
        return false;
      }
    }
  } else {
    for (const key in value) {
      if (
        (value.hasOwnProperty(key) &&
          isObject(value[key]) &&
          value[key] &&
          prop in value[key] &&
          value[key][prop] !== other[key][prop]) ||
        (!isObject(value[key]) && value[key] !== other[key])
      ) {
        return false;
      }
    }
  }

  // If nothing failed, return true
  return true;
};

export const uniqueArray = (arr1, arr2): GenericObject[] => {
  const newArray: GenericObject[] = [];

  arr1.concat(arr2).map((i: GenericObject) => {
    if (!newArray.some((item: GenericObject) => item.value === i.value)) {
      newArray.push(i);
    }

    return i;
  });

  return newArray;
};

export const toArray = (value): any[] => (Array.isArray(value) ? value : value ? [value] : []);
