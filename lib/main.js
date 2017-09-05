const DOMNodeCollection = require('./dom_node_collection.js');

window.$l = function(selector) {
  let queue = [];

  if (selector instanceof Function) {
    queue.push(selector);
  } else if (selector instanceof HTMLElement) {
    let htmlArr = Array.prototype.slice.call(selector);
    return new DOMNodeCollection([selector]);
  } else {
    let nodeList = document.querySelectorAll(selector);
    let listArr = Array.prototype.slice.call(nodeList);
    return new DOMNodeCollection(listArr);
  }

  document.addEventListener("DOMContentLoaded", function() {
    queue.forEach((func) => {
      func();
    });
  });

};

window.$l = $l;

$l.extend = (...args) => {
  let object = {};
  for (var i = 0; i < args.length; i++) {
    for (var key in args[i]) {
      object[key] = args[i][key];
    }
  }
  return object;
};

$l.ajax = function(options) {
  const defaults = {
    type: "GET",
    url: "",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {},
    success: () => {},
    error: () => {}
  };

  let obj = $l.extend(defaults, options);
  
  const xhr = new XMLHttpRequest();
  xhr.open(obj.type, obj.url);

  xhr.onload = function () {
    if (xhr.status === 200) {
      const parsedResponse = JSON.parse(xhr.response); 
      obj.success(parsedResponse);
    } else {
      obj.error(xhr.response);
    }
  };
  xhr.send(JSON.stringify(obj.data));
};


