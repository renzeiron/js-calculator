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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/calculator.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/calculator.js":
/*!******************************!*\
  !*** ./src/js/calculator.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar CHAR_LIMIT = 17,\n    CHAR_AUX = 7,\n    SCREEN = {\n  primary: document.getElementById('text-primary'),\n  secondary: document.getElementById('op'),\n  memory: document.getElementById('mem'),\n  fitToWidth: function fitToWidth(number) {\n    return number.toString().length > CHAR_LIMIT ? number.toPrecision(CHAR_LIMIT - CHAR_AUX) : number;\n  }\n};\nvar firstOperand = '',\n    secondOperand = '',\n    currentOperation = '',\n    bracketsExpression = '',\n    operationOver = true,\n    newEntryFlag = false,\n    bracketsFlag = false,\n    inv = false,\n    hyp = false,\n    memory = 0; //#region Mode Select\n\nfunction mode() {\n  if (document.getElementById('basic').checked) document.querySelector('.scientific').style.display = 'none';else document.querySelector('.scientific').style.display = 'grid';\n}\n\n;\nmode();\nArray.from(document.querySelectorAll('.b-s-switch > input[type=\"radio\"]')).forEach(function (element) {\n  element.addEventListener('click', function () {\n    mode();\n  });\n}); //#endregion\n//#region Single Event Listener\n// document.querySelector('.basic').addEventListener('click', (event) => {\n//     if (event.target.classList.contains('numeric')) {\n//         if ((event.target.value == '.' && SCREEN_PRIMARY.innerHTML.indexOf('.') > 0) || SCREEN_PRIMARY.innerHTML.length == CHAR_LIMIT) \n//             return;\n//         if (SCREEN_PRIMARY.innerHTML == '0' && event.target.value != '.')\n//             SCREEN_PRIMARY.innerHTML = event.target.value;\n//         else\n//             SCREEN_PRIMARY.innerHTML += event.target.value;\n//         return;\n//     }\n//     if (event.target.id == 'backspace') {\n//         SCREEN_PRIMARY.innerHTML = SCREEN_PRIMARY.innerHTML.slice(0, -1);\n//         if (SCREEN_PRIMARY.innerHTML == '') SCREEN_PRIMARY.innerHTML = '0';\n//         return;\n//     }\n// });\n//#endregion\n//#region Basic Controls\n// Numeric Buttons\n\nArray.from(document.querySelectorAll('.numeric')).forEach(function (element) {\n  element.addEventListener('click', function () {\n    if (element.value == '.' && SCREEN.primary.innerHTML.indexOf('.') > 0 || SCREEN.primary.innerHTML.length == CHAR_LIMIT && !newEntryFlag) return;\n\n    if (operationOver && currentOperation != '') {\n      // firstOperand = '';\n      currentOperation = '';\n    }\n\n    if (SCREEN.primary.innerHTML == '0' && element.value != '.' || newEntryFlag) {\n      SCREEN.primary.innerHTML = element.value;\n      newEntryFlag = false;\n    } else SCREEN.primary.innerHTML += element.value;\n  });\n}); // Clear Buttons\n\ndocument.getElementById('clear-all').addEventListener('click', function () {\n  firstOperand = '';\n  secondOperand = '';\n  currentOperation = '';\n  operationOver = null;\n  SCREEN.secondary.innerHTML = '';\n  SCREEN.primary.innerHTML = '0';\n});\ndocument.getElementById('clear').addEventListener('click', function () {\n  SCREEN.primary.innerHTML = '0';\n});\ndocument.getElementById('backspace').addEventListener('click', function () {\n  SCREEN.primary.innerHTML = SCREEN.primary.innerHTML.slice(0, -1);\n  if (SCREEN.primary.innerHTML == '') SCREEN.primary.innerHTML = '0';\n}); // Memory Buttons\n\ndocument.getElementById('memory-clear').addEventListener('click', function () {\n  memory = 0;\n  SCREEN.memory.innerHTML = '';\n});\ndocument.getElementById('memory-read').addEventListener('click', function () {\n  SCREEN.primary.innerHTML = SCREEN.fitToWidth(memory);\n});\ndocument.getElementById('memory-save').addEventListener('click', function () {\n  memory = parseFloat(SCREEN.primary.innerHTML);\n  SCREEN.memory.innerHTML = 'mem';\n});\ndocument.getElementById('memory-add').addEventListener('click', function () {\n  memory += parseFloat(SCREEN.primary.innerHTML);\n});\ndocument.getElementById('memory-sub').addEventListener('click', function () {\n  memory -= parseFloat(SCREEN.primary.innerHTML);\n}); // +/-\n\ndocument.getElementById('pos-neg').addEventListener('click', function () {\n  if (SCREEN.primary.innerHTML < 0) {\n    SCREEN.primary.innerHTML = Math.abs(SCREEN.primary.innerHTML);\n  } else {\n    SCREEN.primary.innerHTML = SCREEN.primary.innerHTML * -1;\n  }\n}); // %\n\ndocument.getElementById('percentage').addEventListener('click', function () {\n  if (currentOperation != '') {\n    SCREEN.secondary.innerHTML += SCREEN.primary.innerHTML + '%';\n    SCREEN.primary.innerHTML = SCREEN.fitToWidth(firstOperand / 100 * SCREEN.primary.innerHTML);\n  } else SCREEN.primary.innerHTML = SCREEN.fitToWidth(SCREEN.primary.innerHTML / 100);\n}); // Power Operators\n\nArray.from(document.querySelectorAll('.math-pow')).forEach(function (element) {\n  element.addEventListener('click', function () {\n    SCREEN.primary.innerHTML = SCREEN.fitToWidth(Math.pow(SCREEN.primary.innerHTML, element.value));\n  });\n}); // Binary Operations\n\nArray.from(document.querySelectorAll('.math-binary')).forEach(function (element) {\n  element.addEventListener('click', function () {\n    SCREEN.secondary.innerHTML += SCREEN.primary.innerHTML + element.innerHTML;\n\n    if (bracketsFlag) {\n      bracketsExpression += SCREEN.primary.innerHTML + element.value;\n    } else {\n      if (currentOperation != '' && currentOperation != 'Math.pow') {\n        secondOperand = SCREEN.primary.innerHTML;\n        SCREEN.primary.innerHTML = SCREEN.fitToWidth(eval(firstOperand + currentOperation + secondOperand));\n      }\n\n      firstOperand = SCREEN.primary.innerHTML;\n      currentOperation = element.value;\n      secondOperand = '';\n    }\n\n    operationOver = false;\n    newEntryFlag = true;\n  });\n}); // =\n\ndocument.getElementById('eval').addEventListener('click', function () {\n  if (currentOperation != '') {\n    if (secondOperand == '') secondOperand = SCREEN.primary.innerHTML;\n    var result = currentOperation != 'Math.pow' ? eval(firstOperand + currentOperation + secondOperand) : !inv ? eval(currentOperation + '(' + firstOperand + ',' + secondOperand + ')') : eval(currentOperation + '(' + firstOperand + ',' + 1 / secondOperand + ')');\n    firstOperand = result;\n    SCREEN.primary.innerHTML = SCREEN.fitToWidth(result);\n  }\n\n  operationOver = true;\n  newEntryFlag = true;\n  SCREEN.secondary.innerHTML = '';\n}); //#endregion\n//#region Scientific Controls\n\ndocument.getElementById('inv').addEventListener('click', function (event) {\n  inv = !inv;\n  Array.from(document.querySelectorAll('.trigonometry')).forEach(function (element) {\n    inv ? element.innerHTML += '<sup><small>-1</small></sup>' : hyp ? element.innerHTML = element.id + 'h' : element.innerHTML = element.id;\n  });\n  var logButton = document.getElementById('log'),\n      lnButton = document.getElementById('ln'),\n      powButton = document.getElementById('pow-y');\n\n  if (inv) {\n    logButton.innerHTML = '<small>10</small><sup><small>x</small></sup>';\n    lnButton.innerHTML = 'e<sup><small>x</small></sup>';\n    powButton.innerHTML = 'x<sup><small>1/y</small></sup>';\n  } else {\n    logButton.innerHTML = logButton.id;\n    lnButton.innerHTML = lnButton.id;\n    powButton.innerHTML = 'x<sup><small>y</small></sup>';\n  }\n});\ndocument.getElementById('hyp').addEventListener('click', function (event) {\n  hyp = !hyp;\n  Array.from(document.querySelectorAll('.trigonometry')).forEach(function (element) {\n    if (hyp) element.innerHTML = inv ? element.id + 'h<sup><small>-1</small></sup>' : element.id + 'h';else element.innerHTML = inv ? element.id + '<sup><small>-1</small></sup>' : element.id;\n  });\n}); // Unary Operations\n\ndocument.getElementById('random').addEventListener('click', function () {\n  SCREEN.primary.innerHTML = SCREEN.fitToWidth(Math.random());\n});\ndocument.getElementById('round').addEventListener('click', function () {\n  var floatingPointIndex = SCREEN.primary.innerHTML.indexOf('.');\n  if (floatingPointIndex > 0) SCREEN.primary.innerHTML = parseFloat(SCREEN.primary.innerHTML).toFixed(SCREEN.primary.innerHTML.length - floatingPointIndex - 2);\n});\nArray.from(document.querySelectorAll('.log')).forEach(function (element) {\n  element.addEventListener('click', function (event) {\n    SCREEN.primary.innerHTML = SCREEN.fitToWidth(Math[event.target.value](SCREEN.primary.innerHTML));\n  });\n});\n\nfunction toRadians(angle) {\n  if (document.getElementById('degrees').checked) angle = angle * Math.PI / 180;else if (document.getElementById('grads').checked) angle = angle * 63.662;\n  return angle;\n}\n\nfunction outOfRadians(angle) {\n  if (document.getElementById('degrees').checked) angle = angle * 180 / Math.PI;else if (document.getElementById('grads').checked) angle = angle / 63.662;\n  return angle;\n}\n\nArray.from(document.querySelectorAll('.trigonometry')).forEach(function (element) {\n  element.addEventListener('click', function (event) {\n    if (!inv) SCREEN.primary.innerHTML = SCREEN.fitToWidth(Math[event.target.innerHTML](toRadians(SCREEN.primary.innerHTML)));else {\n      var func = hyp ? 'a' + event.target.id + 'h' : 'a' + event.target.id;\n      SCREEN.primary.innerHTML = SCREEN.fitToWidth(outOfRadians(Math[func](SCREEN.primary.innerHTML)));\n    }\n  });\n});\n\nfunction factorial(op) {\n  // Lanczos Approximation of the Gamma Function\n  // As described in Numerical Recipes in C (2nd ed. Cambridge University Press, 1992)\n  var z = op + 1;\n  var p = [1.000000000190015, 76.18009172947146, -86.50532032941677, 24.01409824083091, -1.231739572450155, 1.208650973866179E-3, -5.395239384953E-6];\n  var d1 = Math.sqrt(2 * Math.PI) / z;\n  var d2 = p[0];\n\n  for (var i = 1; i <= 6; ++i) {\n    d2 += p[i] / (z + i);\n  }\n\n  var d3 = Math.pow(z + 5.5, z + 0.5);\n  var d4 = Math.exp(-(z + 5.5));\n  return d1 * d2 * d3 * d4;\n}\n\ndocument.getElementById('factorial').addEventListener('click', function () {\n  SCREEN.primary.innerHTML = SCREEN.fitToWidth(factorial(parseFloat(SCREEN.primary.innerHTML)));\n}); // Yth-power Operation\n\ndocument.getElementById('pow-y').addEventListener('click', function () {\n  firstOperand = SCREEN.primary.innerHTML;\n  secondOperand = '';\n  newEntryFlag = true;\n  currentOperation = 'Math.pow';\n  SCREEN.secondary.innerHTML = firstOperand + (!inv ? 'ypow' : 'yroot');\n}); // Constants\n\nArray.from(document.querySelectorAll('.const')).forEach(function (element) {\n  element.addEventListener('click', function (event) {\n    SCREEN.primary.innerHTML = SCREEN.fitToWidth(Math[event.target.value]);\n  });\n}); // Brackets\n\ndocument.getElementById('bracket-open').addEventListener('click', function () {\n  if (!SCREEN.secondary.innerHTML.includes('(') && bracketsExpression == '') {\n    SCREEN.secondary.innerHTML += '(';\n    bracketsFlag = true;\n  }\n});\ndocument.getElementById('bracket-close').addEventListener('click', function () {\n  if (bracketsFlag) {\n    var brtsExpResult = eval(bracketsExpression += SCREEN.primary.innerHTML);\n    SCREEN.secondary.innerHTML += SCREEN.primary.innerHTML + ')';\n    if (firstOperand == '') firstOperand = brtsExpResult;else if (secondOperand == '') secondOperand = brtsExpResult;\n    bracketsExpression = '';\n    bracketsFlag = false;\n  }\n}); //#endregion\n\n//# sourceURL=webpack:///./src/js/calculator.js?");

/***/ })

/******/ });