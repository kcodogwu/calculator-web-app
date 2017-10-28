'use strict';

window.onload = function onload() {
  var butttons = document.getElementsByClassName('button');
  var titleBox = document.getElementsByClassName('titleBox')[0];
  var display = '0';
  var temp = '0';
  var operatorClick = { flag: false, value: '' };

  var addEvent = function addEvent(element, eventType, eventHandler) {
    if (element.attachEvent)
      element.attachEvent('on' + eventType, eventHandler)
    ; else
      element.addEventListener(eventType, eventHandler)
    ;
  };

  var callback = function callback(e) {
    e.preventDefault;
    var val = e.target.innerHTML;

    if (val === '=' || val === '+' || val === '-' || val === '×' || val === '÷')
      operation(val)
    ; else 
      numberClick(val)
    ;
  };

  var operation = function operation(operator) {
    operatorClick.flag = true;
    operatorClick.value = operator;
    
    switch (operator) {
    
    case '=':
      return function () {};
  
    case '+':
      return function () {};
  
    case '-':
      return function () {};
  
    case '×':
      return function () {};
  
    case '÷':
      return function () {};
  
    default:
      return function () {
        return 'error';
      };
    
    }
  };

  var numberClick = function numberClick(num) {
    display = titleBox.innerHTML;

    if (!(display.indexOf('.') > -1 && num === '.')) { // if the button clicked is the decimal point "." and the number in the display already has a decimal point, ignore
      display = display === '0' && num !== '.' ? num : display + num;
      titleBox.innerHTML = display;
    }
  };

  // converts "buttons" to a proper JavaScript array, so that array methods are available for it
  butttons = [].slice.call(butttons, 0);

  butttons.map(function (el) {
    addEvent(el, 'click', callback);
  });
};