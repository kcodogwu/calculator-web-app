'use strict';

window.onload = function onload() {
  var butttons = document.getElementsByClassName('button');
  var titleBox = document.getElementsByClassName('titleBox')[0];
  var temp = 0;
  var result = 0;
  var operatorClick = { flag: false, value: '' };

  var reset = function reset() {
    temp = 0;
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

  var callback = function callback(e) {
    e.preventDefault;
    var val = e.target.innerHTML;

    if (val === '=' || val === '+' || val === '-' || val === decodeURI('%C3%97') || val === decodeURI('%C3%B7')) // %C3%97 is the multiplication sign encodedURI and %C3%B7 is the division sign encodedURI
      operation(val)
    ; else 
      numberClick(val)
    ;
  };

  var operation = function operation(operator) {
    if (operatorClick.flag) {
      if (operatorClick.value === '+') {
        result = temp + Number(titleBox.innerHTML);
      } else if (operatorClick.value === '-') {
        result = temp - Number(titleBox.innerHTML);
      } else if (operatorClick.value === decodeURI('%C3%97')) {
        result = temp * Number(titleBox.innerHTML);
      } else if (operatorClick.value === decodeURI('%C3%B7')) {
        result = temp / Number(titleBox.innerHTML);
      }
    }

    if (operator === '=') {
      titleBox.innerHTML = result;
      reset();
    } else {
      temp = Number(titleBox.innerHTML);
      titleBox.innerHTML = result;
      operatorClick.flag = true;
      operatorClick.value = operator;
    }
  };

  var numberClick = function numberClick(num) {
    if (!(titleBox.innerHTML.indexOf('.') > -1 && num === '.')) { // if the button clicked is the decimal point "." and the number in the display already has a decimal point, ignore
      titleBox.innerHTML = titleBox.innerHTML === '0' && num !== '.' ? num : titleBox.innerHTML + num;
    }
  };

  // converts "buttons" to a proper JavaScript array, so that array methods are available for it
  butttons = [].slice.call(butttons, 0);

  butttons.map(function (el) {
    addEvent(el, 'click', callback);
  });
};