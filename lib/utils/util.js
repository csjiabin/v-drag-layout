export function uuid() {
  var d = new Date().getTime();
  var uuid = "xxxxxxxxxxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}
export function cloneDeep(obj) {
  let d = isArray(obj) ? obj : {};

  if (isObject(obj)) {
    for (let key in obj) {
      if (obj.hasOwnProperty && obj.hasOwnProperty(key)) {
        if (obj[key] && typeof obj[key] === "object") {
          d[key] = cloneDeep(obj[key]);
        } else {
          d[key] = obj[key];
        }
      }
    }
  }

  return d;
}

export function isArray(value) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === "[object Array]";
  }
}

export function isObject(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}

export function isEmpty(value) {
  if (isArray(value)) {
    return value.length === 0;
  }
}
export function extend(to, _from) {
  for (let key in _from) {
    to[key] = _from[key];
  }
  return to;
};

export function toObject(arr) {
  var res = {};
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
};

/**
   * 判断是否存在 key
   * @param obj 判断对象
   * @param key 判断 key值
   * @return {Boolean} 是否存在标识
   */
export function hasKey(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}