# Domingo.js

Domingo.js is a JavaScript DOM interaction library inspired by jQuery. 

## Getting Started

The quickest way to get started with Domingo is to download the `lib/main.js` and `lib/dom_node_collection` files and compile them using webpack, ie. `webpack --watch lib/main.js lib/my_app.js`.

## Todo App Demo

Functions used in the Todo App Demo are stored in the `lib/todos.js` file. These functions are triggered using event listeners stored on divs in the html document. To create more functionality, add more functions to the `lib/todos.js` file and add event listeners to buttons in the html document.  

## API Structure

The core functionality of Domingo.js is DOMNodeCollection. Each DOMNode holds an array of DOM Elements which can be manipulated with the various class functions, ie. `html`, `empty`, `attr`, etc.

```javascript
  html(string) {
    if (string === undefined) {
      return this.elements[0].innerHTML;
    } else {
      for (let i = 0; i < this.elements.length; i++) {
        this.elements[i].innerHTML = string;
      }
    }
  }
```
## DOM Selection 

The Domingo.js library utilizes the global variable of `$l` as a wrapper for all of the methods in the Domingo.js library. `$l` can select elements by class, id or HTML Element Type. For example, `$l("div")` returns a `DOMNodeCollection` object holding an array of all divs in the html document.  

## Functions

### DOM Traversal

`DOMNodeCollection` methods to navigate DOM elements

#### `each` 

Iterates through the elements in a `DOMNodeCollection` and applies a callback function passed as an argument

#### `children`

Returns a `DOMNodeCollection` object containing all of the children elements of every `HTMLElement` in the original `DOMNodeCollection`.  Note that this only includes the direct children.

#### `parent`

Returns a `DOMNodeCollection` object containing the parent elements of every `HTMLElement` in the original `DOMNodeCollection`.  

### DOM Manipulation - `DOMNodeCollection` methods to view and/or change DOM elements

#### `html`

Returns the `innerHTML` for the first element in the `DOMNodeCollection` if no argument is given.  If a string argument is given, changes the `innerHTML` of each `DOMNodeCollection` element to the string argument.

#### `empty` 

Empties the innerHTML of each `DOMNodeCollection` element

#### `append` 

Takes a single `HTMLElement`, `DOMNodeCollection`, or `string` argument and appends it to each `DOMNodeCollection` element.

#### `remove` 

Remove each `DOMNodeCollection` element from the DOM.

#### `attr`

Takes either one (`attr(attribute)`) or two (`attr(attribute, value)`) arguments.  If given one argument, the method gets the value of the attribute given for the the first element in the `DOMNodeCollection`.  The method sets the attribute, given as the first argument, as the value, given as the second argument, for each `DOMNodeCollection` element.

#### `addClass` 

Adds a class, given as an argument, to each `DOMNodeCollection` element.

#### `removeClass` 

Removes a class, given as an argument, from each `DOMNodeCollection` element.

### Event Listeners

#### `on`

Adds event listener to each `DOMNodeCollection` element.  List of events are available [here](https://developer.mozilla.org/en-US/docs/Web/Events).

#### `off` 

Removes event listener from each `DOMNodeCollection` element.

### Ajax

Domingo.js also comes with an Ajax function, $l.ajax(options). By default, the options are provided but the use of $l.extend ensures that any options passed in are preserved.

```javascript
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
```