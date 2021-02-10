export const queryString = (query) => {
  var obj = {};
  if (query === '') return obj;
  query = query.slice(1);
  query = query.split('&');
  query.map(function (part) {
    var key;
    var value;
    part = part.split('=');
    key = part[0];
    value = part[1];
    if (!obj[key]) {
      obj[key] = value;
    } else {
      if (!Array.isArray(obj[key])) {
        obj[key] = [obj[key]];
      }
      obj[key].push(value);
    }
    return true;
  });
  return obj;
};
