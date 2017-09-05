/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

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




/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(elements) {
    this.elements = elements;
  }

  html(string) {

    if (string === undefined) {
      return this.elements[0].innerHTML;
    } else {
      for (let i = 0; i < this.elements.length; i++) {
        this.elements[i].innerHTML = string;
      }
    }
  }

  each(callback) {
    this.elements.forEach(callback);
  }

  empty() {
    for (var i = 0; i < this.elements.length; i++) {
      this.elements[i].innerHTML = '';
    }
  }

  val(value) {
    if (value === undefined) {
      return this.elements[0].value; 
    } else {
      this.elements[0].value = value; 
    }
  }

  append(elements) {
    if (elements.length === undefined) {
      elements = [elements];
    }
    for (var i = 0; i < this.elements.length; i++) {
      for (var j = 0; j < elements.length; j++) {
        this.elements[i].appendChild(elements[j]);
      }
    }
  }

  attr(key, value) {
    if (value === undefined) {
      for (var i = 0; i < this.elements.length; i++) {
        if (this.elements[i].getAttribute(key)) {
          return this.elements[i].getAttribute(key);
        }
      }
    } else {
      for (var j = 0; j < this.elements.length; j++) {
        this.elements[j].setAttribute(key, value);
      }
    }
  }

  addClass(value) {
    for (let i=0; i < this.elements.length; i++) {
      let classes = this.elements[i].getAttribute('class');
      classes += ` ${value}`;
      this.elements[i].setAttribute('class', classes);

    }

  }

  removeClass(value) {
    for (let i = 0; i < this.elements.length; i++) {
      let classes = this.elements[i].getAttribute('class').split(' ');
        for (var j = 0; j < classes.length; j++) {
          if (classes[j] === value) {
            classes.splice(j, 1);
          }
        }
      this.elements[i].setAttribute('class', classes.join(' '));
      if (classes.length === 0) this.elements[i].removeAttribute('class');
    }
  }

  children() {
    let children = [];
    for (let i=0; i < this.elements.length; i++) {
      if (this.elements[i].children.length >= 1) {
        children.push(this.elements[i].children);
      }
    }
    return new DOMNodeCollection(children[0]);
  }

  parent() {
    let parent = [];
    for (let i=0; i < this.elements.length; i++) {
      if (this.elements[i].parentElement !== null) {
        parent.push(this.elements[i].parentElement);
      }
    }
    return new DOMNodeCollection(parent[0]);
  }

  find(element) {
    let foundEls = document.querySelectorAll(element);
    return new DOMNodeCollection(foundEls);
  }

  remove(element) {
    if (this.elements === undefined) return; 

    for (var i = this.elements.length - 1; i >= 0; i--) {
      this.elements[i].remove(); 
    }

    this.elements = [];
  }

  on(type, callback) {
    for (var i = 0; i < this.elements.length; i++) {
      this.elements[i].addEventListener(type, callback);
      this.elements[i]["cb-" + type] = callback;
    }
  }

  off(type) {
    for (var i = 0; i < this.elements.length; i++) {
      let cb = this.elements[i]["cb-" + type];
      this.elements[i].removeEventListener(type, cb);
    }
  }
}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);