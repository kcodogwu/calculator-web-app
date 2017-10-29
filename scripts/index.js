'use strict';

window.onload = function onload() {
  var butttons = document.getElementsByClassName('button');
  var titleBox = document.getElementsByClassName('titleBox')[0];
  var acButton = document.getElementsByClassName('ac')[0];
  var left = 0;
  var right = 0;
  var operatorClick = { flag: false, value: '' };

  var reset = function reset(x) {
    left = x;
    right = 0;
    operatorClick.flag = false;
    operatorClick.value = '';
  };

  var addEvent = function addEvent(element, eventType, eventHandler) {
    if (element.attachEvent)
      element.attachEvent('on' + eventType, eventHandler)
    ; else
      element.addEventListener(eventType, eventHandler)
    ;
  };

  var operation = function operation(operator) {
    right = Number(titleBox.innerHTML);

    if (operatorClick.flag) {
      if (operatorClick.value === '+') {
        left = left + right;
      } else if (operatorClick.value === '-') {
        left = left - right;
      } else if (operatorClick.value === decodeURI('%C3%97')) {
        left = left * right;
      } else if (operatorClick.value === decodeURI('%C3%B7')) {
        left = left / right;
      }
    }

    if (operator === '=') {
      titleBox.innerHTML = left;
      reset(left);
    } else if (operator === 'AC') {
      reset(0);
      titleBox.innerHTML = '0';
    } else if (operator === 'C') {
      right = 0;
      titleBox.innerHTML = '0';
      acButton.firstChild.innerHTML = 'AC';
    } else {
      titleBox.innerHTML = left;
      left = left === 0 ? right : left;
      right = 0;
      operatorClick.flag = true;
      operatorClick.value = operator;
    }
  };

  var callback = function callback(e) {
    e.preventDefault;
    var val = e.target.innerHTML;

    if (val === 'C' || val === 'AC' || val === '=' || val === '+' || val === '-' || val === decodeURI('%C3%97') || val === decodeURI('%C3%B7')) // %C3%97 is the multiplication sign encodedURI and %C3%B7 is the division sign encodedURI
      operation(val)
    ; else 
      numberClick(val)
    ;
  };

  var numberClick = function numberClick(num) {
    if (!(titleBox.innerHTML.indexOf('.') > -1 && num === '.')) { // if the button clicked is the decimal point "." and the number in the display already has a decimal point, ignore
      acButton.firstChild.innerHTML = 'C';
      if (left !== 0) titleBox.innerHTML = '0';
      titleBox.innerHTML = titleBox.innerHTML === '0' && num !== '.' ? num : titleBox.innerHTML + num;
    }
  };

  // converts "buttons" to a proper JavaScript array, so that array methods are available for it
  butttons = [].slice.call(butttons, 0);

  butttons.map(function (el) {
    addEvent(el, 'click', callback);
  });
};