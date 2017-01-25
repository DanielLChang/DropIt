/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _animations = __webpack_require__(1);
	
	var _animations2 = _interopRequireDefault(_animations);
	
	var _start = __webpack_require__(9);
	
	var _start2 = _interopRequireDefault(_start);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.addEventListener("DOMContentLoaded", function () {
	  var canvas = document.getElementById('canvas');
	  var ctx = canvas.getContext('2d');
	  ctx.canvas.width = window.innerWidth;
	  ctx.canvas.height = window.innerHeight;
	
	  (0, _start2.default)(ctx, canvas);
	  (0, _animations2.default)(ctx, canvas);
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _animejs = __webpack_require__(2);
	
	var _animejs2 = _interopRequireDefault(_animejs);
	
	var _sound_set_ = __webpack_require__(3);
	
	var _sound_set_2 = __webpack_require__(4);
	
	var _sound_set_3 = __webpack_require__(5);
	
	var _sound_set_4 = __webpack_require__(6);
	
	var _howlerMin = __webpack_require__(7);
	
	var _howlerMin2 = _interopRequireDefault(_howlerMin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Animations = function Animations(ctx, canvas) {
	
	  //Set default state;
	  var numOfCircles = 25;
	  var distance = 300;
	  var actions = [];
	  var sound = void 0;
	
	  var colorSets = [
	  //colorset1
	  ["#f8ffe5", "#06D6A0", "#1B9AAA", "#EF476F", "#FFC43D"],
	  //colorset2
	  ["#5b507a", "#5B618A", "#9EADC8", "#B9E28C", "#D6D84F"],
	  //colorset3
	  ["#5bc0eb", "#f9c80e", "#41ead4", "#fdfffc", "#b91372"],
	  //colorset4
	  ["#f6e8ea", "#ef626c", "#de1a1a", "#acbed8", "#84dccf"]];
	
	  var soundSets = [_sound_set_.soundSet1, _sound_set_2.soundSet2, _sound_set_3.soundSet3, _sound_set_4.soundSet4];
	
	  var fontSize = function fontSize() {
	    return parseFloat(getComputedStyle(document.documentElement).fontSize);
	  };
	
	  var resizeCanvas = function resizeCanvas() {
	    canvas.width = window.innerWidth;
	    canvas.height = window.innerHeight;
	  };
	
	  var removeAction = function removeAction(action) {
	    var idx = actions.indexOf(action);
	    if (idx > -1) actions.splice(idx, 1);
	  };
	
	  var changeColorSet = function changeColorSet() {
	    var temp = colorSets.shift();
	    colorSets.push(temp);
	  };
	
	  var changeSoundSet = function changeSoundSet() {
	    var temp = soundSets.shift();
	    soundSets.push(temp);
	  };
	
	  var drawRipple = function drawRipple(x, y) {
	    //Choose a random colorset
	    var colorSet = colorSets[0];
	    var ripple = {};
	
	    ripple.x = x;
	    ripple.y = y;
	    ripple.color = colorSet[_animejs2.default.random(0, colorSet.length - 1)];
	    ripple.radius = 0;
	    ripple.alpha = 1;
	    ripple.lineWidth = 5;
	
	    ripple.draw = function () {
	      ctx.globalAlpha = ripple.alpha;
	      ctx.beginPath();
	      ctx.arc(ripple.x, ripple.y, ripple.radius, 2 * Math.PI, false);
	      ctx.lineWidth = ripple.lineWidth;
	      ctx.strokeStyle = ripple.color;
	      ctx.stroke();
	      ctx.globalAlpha = 1;
	    };
	
	    return ripple;
	  };
	
	  var drawCircle = function drawCircle(x, y) {
	    //Choose a random colorset
	    var colorSet = colorSets[0];
	    var circle = {};
	    circle.x = x;
	    circle.y = y;
	    circle.color = colorSet[_animejs2.default.random(0, colorSet.length - 1)];
	    circle.radius = _animejs2.default.random(fontSize(), fontSize() * 2);
	
	    circle.draw = function () {
	      ctx.beginPath();
	      ctx.arc(circle.x, circle.y, circle.radius, 2 * Math.PI, false);
	      ctx.fillStyle = circle.color;
	      ctx.fill();
	    };
	
	    return circle;
	  };
	
	  var drawCircles = function drawCircles(x, y) {
	    var circles = [];
	    for (var i = 0; i < numOfCircles; i++) {
	      var circle = drawCircle(x, y);
	      circles.push(circle);
	    }
	    return circles;
	  };
	
	  var animateRipple = function animateRipple(ripple, size) {
	    return (0, _animejs2.default)({
	      targets: ripple,
	      radius: function radius() {
	        return _animejs2.default.random(fontSize() * size, fontSize() * (size + 2));
	      },
	      lineWidth: 0,
	      alpha: {
	        value: 0,
	        easing: 'linear',
	        duration: function duration() {
	          return _animejs2.default.random(300, 500);
	        }
	      },
	      duration: function duration() {
	        return _animejs2.default.random(1000, 1300);
	      },
	      easing: 'easeOutExpo',
	      complete: removeAction
	    });
	  };
	
	  var animateCircles = function animateCircles(x, y) {
	    resizeCanvas();
	
	    //Draw shapes
	    var circles = drawCircles(x, y);
	    var ripple1 = drawRipple(x, y);
	    var ripple2 = drawRipple(x, y);
	    var ripple3 = drawRipple(x, y);
	
	    //Animate shapes
	    var circleAnimation = (0, _animejs2.default)({
	      targets: circles,
	      x: function x(circle) {
	        return circle.x + _animejs2.default.random(-distance, distance);
	      },
	      y: function y(circle) {
	        return circle.y + _animejs2.default.random(-distance, distance);
	      },
	      radius: 0,
	      duration: function duration() {
	        return _animejs2.default.random(1000, 1300);
	      },
	      easing: 'easeOutExpo',
	      complete: removeAction
	    });
	
	    //Animate ripples
	    var ripple1Animation = animateRipple(ripple1, 5);
	    var ripple2Animation = animateRipple(ripple2, 7);
	    var ripple3Animation = animateRipple(ripple3, 9);
	
	    actions.push(circleAnimation);
	    actions.push(ripple1Animation);
	    actions.push(ripple2Animation);
	    actions.push(ripple3Animation);
	  };
	
	  var animate = (0, _animejs2.default)({
	    duration: Infinity,
	    update: function update() {
	      ctx.clearRect(0, 0, canvas.width, canvas.height);
	      actions.forEach(function (action) {
	        action.animatables.forEach(function (animatable) {
	          animatable.target.draw();
	        });
	      });
	    }
	  });
	
	  //Update coordinates after animation
	  var x = void 0,
	      y = void 0;
	
	  var updateCoords = function updateCoords() {
	    x = Math.random() * canvas.width;
	    y = Math.random() * canvas.height;
	  };
	
	  var removeContainer = function removeContainer() {
	    $('#title').removeClass('pulse');
	    $('#description').removeClass('pulse');
	  };
	
	  var pulseContainer = function pulseContainer() {
	    $('#title').addClass('pulse');
	    $('#description').addClass('pulse');
	    setTimeout(removeContainer, 300);
	  };
	
	  var removeLogo = function removeLogo() {
	    $('#logo').removeClass('pulse');
	  };
	
	  var pulseLogo = function pulseLogo() {
	    $('#logo').addClass('pulse');
	    setTimeout(removeLogo, 300);
	  };
	
	  document.addEventListener('keydown', function (e) {
	    e.preventDefault();
	
	    //Spacebar to change colorset and soundset
	    if (e.keyCode === 32) {
	      changeColorSet();
	      changeSoundSet();
	
	      var el = $('#logo');
	      var offset = el.offset();
	      animateCircles(offset.left + 25, offset.top + 25);
	      pulseLogo();
	
	      sound = new Howl({
	        src: soundSets[0][e.keyCode]
	      });
	      sound.play();
	    }
	
	    //Number and letter key to play sound
	    if (e.keyCode >= 65 && e.keyCode <= 90) {
	      updateCoords();
	      animateCircles(x, y);
	
	      pulseContainer();
	
	      sound = new Howl({
	        src: soundSets[0][e.keyCode]
	      });
	      sound.play();
	    }
	  });
	
	  window.addEventListener('resize', resizeCanvas);
	};
	
	exports.default = Animations;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	 * Anime v1.1.3
	 * http://anime-js.com
	 * JavaScript animation engine
	 * Copyright (c) 2016 Julian Garnier
	 * http://juliangarnier.com
	 * Released under the MIT license
	 */
	
	(function (root, factory) {
	  if (true) {
	    // AMD. Register as an anonymous module.
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof module === 'object' && module.exports) {
	    // Node. Does not work with strict CommonJS, but
	    // only CommonJS-like environments that support module.exports,
	    // like Node.
	    module.exports = factory();
	  } else {
	    // Browser globals (root is window)
	    root.anime = factory();
	  }
	}(this, function () {
	
	  var version = '1.1.3';
	
	  // Defaults
	
	  var defaultSettings = {
	    duration: 1000,
	    delay: 0,
	    loop: false,
	    autoplay: true,
	    direction: 'normal',
	    easing: 'easeOutElastic',
	    elasticity: 400,
	    round: false,
	    begin: undefined,
	    update: undefined,
	    complete: undefined
	  }
	
	  // Transforms
	
	  var validTransforms = ['translateX', 'translateY', 'translateZ', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scaleX', 'scaleY', 'scaleZ', 'skewX', 'skewY'];
	  var transform, transformStr = 'transform';
	
	  // Utils
	
	  var is = {
	    arr: function(a) { return Array.isArray(a) },
	    obj: function(a) { return Object.prototype.toString.call(a).indexOf('Object') > -1 },
	    svg: function(a) { return a instanceof SVGElement },
	    dom: function(a) { return a.nodeType || is.svg(a) },
	    num: function(a) { return !isNaN(parseInt(a)) },
	    str: function(a) { return typeof a === 'string' },
	    fnc: function(a) { return typeof a === 'function' },
	    und: function(a) { return typeof a === 'undefined' },
	    nul: function(a) { return typeof a === 'null' },
	    hex: function(a) { return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a) },
	    rgb: function(a) { return /^rgb/.test(a) },
	    hsl: function(a) { return /^hsl/.test(a) },
	    col: function(a) { return (is.hex(a) || is.rgb(a) || is.hsl(a)) }
	  }
	
	  // Easings functions adapted from http://jqueryui.com/
	
	  var easings = (function() {
	    var eases = {};
	    var names = ['Quad', 'Cubic', 'Quart', 'Quint', 'Expo'];
	    var functions = {
	      Sine: function(t) { return 1 + Math.sin(Math.PI / 2 * t - Math.PI / 2); },
	      Circ: function(t) { return 1 - Math.sqrt( 1 - t * t ); },
	      Elastic: function(t, m) {
	        if( t === 0 || t === 1 ) return t;
	        var p = (1 - Math.min(m, 998) / 1000), st = t / 1, st1 = st - 1, s = p / ( 2 * Math.PI ) * Math.asin( 1 );
	        return -( Math.pow( 2, 10 * st1 ) * Math.sin( ( st1 - s ) * ( 2 * Math.PI ) / p ) );
	      },
	      Back: function(t) { return t * t * ( 3 * t - 2 ); },
	      Bounce: function(t) {
	        var pow2, bounce = 4;
	        while ( t < ( ( pow2 = Math.pow( 2, --bounce ) ) - 1 ) / 11 ) {}
	        return 1 / Math.pow( 4, 3 - bounce ) - 7.5625 * Math.pow( ( pow2 * 3 - 2 ) / 22 - t, 2 );
	      }
	    }
	    names.forEach(function(name, i) {
	      functions[name] = function(t) {
	        return Math.pow( t, i + 2 );
	      }
	    });
	    Object.keys(functions).forEach(function(name) {
	      var easeIn = functions[name];
	      eases['easeIn' + name] = easeIn;
	      eases['easeOut' + name] = function(t, m) { return 1 - easeIn(1 - t, m); };
	      eases['easeInOut' + name] = function(t, m) { return t < 0.5 ? easeIn(t * 2, m) / 2 : 1 - easeIn(t * -2 + 2, m) / 2; };
	      eases['easeOutIn' + name] = function(t, m) { return t < 0.5 ? (1 - easeIn(1 - 2 * t, m)) / 2 : (easeIn(t * 2 - 1, m) + 1) / 2; };
	    });
	    eases.linear = function(t) { return t; };
	    return eases;
	  })();
	
	  // Strings
	
	  var numberToString = function(val) {
	    return (is.str(val)) ? val : val + '';
	  }
	
	  var stringToHyphens = function(str) {
	    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
	  }
	
	  var selectString = function(str) {
	    if (is.col(str)) return false;
	    try {
	      var nodes = document.querySelectorAll(str);
	      return nodes;
	    } catch(e) {
	      return false;
	    }
	  }
	
	  // Numbers
	
	  var random = function(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	  }
	
	  // Arrays
	
	  var flattenArray = function(arr) {
	    return arr.reduce(function(a, b) {
	      return a.concat(is.arr(b) ? flattenArray(b) : b);
	    }, []);
	  }
	
	  var toArray = function(o) {
	    if (is.arr(o)) return o;
	    if (is.str(o)) o = selectString(o) || o;
	    if (o instanceof NodeList || o instanceof HTMLCollection) return [].slice.call(o);
	    return [o];
	  }
	
	  var arrayContains = function(arr, val) {
	    return arr.some(function(a) { return a === val; });
	  }
	
	  var groupArrayByProps = function(arr, propsArr) {
	    var groups = {};
	    arr.forEach(function(o) {
	      var group = JSON.stringify(propsArr.map(function(p) { return o[p]; }));
	      groups[group] = groups[group] || [];
	      groups[group].push(o);
	    });
	    return Object.keys(groups).map(function(group) {
	      return groups[group];
	    });
	  }
	
	  var removeArrayDuplicates = function(arr) {
	    return arr.filter(function(item, pos, self) {
	      return self.indexOf(item) === pos;
	    });
	  }
	
	  // Objects
	
	  var cloneObject = function(o) {
	    var newObject = {};
	    for (var p in o) newObject[p] = o[p];
	    return newObject;
	  }
	
	  var mergeObjects = function(o1, o2) {
	    for (var p in o2) o1[p] = !is.und(o1[p]) ? o1[p] : o2[p];
	    return o1;
	  }
	
	  // Colors
	
	  var hexToRgb = function(hex) {
	    var rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	    var hex = hex.replace(rgx, function(m, r, g, b) { return r + r + g + g + b + b; });
	    var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	    var r = parseInt(rgb[1], 16);
	    var g = parseInt(rgb[2], 16);
	    var b = parseInt(rgb[3], 16);
	    return 'rgb(' + r + ',' + g + ',' + b + ')';
	  }
	
	  var hslToRgb = function(hsl) {
	    var hsl = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(hsl);
	    var h = parseInt(hsl[1]) / 360;
	    var s = parseInt(hsl[2]) / 100;
	    var l = parseInt(hsl[3]) / 100;
	    var hue2rgb = function(p, q, t) {
	      if (t < 0) t += 1;
	      if (t > 1) t -= 1;
	      if (t < 1/6) return p + (q - p) * 6 * t;
	      if (t < 1/2) return q;
	      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
	      return p;
	    }
	    var r, g, b;
	    if (s == 0) {
	      r = g = b = l;
	    } else {
	      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
	      var p = 2 * l - q;
	      r = hue2rgb(p, q, h + 1/3);
	      g = hue2rgb(p, q, h);
	      b = hue2rgb(p, q, h - 1/3);
	    }
	    return 'rgb(' + r * 255 + ',' + g * 255 + ',' + b * 255 + ')';
	  }
	
	  var colorToRgb = function(val) {
	    if (is.rgb(val)) return val;
	    if (is.hex(val)) return hexToRgb(val);
	    if (is.hsl(val)) return hslToRgb(val);
	  }
	
	  // Units
	
	  var getUnit = function(val) {
	    return /([\+\-]?[0-9|auto\.]+)(%|px|pt|em|rem|in|cm|mm|ex|pc|vw|vh|deg)?/.exec(val)[2];
	  }
	
	  var addDefaultTransformUnit = function(prop, val, intialVal) {
	    if (getUnit(val)) return val;
	    if (prop.indexOf('translate') > -1) return getUnit(intialVal) ? val + getUnit(intialVal) : val + 'px';
	    if (prop.indexOf('rotate') > -1 || prop.indexOf('skew') > -1) return val + 'deg';
	    return val;
	  }
	
	  // Values
	
	  var getCSSValue = function(el, prop) {
	    // First check if prop is a valid CSS property
	    if (prop in el.style) {
	      // Then return the property value or fallback to '0' when getPropertyValue fails
	      return getComputedStyle(el).getPropertyValue(stringToHyphens(prop)) || '0';
	    }
	  }
	
	  var getTransformValue = function(el, prop) {
	    var defaultVal = prop.indexOf('scale') > -1 ? 1 : 0;
	    var str = el.style.transform;
	    if (!str) return defaultVal;
	    var rgx = /(\w+)\((.+?)\)/g;
	    var match = [];
	    var props = [];
	    var values = [];
	    while (match = rgx.exec(str)) {
	      props.push(match[1]);
	      values.push(match[2]);
	    }
	    var val = values.filter(function(f, i) { return props[i] === prop; });
	    return val.length ? val[0] : defaultVal;
	  }
	
	  var getAnimationType = function(el, prop) {
	    if ( is.dom(el) && arrayContains(validTransforms, prop)) return 'transform';
	    if ( is.dom(el) && (el.getAttribute(prop) || (is.svg(el) && el[prop]))) return 'attribute';
	    if ( is.dom(el) && (prop !== 'transform' && getCSSValue(el, prop))) return 'css';
	    if (!is.nul(el[prop]) && !is.und(el[prop])) return 'object';
	  }
	
	  var getInitialTargetValue = function(target, prop) {
	    switch (getAnimationType(target, prop)) {
	      case 'transform': return getTransformValue(target, prop);
	      case 'css': return getCSSValue(target, prop);
	      case 'attribute': return target.getAttribute(prop);
	    }
	    return target[prop] || 0;
	  }
	
	  var getValidValue = function(values, val, originalCSS) {
	    if (is.col(val)) return colorToRgb(val);
	    if (getUnit(val)) return val;
	    var unit = getUnit(values.to) ? getUnit(values.to) : getUnit(values.from);
	    if (!unit && originalCSS) unit = getUnit(originalCSS);
	    return unit ? val + unit : val;
	  }
	
	  var decomposeValue = function(val) {
	    var rgx = /-?\d*\.?\d+/g;
	    return {
	      original: val,
	      numbers: numberToString(val).match(rgx) ? numberToString(val).match(rgx).map(Number) : [0],
	      strings: numberToString(val).split(rgx)
	    }
	  }
	
	  var recomposeValue = function(numbers, strings, initialStrings) {
	    return strings.reduce(function(a, b, i) {
	      var b = (b ? b : initialStrings[i - 1]);
	      return a + numbers[i - 1] + b;
	    });
	  }
	
	  // Animatables
	
	  var getAnimatables = function(targets) {
	    var targets = targets ? (flattenArray(is.arr(targets) ? targets.map(toArray) : toArray(targets))) : [];
	    return targets.map(function(t, i) {
	      return { target: t, id: i };
	    });
	  }
	
	  // Properties
	
	  var getProperties = function(params, settings) {
	    var props = [];
	    for (var p in params) {
	      if (!defaultSettings.hasOwnProperty(p) && p !== 'targets') {
	        var prop = is.obj(params[p]) ? cloneObject(params[p]) : {value: params[p]};
	        prop.name = p;
	        props.push(mergeObjects(prop, settings));
	      }
	    }
	    return props;
	  }
	
	  var getPropertiesValues = function(target, prop, value, i) {
	    var values = toArray( is.fnc(value) ? value(target, i) : value);
	    return {
	      from: (values.length > 1) ? values[0] : getInitialTargetValue(target, prop),
	      to: (values.length > 1) ? values[1] : values[0]
	    }
	  }
	
	  // Tweens
	
	  var getTweenValues = function(prop, values, type, target) {
	    var valid = {};
	    if (type === 'transform') {
	      valid.from = prop + '(' + addDefaultTransformUnit(prop, values.from, values.to) + ')';
	      valid.to = prop + '(' + addDefaultTransformUnit(prop, values.to) + ')';
	    } else {
	      var originalCSS = (type === 'css') ? getCSSValue(target, prop) : undefined;
	      valid.from = getValidValue(values, values.from, originalCSS);
	      valid.to = getValidValue(values, values.to, originalCSS);
	    }
	    return { from: decomposeValue(valid.from), to: decomposeValue(valid.to) };
	  }
	
	  var getTweensProps = function(animatables, props) {
	    var tweensProps = [];
	    animatables.forEach(function(animatable, i) {
	      var target = animatable.target;
	      return props.forEach(function(prop) {
	        var animType = getAnimationType(target, prop.name);
	        if (animType) {
	          var values = getPropertiesValues(target, prop.name, prop.value, i);
	          var tween = cloneObject(prop);
	          tween.animatables = animatable;
	          tween.type = animType;
	          tween.from = getTweenValues(prop.name, values, tween.type, target).from;
	          tween.to = getTweenValues(prop.name, values, tween.type, target).to;
	          tween.round = (is.col(values.from) || tween.round) ? 1 : 0;
	          tween.delay = (is.fnc(tween.delay) ? tween.delay(target, i, animatables.length) : tween.delay) / animation.speed;
	          tween.duration = (is.fnc(tween.duration) ? tween.duration(target, i, animatables.length) : tween.duration) / animation.speed;
	          tweensProps.push(tween);
	        }
	      });
	    });
	    return tweensProps;
	  }
	
	  var getTweens = function(animatables, props) {
	    var tweensProps = getTweensProps(animatables, props);
	    var splittedProps = groupArrayByProps(tweensProps, ['name', 'from', 'to', 'delay', 'duration']);
	    return splittedProps.map(function(tweenProps) {
	      var tween = cloneObject(tweenProps[0]);
	      tween.animatables = tweenProps.map(function(p) { return p.animatables });
	      tween.totalDuration = tween.delay + tween.duration;
	      return tween;
	    });
	  }
	
	  var reverseTweens = function(anim, delays) {
	    anim.tweens.forEach(function(tween) {
	      var toVal = tween.to;
	      var fromVal = tween.from;
	      var delayVal = anim.duration - (tween.delay + tween.duration);
	      tween.from = toVal;
	      tween.to = fromVal;
	      if (delays) tween.delay = delayVal;
	    });
	    anim.reversed = anim.reversed ? false : true;
	  }
	
	  var getTweensDuration = function(tweens) {
	    return Math.max.apply(Math, tweens.map(function(tween){ return tween.totalDuration; }));
	  }
	
	  var getTweensDelay = function(tweens) {
	    return Math.min.apply(Math, tweens.map(function(tween){ return tween.delay; }));
	  }
	
	  // will-change
	
	  var getWillChange = function(anim) {
	    var props = [];
	    var els = [];
	    anim.tweens.forEach(function(tween) {
	      if (tween.type === 'css' || tween.type === 'transform' ) {
	        props.push(tween.type === 'css' ? stringToHyphens(tween.name) : 'transform');
	        tween.animatables.forEach(function(animatable) { els.push(animatable.target); });
	      }
	    });
	    return {
	      properties: removeArrayDuplicates(props).join(', '),
	      elements: removeArrayDuplicates(els)
	    }
	  }
	
	  var setWillChange = function(anim) {
	    var willChange = getWillChange(anim);
	    willChange.elements.forEach(function(element) {
	      element.style.willChange = willChange.properties;
	    });
	  }
	
	  var removeWillChange = function(anim) {
	    var willChange = getWillChange(anim);
	    willChange.elements.forEach(function(element) {
	      element.style.removeProperty('will-change');
	    });
	  }
	
	  /* Svg path */
	
	  var getPathProps = function(path) {
	    var el = is.str(path) ? selectString(path)[0] : path;
	    return {
	      path: el,
	      value: el.getTotalLength()
	    }
	  }
	
	  var snapProgressToPath = function(tween, progress) {
	    var pathEl = tween.path;
	    var pathProgress = tween.value * progress;
	    var point = function(offset) {
	      var o = offset || 0;
	      var p = progress > 1 ? tween.value + o : pathProgress + o;
	      return pathEl.getPointAtLength(p);
	    }
	    var p = point();
	    var p0 = point(-1);
	    var p1 = point(+1);
	    switch (tween.name) {
	      case 'translateX': return p.x;
	      case 'translateY': return p.y;
	      case 'rotate': return Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180 / Math.PI;
	    }
	  }
	
	  // Progress
	
	  var getTweenProgress = function(tween, time) {
	    var elapsed = Math.min(Math.max(time - tween.delay, 0), tween.duration);
	    var percent = elapsed / tween.duration;
	    var progress = tween.to.numbers.map(function(number, p) {
	      var start = tween.from.numbers[p];
	      var eased = easings[tween.easing](percent, tween.elasticity);
	      var val = tween.path ? snapProgressToPath(tween, eased) : start + eased * (number - start);
	      val = tween.round ? Math.round(val * tween.round) / tween.round : val;
	      return val;
	    });
	    return recomposeValue(progress, tween.to.strings, tween.from.strings);
	  }
	
	  var setAnimationProgress = function(anim, time) {
	    var transforms;
	    anim.currentTime = time;
	    anim.progress = (time / anim.duration) * 100;
	    for (var t = 0; t < anim.tweens.length; t++) {
	      var tween = anim.tweens[t];
	      tween.currentValue = getTweenProgress(tween, time);
	      var progress = tween.currentValue;
	      for (var a = 0; a < tween.animatables.length; a++) {
	        var animatable = tween.animatables[a];
	        var id = animatable.id;
	        var target = animatable.target;
	        var name = tween.name;
	        switch (tween.type) {
	          case 'css': target.style[name] = progress; break;
	          case 'attribute': target.setAttribute(name, progress); break;
	          case 'object': target[name] = progress; break;
	          case 'transform':
	          if (!transforms) transforms = {};
	          if (!transforms[id]) transforms[id] = [];
	          transforms[id].push(progress);
	          break;
	        }
	      }
	    }
	    if (transforms) {
	      if (!transform) transform = (getCSSValue(document.body, transformStr) ? '' : '-webkit-') + transformStr;
	      for (var t in transforms) {
	        anim.animatables[t].target.style[transform] = transforms[t].join(' ');
	      }
	    }
	  }
	
	  // Animation
	
	  var createAnimation = function(params) {
	    var anim = {};
	    anim.animatables = getAnimatables(params.targets);
	    anim.settings = mergeObjects(params, defaultSettings);
	    anim.properties = getProperties(params, anim.settings);
	    anim.tweens = getTweens(anim.animatables, anim.properties);
	    anim.duration = anim.tweens.length ? getTweensDuration(anim.tweens) : params.duration;
	    anim.delay = anim.tweens.length ? getTweensDelay(anim.tweens) : params.delay;
	    anim.currentTime = 0;
	    anim.progress = 0;
	    anim.ended = false;
	    return anim;
	  }
	
	  // Public
	
	  var animations = [];
	  var raf = 0;
	
	  var engine = (function() {
	    var play = function() { raf = requestAnimationFrame(step); };
	    var step = function(t) {
	      if (animations.length) {
	        for (var i = 0; i < animations.length; i++) animations[i].tick(t);
	        play();
	      } else {
	        cancelAnimationFrame(raf);
	        raf = 0;
	      }
	    }
	    return play;
	  })();
	
	  var animation = function(params) {
	
	    var anim = createAnimation(params);
	    var time = {};
	
	    anim.tick = function(now) {
	      anim.ended = false;
	      if (!time.start) time.start = now;
	      time.current = Math.min(Math.max(time.last + now - time.start, 0), anim.duration);
	      setAnimationProgress(anim, time.current);
	      var s = anim.settings;
	      if (time.current >= anim.delay) {
	        if (s.begin) s.begin(anim); s.begin = undefined;
	        if (s.update) s.update(anim);
	      }
	      if (time.current >= anim.duration) {
	        if (s.loop) {
	          time.start = now;
	          if (s.direction === 'alternate') reverseTweens(anim, true);
	          if (is.num(s.loop)) s.loop--;
	        } else {
	          anim.ended = true;
	          anim.pause();
	          if (s.complete) s.complete(anim);
	        }
	        time.last = 0;
	      }
	    }
	
	    anim.seek = function(progress) {
	      setAnimationProgress(anim, (progress / 100) * anim.duration);
	    }
	
	    anim.pause = function() {
	      removeWillChange(anim);
	      var i = animations.indexOf(anim);
	      if (i > -1) animations.splice(i, 1);
	    }
	
	    anim.play = function(params) {
	      anim.pause();
	      if (params) anim = mergeObjects(createAnimation(mergeObjects(params, anim.settings)), anim);
	      time.start = 0;
	      time.last = anim.ended ? 0 : anim.currentTime;
	      var s = anim.settings;
	      if (s.direction === 'reverse') reverseTweens(anim);
	      if (s.direction === 'alternate' && !s.loop) s.loop = 1;
	      setWillChange(anim);
	      animations.push(anim);
	      if (!raf) engine();
	    }
	
	    anim.restart = function() {
	      if (anim.reversed) reverseTweens(anim);
	      anim.pause();
	      anim.seek(0);
	      anim.play();
	    }
	
	    if (anim.settings.autoplay) anim.play();
	
	    return anim;
	
	  }
	
	  // Remove one or multiple targets from all active animations.
	
	  var remove = function(elements) {
	    var targets = flattenArray(is.arr(elements) ? elements.map(toArray) : toArray(elements));
	    for (var i = animations.length-1; i >= 0; i--) {
	      var animation = animations[i];
	      var tweens = animation.tweens;
	      for (var t = tweens.length-1; t >= 0; t--) {
	        var animatables = tweens[t].animatables;
	        for (var a = animatables.length-1; a >= 0; a--) {
	          if (arrayContains(targets, animatables[a].target)) {
	            animatables.splice(a, 1);
	            if (!animatables.length) tweens.splice(t, 1);
	            if (!tweens.length) animation.pause();
	          }
	        }
	      }
	    }
	  }
	
	  animation.version = version;
	  animation.speed = 1;
	  animation.list = animations;
	  animation.remove = remove;
	  animation.easings = easings;
	  animation.getValue = getInitialTargetValue;
	  animation.path = getPathProps;
	  animation.random = random;
	
	  return animation;
	
	}));


/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var soundSet1 = exports.soundSet1 = {
	  32: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485317545/clap_ussscf.wav'],
	  65: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485304441/1_xctwu8.mp3'],
	  66: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485304445/2_ew0ciq.mp3'],
	  67: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485304447/3_fvupmh.mp3'],
	  68: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485304439/4_vmc6iv.mp3'],
	  69: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485304451/5_dicr5q.mp3'],
	  70: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485304444/6_w6kndp.mp3'],
	  71: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485304442/7_fdvwdy.mp3'],
	  72: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485304447/8_f5szkh.mp3'],
	  73: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485304447/9_ddy3fb.mp3'],
	  74: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485304450/10_zjbmnr.mp3'],
	  75: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485304458/11_l0kj2j.mp3'],
	  76: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485304449/12_hekw7o.mp3'],
	  77: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485304452/13_ac0yri.mp3'],
	  78: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485304448/14_mm6pxe.mp3'],
	  79: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485304451/15_r8tapy.mp3'],
	  80: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485304457/16_z3jqm7.mp3'],
	  81: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485304463/17_zxtm4k.mp3'],
	  82: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485304454/18_eaveqc.mp3'],
	  83: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485304459/19_fuw8dd.mp3'],
	  84: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485304457/20_bs9a8d.mp3'],
	  85: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485304472/21_rqp5qt.mp3'],
	  86: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485304471/22_j4kmta.mp3'],
	  87: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485304470/23_yagbun.mp3'],
	  88: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485304462/24_ze4ghc.mp3'],
	  89: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485304468/25_tx4b4v.mp3'],
	  90: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485304470/26_lnxzlb.mp3']
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var soundSet2 = exports.soundSet2 = {
	  32: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485317545/clap_ussscf.wav'],
	  65: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485305281/27_hyqs6f.mp3'],
	  66: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485305284/28_a1xtxt.mp3'],
	  67: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485305280/29_mhwpyu.mp3'],
	  68: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485305288/30_iadkv9.mp3'],
	  69: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485305286/31_udsesn.mp3'],
	  70: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485305289/32_kovkgj.mp3'],
	  71: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485305287/33_skjuep.mp3'],
	  72: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485305283/34_lfodfp.mp3'],
	  73: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485305286/35_nrcg0v.mp3'],
	  74: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485305290/36_cey42w.mp3'],
	  75: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485305288/37_lbptfv.mp3'],
	  76: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485305290/38_o8gkzb.mp3'],
	  77: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485305290/39_fr4ynq.mp3'],
	  78: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485305295/40_uq5ksg.mp3'],
	  79: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485305293/41_qberkg.mp3'],
	  80: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485305293/42_apphhd.mp3'],
	  81: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485305298/43_j8e8j8.mp3'],
	  82: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485305298/44_aiakw0.mp3'],
	  83: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485305299/45_msqxca.mp3'],
	  84: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485305295/46_bkwvxn.mp3'],
	  85: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485305296/47_d3rqhn.mp3'],
	  86: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485305300/48_ft4tsc.mp3'],
	  87: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485305300/49_dj3yeb.mp3'],
	  88: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485305300/50_jkg6xg.mp3'],
	  89: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485305301/51_yassg5.mp3'],
	  90: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485305301/52_evxhyz.mp3']
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var soundSet3 = exports.soundSet3 = {
	  32: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485317545/clap_ussscf.wav'],
	  65: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306205/53_aweced.mp3'],
	  66: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306203/54_ybc8rq.mp3'],
	  67: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306203/55_fjox4o.mp3'],
	  68: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306209/56_bcecx7.mp3'],
	  69: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306212/57_iqzppi.mp3'],
	  70: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306205/58_edqghd.mp3'],
	  71: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306204/59_y19nub.mp3'],
	  72: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306207/60_fgtoai.mp3'],
	  73: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306208/61_tumyui.mp3'],
	  74: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306207/62_o5as3j.mp3'],
	  75: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306210/63_tzfy4v.mp3'],
	  76: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306208/64_p1lnfg.mp3'],
	  77: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306208/65_cemr0u.mp3'],
	  78: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306211/66_glvnjx.mp3'],
	  79: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306213/67_n1whl0.mp3'],
	  80: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306213/68_otaywp.mp3'],
	  81: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306212/69_pjnkdj.mp3'],
	  82: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306212/70_wrj9zu.mp3'],
	  83: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306216/71_alqewv.mp3'],
	  84: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306216/72_fc7au3.mp3'],
	  85: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306217/73_nf1wme.mp3'],
	  86: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306217/74_rislgn.mp3'],
	  87: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306219/75_papkff.mp3'],
	  88: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306217/76_xt1d0b.mp3'],
	  89: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306216/77_gskhyv.mp3'],
	  90: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306218/78_xrm1de.mp3']
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var soundSet4 = exports.soundSet4 = {
	  32: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485317545/clap_ussscf.wav'],
	  65: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306306/79_qrx0gf.mp3'],
	  66: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306303/80_rneo7i.mp3'],
	  67: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306307/81_ueyfqz.mp3'],
	  68: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306306/82_nlepoo.mp3'],
	  69: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306314/83_l43vul.mp3'],
	  70: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306305/84_kanfri.mp3'],
	  71: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306305/85_hd93dy.mp3'],
	  72: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306306/86_v8ojzj.mp3'],
	  73: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306306/87_ciwyuf.mp3'],
	  74: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306307/88_s55fss.mp3'],
	  75: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306310/89_u34pa7.mp3'],
	  76: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306308/90_ewmsft.mp3'],
	  77: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306308/91_nslkjq.mp3'],
	  78: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306309/92_vvnwjn.mp3'],
	  79: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306312/93_lqj18n.mp3'],
	  80: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306310/94_dgalal.mp3'],
	  81: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306312/95_dpuxdg.mp3'],
	  82: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306315/96_a3rsno.mp3'],
	  83: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306315/97_meiv5c.mp3'],
	  84: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306312/98_zcijsy.mp3'],
	  85: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306315/99_gs8d3u.mp3'],
	  86: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306316/100_xmevws.mp3'],
	  87: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306316/101_cgeizj.mp3'],
	  88: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306318/102_cfkuny.mp3'],
	  89: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306319/103_hlrafb.mp3'],
	  90: ['https://res.cloudinary.com/dxfu1kzhk/video/upload/v1485306318/104_s18lw0.mp3']
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*! howler.js v2.0.2 | (c) 2013-2016, James Simpson of GoldFire Studios | MIT License | howlerjs.com */
	!function () {
	  "use strict";
	  var e = function e() {
	    this.init();
	  };e.prototype = { init: function init() {
	      var e = this || n;return e._codecs = {}, e._howls = [], e._muted = !1, e._volume = 1, e._canPlayEvent = "canplaythrough", e._navigator = "undefined" != typeof window && window.navigator ? window.navigator : null, e.masterGain = null, e.noAudio = !1, e.usingWebAudio = !0, e.autoSuspend = !0, e.ctx = null, e.mobileAutoEnable = !0, e._setup(), e;
	    }, volume: function volume(e) {
	      var t = this || n;if (e = parseFloat(e), t.ctx || _(), "undefined" != typeof e && e >= 0 && e <= 1) {
	        if (t._volume = e, t._muted) return t;t.usingWebAudio && (t.masterGain.gain.value = e);for (var o = 0; o < t._howls.length; o++) {
	          if (!t._howls[o]._webAudio) for (var r = t._howls[o]._getSoundIds(), u = 0; u < r.length; u++) {
	            var a = t._howls[o]._soundById(r[u]);a && a._node && (a._node.volume = a._volume * e);
	          }
	        }return t;
	      }return t._volume;
	    }, mute: function mute(e) {
	      var t = this || n;t.ctx || _(), t._muted = e, t.usingWebAudio && (t.masterGain.gain.value = e ? 0 : t._volume);for (var o = 0; o < t._howls.length; o++) {
	        if (!t._howls[o]._webAudio) for (var r = t._howls[o]._getSoundIds(), u = 0; u < r.length; u++) {
	          var a = t._howls[o]._soundById(r[u]);a && a._node && (a._node.muted = !!e || a._muted);
	        }
	      }return t;
	    }, unload: function unload() {
	      for (var e = this || n, t = e._howls.length - 1; t >= 0; t--) {
	        e._howls[t].unload();
	      }return e.usingWebAudio && e.ctx && "undefined" != typeof e.ctx.close && (e.ctx.close(), e.ctx = null, _()), e;
	    }, codecs: function codecs(e) {
	      return (this || n)._codecs[e.replace(/^x-/, "")];
	    }, _setup: function _setup() {
	      var e = this || n;if (e.state = e.ctx ? e.ctx.state || "running" : "running", e._autoSuspend(), !e.usingWebAudio) if ("undefined" != typeof Audio) try {
	        var t = new Audio();"undefined" == typeof t.oncanplaythrough && (e._canPlayEvent = "canplay");
	      } catch (n) {
	        e.noAudio = !0;
	      } else e.noAudio = !0;try {
	        var t = new Audio();t.muted && (e.noAudio = !0);
	      } catch (e) {}return e.noAudio || e._setupCodecs(), e;
	    }, _setupCodecs: function _setupCodecs() {
	      var e = this || n,
	          t = null;try {
	        t = "undefined" != typeof Audio ? new Audio() : null;
	      } catch (n) {
	        return e;
	      }if (!t || "function" != typeof t.canPlayType) return e;var o = t.canPlayType("audio/mpeg;").replace(/^no$/, ""),
	          r = e._navigator && e._navigator.userAgent.match(/OPR\/([0-6].)/g),
	          u = r && parseInt(r[0].split("/")[1], 10) < 33;return e._codecs = { mp3: !(u || !o && !t.canPlayType("audio/mp3;").replace(/^no$/, "")), mpeg: !!o, opus: !!t.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""), ogg: !!t.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), oga: !!t.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), wav: !!t.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), aac: !!t.canPlayType("audio/aac;").replace(/^no$/, ""), caf: !!t.canPlayType("audio/x-caf;").replace(/^no$/, ""), m4a: !!(t.canPlayType("audio/x-m4a;") || t.canPlayType("audio/m4a;") || t.canPlayType("audio/aac;")).replace(/^no$/, ""), mp4: !!(t.canPlayType("audio/x-mp4;") || t.canPlayType("audio/mp4;") || t.canPlayType("audio/aac;")).replace(/^no$/, ""), weba: !!t.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, ""), webm: !!t.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, ""), dolby: !!t.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/, ""), flac: !!(t.canPlayType("audio/x-flac;") || t.canPlayType("audio/flac;")).replace(/^no$/, "") }, e;
	    }, _enableMobileAudio: function _enableMobileAudio() {
	      var e = this || n,
	          t = /iPhone|iPad|iPod|Android|BlackBerry|BB10|Silk|Mobi/i.test(e._navigator && e._navigator.userAgent),
	          o = !!("ontouchend" in window || e._navigator && e._navigator.maxTouchPoints > 0 || e._navigator && e._navigator.msMaxTouchPoints > 0);if (!e._mobileEnabled && e.ctx && (t || o)) {
	        e._mobileEnabled = !1, e._mobileUnloaded || 44100 === e.ctx.sampleRate || (e._mobileUnloaded = !0, e.unload()), e._scratchBuffer = e.ctx.createBuffer(1, 1, 22050);var r = function r() {
	          var n = e.ctx.createBufferSource();n.buffer = e._scratchBuffer, n.connect(e.ctx.destination), "undefined" == typeof n.start ? n.noteOn(0) : n.start(0), n.onended = function () {
	            n.disconnect(0), e._mobileEnabled = !0, e.mobileAutoEnable = !1, document.removeEventListener("touchend", r, !0);
	          };
	        };return document.addEventListener("touchend", r, !0), e;
	      }
	    }, _autoSuspend: function _autoSuspend() {
	      var e = this;if (e.autoSuspend && e.ctx && "undefined" != typeof e.ctx.suspend && n.usingWebAudio) {
	        for (var t = 0; t < e._howls.length; t++) {
	          if (e._howls[t]._webAudio) for (var o = 0; o < e._howls[t]._sounds.length; o++) {
	            if (!e._howls[t]._sounds[o]._paused) return e;
	          }
	        }return e._suspendTimer && clearTimeout(e._suspendTimer), e._suspendTimer = setTimeout(function () {
	          e.autoSuspend && (e._suspendTimer = null, e.state = "suspending", e.ctx.suspend().then(function () {
	            e.state = "suspended", e._resumeAfterSuspend && (delete e._resumeAfterSuspend, e._autoResume());
	          }));
	        }, 3e4), e;
	      }
	    }, _autoResume: function _autoResume() {
	      var e = this;if (e.ctx && "undefined" != typeof e.ctx.resume && n.usingWebAudio) return "running" === e.state && e._suspendTimer ? (clearTimeout(e._suspendTimer), e._suspendTimer = null) : "suspended" === e.state ? (e.state = "resuming", e.ctx.resume().then(function () {
	        e.state = "running";for (var n = 0; n < e._howls.length; n++) {
	          e._howls[n]._emit("resume");
	        }
	      }), e._suspendTimer && (clearTimeout(e._suspendTimer), e._suspendTimer = null)) : "suspending" === e.state && (e._resumeAfterSuspend = !0), e;
	    } };var n = new e(),
	      t = function t(e) {
	    var n = this;return e.src && 0 !== e.src.length ? void n.init(e) : void console.error("An array of source files must be passed with any new Howl.");
	  };t.prototype = { init: function init(e) {
	      var t = this;return n.ctx || _(), t._autoplay = e.autoplay || !1, t._format = "string" != typeof e.format ? e.format : [e.format], t._html5 = e.html5 || !1, t._muted = e.mute || !1, t._loop = e.loop || !1, t._pool = e.pool || 5, t._preload = "boolean" != typeof e.preload || e.preload, t._rate = e.rate || 1, t._sprite = e.sprite || {}, t._src = "string" != typeof e.src ? e.src : [e.src], t._volume = void 0 !== e.volume ? e.volume : 1, t._duration = 0, t._state = "unloaded", t._sounds = [], t._endTimers = {}, t._queue = [], t._onend = e.onend ? [{ fn: e.onend }] : [], t._onfade = e.onfade ? [{ fn: e.onfade }] : [], t._onload = e.onload ? [{ fn: e.onload }] : [], t._onloaderror = e.onloaderror ? [{ fn: e.onloaderror }] : [], t._onpause = e.onpause ? [{ fn: e.onpause }] : [], t._onplay = e.onplay ? [{ fn: e.onplay }] : [], t._onstop = e.onstop ? [{ fn: e.onstop }] : [], t._onmute = e.onmute ? [{ fn: e.onmute }] : [], t._onvolume = e.onvolume ? [{ fn: e.onvolume }] : [], t._onrate = e.onrate ? [{ fn: e.onrate }] : [], t._onseek = e.onseek ? [{ fn: e.onseek }] : [], t._onresume = [], t._webAudio = n.usingWebAudio && !t._html5, "undefined" != typeof n.ctx && n.ctx && n.mobileAutoEnable && n._enableMobileAudio(), n._howls.push(t), t._autoplay && t._queue.push({ event: "play", action: function action() {
	          t.play();
	        } }), t._preload && t.load(), t;
	    }, load: function load() {
	      var e = this,
	          t = null;if (n.noAudio) return void e._emit("loaderror", null, "No audio support.");"string" == typeof e._src && (e._src = [e._src]);for (var r = 0; r < e._src.length; r++) {
	        var a, d;if (e._format && e._format[r]) a = e._format[r];else {
	          if (d = e._src[r], "string" != typeof d) {
	            e._emit("loaderror", null, "Non-string found in selected audio sources - ignoring.");continue;
	          }a = /^data:audio\/([^;,]+);/i.exec(d), a || (a = /\.([^.]+)$/.exec(d.split("?", 1)[0])), a && (a = a[1].toLowerCase());
	        }if (n.codecs(a)) {
	          t = e._src[r];break;
	        }
	      }return t ? (e._src = t, e._state = "loading", "https:" === window.location.protocol && "http:" === t.slice(0, 5) && (e._html5 = !0, e._webAudio = !1), new o(e), e._webAudio && u(e), e) : void e._emit("loaderror", null, "No codec support for selected audio sources.");
	    }, play: function play(e, t) {
	      var o = this,
	          r = null;if ("number" == typeof e) r = e, e = null;else {
	        if ("string" == typeof e && "loaded" === o._state && !o._sprite[e]) return null;if ("undefined" == typeof e) {
	          e = "__default";for (var u = 0, a = 0; a < o._sounds.length; a++) {
	            o._sounds[a]._paused && !o._sounds[a]._ended && (u++, r = o._sounds[a]._id);
	          }1 === u ? e = null : r = null;
	        }
	      }var d = r ? o._soundById(r) : o._inactiveSound();if (!d) return null;if (r && !e && (e = d._sprite || "__default"), "loaded" !== o._state && !o._sprite[e]) return o._queue.push({ event: "play", action: function action() {
	          o.play(o._soundById(d._id) ? d._id : void 0);
	        } }), d._id;if (r && !d._paused) return t || setTimeout(function () {
	        o._emit("play", d._id);
	      }, 0), d._id;o._webAudio && n._autoResume();var i = Math.max(0, d._seek > 0 ? d._seek : o._sprite[e][0] / 1e3),
	          _ = Math.max(0, (o._sprite[e][0] + o._sprite[e][1]) / 1e3 - i),
	          s = 1e3 * _ / Math.abs(d._rate);d._paused = !1, d._ended = !1, d._sprite = e, d._seek = i, d._start = o._sprite[e][0] / 1e3, d._stop = (o._sprite[e][0] + o._sprite[e][1]) / 1e3, d._loop = !(!d._loop && !o._sprite[e][2]);var l = d._node;if (o._webAudio) {
	        var f = function f() {
	          o._refreshBuffer(d);var e = d._muted || o._muted ? 0 : d._volume;l.gain.setValueAtTime(e, n.ctx.currentTime), d._playStart = n.ctx.currentTime, "undefined" == typeof l.bufferSource.start ? d._loop ? l.bufferSource.noteGrainOn(0, i, 86400) : l.bufferSource.noteGrainOn(0, i, _) : d._loop ? l.bufferSource.start(0, i, 86400) : l.bufferSource.start(0, i, _), s !== 1 / 0 && (o._endTimers[d._id] = setTimeout(o._ended.bind(o, d), s)), t || setTimeout(function () {
	            o._emit("play", d._id);
	          }, 0);
	        },
	            c = "running" === n.state;"loaded" === o._state && c ? f() : (o.once(c ? "load" : "resume", f, c ? d._id : null), o._clearTimer(d._id));
	      } else {
	        var p = function p() {
	          l.currentTime = i, l.muted = d._muted || o._muted || n._muted || l.muted, l.volume = d._volume * n.volume(), l.playbackRate = d._rate, setTimeout(function () {
	            l.play(), s !== 1 / 0 && (o._endTimers[d._id] = setTimeout(o._ended.bind(o, d), s)), t || o._emit("play", d._id);
	          }, 0);
	        },
	            m = "loaded" === o._state && (window && window.ejecta || !l.readyState && n._navigator.isCocoonJS);if (4 === l.readyState || m) p();else {
	          var v = function v() {
	            p(), l.removeEventListener(n._canPlayEvent, v, !1);
	          };l.addEventListener(n._canPlayEvent, v, !1), o._clearTimer(d._id);
	        }
	      }return d._id;
	    }, pause: function pause(e) {
	      var n = this;if ("loaded" !== n._state) return n._queue.push({ event: "pause", action: function action() {
	          n.pause(e);
	        } }), n;for (var t = n._getSoundIds(e), o = 0; o < t.length; o++) {
	        n._clearTimer(t[o]);var r = n._soundById(t[o]);if (r && !r._paused && (r._seek = n.seek(t[o]), r._rateSeek = 0, r._paused = !0, n._stopFade(t[o]), r._node)) if (n._webAudio) {
	          if (!r._node.bufferSource) return n;"undefined" == typeof r._node.bufferSource.stop ? r._node.bufferSource.noteOff(0) : r._node.bufferSource.stop(0), n._cleanBuffer(r._node);
	        } else isNaN(r._node.duration) && r._node.duration !== 1 / 0 || r._node.pause();arguments[1] || n._emit("pause", r ? r._id : null);
	      }return n;
	    }, stop: function stop(e, n) {
	      var t = this;if ("loaded" !== t._state) return t._queue.push({ event: "stop", action: function action() {
	          t.stop(e);
	        } }), t;for (var o = t._getSoundIds(e), r = 0; r < o.length; r++) {
	        t._clearTimer(o[r]);var u = t._soundById(o[r]);if (u && (u._seek = u._start || 0, u._rateSeek = 0, u._paused = !0, u._ended = !0, t._stopFade(o[r]), u._node)) if (t._webAudio) {
	          if (!u._node.bufferSource) return n || t._emit("stop", u._id), t;"undefined" == typeof u._node.bufferSource.stop ? u._node.bufferSource.noteOff(0) : u._node.bufferSource.stop(0), t._cleanBuffer(u._node);
	        } else isNaN(u._node.duration) && u._node.duration !== 1 / 0 || (u._node.currentTime = u._start || 0, u._node.pause());u && !n && t._emit("stop", u._id);
	      }return t;
	    }, mute: function mute(e, t) {
	      var o = this;if ("loaded" !== o._state) return o._queue.push({ event: "mute", action: function action() {
	          o.mute(e, t);
	        } }), o;if ("undefined" == typeof t) {
	        if ("boolean" != typeof e) return o._muted;o._muted = e;
	      }for (var r = o._getSoundIds(t), u = 0; u < r.length; u++) {
	        var a = o._soundById(r[u]);a && (a._muted = e, o._webAudio && a._node ? a._node.gain.setValueAtTime(e ? 0 : a._volume, n.ctx.currentTime) : a._node && (a._node.muted = !!n._muted || e), o._emit("mute", a._id));
	      }return o;
	    }, volume: function volume() {
	      var e,
	          t,
	          o = this,
	          r = arguments;if (0 === r.length) return o._volume;if (1 === r.length || 2 === r.length && "undefined" == typeof r[1]) {
	        var u = o._getSoundIds(),
	            a = u.indexOf(r[0]);a >= 0 ? t = parseInt(r[0], 10) : e = parseFloat(r[0]);
	      } else r.length >= 2 && (e = parseFloat(r[0]), t = parseInt(r[1], 10));var d;if (!("undefined" != typeof e && e >= 0 && e <= 1)) return d = t ? o._soundById(t) : o._sounds[0], d ? d._volume : 0;if ("loaded" !== o._state) return o._queue.push({ event: "volume", action: function action() {
	          o.volume.apply(o, r);
	        } }), o;"undefined" == typeof t && (o._volume = e), t = o._getSoundIds(t);for (var i = 0; i < t.length; i++) {
	        d = o._soundById(t[i]), d && (d._volume = e, r[2] || o._stopFade(t[i]), o._webAudio && d._node && !d._muted ? d._node.gain.setValueAtTime(e, n.ctx.currentTime) : d._node && !d._muted && (d._node.volume = e * n.volume()), o._emit("volume", d._id));
	      }return o;
	    }, fade: function fade(e, t, o, r) {
	      var u = this,
	          a = Math.abs(e - t),
	          d = e > t ? "out" : "in",
	          i = a / .01,
	          _ = i > 0 ? o / i : o;if (_ < 4 && (i = Math.ceil(i / (4 / _)), _ = 4), "loaded" !== u._state) return u._queue.push({ event: "fade", action: function action() {
	          u.fade(e, t, o, r);
	        } }), u;u.volume(e, r);for (var s = u._getSoundIds(r), l = 0; l < s.length; l++) {
	        var f = u._soundById(s[l]);if (f) {
	          if (r || u._stopFade(s[l]), u._webAudio && !f._muted) {
	            var c = n.ctx.currentTime,
	                p = c + o / 1e3;f._volume = e, f._node.gain.setValueAtTime(e, c), f._node.gain.linearRampToValueAtTime(t, p);
	          }var m = e;f._interval = setInterval(function (e, n) {
	            i > 0 && (m += "in" === d ? .01 : -.01), m = Math.max(0, m), m = Math.min(1, m), m = Math.round(100 * m) / 100, u._webAudio ? ("undefined" == typeof r && (u._volume = m), n._volume = m) : u.volume(m, e, !0), m === t && (clearInterval(n._interval), n._interval = null, u.volume(m, e), u._emit("fade", e));
	          }.bind(u, s[l], f), _);
	        }
	      }return u;
	    }, _stopFade: function _stopFade(e) {
	      var t = this,
	          o = t._soundById(e);return o && o._interval && (t._webAudio && o._node.gain.cancelScheduledValues(n.ctx.currentTime), clearInterval(o._interval), o._interval = null, t._emit("fade", e)), t;
	    }, loop: function loop() {
	      var e,
	          n,
	          t,
	          o = this,
	          r = arguments;if (0 === r.length) return o._loop;if (1 === r.length) {
	        if ("boolean" != typeof r[0]) return t = o._soundById(parseInt(r[0], 10)), !!t && t._loop;e = r[0], o._loop = e;
	      } else 2 === r.length && (e = r[0], n = parseInt(r[1], 10));for (var u = o._getSoundIds(n), a = 0; a < u.length; a++) {
	        t = o._soundById(u[a]), t && (t._loop = e, o._webAudio && t._node && t._node.bufferSource && (t._node.bufferSource.loop = e, e && (t._node.bufferSource.loopStart = t._start || 0, t._node.bufferSource.loopEnd = t._stop)));
	      }return o;
	    }, rate: function rate() {
	      var e,
	          t,
	          o = this,
	          r = arguments;if (0 === r.length) t = o._sounds[0]._id;else if (1 === r.length) {
	        var u = o._getSoundIds(),
	            a = u.indexOf(r[0]);a >= 0 ? t = parseInt(r[0], 10) : e = parseFloat(r[0]);
	      } else 2 === r.length && (e = parseFloat(r[0]), t = parseInt(r[1], 10));var d;if ("number" != typeof e) return d = o._soundById(t), d ? d._rate : o._rate;if ("loaded" !== o._state) return o._queue.push({ event: "rate", action: function action() {
	          o.rate.apply(o, r);
	        } }), o;"undefined" == typeof t && (o._rate = e), t = o._getSoundIds(t);for (var i = 0; i < t.length; i++) {
	        if (d = o._soundById(t[i])) {
	          d._rateSeek = o.seek(t[i]), d._playStart = o._webAudio ? n.ctx.currentTime : d._playStart, d._rate = e, o._webAudio && d._node && d._node.bufferSource ? d._node.bufferSource.playbackRate.value = e : d._node && (d._node.playbackRate = e);var _ = o.seek(t[i]),
	              s = (o._sprite[d._sprite][0] + o._sprite[d._sprite][1]) / 1e3 - _,
	              l = 1e3 * s / Math.abs(d._rate);!o._endTimers[t[i]] && d._paused || (o._clearTimer(t[i]), o._endTimers[t[i]] = setTimeout(o._ended.bind(o, d), l)), o._emit("rate", d._id);
	        }
	      }return o;
	    }, seek: function seek() {
	      var e,
	          t,
	          o = this,
	          r = arguments;if (0 === r.length) t = o._sounds[0]._id;else if (1 === r.length) {
	        var u = o._getSoundIds(),
	            a = u.indexOf(r[0]);a >= 0 ? t = parseInt(r[0], 10) : (t = o._sounds[0]._id, e = parseFloat(r[0]));
	      } else 2 === r.length && (e = parseFloat(r[0]), t = parseInt(r[1], 10));if ("undefined" == typeof t) return o;if ("loaded" !== o._state) return o._queue.push({ event: "seek", action: function action() {
	          o.seek.apply(o, r);
	        } }), o;var d = o._soundById(t);if (d) {
	        if (!("number" == typeof e && e >= 0)) {
	          if (o._webAudio) {
	            var i = o.playing(t) ? n.ctx.currentTime - d._playStart : 0,
	                _ = d._rateSeek ? d._rateSeek - d._seek : 0;return d._seek + (_ + i * Math.abs(d._rate));
	          }return d._node.currentTime;
	        }var s = o.playing(t);s && o.pause(t, !0), d._seek = e, d._ended = !1, o._clearTimer(t), s && o.play(t, !0), !o._webAudio && d._node && (d._node.currentTime = e), o._emit("seek", t);
	      }return o;
	    }, playing: function playing(e) {
	      var n = this;if ("number" == typeof e) {
	        var t = n._soundById(e);return !!t && !t._paused;
	      }for (var o = 0; o < n._sounds.length; o++) {
	        if (!n._sounds[o]._paused) return !0;
	      }return !1;
	    }, duration: function duration(e) {
	      var n = this,
	          t = n._duration,
	          o = n._soundById(e);return o && (t = n._sprite[o._sprite][1] / 1e3), t;
	    }, state: function state() {
	      return this._state;
	    }, unload: function unload() {
	      for (var e = this, t = e._sounds, o = 0; o < t.length; o++) {
	        t[o]._paused || (e.stop(t[o]._id), e._emit("end", t[o]._id)), e._webAudio || (t[o]._node.src = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=", t[o]._node.removeEventListener("error", t[o]._errorFn, !1), t[o]._node.removeEventListener(n._canPlayEvent, t[o]._loadFn, !1)), delete t[o]._node, e._clearTimer(t[o]._id);var u = n._howls.indexOf(e);u >= 0 && n._howls.splice(u, 1);
	      }var a = !0;for (o = 0; o < n._howls.length; o++) {
	        if (n._howls[o]._src === e._src) {
	          a = !1;break;
	        }
	      }return r && a && delete r[e._src], n.noAudio = !1, e._state = "unloaded", e._sounds = [], e = null, null;
	    }, on: function on(e, n, t, o) {
	      var r = this,
	          u = r["_on" + e];return "function" == typeof n && u.push(o ? { id: t, fn: n, once: o } : { id: t, fn: n }), r;
	    }, off: function off(e, n, t) {
	      var o = this,
	          r = o["_on" + e],
	          u = 0;if (n) {
	        for (u = 0; u < r.length; u++) {
	          if (n === r[u].fn && t === r[u].id) {
	            r.splice(u, 1);break;
	          }
	        }
	      } else if (e) o["_on" + e] = [];else {
	        var a = Object.keys(o);for (u = 0; u < a.length; u++) {
	          0 === a[u].indexOf("_on") && Array.isArray(o[a[u]]) && (o[a[u]] = []);
	        }
	      }return o;
	    }, once: function once(e, n, t) {
	      var o = this;return o.on(e, n, t, 1), o;
	    }, _emit: function _emit(e, n, t) {
	      for (var o = this, r = o["_on" + e], u = r.length - 1; u >= 0; u--) {
	        r[u].id && r[u].id !== n && "load" !== e || (setTimeout(function (e) {
	          e.call(this, n, t);
	        }.bind(o, r[u].fn), 0), r[u].once && o.off(e, r[u].fn, r[u].id));
	      }return o;
	    }, _loadQueue: function _loadQueue() {
	      var e = this;if (e._queue.length > 0) {
	        var n = e._queue[0];e.once(n.event, function () {
	          e._queue.shift(), e._loadQueue();
	        }), n.action();
	      }return e;
	    }, _ended: function _ended(e) {
	      var t = this,
	          o = e._sprite,
	          r = !(!e._loop && !t._sprite[o][2]);if (t._emit("end", e._id), !t._webAudio && r && t.stop(e._id, !0).play(e._id), t._webAudio && r) {
	        t._emit("play", e._id), e._seek = e._start || 0, e._rateSeek = 0, e._playStart = n.ctx.currentTime;var u = 1e3 * (e._stop - e._start) / Math.abs(e._rate);t._endTimers[e._id] = setTimeout(t._ended.bind(t, e), u);
	      }return t._webAudio && !r && (e._paused = !0, e._ended = !0, e._seek = e._start || 0, e._rateSeek = 0, t._clearTimer(e._id), t._cleanBuffer(e._node), n._autoSuspend()), t._webAudio || r || t.stop(e._id), t;
	    }, _clearTimer: function _clearTimer(e) {
	      var n = this;return n._endTimers[e] && (clearTimeout(n._endTimers[e]), delete n._endTimers[e]), n;
	    }, _soundById: function _soundById(e) {
	      for (var n = this, t = 0; t < n._sounds.length; t++) {
	        if (e === n._sounds[t]._id) return n._sounds[t];
	      }return null;
	    }, _inactiveSound: function _inactiveSound() {
	      var e = this;e._drain();for (var n = 0; n < e._sounds.length; n++) {
	        if (e._sounds[n]._ended) return e._sounds[n].reset();
	      }return new o(e);
	    }, _drain: function _drain() {
	      var e = this,
	          n = e._pool,
	          t = 0,
	          o = 0;if (!(e._sounds.length < n)) {
	        for (o = 0; o < e._sounds.length; o++) {
	          e._sounds[o]._ended && t++;
	        }for (o = e._sounds.length - 1; o >= 0; o--) {
	          if (t <= n) return;e._sounds[o]._ended && (e._webAudio && e._sounds[o]._node && e._sounds[o]._node.disconnect(0), e._sounds.splice(o, 1), t--);
	        }
	      }
	    }, _getSoundIds: function _getSoundIds(e) {
	      var n = this;if ("undefined" == typeof e) {
	        for (var t = [], o = 0; o < n._sounds.length; o++) {
	          t.push(n._sounds[o]._id);
	        }return t;
	      }return [e];
	    }, _refreshBuffer: function _refreshBuffer(e) {
	      var t = this;return e._node.bufferSource = n.ctx.createBufferSource(), e._node.bufferSource.buffer = r[t._src], e._panner ? e._node.bufferSource.connect(e._panner) : e._node.bufferSource.connect(e._node), e._node.bufferSource.loop = e._loop, e._loop && (e._node.bufferSource.loopStart = e._start || 0, e._node.bufferSource.loopEnd = e._stop), e._node.bufferSource.playbackRate.value = e._rate, t;
	    }, _cleanBuffer: function _cleanBuffer(e) {
	      var n = this;if (n._scratchBuffer) {
	        e.bufferSource.onended = null, e.bufferSource.disconnect(0);try {
	          e.bufferSource.buffer = n._scratchBuffer;
	        } catch (e) {}
	      }return e.bufferSource = null, n;
	    } };var o = function o(e) {
	    this._parent = e, this.init();
	  };o.prototype = { init: function init() {
	      var e = this,
	          n = e._parent;return e._muted = n._muted, e._loop = n._loop, e._volume = n._volume, e._muted = n._muted, e._rate = n._rate, e._seek = 0, e._paused = !0, e._ended = !0, e._sprite = "__default", e._id = Math.round(Date.now() * Math.random()), n._sounds.push(e), e.create(), e;
	    }, create: function create() {
	      var e = this,
	          t = e._parent,
	          o = n._muted || e._muted || e._parent._muted ? 0 : e._volume;return t._webAudio ? (e._node = "undefined" == typeof n.ctx.createGain ? n.ctx.createGainNode() : n.ctx.createGain(), e._node.gain.setValueAtTime(o, n.ctx.currentTime), e._node.paused = !0, e._node.connect(n.masterGain)) : (e._node = new Audio(), e._errorFn = e._errorListener.bind(e), e._node.addEventListener("error", e._errorFn, !1), e._loadFn = e._loadListener.bind(e), e._node.addEventListener(n._canPlayEvent, e._loadFn, !1), e._node.src = t._src, e._node.preload = "auto", e._node.volume = o * n.volume(), e._node.load()), e;
	    }, reset: function reset() {
	      var e = this,
	          n = e._parent;return e._muted = n._muted, e._loop = n._loop, e._volume = n._volume, e._muted = n._muted, e._rate = n._rate, e._seek = 0, e._rateSeek = 0, e._paused = !0, e._ended = !0, e._sprite = "__default", e._id = Math.round(Date.now() * Math.random()), e;
	    }, _errorListener: function _errorListener() {
	      var e = this;e._parent._emit("loaderror", e._id, e._node.error ? e._node.error.code : 0), e._node.removeEventListener("error", e._errorListener, !1);
	    }, _loadListener: function _loadListener() {
	      var e = this,
	          t = e._parent;t._duration = Math.ceil(10 * e._node.duration) / 10, 0 === Object.keys(t._sprite).length && (t._sprite = { __default: [0, 1e3 * t._duration] }), "loaded" !== t._state && (t._state = "loaded", t._emit("load"), t._loadQueue()), e._node.removeEventListener(n._canPlayEvent, e._loadFn, !1);
	    } };var r = {},
	      u = function u(e) {
	    var n = e._src;if (r[n]) return e._duration = r[n].duration, void i(e);if (/^data:[^;]+;base64,/.test(n)) {
	      for (var t = atob(n.split(",")[1]), o = new Uint8Array(t.length), u = 0; u < t.length; ++u) {
	        o[u] = t.charCodeAt(u);
	      }d(o.buffer, e);
	    } else {
	      var _ = new XMLHttpRequest();_.open("GET", n, !0), _.responseType = "arraybuffer", _.onload = function () {
	        var n = (_.status + "")[0];return "0" !== n && "2" !== n && "3" !== n ? void e._emit("loaderror", null, "Failed loading audio file with status: " + _.status + ".") : void d(_.response, e);
	      }, _.onerror = function () {
	        e._webAudio && (e._html5 = !0, e._webAudio = !1, e._sounds = [], delete r[n], e.load());
	      }, a(_);
	    }
	  },
	      a = function a(e) {
	    try {
	      e.send();
	    } catch (n) {
	      e.onerror();
	    }
	  },
	      d = function d(e, t) {
	    n.ctx.decodeAudioData(e, function (e) {
	      e && t._sounds.length > 0 && (r[t._src] = e, i(t, e));
	    }, function () {
	      t._emit("loaderror", null, "Decoding audio data failed.");
	    });
	  },
	      i = function i(e, n) {
	    n && !e._duration && (e._duration = n.duration), 0 === Object.keys(e._sprite).length && (e._sprite = { __default: [0, 1e3 * e._duration] }), "loaded" !== e._state && (e._state = "loaded", e._emit("load"), e._loadQueue());
	  },
	      _ = function _() {
	    try {
	      "undefined" != typeof AudioContext ? n.ctx = new AudioContext() : "undefined" != typeof webkitAudioContext ? n.ctx = new webkitAudioContext() : n.usingWebAudio = !1;
	    } catch (e) {
	      n.usingWebAudio = !1;
	    }var e = /iP(hone|od|ad)/.test(n._navigator && n._navigator.platform),
	        t = n._navigator && n._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),
	        o = t ? parseInt(t[1], 10) : null;if (e && o && o < 9) {
	      var r = /safari/.test(n._navigator && n._navigator.userAgent.toLowerCase());(n._navigator && n._navigator.standalone && !r || n._navigator && !n._navigator.standalone && !r) && (n.usingWebAudio = !1);
	    }n.usingWebAudio && (n.masterGain = "undefined" == typeof n.ctx.createGain ? n.ctx.createGainNode() : n.ctx.createGain(), n.masterGain.gain.value = 1, n.masterGain.connect(n.ctx.destination)), n._setup();
	  };"function" == "function" && __webpack_require__(8) && !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    return { Howler: n, Howl: t };
	  }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)), "undefined" != typeof exports && (exports.Howler = n, exports.Howl = t), "undefined" != typeof window ? (window.HowlerGlobal = e, window.Howler = n, window.Howl = t, window.Sound = o) : "undefined" != typeof global && (global.HowlerGlobal = e, global.Howler = n, global.Howl = t, global.Sound = o);
	}();
	/*! Spatial Plugin */
	!function () {
	  "use strict";
	  HowlerGlobal.prototype._pos = [0, 0, 0], HowlerGlobal.prototype._orientation = [0, 0, -1, 0, 1, 0], HowlerGlobal.prototype.stereo = function (e) {
	    var n = this;if (!n.ctx || !n.ctx.listener) return n;for (var t = n._howls.length - 1; t >= 0; t--) {
	      n._howls[t].stereo(e);
	    }return n;
	  }, HowlerGlobal.prototype.pos = function (e, n, t) {
	    var o = this;return o.ctx && o.ctx.listener ? (n = "number" != typeof n ? o._pos[1] : n, t = "number" != typeof t ? o._pos[2] : t, "number" != typeof e ? o._pos : (o._pos = [e, n, t], o.ctx.listener.setPosition(o._pos[0], o._pos[1], o._pos[2]), o)) : o;
	  }, HowlerGlobal.prototype.orientation = function (e, n, t, o, r, i) {
	    var a = this;if (!a.ctx || !a.ctx.listener) return a;var p = a._orientation;return n = "number" != typeof n ? p[1] : n, t = "number" != typeof t ? p[2] : t, o = "number" != typeof o ? p[3] : o, r = "number" != typeof r ? p[4] : r, i = "number" != typeof i ? p[5] : i, "number" != typeof e ? p : (a._orientation = [e, n, t, o, r, i], a.ctx.listener.setOrientation(e, n, t, o, r, i), a);
	  }, Howl.prototype.init = function (e) {
	    return function (n) {
	      var t = this;return t._orientation = n.orientation || [1, 0, 0], t._stereo = n.stereo || null, t._pos = n.pos || null, t._pannerAttr = { coneInnerAngle: "undefined" != typeof n.coneInnerAngle ? n.coneInnerAngle : 360, coneOuterAngle: "undefined" != typeof n.coneOuterAngle ? n.coneOuterAngle : 360, coneOuterGain: "undefined" != typeof n.coneOuterGain ? n.coneOuterGain : 0, distanceModel: "undefined" != typeof n.distanceModel ? n.distanceModel : "inverse", maxDistance: "undefined" != typeof n.maxDistance ? n.maxDistance : 1e4, panningModel: "undefined" != typeof n.panningModel ? n.panningModel : "HRTF", refDistance: "undefined" != typeof n.refDistance ? n.refDistance : 1, rolloffFactor: "undefined" != typeof n.rolloffFactor ? n.rolloffFactor : 1 }, t._onstereo = n.onstereo ? [{ fn: n.onstereo }] : [], t._onpos = n.onpos ? [{ fn: n.onpos }] : [], t._onorientation = n.onorientation ? [{ fn: n.onorientation }] : [], e.call(this, n);
	    };
	  }(Howl.prototype.init), Howl.prototype.stereo = function (n, t) {
	    var o = this;if (!o._webAudio) return o;if ("loaded" !== o._state) return o._queue.push({ event: "stereo", action: function action() {
	        o.stereo(n, t);
	      } }), o;var r = "undefined" == typeof Howler.ctx.createStereoPanner ? "spatial" : "stereo";if ("undefined" == typeof t) {
	      if ("number" != typeof n) return o._stereo;o._stereo = n, o._pos = [n, 0, 0];
	    }for (var i = o._getSoundIds(t), a = 0; a < i.length; a++) {
	      var p = o._soundById(i[a]);if (p) {
	        if ("number" != typeof n) return p._stereo;p._stereo = n, p._pos = [n, 0, 0], p._node && (p._pannerAttr.panningModel = "equalpower", p._panner && p._panner.pan || e(p, r), "spatial" === r ? p._panner.setPosition(n, 0, 0) : p._panner.pan.value = n), o._emit("stereo", p._id);
	      }
	    }return o;
	  }, Howl.prototype.pos = function (n, t, o, r) {
	    var i = this;if (!i._webAudio) return i;if ("loaded" !== i._state) return i._queue.push({ event: "pos", action: function action() {
	        i.pos(n, t, o, r);
	      } }), i;if (t = "number" != typeof t ? 0 : t, o = "number" != typeof o ? -.5 : o, "undefined" == typeof r) {
	      if ("number" != typeof n) return i._pos;i._pos = [n, t, o];
	    }for (var a = i._getSoundIds(r), p = 0; p < a.length; p++) {
	      var f = i._soundById(a[p]);if (f) {
	        if ("number" != typeof n) return f._pos;f._pos = [n, t, o], f._node && (f._panner && !f._panner.pan || e(f, "spatial"), f._panner.setPosition(n, t, o)), i._emit("pos", f._id);
	      }
	    }return i;
	  }, Howl.prototype.orientation = function (n, t, o, r) {
	    var i = this;if (!i._webAudio) return i;if ("loaded" !== i._state) return i._queue.push({ event: "orientation", action: function action() {
	        i.orientation(n, t, o, r);
	      } }), i;if (t = "number" != typeof t ? i._orientation[1] : t, o = "number" != typeof o ? i._orientation[2] : o, "undefined" == typeof r) {
	      if ("number" != typeof n) return i._orientation;i._orientation = [n, t, o];
	    }for (var a = i._getSoundIds(r), p = 0; p < a.length; p++) {
	      var f = i._soundById(a[p]);if (f) {
	        if ("number" != typeof n) return f._orientation;f._orientation = [n, t, o], f._node && (f._panner || (f._pos || (f._pos = i._pos || [0, 0, -.5]), e(f, "spatial")), f._panner.setOrientation(n, t, o)), i._emit("orientation", f._id);
	      }
	    }return i;
	  }, Howl.prototype.pannerAttr = function () {
	    var n,
	        t,
	        o,
	        r = this,
	        i = arguments;if (!r._webAudio) return r;if (0 === i.length) return r._pannerAttr;if (1 === i.length) {
	      if ("object" != _typeof(i[0])) return o = r._soundById(parseInt(i[0], 10)), o ? o._pannerAttr : r._pannerAttr;n = i[0], "undefined" == typeof t && (r._pannerAttr = { coneInnerAngle: "undefined" != typeof n.coneInnerAngle ? n.coneInnerAngle : r._coneInnerAngle, coneOuterAngle: "undefined" != typeof n.coneOuterAngle ? n.coneOuterAngle : r._coneOuterAngle, coneOuterGain: "undefined" != typeof n.coneOuterGain ? n.coneOuterGain : r._coneOuterGain, distanceModel: "undefined" != typeof n.distanceModel ? n.distanceModel : r._distanceModel, maxDistance: "undefined" != typeof n.maxDistance ? n.maxDistance : r._maxDistance, panningModel: "undefined" != typeof n.panningModel ? n.panningModel : r._panningModel, refDistance: "undefined" != typeof n.refDistance ? n.refDistance : r._refDistance, rolloffFactor: "undefined" != typeof n.rolloffFactor ? n.rolloffFactor : r._rolloffFactor });
	    } else 2 === i.length && (n = i[0], t = parseInt(i[1], 10));for (var a = r._getSoundIds(t), p = 0; p < a.length; p++) {
	      if (o = r._soundById(a[p])) {
	        var f = o._pannerAttr;f = { coneInnerAngle: "undefined" != typeof n.coneInnerAngle ? n.coneInnerAngle : f.coneInnerAngle, coneOuterAngle: "undefined" != typeof n.coneOuterAngle ? n.coneOuterAngle : f.coneOuterAngle, coneOuterGain: "undefined" != typeof n.coneOuterGain ? n.coneOuterGain : f.coneOuterGain, distanceModel: "undefined" != typeof n.distanceModel ? n.distanceModel : f.distanceModel, maxDistance: "undefined" != typeof n.maxDistance ? n.maxDistance : f.maxDistance, panningModel: "undefined" != typeof n.panningModel ? n.panningModel : f.panningModel, refDistance: "undefined" != typeof n.refDistance ? n.refDistance : f.refDistance, rolloffFactor: "undefined" != typeof n.rolloffFactor ? n.rolloffFactor : f.rolloffFactor };var s = o._panner;s ? (s.coneInnerAngle = f.coneInnerAngle, s.coneOuterAngle = f.coneOuterAngle, s.coneOuterGain = f.coneOuterGain, s.distanceModel = f.distanceModel, s.maxDistance = f.maxDistance, s.panningModel = f.panningModel, s.refDistance = f.refDistance, s.rolloffFactor = f.rolloffFactor) : (o._pos || (o._pos = r._pos || [0, 0, -.5]), e(o, "spatial"));
	      }
	    }return r;
	  }, Sound.prototype.init = function (e) {
	    return function () {
	      var n = this,
	          t = n._parent;n._orientation = t._orientation, n._stereo = t._stereo, n._pos = t._pos, n._pannerAttr = t._pannerAttr, e.call(this), n._stereo ? t.stereo(n._stereo) : n._pos && t.pos(n._pos[0], n._pos[1], n._pos[2], n._id);
	    };
	  }(Sound.prototype.init), Sound.prototype.reset = function (e) {
	    return function () {
	      var n = this,
	          t = n._parent;return n._orientation = t._orientation, n._pos = t._pos, n._pannerAttr = t._pannerAttr, e.call(this);
	    };
	  }(Sound.prototype.reset);var e = function e(_e, n) {
	    n = n || "spatial", "spatial" === n ? (_e._panner = Howler.ctx.createPanner(), _e._panner.coneInnerAngle = _e._pannerAttr.coneInnerAngle, _e._panner.coneOuterAngle = _e._pannerAttr.coneOuterAngle, _e._panner.coneOuterGain = _e._pannerAttr.coneOuterGain, _e._panner.distanceModel = _e._pannerAttr.distanceModel, _e._panner.maxDistance = _e._pannerAttr.maxDistance, _e._panner.panningModel = _e._pannerAttr.panningModel, _e._panner.refDistance = _e._pannerAttr.refDistance, _e._panner.rolloffFactor = _e._pannerAttr.rolloffFactor, _e._panner.setPosition(_e._pos[0], _e._pos[1], _e._pos[2]), _e._panner.setOrientation(_e._orientation[0], _e._orientation[1], _e._orientation[2])) : (_e._panner = Howler.ctx.createStereoPanner(), _e._panner.pan.value = _e._stereo), _e._panner.connect(_e._node), _e._paused || _e._parent.pause(_e._id, !0).play(_e._id);
	  };
	}();
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 8 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;
	
	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _animejs = __webpack_require__(2);
	
	var _animejs2 = _interopRequireDefault(_animejs);
	
	var _sound_set_ = __webpack_require__(3);
	
	var _howlerMin = __webpack_require__(7);
	
	var _howlerMin2 = _interopRequireDefault(_howlerMin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Start = function Start(ctx, canvas) {
	
	  var numOfCircles = 25;
	  var distance = 300;
	  var actions = [];
	  var sound = void 0;
	
	  var fontSize = function fontSize() {
	    return parseFloat(getComputedStyle(document.documentElement).fontSize);
	  };
	
	  var resizeCanvas = function resizeCanvas() {
	    canvas.width = window.innerWidth;
	    canvas.height = window.innerHeight;
	  };
	
	  var removeAction = function removeAction(action) {
	    var idx = actions.indexOf(action);
	    if (idx > -1) actions.splice(idx, 1);
	  };
	
	  var drawRipple = function drawRipple(x, y) {
	    //Choose a random colorset
	    var colorSet = ["#f8ffe5", "#06D6A0", "#1B9AAA", "#EF476F", "#FFC43D"];
	    var ripple = {};
	
	    ripple.x = x;
	    ripple.y = y;
	    ripple.color = colorSet[_animejs2.default.random(0, colorSet.length - 1)];
	    ripple.radius = 0;
	    ripple.alpha = 1;
	    ripple.lineWidth = 5;
	
	    ripple.draw = function () {
	      ctx.globalAlpha = ripple.alpha;
	      ctx.beginPath();
	      ctx.arc(ripple.x, ripple.y, ripple.radius, 2 * Math.PI, false);
	      ctx.lineWidth = ripple.lineWidth;
	      ctx.strokeStyle = ripple.color;
	      ctx.stroke();
	      ctx.globalAlpha = 1;
	    };
	
	    return ripple;
	  };
	
	  var drawCircle = function drawCircle(x, y) {
	    var colorSet = ["#f8ffe5", "#06D6A0", "#1B9AAA", "#EF476F", "#FFC43D"];
	    var circle = {};
	    circle.x = x;
	    circle.y = y;
	    circle.color = colorSet[_animejs2.default.random(0, colorSet.length - 1)];
	    circle.radius = _animejs2.default.random(fontSize(), fontSize() * 2);
	
	    circle.draw = function () {
	      ctx.beginPath();
	      ctx.arc(circle.x, circle.y, circle.radius, 2 * Math.PI, false);
	      ctx.fillStyle = circle.color;
	      ctx.fill();
	    };
	
	    return circle;
	  };
	
	  var drawCircles = function drawCircles(x, y) {
	    var circles = [];
	    for (var i = 0; i < numOfCircles; i++) {
	      var circle = drawCircle(x, y);
	      circles.push(circle);
	    }
	    return circles;
	  };
	
	  var animateRipple = function animateRipple(ripple, size) {
	    return (0, _animejs2.default)({
	      targets: ripple,
	      radius: function radius() {
	        return _animejs2.default.random(fontSize() * size, fontSize() * (size + 2));
	      },
	      lineWidth: 0,
	      alpha: {
	        value: 0,
	        easing: 'linear',
	        duration: function duration() {
	          return _animejs2.default.random(300, 500);
	        }
	      },
	      duration: function duration() {
	        return _animejs2.default.random(1000, 1300);
	      },
	      easing: 'easeOutExpo',
	      complete: removeAction
	    });
	  };
	
	  var animateCircles = function animateCircles(x, y) {
	    resizeCanvas();
	
	    //Draw shapes
	    var circles = drawCircles(x, y);
	    var ripple1 = drawRipple(x, y);
	    var ripple2 = drawRipple(x, y);
	    var ripple3 = drawRipple(x, y);
	
	    //Animate shapes
	    var circleAnimation = (0, _animejs2.default)({
	      targets: circles,
	      x: function x(circle) {
	        return circle.x + _animejs2.default.random(-distance, distance);
	      },
	      y: function y(circle) {
	        return circle.y + _animejs2.default.random(-distance, distance);
	      },
	      radius: 0,
	      duration: function duration() {
	        return _animejs2.default.random(1000, 1300);
	      },
	      easing: 'easeOutExpo',
	      complete: removeAction
	    });
	
	    //Animate ripples
	    var ripple1Animation = animateRipple(ripple1, 5);
	    var ripple2Animation = animateRipple(ripple2, 7);
	    var ripple3Animation = animateRipple(ripple3, 9);
	
	    actions.push(circleAnimation);
	    actions.push(ripple1Animation);
	    actions.push(ripple2Animation);
	    actions.push(ripple3Animation);
	  };
	
	  var removeContainer = function removeContainer() {
	    $('#title').removeClass('bounceIn');
	    $('#description').removeClass('bounceIn');
	  };
	
	  var pulseContainer = function pulseContainer() {
	    $('#title').addClass('bounceIn');
	    $('#description').addClass('bounceIn');
	    setTimeout(removeContainer, 300);
	  };
	
	  var removeLogo = function removeLogo() {
	    $('#logo').removeClass('bounceIn');
	  };
	
	  var pulseLogo = function pulseLogo() {
	    $('#logo').addClass('bounceIn');
	
	    var el = $('#logo');
	    var offset = el.offset();
	
	    animateCircles(offset.left, offset.top);
	    var animate = (0, _animejs2.default)({
	      duration: 1000,
	      update: function update() {
	        ctx.clearRect(0, 0, canvas.width, canvas.height);
	        actions.forEach(function (action) {
	          action.animatables.forEach(function (animatable) {
	            animatable.target.draw();
	          });
	        });
	      }
	    });
	
	    sound = new Howl({
	      src: _sound_set_.soundSet1[65]
	    });
	    sound.play();
	
	    setTimeout(removeLogo, 300);
	  };
	
	  setTimeout(pulseContainer, 800);
	  setTimeout(pulseLogo, 1000);
	};
	
	exports.default = Start;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map