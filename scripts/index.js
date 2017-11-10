'use strict';

window.onload = function onload() {
  var buttons = document.getElementsByClassName('button');
  var titleBox = document.getElementsByClassName('titleBox')[0];
  var oldOp = '';
  var mem = 0;
  var flag = false;

  var hasClass = function hasClass(el, className) {
    return el.classList ? el.classList.contains(className) : new RegExp('\\b'+ className+'\\b').test(el.className);
  };

  var addClass = function addClass(el, className) {
    if (el.classList) 
      el.classList.add(className)
    ; else if (!hasClass(el, className)) 
      el.className += ' ' + className
    ;
  };

  var removeClass = function removeClass(el, className) {
    if (el.classList) 
      el.classList.remove(className)
    ; else 
      el.className = el.className.replace(new RegExp('\\b'+ className+'\\b', 'g'), '')
    ;
  };

  var addEvent = function addEvent(element, eventType, eventHandler) {
    if (element.attachEvent)
      element.attachEvent('on' + eventType, eventHandler)
    ; else
      element.addEventListener(eventType, eventHandler)
    ;
  };

  var callback = function callback(e) {
    var val = e.target.innerHTML;

    buttons.map(function (el) {
      removeClass(el, 'clicked');
    });

    if (val === 'Clear' || val === '=' || val === '+' || val === '-' || val === decodeURI('%C3%97') || val === decodeURI('%C3%B7')) { // %C3%97 is the multiplication sign encodedURI and %C3%B7 is the division sign encodedURI
      if (val !== 'Clear' && val !== '=') addClass(e.target, 'clicked');
      operation(val);
      flag = true;
    } else {
      numberClick(val);
      flag = false;
    }
  };

  var operation = function operation(operator) {
    if (operator === 'Clear') {
      mem = 0;
      oldOp = '';
      titleBox.innerHTML = '0';
      flag = false;
    } else if (oldOp === '' ) {
      mem = Number(titleBox.innerHTML);
      oldOp = operator;
    } else {
      if (oldOp === '+') {
        mem = mem + Number(titleBox.innerHTML);
      } else if (oldOp === '-') {
        mem = mem - Number(titleBox.innerHTML);
      } else if (oldOp === decodeURI('%C3%97')) {
        mem = mem * Number(titleBox.innerHTML);
      } else if (oldOp === decodeURI('%C3%B7')) {
        mem = mem / Number(titleBox.innerHTML);
      }

      if (operator === '=') 
        oldOp = ''
      ; else 
        oldOp = operator
      ;

      titleBox.innerHTML = mem;
    }
  };

  var numberClick = function numberClick(num) {
    if (!(titleBox.innerHTML.indexOf('.') > -1 && num === '.')) { // if the button clicked is the decimal point "." and the number in the display already has a decimal point, ignore
      if (flag) titleBox.innerHTML = '0';
      titleBox.innerHTML = titleBox.innerHTML === '0' && num !== '.' ? num : titleBox.innerHTML + num;
    }
  };

  // converts "buttons" to a proper JavaScript array, so that array methods are available for it
  buttons = [].slice.call(buttons, 0);

  buttons.map(function (el) {
    addEvent(el, 'click', callback);
  });
};