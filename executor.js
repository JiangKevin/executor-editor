(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Executor"] = factory();
	else
		root["Executor"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// Import default styles.
	
	var _executorManager = __webpack_require__(/*! ./scripts/executor-manager */ 1);
	
	var _executorManager2 = _interopRequireDefault(_executorManager);
	
	var _package = __webpack_require__(/*! ../package.json */ 311);
	
	var _package2 = _interopRequireDefault(_package);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	__webpack_require__(/*! ./styles/executor.css */ 312);
	
	// Browser polyfills.
	__webpack_require__(/*! ./vendors/polyfills */ 316);
	
	// Defined default layout for JavaScript mode in Ace editor.
	__webpack_require__(/*! ../bower_components/ace-builds/src-min/ace */ 317);
	__webpack_require__(/*! ../bower_components/ace-builds/src-min/ext-language_tools */ 318);
	__webpack_require__(/*! ../bower_components/ace-builds/src-min/mode-javascript */ 319);
	__webpack_require__(/*! ../bower_components/ace-builds/src-min/theme-tomorrow */ 320);
	
	var Executor = {
	    VERSION: _package2.default.version,
	    AUTHOR: _package2.default.author,
	    LICENSE: _package2.default.license,
	
	    setup: function setup() {
	        var $instances = window.document.querySelectorAll('.executor-code');
	
	        Array.prototype.forEach.call($instances, function ($instance) {
	            var settings = {};
	
	            if (Number($instance.dataset.fontSize)) {
	                settings.fontSize = Number($instance.dataset.fontSize);
	            }
	
	            if (Number($instance.dataset.timeout)) {
	                settings.timeout = Number($instance.dataset.timeout);
	            }
	
	            return new _executorManager2.default($instance, settings);
	        });
	    }
	};
	
	module.exports = Executor;

/***/ },
/* 1 */
/*!*****************************************!*\
  !*** ./lib/scripts/executor-manager.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _toolbar = __webpack_require__(/*! ./editor/toolbar */ 2);
	
	var _toolbar2 = _interopRequireDefault(_toolbar);
	
	var _executeManager = __webpack_require__(/*! ./helpers/execute-manager */ 3);
	
	var _executeManager2 = _interopRequireDefault(_executeManager);
	
	var _aceHelper = __webpack_require__(/*! ./editor/ace-helper */ 302);
	
	var _aceHelper2 = _interopRequireDefault(_aceHelper);
	
	var _autoEvaluateCheckbox = __webpack_require__(/*! ./toolbar-controls/auto-evaluate-checkbox */ 303);
	
	var _autoEvaluateCheckbox2 = _interopRequireDefault(_autoEvaluateCheckbox);
	
	var _executeButton = __webpack_require__(/*! ./toolbar-controls/execute-button */ 304);
	
	var _executeButton2 = _interopRequireDefault(_executeButton);
	
	var _fontSizeInput = __webpack_require__(/*! ./toolbar-controls/font-size-input */ 305);
	
	var _fontSizeInput2 = _interopRequireDefault(_fontSizeInput);
	
	var _layoutSwitcher = __webpack_require__(/*! ./toolbar-controls/layout-switcher */ 306);
	
	var _layoutSwitcher2 = _interopRequireDefault(_layoutSwitcher);
	
	var _maximizeButton = __webpack_require__(/*! ./toolbar-controls/maximize-button */ 307);
	
	var _maximizeButton2 = _interopRequireDefault(_maximizeButton);
	
	var _selectEnvironment = __webpack_require__(/*! ./toolbar-controls/select-environment */ 308);
	
	var _selectEnvironment2 = _interopRequireDefault(_selectEnvironment);
	
	var _resultsWindow = __webpack_require__(/*! ./result/results-window */ 309);
	
	var _resultsWindow2 = _interopRequireDefault(_resultsWindow);
	
	var _versionLabel = __webpack_require__(/*! ./result/version-label */ 310);
	
	var _versionLabel2 = _interopRequireDefault(_versionLabel);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Executor = function () {
	    function Executor($code, settings) {
	        _classCallCheck(this, Executor);
	
	        this.listing = null;
	        this.$code = null;
	        this.$main = null;
	        this.$global = null;
	        this.settings = {
	            fontSize: 16,
	            timeout: 1000
	        };
	        this.toolbar = null;
	        this.aceHelper = null;
	        this.autoEvaluate = null;
	        this.selectEnvironment = null;
	        this.layoutSwitcher = null;
	        this.maximizeButton = null;
	        this.fontSizeInput = null;
	        this.executeButton = null;
	        this.resultsWindow = null;
	        this.versionLabel = null;
	
	        this.listing = $code.innerHTML;
	        this.settings = Object.assign(this.settings, settings);
	        this.toolbar = new _toolbar2.default();
	
	        this.compile();
	        this.render($code);
	
	        this.buildToolbar();
	        this.setupEvents();
	        this.applySettings();
	
	        this.$global.appendChild(this.toolbar.$el);
	        this.$global.appendChild(this.$main);
	        this.$global.appendChild(this.versionLabel.$el);
	    }
	
	    _createClass(Executor, [{
	        key: 'compile',
	        value: function compile() {
	            this.$code = window.document.createElement('pre');
	            this.$code.classList.add('executor-code');
	            this.$code.innerHTML = this.listing;
	
	            this.$main = window.document.createElement('section');
	            this.$main.classList.add('executor-main');
	            this.$main.appendChild(this.$code);
	
	            this.$global = window.document.createElement('div');
	            this.$global.classList.add('executor');
	        }
	    }, {
	        key: 'render',
	        value: function render($code) {
	            $code.parentNode.replaceChild(this.$global, $code);
	        }
	    }, {
	        key: 'buildToolbar',
	        value: function buildToolbar() {
	            this.aceHelper = new _aceHelper2.default();
	
	            this.autoEvaluate = this.toolbar.add(new _autoEvaluateCheckbox2.default());
	            this.selectEnvironment = this.toolbar.add(new _selectEnvironment2.default());
	            this.layoutSwitcher = this.toolbar.add(new _layoutSwitcher2.default());
	            this.maximizeButton = this.toolbar.add(new _maximizeButton2.default());
	            this.fontSizeInput = this.toolbar.add(new _fontSizeInput2.default());
	            this.executeButton = this.toolbar.add(new _executeButton2.default());
	
	            this.resultsWindow = new _resultsWindow2.default();
	            this.versionLabel = new _versionLabel2.default();
	        }
	    }, {
	        key: 'setupEvents',
	        value: function setupEvents() {
	            var _this = this;
	
	            var runCode = function runCode() {
	                _this.resultsWindow.setup();
	                _this.execute(_this.selectEnvironment.getValue(), _this.aceHelper.getCode());
	            };
	
	            // Toolbar
	            // -------
	
	            // Ad 1. Auto evaluate
	            this.aceHelper.setup(this.$code);
	
	            this.aceHelper.editor.on('change', function () {
	                _this.autoEvaluate.setup(runCode, _this.settings.timeout);
	            });
	
	            // Ad 2. Environment
	            this.selectEnvironment.setup(runCode);
	
	            // Ad 3. Layout
	            this.layoutSwitcher.setup(function () {
	                _this.$code.classList.remove('executor-left-column');
	                _this.resultsWindow.$el.classList.remove('executor-right-column');
	                _this.aceHelper.editor.resize();
	            }, function () {
	                _this.$code.classList.add('executor-left-column');
	                _this.resultsWindow.$el.classList.add('executor-right-column');
	                _this.aceHelper.editor.resize();
	            });
	
	            // Ad 4. Maximize
	            this.maximizeButton.setup(function () {
	                _this.toolbar.$el.classList.remove('executor-hidden-item');
	                _this.$code.classList.remove('executor-maximize');
	                _this.resultsWindow.$el.classList.remove('executor-hidden-item');
	                _this.aceHelper.editor.resize();
	            }, function () {
	                _this.toolbar.$el.classList.add('executor-hidden-item');
	                _this.$code.classList.add('executor-maximize');
	                _this.resultsWindow.$el.classList.add('executor-hidden-item');
	                _this.aceHelper.editor.resize();
	                _this.aceHelper.editor.focus();
	            });
	
	            // Ad 5. Font Size
	            this.fontSizeInput.setup(function (size) {
	                _this.settings.fontSize = size;
	                _this.applySettings();
	            });
	
	            // Ad 6. Execute
	            this.executeButton.setup(runCode);
	
	            this.$main.appendChild(this.resultsWindow.$el);
	        }
	    }, {
	        key: 'applySettings',
	        value: function applySettings() {
	            var fontSize = this.settings.fontSize;
	
	            this.aceHelper.editor.setFontSize(fontSize);
	            this.fontSizeInput.$input.value = fontSize;
	            this.resultsWindow.$el.style.fontSize = fontSize + 'px';
	        }
	    }, {
	        key: 'execute',
	        value: function execute(name, code) {
	            try {
	                _executeManager2.default.execute(name, code);
	            } catch (e) {
	                console.error(e.message);
	            }
	
	            this.resultsWindow.print();
	        }
	    }]);
	
	    return Executor;
	}();
	
	exports.default = Executor;

/***/ },
/* 2 */
/*!***************************************!*\
  !*** ./lib/scripts/editor/toolbar.js ***!
  \***************************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Toolbar = function () {
	    function Toolbar() {
	        _classCallCheck(this, Toolbar);
	
	        this.$el = null;
	
	        this.compile();
	    }
	
	    _createClass(Toolbar, [{
	        key: 'compile',
	        value: function compile() {
	            this.$el = window.document.createElement('form');
	            this.$el.classList.add('executor-toolbar');
	        }
	    }, {
	        key: 'add',
	        value: function add(item) {
	            var $item = window.document.createElement('div');
	
	            $item.classList.add('executor-toolbar-control');
	            $item.appendChild(item.$el);
	            this.$el.appendChild($item);
	
	            return item;
	        }
	    }]);
	
	    return Toolbar;
	}();
	
	exports.default = Toolbar;

/***/ },
/* 3 */
/*!************************************************!*\
  !*** ./lib/scripts/helpers/execute-manager.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(/*! babel-polyfill */ 4);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Babel = __webpack_require__(/*! babel-standalone */ 301);
	
	var ExecuteManager = function () {
	    function ExecuteManager() {
	        _classCallCheck(this, ExecuteManager);
	    }
	
	    _createClass(ExecuteManager, null, [{
	        key: 'execute',
	        value: function execute(name, code) {
	            switch (name) {
	                case 'babel':
	                    code = Babel.transform(code, { presets: ['es2015', 'stage-0'] }).code;
	                    window.eval(code);
	                    break;
	
	                case 'browser':
	                    window.eval(code);
	                    break;
	
	                // no default
	            }
	        }
	    }]);
	
	    return ExecuteManager;
	}();
	
	exports.default = ExecuteManager;

/***/ },
/* 4 */
/*!***************************************!*\
  !*** ./~/babel-polyfill/lib/index.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/* eslint max-len: 0 */
	
	"use strict";
	
	__webpack_require__(/*! core-js/shim */ 5);
	
	__webpack_require__(/*! babel-regenerator-runtime */ 296);
	
	// Should be removed in the next major release:
	
	__webpack_require__(/*! core-js/fn/regexp/escape */ 298);
	
	if (global._babelPolyfill) {
	  throw new Error("only one instance of babel-polyfill is allowed");
	}
	global._babelPolyfill = true;
	
	var DEFINE_PROPERTY = "defineProperty";
	function define(O, key, value) {
	  O[key] || Object[DEFINE_PROPERTY](O, key, {
	    writable: true,
	    configurable: true,
	    value: value
	  });
	}
	
	define(String.prototype, "padLeft", "".padStart);
	define(String.prototype, "padRight", "".padEnd);
	
	"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
	  [][key] && define(Array, key, Function.call.bind([][key]));
	});
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 5 */
/*!********************************************!*\
  !*** ./~/babel-polyfill/~/core-js/shim.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ./modules/es6.symbol */ 6);
	__webpack_require__(/*! ./modules/es6.object.create */ 55);
	__webpack_require__(/*! ./modules/es6.object.define-property */ 56);
	__webpack_require__(/*! ./modules/es6.object.define-properties */ 57);
	__webpack_require__(/*! ./modules/es6.object.get-own-property-descriptor */ 58);
	__webpack_require__(/*! ./modules/es6.object.get-prototype-of */ 60);
	__webpack_require__(/*! ./modules/es6.object.keys */ 63);
	__webpack_require__(/*! ./modules/es6.object.get-own-property-names */ 64);
	__webpack_require__(/*! ./modules/es6.object.freeze */ 65);
	__webpack_require__(/*! ./modules/es6.object.seal */ 66);
	__webpack_require__(/*! ./modules/es6.object.prevent-extensions */ 67);
	__webpack_require__(/*! ./modules/es6.object.is-frozen */ 68);
	__webpack_require__(/*! ./modules/es6.object.is-sealed */ 69);
	__webpack_require__(/*! ./modules/es6.object.is-extensible */ 70);
	__webpack_require__(/*! ./modules/es6.object.assign */ 71);
	__webpack_require__(/*! ./modules/es6.object.is */ 73);
	__webpack_require__(/*! ./modules/es6.object.set-prototype-of */ 75);
	__webpack_require__(/*! ./modules/es6.object.to-string */ 77);
	__webpack_require__(/*! ./modules/es6.function.bind */ 79);
	__webpack_require__(/*! ./modules/es6.function.name */ 82);
	__webpack_require__(/*! ./modules/es6.function.has-instance */ 83);
	__webpack_require__(/*! ./modules/es6.parse-int */ 84);
	__webpack_require__(/*! ./modules/es6.parse-float */ 88);
	__webpack_require__(/*! ./modules/es6.number.constructor */ 90);
	__webpack_require__(/*! ./modules/es6.number.to-fixed */ 92);
	__webpack_require__(/*! ./modules/es6.number.to-precision */ 96);
	__webpack_require__(/*! ./modules/es6.number.epsilon */ 97);
	__webpack_require__(/*! ./modules/es6.number.is-finite */ 98);
	__webpack_require__(/*! ./modules/es6.number.is-integer */ 99);
	__webpack_require__(/*! ./modules/es6.number.is-nan */ 101);
	__webpack_require__(/*! ./modules/es6.number.is-safe-integer */ 102);
	__webpack_require__(/*! ./modules/es6.number.max-safe-integer */ 103);
	__webpack_require__(/*! ./modules/es6.number.min-safe-integer */ 104);
	__webpack_require__(/*! ./modules/es6.number.parse-float */ 105);
	__webpack_require__(/*! ./modules/es6.number.parse-int */ 106);
	__webpack_require__(/*! ./modules/es6.math.acosh */ 107);
	__webpack_require__(/*! ./modules/es6.math.asinh */ 109);
	__webpack_require__(/*! ./modules/es6.math.atanh */ 110);
	__webpack_require__(/*! ./modules/es6.math.cbrt */ 111);
	__webpack_require__(/*! ./modules/es6.math.clz32 */ 113);
	__webpack_require__(/*! ./modules/es6.math.cosh */ 114);
	__webpack_require__(/*! ./modules/es6.math.expm1 */ 115);
	__webpack_require__(/*! ./modules/es6.math.fround */ 117);
	__webpack_require__(/*! ./modules/es6.math.hypot */ 118);
	__webpack_require__(/*! ./modules/es6.math.imul */ 119);
	__webpack_require__(/*! ./modules/es6.math.log10 */ 120);
	__webpack_require__(/*! ./modules/es6.math.log1p */ 121);
	__webpack_require__(/*! ./modules/es6.math.log2 */ 122);
	__webpack_require__(/*! ./modules/es6.math.sign */ 123);
	__webpack_require__(/*! ./modules/es6.math.sinh */ 124);
	__webpack_require__(/*! ./modules/es6.math.tanh */ 125);
	__webpack_require__(/*! ./modules/es6.math.trunc */ 126);
	__webpack_require__(/*! ./modules/es6.string.from-code-point */ 127);
	__webpack_require__(/*! ./modules/es6.string.raw */ 128);
	__webpack_require__(/*! ./modules/es6.string.trim */ 129);
	__webpack_require__(/*! ./modules/es6.string.iterator */ 130);
	__webpack_require__(/*! ./modules/es6.string.code-point-at */ 135);
	__webpack_require__(/*! ./modules/es6.string.ends-with */ 136);
	__webpack_require__(/*! ./modules/es6.string.includes */ 140);
	__webpack_require__(/*! ./modules/es6.string.repeat */ 141);
	__webpack_require__(/*! ./modules/es6.string.starts-with */ 142);
	__webpack_require__(/*! ./modules/es6.string.anchor */ 143);
	__webpack_require__(/*! ./modules/es6.string.big */ 145);
	__webpack_require__(/*! ./modules/es6.string.blink */ 146);
	__webpack_require__(/*! ./modules/es6.string.bold */ 147);
	__webpack_require__(/*! ./modules/es6.string.fixed */ 148);
	__webpack_require__(/*! ./modules/es6.string.fontcolor */ 149);
	__webpack_require__(/*! ./modules/es6.string.fontsize */ 150);
	__webpack_require__(/*! ./modules/es6.string.italics */ 151);
	__webpack_require__(/*! ./modules/es6.string.link */ 152);
	__webpack_require__(/*! ./modules/es6.string.small */ 153);
	__webpack_require__(/*! ./modules/es6.string.strike */ 154);
	__webpack_require__(/*! ./modules/es6.string.sub */ 155);
	__webpack_require__(/*! ./modules/es6.string.sup */ 156);
	__webpack_require__(/*! ./modules/es6.date.now */ 157);
	__webpack_require__(/*! ./modules/es6.date.to-json */ 158);
	__webpack_require__(/*! ./modules/es6.date.to-iso-string */ 159);
	__webpack_require__(/*! ./modules/es6.date.to-string */ 160);
	__webpack_require__(/*! ./modules/es6.date.to-primitive */ 161);
	__webpack_require__(/*! ./modules/es6.array.is-array */ 163);
	__webpack_require__(/*! ./modules/es6.array.from */ 164);
	__webpack_require__(/*! ./modules/es6.array.of */ 170);
	__webpack_require__(/*! ./modules/es6.array.join */ 171);
	__webpack_require__(/*! ./modules/es6.array.slice */ 173);
	__webpack_require__(/*! ./modules/es6.array.sort */ 174);
	__webpack_require__(/*! ./modules/es6.array.for-each */ 175);
	__webpack_require__(/*! ./modules/es6.array.map */ 179);
	__webpack_require__(/*! ./modules/es6.array.filter */ 180);
	__webpack_require__(/*! ./modules/es6.array.some */ 181);
	__webpack_require__(/*! ./modules/es6.array.every */ 182);
	__webpack_require__(/*! ./modules/es6.array.reduce */ 183);
	__webpack_require__(/*! ./modules/es6.array.reduce-right */ 185);
	__webpack_require__(/*! ./modules/es6.array.index-of */ 186);
	__webpack_require__(/*! ./modules/es6.array.last-index-of */ 187);
	__webpack_require__(/*! ./modules/es6.array.copy-within */ 188);
	__webpack_require__(/*! ./modules/es6.array.fill */ 191);
	__webpack_require__(/*! ./modules/es6.array.find */ 193);
	__webpack_require__(/*! ./modules/es6.array.find-index */ 194);
	__webpack_require__(/*! ./modules/es6.array.species */ 195);
	__webpack_require__(/*! ./modules/es6.array.iterator */ 197);
	__webpack_require__(/*! ./modules/es6.regexp.constructor */ 199);
	__webpack_require__(/*! ./modules/es6.regexp.to-string */ 201);
	__webpack_require__(/*! ./modules/es6.regexp.flags */ 202);
	__webpack_require__(/*! ./modules/es6.regexp.match */ 203);
	__webpack_require__(/*! ./modules/es6.regexp.replace */ 205);
	__webpack_require__(/*! ./modules/es6.regexp.search */ 206);
	__webpack_require__(/*! ./modules/es6.regexp.split */ 207);
	__webpack_require__(/*! ./modules/es6.promise */ 208);
	__webpack_require__(/*! ./modules/es6.map */ 214);
	__webpack_require__(/*! ./modules/es6.set */ 217);
	__webpack_require__(/*! ./modules/es6.weak-map */ 218);
	__webpack_require__(/*! ./modules/es6.weak-set */ 220);
	__webpack_require__(/*! ./modules/es6.typed.array-buffer */ 221);
	__webpack_require__(/*! ./modules/es6.typed.data-view */ 224);
	__webpack_require__(/*! ./modules/es6.typed.int8-array */ 225);
	__webpack_require__(/*! ./modules/es6.typed.uint8-array */ 228);
	__webpack_require__(/*! ./modules/es6.typed.uint8-clamped-array */ 229);
	__webpack_require__(/*! ./modules/es6.typed.int16-array */ 230);
	__webpack_require__(/*! ./modules/es6.typed.uint16-array */ 231);
	__webpack_require__(/*! ./modules/es6.typed.int32-array */ 232);
	__webpack_require__(/*! ./modules/es6.typed.uint32-array */ 233);
	__webpack_require__(/*! ./modules/es6.typed.float32-array */ 234);
	__webpack_require__(/*! ./modules/es6.typed.float64-array */ 235);
	__webpack_require__(/*! ./modules/es6.reflect.apply */ 236);
	__webpack_require__(/*! ./modules/es6.reflect.construct */ 237);
	__webpack_require__(/*! ./modules/es6.reflect.define-property */ 238);
	__webpack_require__(/*! ./modules/es6.reflect.delete-property */ 239);
	__webpack_require__(/*! ./modules/es6.reflect.enumerate */ 240);
	__webpack_require__(/*! ./modules/es6.reflect.get */ 241);
	__webpack_require__(/*! ./modules/es6.reflect.get-own-property-descriptor */ 242);
	__webpack_require__(/*! ./modules/es6.reflect.get-prototype-of */ 243);
	__webpack_require__(/*! ./modules/es6.reflect.has */ 244);
	__webpack_require__(/*! ./modules/es6.reflect.is-extensible */ 245);
	__webpack_require__(/*! ./modules/es6.reflect.own-keys */ 246);
	__webpack_require__(/*! ./modules/es6.reflect.prevent-extensions */ 248);
	__webpack_require__(/*! ./modules/es6.reflect.set */ 249);
	__webpack_require__(/*! ./modules/es6.reflect.set-prototype-of */ 250);
	__webpack_require__(/*! ./modules/es7.array.includes */ 251);
	__webpack_require__(/*! ./modules/es7.string.at */ 252);
	__webpack_require__(/*! ./modules/es7.string.pad-start */ 253);
	__webpack_require__(/*! ./modules/es7.string.pad-end */ 255);
	__webpack_require__(/*! ./modules/es7.string.trim-left */ 256);
	__webpack_require__(/*! ./modules/es7.string.trim-right */ 257);
	__webpack_require__(/*! ./modules/es7.string.match-all */ 258);
	__webpack_require__(/*! ./modules/es7.symbol.async-iterator */ 259);
	__webpack_require__(/*! ./modules/es7.symbol.observable */ 260);
	__webpack_require__(/*! ./modules/es7.object.get-own-property-descriptors */ 261);
	__webpack_require__(/*! ./modules/es7.object.values */ 262);
	__webpack_require__(/*! ./modules/es7.object.entries */ 264);
	__webpack_require__(/*! ./modules/es7.object.define-getter */ 265);
	__webpack_require__(/*! ./modules/es7.object.define-setter */ 267);
	__webpack_require__(/*! ./modules/es7.object.lookup-getter */ 268);
	__webpack_require__(/*! ./modules/es7.object.lookup-setter */ 269);
	__webpack_require__(/*! ./modules/es7.map.to-json */ 270);
	__webpack_require__(/*! ./modules/es7.set.to-json */ 273);
	__webpack_require__(/*! ./modules/es7.system.global */ 274);
	__webpack_require__(/*! ./modules/es7.error.is-error */ 275);
	__webpack_require__(/*! ./modules/es7.math.iaddh */ 276);
	__webpack_require__(/*! ./modules/es7.math.isubh */ 277);
	__webpack_require__(/*! ./modules/es7.math.imulh */ 278);
	__webpack_require__(/*! ./modules/es7.math.umulh */ 279);
	__webpack_require__(/*! ./modules/es7.reflect.define-metadata */ 280);
	__webpack_require__(/*! ./modules/es7.reflect.delete-metadata */ 282);
	__webpack_require__(/*! ./modules/es7.reflect.get-metadata */ 283);
	__webpack_require__(/*! ./modules/es7.reflect.get-metadata-keys */ 284);
	__webpack_require__(/*! ./modules/es7.reflect.get-own-metadata */ 285);
	__webpack_require__(/*! ./modules/es7.reflect.get-own-metadata-keys */ 286);
	__webpack_require__(/*! ./modules/es7.reflect.has-metadata */ 287);
	__webpack_require__(/*! ./modules/es7.reflect.has-own-metadata */ 288);
	__webpack_require__(/*! ./modules/es7.reflect.metadata */ 289);
	__webpack_require__(/*! ./modules/es7.asap */ 290);
	__webpack_require__(/*! ./modules/web.timers */ 291);
	__webpack_require__(/*! ./modules/web.immediate */ 294);
	__webpack_require__(/*! ./modules/web.dom.iterable */ 295);
	module.exports = __webpack_require__(/*! ./modules/_core */ 12);

/***/ },
/* 6 */
/*!**********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.symbol.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(/*! ./_global */ 7)
	  , has            = __webpack_require__(/*! ./_has */ 8)
	  , DESCRIPTORS    = __webpack_require__(/*! ./_descriptors */ 9)
	  , $export        = __webpack_require__(/*! ./_export */ 11)
	  , redefine       = __webpack_require__(/*! ./_redefine */ 21)
	  , META           = __webpack_require__(/*! ./_meta */ 25).KEY
	  , $fails         = __webpack_require__(/*! ./_fails */ 10)
	  , shared         = __webpack_require__(/*! ./_shared */ 26)
	  , setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 27)
	  , uid            = __webpack_require__(/*! ./_uid */ 22)
	  , wks            = __webpack_require__(/*! ./_wks */ 28)
	  , wksExt         = __webpack_require__(/*! ./_wks-ext */ 29)
	  , wksDefine      = __webpack_require__(/*! ./_wks-define */ 30)
	  , keyOf          = __webpack_require__(/*! ./_keyof */ 32)
	  , enumKeys       = __webpack_require__(/*! ./_enum-keys */ 45)
	  , isArray        = __webpack_require__(/*! ./_is-array */ 48)
	  , anObject       = __webpack_require__(/*! ./_an-object */ 15)
	  , toIObject      = __webpack_require__(/*! ./_to-iobject */ 35)
	  , toPrimitive    = __webpack_require__(/*! ./_to-primitive */ 19)
	  , createDesc     = __webpack_require__(/*! ./_property-desc */ 20)
	  , _create        = __webpack_require__(/*! ./_object-create */ 49)
	  , gOPNExt        = __webpack_require__(/*! ./_object-gopn-ext */ 52)
	  , $GOPD          = __webpack_require__(/*! ./_object-gopd */ 54)
	  , $DP            = __webpack_require__(/*! ./_object-dp */ 14)
	  , $keys          = __webpack_require__(/*! ./_object-keys */ 33)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;
	
	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};
	
	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};
	
	var $defineProperty = function defineProperty(it, key, D){
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  var D = gOPD(it = toIObject(it), key = toPrimitive(key, true));
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
	  return result;
	};
	
	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
	      configurable: true,
	      set: function(value){
	        if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	        setSymbolDesc(this, tag, createDesc(1, value));
	      }
	    });
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });
	
	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(/*! ./_object-gopn */ 53).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(/*! ./_object-pie */ 47).f  = $propertyIsEnumerable;
	  __webpack_require__(/*! ./_object-gops */ 46).f = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(/*! ./_library */ 31)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	
	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});
	
	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);
	
	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);
	
	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});
	
	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	
	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});
	
	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(/*! ./_hide */ 13)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 7 */
/*!*******************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_global.js ***!
  \*******************************************************/
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 8 */
/*!****************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_has.js ***!
  \****************************************************/
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 9 */
/*!************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_descriptors.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(/*! ./_fails */ 10)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 10 */
/*!******************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_fails.js ***!
  \******************************************************/
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 11 */
/*!*******************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_export.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(/*! ./_global */ 7)
	  , core      = __webpack_require__(/*! ./_core */ 12)
	  , hide      = __webpack_require__(/*! ./_hide */ 13)
	  , redefine  = __webpack_require__(/*! ./_redefine */ 21)
	  , ctx       = __webpack_require__(/*! ./_ctx */ 23)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
	    , key, own, out, exp;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // extend global
	    if(target)redefine(target, key, out, type & $export.U);
	    // export
	    if(exports[key] != out)hide(exports, key, exp);
	    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
	  }
	};
	global.core = core;
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 12 */
/*!*****************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_core.js ***!
  \*****************************************************/
/***/ function(module, exports) {

	var core = module.exports = {version: '2.3.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 13 */
/*!*****************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_hide.js ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(/*! ./_object-dp */ 14)
	  , createDesc = __webpack_require__(/*! ./_property-desc */ 20);
	module.exports = __webpack_require__(/*! ./_descriptors */ 9) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 14 */
/*!**********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_object-dp.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(/*! ./_an-object */ 15)
	  , IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 17)
	  , toPrimitive    = __webpack_require__(/*! ./_to-primitive */ 19)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(/*! ./_descriptors */ 9) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 15 */
/*!**********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_an-object.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(/*! ./_is-object */ 16);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 16 */
/*!**********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_is-object.js ***!
  \**********************************************************/
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 17 */
/*!***************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_ie8-dom-define.js ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(/*! ./_descriptors */ 9) && !__webpack_require__(/*! ./_fails */ 10)(function(){
	  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ 18)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 18 */
/*!***********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_dom-create.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(/*! ./_is-object */ 16)
	  , document = __webpack_require__(/*! ./_global */ 7).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 19 */
/*!*************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_to-primitive.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(/*! ./_is-object */ 16);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 20 */
/*!**************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_property-desc.js ***!
  \**************************************************************/
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 21 */
/*!*********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_redefine.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(/*! ./_global */ 7)
	  , hide      = __webpack_require__(/*! ./_hide */ 13)
	  , has       = __webpack_require__(/*! ./_has */ 8)
	  , SRC       = __webpack_require__(/*! ./_uid */ 22)('src')
	  , TO_STRING = 'toString'
	  , $toString = Function[TO_STRING]
	  , TPL       = ('' + $toString).split(TO_STRING);
	
	__webpack_require__(/*! ./_core */ 12).inspectSource = function(it){
	  return $toString.call(it);
	};
	
	(module.exports = function(O, key, val, safe){
	  var isFunction = typeof val == 'function';
	  if(isFunction)has(val, 'name') || hide(val, 'name', key);
	  if(O[key] === val)return;
	  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if(O === global){
	    O[key] = val;
	  } else {
	    if(!safe){
	      delete O[key];
	      hide(O, key, val);
	    } else {
	      if(O[key])O[key] = val;
	      else hide(O, key, val);
	    }
	  }
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString(){
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});

/***/ },
/* 22 */
/*!****************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_uid.js ***!
  \****************************************************/
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 23 */
/*!****************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_ctx.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(/*! ./_a-function */ 24);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 24 */
/*!***********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_a-function.js ***!
  \***********************************************************/
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 25 */
/*!*****************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_meta.js ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(/*! ./_uid */ 22)('meta')
	  , isObject = __webpack_require__(/*! ./_is-object */ 16)
	  , has      = __webpack_require__(/*! ./_has */ 8)
	  , setDesc  = __webpack_require__(/*! ./_object-dp */ 14).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(/*! ./_fails */ 10)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 26 */
/*!*******************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_shared.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(/*! ./_global */ 7)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 27 */
/*!******************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_set-to-string-tag.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(/*! ./_object-dp */ 14).f
	  , has = __webpack_require__(/*! ./_has */ 8)
	  , TAG = __webpack_require__(/*! ./_wks */ 28)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 28 */
/*!****************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_wks.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(/*! ./_shared */ 26)('wks')
	  , uid        = __webpack_require__(/*! ./_uid */ 22)
	  , Symbol     = __webpack_require__(/*! ./_global */ 7).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 29 */
/*!********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_wks-ext.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(/*! ./_wks */ 28);

/***/ },
/* 30 */
/*!***********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_wks-define.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(/*! ./_global */ 7)
	  , core           = __webpack_require__(/*! ./_core */ 12)
	  , LIBRARY        = __webpack_require__(/*! ./_library */ 31)
	  , wksExt         = __webpack_require__(/*! ./_wks-ext */ 29)
	  , defineProperty = __webpack_require__(/*! ./_object-dp */ 14).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 31 */
/*!********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_library.js ***!
  \********************************************************/
/***/ function(module, exports) {

	module.exports = false;

/***/ },
/* 32 */
/*!******************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_keyof.js ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(/*! ./_object-keys */ 33)
	  , toIObject = __webpack_require__(/*! ./_to-iobject */ 35);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 33 */
/*!************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_object-keys.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(/*! ./_object-keys-internal */ 34)
	  , enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 44);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 34 */
/*!*********************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_object-keys-internal.js ***!
  \*********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(/*! ./_has */ 8)
	  , toIObject    = __webpack_require__(/*! ./_to-iobject */ 35)
	  , arrayIndexOf = __webpack_require__(/*! ./_array-includes */ 39)(false)
	  , IE_PROTO     = __webpack_require__(/*! ./_shared-key */ 43)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 35 */
/*!***********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_to-iobject.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(/*! ./_iobject */ 36)
	  , defined = __webpack_require__(/*! ./_defined */ 38);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 36 */
/*!********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_iobject.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(/*! ./_cof */ 37);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 37 */
/*!****************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_cof.js ***!
  \****************************************************/
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 38 */
/*!********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_defined.js ***!
  \********************************************************/
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 39 */
/*!***************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_array-includes.js ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(/*! ./_to-iobject */ 35)
	  , toLength  = __webpack_require__(/*! ./_to-length */ 40)
	  , toIndex   = __webpack_require__(/*! ./_to-index */ 42);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 40 */
/*!**********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_to-length.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(/*! ./_to-integer */ 41)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 41 */
/*!***********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_to-integer.js ***!
  \***********************************************************/
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 42 */
/*!*********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_to-index.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(/*! ./_to-integer */ 41)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 43 */
/*!***********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_shared-key.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(/*! ./_shared */ 26)('keys')
	  , uid    = __webpack_require__(/*! ./_uid */ 22);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 44 */
/*!**************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_enum-bug-keys.js ***!
  \**************************************************************/
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 45 */
/*!**********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_enum-keys.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(/*! ./_object-keys */ 33)
	  , gOPS    = __webpack_require__(/*! ./_object-gops */ 46)
	  , pIE     = __webpack_require__(/*! ./_object-pie */ 47);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 46 */
/*!************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_object-gops.js ***!
  \************************************************************/
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 47 */
/*!***********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_object-pie.js ***!
  \***********************************************************/
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 48 */
/*!*********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_is-array.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(/*! ./_cof */ 37);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 49 */
/*!**************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_object-create.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(/*! ./_an-object */ 15)
	  , dPs         = __webpack_require__(/*! ./_object-dps */ 50)
	  , enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 44)
	  , IE_PROTO    = __webpack_require__(/*! ./_shared-key */ 43)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(/*! ./_dom-create */ 18)('iframe')
	    , i      = enumBugKeys.length
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(/*! ./_html */ 51).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write('<script>document.F=Object</script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};

/***/ },
/* 50 */
/*!***********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_object-dps.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(/*! ./_object-dp */ 14)
	  , anObject = __webpack_require__(/*! ./_an-object */ 15)
	  , getKeys  = __webpack_require__(/*! ./_object-keys */ 33);
	
	module.exports = __webpack_require__(/*! ./_descriptors */ 9) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 51 */
/*!*****************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_html.js ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./_global */ 7).document && document.documentElement;

/***/ },
/* 52 */
/*!****************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_object-gopn-ext.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(/*! ./_to-iobject */ 35)
	  , gOPN      = __webpack_require__(/*! ./_object-gopn */ 53).f
	  , toString  = {}.toString;
	
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};
	
	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 53 */
/*!************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_object-gopn.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(/*! ./_object-keys-internal */ 34)
	  , hiddenKeys = __webpack_require__(/*! ./_enum-bug-keys */ 44).concat('length', 'prototype');
	
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 54 */
/*!************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_object-gopd.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(/*! ./_object-pie */ 47)
	  , createDesc     = __webpack_require__(/*! ./_property-desc */ 20)
	  , toIObject      = __webpack_require__(/*! ./_to-iobject */ 35)
	  , toPrimitive    = __webpack_require__(/*! ./_to-primitive */ 19)
	  , has            = __webpack_require__(/*! ./_has */ 8)
	  , IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 17)
	  , gOPD           = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(/*! ./_descriptors */ 9) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 55 */
/*!*****************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.object.create.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(/*! ./_export */ 11)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(/*! ./_object-create */ 49)});

/***/ },
/* 56 */
/*!**************************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.object.define-property.js ***!
  \**************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(/*! ./_export */ 11);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ 9), 'Object', {defineProperty: __webpack_require__(/*! ./_object-dp */ 14).f});

/***/ },
/* 57 */
/*!****************************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.object.define-properties.js ***!
  \****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(/*! ./_export */ 11);
	// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
	$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ 9), 'Object', {defineProperties: __webpack_require__(/*! ./_object-dps */ 50)});

/***/ },
/* 58 */
/*!**************************************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.object.get-own-property-descriptor.js ***!
  \**************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject                 = __webpack_require__(/*! ./_to-iobject */ 35)
	  , $getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ 54).f;
	
	__webpack_require__(/*! ./_object-sap */ 59)('getOwnPropertyDescriptor', function(){
	  return function getOwnPropertyDescriptor(it, key){
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

/***/ },
/* 59 */
/*!***********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_object-sap.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(/*! ./_export */ 11)
	  , core    = __webpack_require__(/*! ./_core */ 12)
	  , fails   = __webpack_require__(/*! ./_fails */ 10);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 60 */
/*!***************************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.object.get-prototype-of.js ***!
  \***************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject        = __webpack_require__(/*! ./_to-object */ 61)
	  , $getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 62);
	
	__webpack_require__(/*! ./_object-sap */ 59)('getPrototypeOf', function(){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 61 */
/*!**********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_to-object.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(/*! ./_defined */ 38);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 62 */
/*!***********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_object-gpo.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(/*! ./_has */ 8)
	  , toObject    = __webpack_require__(/*! ./_to-object */ 61)
	  , IE_PROTO    = __webpack_require__(/*! ./_shared-key */ 43)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 63 */
/*!***************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.object.keys.js ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(/*! ./_to-object */ 61)
	  , $keys    = __webpack_require__(/*! ./_object-keys */ 33);
	
	__webpack_require__(/*! ./_object-sap */ 59)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 64 */
/*!*********************************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.object.get-own-property-names.js ***!
  \*********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 Object.getOwnPropertyNames(O)
	__webpack_require__(/*! ./_object-sap */ 59)('getOwnPropertyNames', function(){
	  return __webpack_require__(/*! ./_object-gopn-ext */ 52).f;
	});

/***/ },
/* 65 */
/*!*****************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.object.freeze.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.5 Object.freeze(O)
	var isObject = __webpack_require__(/*! ./_is-object */ 16)
	  , meta     = __webpack_require__(/*! ./_meta */ 25).onFreeze;
	
	__webpack_require__(/*! ./_object-sap */ 59)('freeze', function($freeze){
	  return function freeze(it){
	    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
	  };
	});

/***/ },
/* 66 */
/*!***************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.object.seal.js ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.17 Object.seal(O)
	var isObject = __webpack_require__(/*! ./_is-object */ 16)
	  , meta     = __webpack_require__(/*! ./_meta */ 25).onFreeze;
	
	__webpack_require__(/*! ./_object-sap */ 59)('seal', function($seal){
	  return function seal(it){
	    return $seal && isObject(it) ? $seal(meta(it)) : it;
	  };
	});

/***/ },
/* 67 */
/*!*****************************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.object.prevent-extensions.js ***!
  \*****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.15 Object.preventExtensions(O)
	var isObject = __webpack_require__(/*! ./_is-object */ 16)
	  , meta     = __webpack_require__(/*! ./_meta */ 25).onFreeze;
	
	__webpack_require__(/*! ./_object-sap */ 59)('preventExtensions', function($preventExtensions){
	  return function preventExtensions(it){
	    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
	  };
	});

/***/ },
/* 68 */
/*!********************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.object.is-frozen.js ***!
  \********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.12 Object.isFrozen(O)
	var isObject = __webpack_require__(/*! ./_is-object */ 16);
	
	__webpack_require__(/*! ./_object-sap */ 59)('isFrozen', function($isFrozen){
	  return function isFrozen(it){
	    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
	  };
	});

/***/ },
/* 69 */
/*!********************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.object.is-sealed.js ***!
  \********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.13 Object.isSealed(O)
	var isObject = __webpack_require__(/*! ./_is-object */ 16);
	
	__webpack_require__(/*! ./_object-sap */ 59)('isSealed', function($isSealed){
	  return function isSealed(it){
	    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
	  };
	});

/***/ },
/* 70 */
/*!************************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.object.is-extensible.js ***!
  \************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.11 Object.isExtensible(O)
	var isObject = __webpack_require__(/*! ./_is-object */ 16);
	
	__webpack_require__(/*! ./_object-sap */ 59)('isExtensible', function($isExtensible){
	  return function isExtensible(it){
	    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
	  };
	});

/***/ },
/* 71 */
/*!*****************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.object.assign.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(/*! ./_export */ 11);
	
	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(/*! ./_object-assign */ 72)});

/***/ },
/* 72 */
/*!**************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_object-assign.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(/*! ./_object-keys */ 33)
	  , gOPS     = __webpack_require__(/*! ./_object-gops */ 46)
	  , pIE      = __webpack_require__(/*! ./_object-pie */ 47)
	  , toObject = __webpack_require__(/*! ./_to-object */ 61)
	  , IObject  = __webpack_require__(/*! ./_iobject */ 36)
	  , $assign  = Object.assign;
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(/*! ./_fails */ 10)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 73 */
/*!*************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.object.is.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.10 Object.is(value1, value2)
	var $export = __webpack_require__(/*! ./_export */ 11);
	$export($export.S, 'Object', {is: __webpack_require__(/*! ./_same-value */ 74)});

/***/ },
/* 74 */
/*!***********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_same-value.js ***!
  \***********************************************************/
/***/ function(module, exports) {

	// 7.2.9 SameValue(x, y)
	module.exports = Object.is || function is(x, y){
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

/***/ },
/* 75 */
/*!***************************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.object.set-prototype-of.js ***!
  \***************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(/*! ./_export */ 11);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(/*! ./_set-proto */ 76).set});

/***/ },
/* 76 */
/*!**********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_set-proto.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(/*! ./_is-object */ 16)
	  , anObject = __webpack_require__(/*! ./_an-object */ 15);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(/*! ./_ctx */ 23)(Function.call, __webpack_require__(/*! ./_object-gopd */ 54).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 77 */
/*!********************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.object.to-string.js ***!
  \********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.3.6 Object.prototype.toString()
	var classof = __webpack_require__(/*! ./_classof */ 78)
	  , test    = {};
	test[__webpack_require__(/*! ./_wks */ 28)('toStringTag')] = 'z';
	if(test + '' != '[object z]'){
	  __webpack_require__(/*! ./_redefine */ 21)(Object.prototype, 'toString', function toString(){
	    return '[object ' + classof(this) + ']';
	  }, true);
	}

/***/ },
/* 78 */
/*!********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_classof.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(/*! ./_cof */ 37)
	  , TAG = __webpack_require__(/*! ./_wks */ 28)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 79 */
/*!*****************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.function.bind.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
	var $export = __webpack_require__(/*! ./_export */ 11);
	
	$export($export.P, 'Function', {bind: __webpack_require__(/*! ./_bind */ 80)});

/***/ },
/* 80 */
/*!*****************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_bind.js ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var aFunction  = __webpack_require__(/*! ./_a-function */ 24)
	  , isObject   = __webpack_require__(/*! ./_is-object */ 16)
	  , invoke     = __webpack_require__(/*! ./_invoke */ 81)
	  , arraySlice = [].slice
	  , factories  = {};
	
	var construct = function(F, len, args){
	  if(!(len in factories)){
	    for(var n = [], i = 0; i < len; i++)n[i] = 'a[' + i + ']';
	    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
	  } return factories[len](F, args);
	};
	
	module.exports = Function.bind || function bind(that /*, args... */){
	  var fn       = aFunction(this)
	    , partArgs = arraySlice.call(arguments, 1);
	  var bound = function(/* args... */){
	    var args = partArgs.concat(arraySlice.call(arguments));
	    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
	  };
	  if(isObject(fn.prototype))bound.prototype = fn.prototype;
	  return bound;
	};

/***/ },
/* 81 */
/*!*******************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_invoke.js ***!
  \*******************************************************/
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 82 */
/*!*****************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.function.name.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(/*! ./_object-dp */ 14).f
	  , createDesc = __webpack_require__(/*! ./_property-desc */ 20)
	  , has        = __webpack_require__(/*! ./_has */ 8)
	  , FProto     = Function.prototype
	  , nameRE     = /^\s*function ([^ (]*)/
	  , NAME       = 'name';
	
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	
	// 19.2.4.2 name
	NAME in FProto || __webpack_require__(/*! ./_descriptors */ 9) && dP(FProto, NAME, {
	  configurable: true,
	  get: function(){
	    try {
	      var that = this
	        , name = ('' + that).match(nameRE)[1];
	      has(that, NAME) || !isExtensible(that) || dP(that, NAME, createDesc(5, name));
	      return name;
	    } catch(e){
	      return '';
	    }
	  }
	});

/***/ },
/* 83 */
/*!*************************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.function.has-instance.js ***!
  \*************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var isObject       = __webpack_require__(/*! ./_is-object */ 16)
	  , getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 62)
	  , HAS_INSTANCE   = __webpack_require__(/*! ./_wks */ 28)('hasInstance')
	  , FunctionProto  = Function.prototype;
	// 19.2.3.6 Function.prototype[@@hasInstance](V)
	if(!(HAS_INSTANCE in FunctionProto))__webpack_require__(/*! ./_object-dp */ 14).f(FunctionProto, HAS_INSTANCE, {value: function(O){
	  if(typeof this != 'function' || !isObject(O))return false;
	  if(!isObject(this.prototype))return O instanceof this;
	  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
	  while(O = getPrototypeOf(O))if(this.prototype === O)return true;
	  return false;
	}});

/***/ },
/* 84 */
/*!*************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.parse-int.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $export   = __webpack_require__(/*! ./_export */ 11)
	  , $parseInt = __webpack_require__(/*! ./_parse-int */ 85);
	// 18.2.5 parseInt(string, radix)
	$export($export.G + $export.F * (parseInt != $parseInt), {parseInt: $parseInt});

/***/ },
/* 85 */
/*!**********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_parse-int.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $parseInt = __webpack_require__(/*! ./_global */ 7).parseInt
	  , $trim     = __webpack_require__(/*! ./_string-trim */ 86).trim
	  , ws        = __webpack_require__(/*! ./_string-ws */ 87)
	  , hex       = /^[\-+]?0[xX]/;
	
	module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix){
	  var string = $trim(String(str), 3);
	  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
	} : $parseInt;

/***/ },
/* 86 */
/*!************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_string-trim.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(/*! ./_export */ 11)
	  , defined = __webpack_require__(/*! ./_defined */ 38)
	  , fails   = __webpack_require__(/*! ./_fails */ 10)
	  , spaces  = __webpack_require__(/*! ./_string-ws */ 87)
	  , space   = '[' + spaces + ']'
	  , non     = '\u200b\u0085'
	  , ltrim   = RegExp('^' + space + space + '*')
	  , rtrim   = RegExp(space + space + '*$');
	
	var exporter = function(KEY, exec, ALIAS){
	  var exp   = {};
	  var FORCE = fails(function(){
	    return !!spaces[KEY]() || non[KEY]() != non;
	  });
	  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
	  if(ALIAS)exp[ALIAS] = fn;
	  $export($export.P + $export.F * FORCE, 'String', exp);
	};
	
	// 1 -> String#trimLeft
	// 2 -> String#trimRight
	// 3 -> String#trim
	var trim = exporter.trim = function(string, TYPE){
	  string = String(defined(string));
	  if(TYPE & 1)string = string.replace(ltrim, '');
	  if(TYPE & 2)string = string.replace(rtrim, '');
	  return string;
	};
	
	module.exports = exporter;

/***/ },
/* 87 */
/*!**********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_string-ws.js ***!
  \**********************************************************/
/***/ function(module, exports) {

	module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
	  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

/***/ },
/* 88 */
/*!***************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.parse-float.js ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $export     = __webpack_require__(/*! ./_export */ 11)
	  , $parseFloat = __webpack_require__(/*! ./_parse-float */ 89);
	// 18.2.4 parseFloat(string)
	$export($export.G + $export.F * (parseFloat != $parseFloat), {parseFloat: $parseFloat});

/***/ },
/* 89 */
/*!************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_parse-float.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $parseFloat = __webpack_require__(/*! ./_global */ 7).parseFloat
	  , $trim       = __webpack_require__(/*! ./_string-trim */ 86).trim;
	
	module.exports = 1 / $parseFloat(__webpack_require__(/*! ./_string-ws */ 87) + '-0') !== -Infinity ? function parseFloat(str){
	  var string = $trim(String(str), 3)
	    , result = $parseFloat(string);
	  return result === 0 && string.charAt(0) == '-' ? -0 : result;
	} : $parseFloat;

/***/ },
/* 90 */
/*!**********************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.number.constructor.js ***!
  \**********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global            = __webpack_require__(/*! ./_global */ 7)
	  , has               = __webpack_require__(/*! ./_has */ 8)
	  , cof               = __webpack_require__(/*! ./_cof */ 37)
	  , inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ 91)
	  , toPrimitive       = __webpack_require__(/*! ./_to-primitive */ 19)
	  , fails             = __webpack_require__(/*! ./_fails */ 10)
	  , gOPN              = __webpack_require__(/*! ./_object-gopn */ 53).f
	  , gOPD              = __webpack_require__(/*! ./_object-gopd */ 54).f
	  , dP                = __webpack_require__(/*! ./_object-dp */ 14).f
	  , $trim             = __webpack_require__(/*! ./_string-trim */ 86).trim
	  , NUMBER            = 'Number'
	  , $Number           = global[NUMBER]
	  , Base              = $Number
	  , proto             = $Number.prototype
	  // Opera ~12 has broken Object#toString
	  , BROKEN_COF        = cof(__webpack_require__(/*! ./_object-create */ 49)(proto)) == NUMBER
	  , TRIM              = 'trim' in String.prototype;
	
	// 7.1.3 ToNumber(argument)
	var toNumber = function(argument){
	  var it = toPrimitive(argument, false);
	  if(typeof it == 'string' && it.length > 2){
	    it = TRIM ? it.trim() : $trim(it, 3);
	    var first = it.charCodeAt(0)
	      , third, radix, maxCode;
	    if(first === 43 || first === 45){
	      third = it.charCodeAt(2);
	      if(third === 88 || third === 120)return NaN; // Number('+0x1') should be NaN, old V8 fix
	    } else if(first === 48){
	      switch(it.charCodeAt(1)){
	        case 66 : case 98  : radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
	        case 79 : case 111 : radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
	        default : return +it;
	      }
	      for(var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++){
	        code = digits.charCodeAt(i);
	        // parseInt parses a string to a first unavailable symbol
	        // but ToNumber should return NaN if a string contains unavailable symbols
	        if(code < 48 || code > maxCode)return NaN;
	      } return parseInt(digits, radix);
	    }
	  } return +it;
	};
	
	if(!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')){
	  $Number = function Number(value){
	    var it = arguments.length < 1 ? 0 : value
	      , that = this;
	    return that instanceof $Number
	      // check on 1..constructor(foo) case
	      && (BROKEN_COF ? fails(function(){ proto.valueOf.call(that); }) : cof(that) != NUMBER)
	        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
	  };
	  for(var keys = __webpack_require__(/*! ./_descriptors */ 9) ? gOPN(Base) : (
	    // ES3:
	    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	    // ES6 (in case, if modules with ES6 Number statics required before):
	    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
	    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
	  ).split(','), j = 0, key; keys.length > j; j++){
	    if(has(Base, key = keys[j]) && !has($Number, key)){
	      dP($Number, key, gOPD(Base, key));
	    }
	  }
	  $Number.prototype = proto;
	  proto.constructor = $Number;
	  __webpack_require__(/*! ./_redefine */ 21)(global, NUMBER, $Number);
	}

/***/ },
/* 91 */
/*!********************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_inherit-if-required.js ***!
  \********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var isObject       = __webpack_require__(/*! ./_is-object */ 16)
	  , setPrototypeOf = __webpack_require__(/*! ./_set-proto */ 76).set;
	module.exports = function(that, target, C){
	  var P, S = target.constructor;
	  if(S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf){
	    setPrototypeOf(that, P);
	  } return that;
	};

/***/ },
/* 92 */
/*!*******************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.number.to-fixed.js ***!
  \*******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export      = __webpack_require__(/*! ./_export */ 11)
	  , anInstance   = __webpack_require__(/*! ./_an-instance */ 93)
	  , toInteger    = __webpack_require__(/*! ./_to-integer */ 41)
	  , aNumberValue = __webpack_require__(/*! ./_a-number-value */ 94)
	  , repeat       = __webpack_require__(/*! ./_string-repeat */ 95)
	  , $toFixed     = 1..toFixed
	  , floor        = Math.floor
	  , data         = [0, 0, 0, 0, 0, 0]
	  , ERROR        = 'Number.toFixed: incorrect invocation!'
	  , ZERO         = '0';
	
	var multiply = function(n, c){
	  var i  = -1
	    , c2 = c;
	  while(++i < 6){
	    c2 += n * data[i];
	    data[i] = c2 % 1e7;
	    c2 = floor(c2 / 1e7);
	  }
	};
	var divide = function(n){
	  var i = 6
	    , c = 0;
	  while(--i >= 0){
	    c += data[i];
	    data[i] = floor(c / n);
	    c = (c % n) * 1e7;
	  }
	};
	var numToString = function(){
	  var i = 6
	    , s = '';
	  while(--i >= 0){
	    if(s !== '' || i === 0 || data[i] !== 0){
	      var t = String(data[i]);
	      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
	    }
	  } return s;
	};
	var pow = function(x, n, acc){
	  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
	};
	var log = function(x){
	  var n  = 0
	    , x2 = x;
	  while(x2 >= 4096){
	    n += 12;
	    x2 /= 4096;
	  }
	  while(x2 >= 2){
	    n  += 1;
	    x2 /= 2;
	  } return n;
	};
	
	$export($export.P + $export.F * (!!$toFixed && (
	  0.00008.toFixed(3) !== '0.000' ||
	  0.9.toFixed(0) !== '1' ||
	  1.255.toFixed(2) !== '1.25' ||
	  1000000000000000128..toFixed(0) !== '1000000000000000128'
	) || !__webpack_require__(/*! ./_fails */ 10)(function(){
	  // V8 ~ Android 4.3-
	  $toFixed.call({});
	})), 'Number', {
	  toFixed: function toFixed(fractionDigits){
	    var x = aNumberValue(this, ERROR)
	      , f = toInteger(fractionDigits)
	      , s = ''
	      , m = ZERO
	      , e, z, j, k;
	    if(f < 0 || f > 20)throw RangeError(ERROR);
	    if(x != x)return 'NaN';
	    if(x <= -1e21 || x >= 1e21)return String(x);
	    if(x < 0){
	      s = '-';
	      x = -x;
	    }
	    if(x > 1e-21){
	      e = log(x * pow(2, 69, 1)) - 69;
	      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
	      z *= 0x10000000000000;
	      e = 52 - e;
	      if(e > 0){
	        multiply(0, z);
	        j = f;
	        while(j >= 7){
	          multiply(1e7, 0);
	          j -= 7;
	        }
	        multiply(pow(10, j, 1), 0);
	        j = e - 1;
	        while(j >= 23){
	          divide(1 << 23);
	          j -= 23;
	        }
	        divide(1 << j);
	        multiply(1, 1);
	        divide(2);
	        m = numToString();
	      } else {
	        multiply(0, z);
	        multiply(1 << -e, 0);
	        m = numToString() + repeat.call(ZERO, f);
	      }
	    }
	    if(f > 0){
	      k = m.length;
	      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
	    } else {
	      m = s + m;
	    } return m;
	  }
	});

/***/ },
/* 93 */
/*!************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_an-instance.js ***!
  \************************************************************/
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 94 */
/*!***************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_a-number-value.js ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var cof = __webpack_require__(/*! ./_cof */ 37);
	module.exports = function(it, msg){
	  if(typeof it != 'number' && cof(it) != 'Number')throw TypeError(msg);
	  return +it;
	};

/***/ },
/* 95 */
/*!**************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_string-repeat.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var toInteger = __webpack_require__(/*! ./_to-integer */ 41)
	  , defined   = __webpack_require__(/*! ./_defined */ 38);
	
	module.exports = function repeat(count){
	  var str = String(defined(this))
	    , res = ''
	    , n   = toInteger(count);
	  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
	  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
	  return res;
	};

/***/ },
/* 96 */
/*!***********************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.number.to-precision.js ***!
  \***********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export      = __webpack_require__(/*! ./_export */ 11)
	  , $fails       = __webpack_require__(/*! ./_fails */ 10)
	  , aNumberValue = __webpack_require__(/*! ./_a-number-value */ 94)
	  , $toPrecision = 1..toPrecision;
	
	$export($export.P + $export.F * ($fails(function(){
	  // IE7-
	  return $toPrecision.call(1, undefined) !== '1';
	}) || !$fails(function(){
	  // V8 ~ Android 4.3-
	  $toPrecision.call({});
	})), 'Number', {
	  toPrecision: function toPrecision(precision){
	    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
	    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision); 
	  }
	});

/***/ },
/* 97 */
/*!******************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.number.epsilon.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.1 Number.EPSILON
	var $export = __webpack_require__(/*! ./_export */ 11);
	
	$export($export.S, 'Number', {EPSILON: Math.pow(2, -52)});

/***/ },
/* 98 */
/*!********************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.number.is-finite.js ***!
  \********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.2 Number.isFinite(number)
	var $export   = __webpack_require__(/*! ./_export */ 11)
	  , _isFinite = __webpack_require__(/*! ./_global */ 7).isFinite;
	
	$export($export.S, 'Number', {
	  isFinite: function isFinite(it){
	    return typeof it == 'number' && _isFinite(it);
	  }
	});

/***/ },
/* 99 */
/*!*********************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.number.is-integer.js ***!
  \*********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var $export = __webpack_require__(/*! ./_export */ 11);
	
	$export($export.S, 'Number', {isInteger: __webpack_require__(/*! ./_is-integer */ 100)});

/***/ },
/* 100 */
/*!***********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_is-integer.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var isObject = __webpack_require__(/*! ./_is-object */ 16)
	  , floor    = Math.floor;
	module.exports = function isInteger(it){
	  return !isObject(it) && isFinite(it) && floor(it) === it;
	};

/***/ },
/* 101 */
/*!*****************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.number.is-nan.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.4 Number.isNaN(number)
	var $export = __webpack_require__(/*! ./_export */ 11);
	
	$export($export.S, 'Number', {
	  isNaN: function isNaN(number){
	    return number != number;
	  }
	});

/***/ },
/* 102 */
/*!**************************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.number.is-safe-integer.js ***!
  \**************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.5 Number.isSafeInteger(number)
	var $export   = __webpack_require__(/*! ./_export */ 11)
	  , isInteger = __webpack_require__(/*! ./_is-integer */ 100)
	  , abs       = Math.abs;
	
	$export($export.S, 'Number', {
	  isSafeInteger: function isSafeInteger(number){
	    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
	  }
	});

/***/ },
/* 103 */
/*!***************************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.number.max-safe-integer.js ***!
  \***************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.6 Number.MAX_SAFE_INTEGER
	var $export = __webpack_require__(/*! ./_export */ 11);
	
	$export($export.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});

/***/ },
/* 104 */
/*!***************************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.number.min-safe-integer.js ***!
  \***************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.10 Number.MIN_SAFE_INTEGER
	var $export = __webpack_require__(/*! ./_export */ 11);
	
	$export($export.S, 'Number', {MIN_SAFE_INTEGER: -0x1fffffffffffff});

/***/ },
/* 105 */
/*!**********************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.number.parse-float.js ***!
  \**********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $export     = __webpack_require__(/*! ./_export */ 11)
	  , $parseFloat = __webpack_require__(/*! ./_parse-float */ 89);
	// 20.1.2.12 Number.parseFloat(string)
	$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', {parseFloat: $parseFloat});

/***/ },
/* 106 */
/*!********************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.number.parse-int.js ***!
  \********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $export   = __webpack_require__(/*! ./_export */ 11)
	  , $parseInt = __webpack_require__(/*! ./_parse-int */ 85);
	// 20.1.2.13 Number.parseInt(string, radix)
	$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', {parseInt: $parseInt});

/***/ },
/* 107 */
/*!**************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.math.acosh.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.3 Math.acosh(x)
	var $export = __webpack_require__(/*! ./_export */ 11)
	  , log1p   = __webpack_require__(/*! ./_math-log1p */ 108)
	  , sqrt    = Math.sqrt
	  , $acosh  = Math.acosh;
	
	$export($export.S + $export.F * !($acosh
	  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
	  && Math.floor($acosh(Number.MAX_VALUE)) == 710
	  // Tor Browser bug: Math.acosh(Infinity) -> NaN 
	  && $acosh(Infinity) == Infinity
	), 'Math', {
	  acosh: function acosh(x){
	    return (x = +x) < 1 ? NaN : x > 94906265.62425156
	      ? Math.log(x) + Math.LN2
	      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
	  }
	});

/***/ },
/* 108 */
/*!***********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_math-log1p.js ***!
  \***********************************************************/
/***/ function(module, exports) {

	// 20.2.2.20 Math.log1p(x)
	module.exports = Math.log1p || function log1p(x){
	  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
	};

/***/ },
/* 109 */
/*!**************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.math.asinh.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.5 Math.asinh(x)
	var $export = __webpack_require__(/*! ./_export */ 11)
	  , $asinh  = Math.asinh;
	
	function asinh(x){
	  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
	}
	
	// Tor Browser bug: Math.asinh(0) -> -0 
	$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', {asinh: asinh});

/***/ },
/* 110 */
/*!**************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.math.atanh.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.7 Math.atanh(x)
	var $export = __webpack_require__(/*! ./_export */ 11)
	  , $atanh  = Math.atanh;
	
	// Tor Browser bug: Math.atanh(-0) -> 0 
	$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
	  atanh: function atanh(x){
	    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
	  }
	});

/***/ },
/* 111 */
/*!*************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.math.cbrt.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.9 Math.cbrt(x)
	var $export = __webpack_require__(/*! ./_export */ 11)
	  , sign    = __webpack_require__(/*! ./_math-sign */ 112);
	
	$export($export.S, 'Math', {
	  cbrt: function cbrt(x){
	    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
	  }
	});

/***/ },
/* 112 */
/*!**********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_math-sign.js ***!
  \**********************************************************/
/***/ function(module, exports) {

	// 20.2.2.28 Math.sign(x)
	module.exports = Math.sign || function sign(x){
	  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
	};

/***/ },
/* 113 */
/*!**************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.math.clz32.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.11 Math.clz32(x)
	var $export = __webpack_require__(/*! ./_export */ 11);
	
	$export($export.S, 'Math', {
	  clz32: function clz32(x){
	    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
	  }
	});

/***/ },
/* 114 */
/*!*************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.math.cosh.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.12 Math.cosh(x)
	var $export = __webpack_require__(/*! ./_export */ 11)
	  , exp     = Math.exp;
	
	$export($export.S, 'Math', {
	  cosh: function cosh(x){
	    return (exp(x = +x) + exp(-x)) / 2;
	  }
	});

/***/ },
/* 115 */
/*!**************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.math.expm1.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.14 Math.expm1(x)
	var $export = __webpack_require__(/*! ./_export */ 11)
	  , $expm1  = __webpack_require__(/*! ./_math-expm1 */ 116);
	
	$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', {expm1: $expm1});

/***/ },
/* 116 */
/*!***********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_math-expm1.js ***!
  \***********************************************************/
/***/ function(module, exports) {

	// 20.2.2.14 Math.expm1(x)
	var $expm1 = Math.expm1;
	module.exports = (!$expm1
	  // Old FF bug
	  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
	  // Tor Browser bug
	  || $expm1(-2e-17) != -2e-17
	) ? function expm1(x){
	  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
	} : $expm1;

/***/ },
/* 117 */
/*!***************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.math.fround.js ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.16 Math.fround(x)
	var $export   = __webpack_require__(/*! ./_export */ 11)
	  , sign      = __webpack_require__(/*! ./_math-sign */ 112)
	  , pow       = Math.pow
	  , EPSILON   = pow(2, -52)
	  , EPSILON32 = pow(2, -23)
	  , MAX32     = pow(2, 127) * (2 - EPSILON32)
	  , MIN32     = pow(2, -126);
	
	var roundTiesToEven = function(n){
	  return n + 1 / EPSILON - 1 / EPSILON;
	};
	
	
	$export($export.S, 'Math', {
	  fround: function fround(x){
	    var $abs  = Math.abs(x)
	      , $sign = sign(x)
	      , a, result;
	    if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
	    a = (1 + EPSILON32 / EPSILON) * $abs;
	    result = a - (a - $abs);
	    if(result > MAX32 || result != result)return $sign * Infinity;
	    return $sign * result;
	  }
	});

/***/ },
/* 118 */
/*!**************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.math.hypot.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
	var $export = __webpack_require__(/*! ./_export */ 11)
	  , abs     = Math.abs;
	
	$export($export.S, 'Math', {
	  hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
	    var sum  = 0
	      , i    = 0
	      , aLen = arguments.length
	      , larg = 0
	      , arg, div;
	    while(i < aLen){
	      arg = abs(arguments[i++]);
	      if(larg < arg){
	        div  = larg / arg;
	        sum  = sum * div * div + 1;
	        larg = arg;
	      } else if(arg > 0){
	        div  = arg / larg;
	        sum += div * div;
	      } else sum += arg;
	    }
	    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
	  }
	});

/***/ },
/* 119 */
/*!*************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.math.imul.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.18 Math.imul(x, y)
	var $export = __webpack_require__(/*! ./_export */ 11)
	  , $imul   = Math.imul;
	
	// some WebKit versions fails with big numbers, some has wrong arity
	$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 10)(function(){
	  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
	}), 'Math', {
	  imul: function imul(x, y){
	    var UINT16 = 0xffff
	      , xn = +x
	      , yn = +y
	      , xl = UINT16 & xn
	      , yl = UINT16 & yn;
	    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
	  }
	});

/***/ },
/* 120 */
/*!**************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.math.log10.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.21 Math.log10(x)
	var $export = __webpack_require__(/*! ./_export */ 11);
	
	$export($export.S, 'Math', {
	  log10: function log10(x){
	    return Math.log(x) / Math.LN10;
	  }
	});

/***/ },
/* 121 */
/*!**************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.math.log1p.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.20 Math.log1p(x)
	var $export = __webpack_require__(/*! ./_export */ 11);
	
	$export($export.S, 'Math', {log1p: __webpack_require__(/*! ./_math-log1p */ 108)});

/***/ },
/* 122 */
/*!*************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.math.log2.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.22 Math.log2(x)
	var $export = __webpack_require__(/*! ./_export */ 11);
	
	$export($export.S, 'Math', {
	  log2: function log2(x){
	    return Math.log(x) / Math.LN2;
	  }
	});

/***/ },
/* 123 */
/*!*************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.math.sign.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.28 Math.sign(x)
	var $export = __webpack_require__(/*! ./_export */ 11);
	
	$export($export.S, 'Math', {sign: __webpack_require__(/*! ./_math-sign */ 112)});

/***/ },
/* 124 */
/*!*************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.math.sinh.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.30 Math.sinh(x)
	var $export = __webpack_require__(/*! ./_export */ 11)
	  , expm1   = __webpack_require__(/*! ./_math-expm1 */ 116)
	  , exp     = Math.exp;
	
	// V8 near Chromium 38 has a problem with very small numbers
	$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 10)(function(){
	  return !Math.sinh(-2e-17) != -2e-17;
	}), 'Math', {
	  sinh: function sinh(x){
	    return Math.abs(x = +x) < 1
	      ? (expm1(x) - expm1(-x)) / 2
	      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
	  }
	});

/***/ },
/* 125 */
/*!*************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.math.tanh.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.33 Math.tanh(x)
	var $export = __webpack_require__(/*! ./_export */ 11)
	  , expm1   = __webpack_require__(/*! ./_math-expm1 */ 116)
	  , exp     = Math.exp;
	
	$export($export.S, 'Math', {
	  tanh: function tanh(x){
	    var a = expm1(x = +x)
	      , b = expm1(-x);
	    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
	  }
	});

/***/ },
/* 126 */
/*!**************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.math.trunc.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.34 Math.trunc(x)
	var $export = __webpack_require__(/*! ./_export */ 11);
	
	$export($export.S, 'Math', {
	  trunc: function trunc(it){
	    return (it > 0 ? Math.floor : Math.ceil)(it);
	  }
	});

/***/ },
/* 127 */
/*!**************************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.string.from-code-point.js ***!
  \**************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $export        = __webpack_require__(/*! ./_export */ 11)
	  , toIndex        = __webpack_require__(/*! ./_to-index */ 42)
	  , fromCharCode   = String.fromCharCode
	  , $fromCodePoint = String.fromCodePoint;
	
	// length should be 1, old FF problem
	$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
	  // 21.1.2.2 String.fromCodePoint(...codePoints)
	  fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
	    var res  = []
	      , aLen = arguments.length
	      , i    = 0
	      , code;
	    while(aLen > i){
	      code = +arguments[i++];
	      if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
	      res.push(code < 0x10000
	        ? fromCharCode(code)
	        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
	      );
	    } return res.join('');
	  }
	});

/***/ },
/* 128 */
/*!**************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.string.raw.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $export   = __webpack_require__(/*! ./_export */ 11)
	  , toIObject = __webpack_require__(/*! ./_to-iobject */ 35)
	  , toLength  = __webpack_require__(/*! ./_to-length */ 40);
	
	$export($export.S, 'String', {
	  // 21.1.2.4 String.raw(callSite, ...substitutions)
	  raw: function raw(callSite){
	    var tpl  = toIObject(callSite.raw)
	      , len  = toLength(tpl.length)
	      , aLen = arguments.length
	      , res  = []
	      , i    = 0;
	    while(len > i){
	      res.push(String(tpl[i++]));
	      if(i < aLen)res.push(String(arguments[i]));
	    } return res.join('');
	  }
	});

/***/ },
/* 129 */
/*!***************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.string.trim.js ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 21.1.3.25 String.prototype.trim()
	__webpack_require__(/*! ./_string-trim */ 86)('trim', function($trim){
	  return function trim(){
	    return $trim(this, 3);
	  };
	});

/***/ },
/* 130 */
/*!*******************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.string.iterator.js ***!
  \*******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(/*! ./_string-at */ 131)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(/*! ./_iter-define */ 132)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 131 */
/*!**********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_string-at.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(/*! ./_to-integer */ 41)
	  , defined   = __webpack_require__(/*! ./_defined */ 38);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 132 */
/*!************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_iter-define.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(/*! ./_library */ 31)
	  , $export        = __webpack_require__(/*! ./_export */ 11)
	  , redefine       = __webpack_require__(/*! ./_redefine */ 21)
	  , hide           = __webpack_require__(/*! ./_hide */ 13)
	  , has            = __webpack_require__(/*! ./_has */ 8)
	  , Iterators      = __webpack_require__(/*! ./_iterators */ 133)
	  , $iterCreate    = __webpack_require__(/*! ./_iter-create */ 134)
	  , setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 27)
	  , getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 62)
	  , ITERATOR       = __webpack_require__(/*! ./_wks */ 28)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 133 */
/*!**********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_iterators.js ***!
  \**********************************************************/
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 134 */
/*!************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_iter-create.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(/*! ./_object-create */ 49)
	  , descriptor     = __webpack_require__(/*! ./_property-desc */ 20)
	  , setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 27)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(/*! ./_hide */ 13)(IteratorPrototype, __webpack_require__(/*! ./_wks */ 28)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 135 */
/*!************************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.string.code-point-at.js ***!
  \************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(/*! ./_export */ 11)
	  , $at     = __webpack_require__(/*! ./_string-at */ 131)(false);
	$export($export.P, 'String', {
	  // 21.1.3.3 String.prototype.codePointAt(pos)
	  codePointAt: function codePointAt(pos){
	    return $at(this, pos);
	  }
	});

/***/ },
/* 136 */
/*!********************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.string.ends-with.js ***!
  \********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
	'use strict';
	var $export   = __webpack_require__(/*! ./_export */ 11)
	  , toLength  = __webpack_require__(/*! ./_to-length */ 40)
	  , context   = __webpack_require__(/*! ./_string-context */ 137)
	  , ENDS_WITH = 'endsWith'
	  , $endsWith = ''[ENDS_WITH];
	
	$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ 139)(ENDS_WITH), 'String', {
	  endsWith: function endsWith(searchString /*, endPosition = @length */){
	    var that = context(this, searchString, ENDS_WITH)
	      , endPosition = arguments.length > 1 ? arguments[1] : undefined
	      , len    = toLength(that.length)
	      , end    = endPosition === undefined ? len : Math.min(toLength(endPosition), len)
	      , search = String(searchString);
	    return $endsWith
	      ? $endsWith.call(that, search, end)
	      : that.slice(end - search.length, end) === search;
	  }
	});

/***/ },
/* 137 */
/*!***************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_string-context.js ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// helper for String#{startsWith, endsWith, includes}
	var isRegExp = __webpack_require__(/*! ./_is-regexp */ 138)
	  , defined  = __webpack_require__(/*! ./_defined */ 38);
	
	module.exports = function(that, searchString, NAME){
	  if(isRegExp(searchString))throw TypeError('String#' + NAME + " doesn't accept regex!");
	  return String(defined(that));
	};

/***/ },
/* 138 */
/*!**********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_is-regexp.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.2.8 IsRegExp(argument)
	var isObject = __webpack_require__(/*! ./_is-object */ 16)
	  , cof      = __webpack_require__(/*! ./_cof */ 37)
	  , MATCH    = __webpack_require__(/*! ./_wks */ 28)('match');
	module.exports = function(it){
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
	};

/***/ },
/* 139 */
/*!****************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_fails-is-regexp.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var MATCH = __webpack_require__(/*! ./_wks */ 28)('match');
	module.exports = function(KEY){
	  var re = /./;
	  try {
	    '/./'[KEY](re);
	  } catch(e){
	    try {
	      re[MATCH] = false;
	      return !'/./'[KEY](re);
	    } catch(f){ /* empty */ }
	  } return true;
	};

/***/ },
/* 140 */
/*!*******************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.string.includes.js ***!
  \*******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.7 String.prototype.includes(searchString, position = 0)
	'use strict';
	var $export  = __webpack_require__(/*! ./_export */ 11)
	  , context  = __webpack_require__(/*! ./_string-context */ 137)
	  , INCLUDES = 'includes';
	
	$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ 139)(INCLUDES), 'String', {
	  includes: function includes(searchString /*, position = 0 */){
	    return !!~context(this, searchString, INCLUDES)
	      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

/***/ },
/* 141 */
/*!*****************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.string.repeat.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(/*! ./_export */ 11);
	
	$export($export.P, 'String', {
	  // 21.1.3.13 String.prototype.repeat(count)
	  repeat: __webpack_require__(/*! ./_string-repeat */ 95)
	});

/***/ },
/* 142 */
/*!**********************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.string.starts-with.js ***!
  \**********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.18 String.prototype.startsWith(searchString [, position ])
	'use strict';
	var $export     = __webpack_require__(/*! ./_export */ 11)
	  , toLength    = __webpack_require__(/*! ./_to-length */ 40)
	  , context     = __webpack_require__(/*! ./_string-context */ 137)
	  , STARTS_WITH = 'startsWith'
	  , $startsWith = ''[STARTS_WITH];
	
	$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ 139)(STARTS_WITH), 'String', {
	  startsWith: function startsWith(searchString /*, position = 0 */){
	    var that   = context(this, searchString, STARTS_WITH)
	      , index  = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length))
	      , search = String(searchString);
	    return $startsWith
	      ? $startsWith.call(that, search, index)
	      : that.slice(index, index + search.length) === search;
	  }
	});

/***/ },
/* 143 */
/*!*****************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.string.anchor.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.2 String.prototype.anchor(name)
	__webpack_require__(/*! ./_string-html */ 144)('anchor', function(createHTML){
	  return function anchor(name){
	    return createHTML(this, 'a', 'name', name);
	  }
	});

/***/ },
/* 144 */
/*!************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_string-html.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(/*! ./_export */ 11)
	  , fails   = __webpack_require__(/*! ./_fails */ 10)
	  , defined = __webpack_require__(/*! ./_defined */ 38)
	  , quot    = /"/g;
	// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
	var createHTML = function(string, tag, attribute, value) {
	  var S  = String(defined(string))
	    , p1 = '<' + tag;
	  if(attribute !== '')p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
	  return p1 + '>' + S + '</' + tag + '>';
	};
	module.exports = function(NAME, exec){
	  var O = {};
	  O[NAME] = exec(createHTML);
	  $export($export.P + $export.F * fails(function(){
	    var test = ''[NAME]('"');
	    return test !== test.toLowerCase() || test.split('"').length > 3;
	  }), 'String', O);
	};

/***/ },
/* 145 */
/*!**************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.string.big.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.3 String.prototype.big()
	__webpack_require__(/*! ./_string-html */ 144)('big', function(createHTML){
	  return function big(){
	    return createHTML(this, 'big', '', '');
	  }
	});

/***/ },
/* 146 */
/*!****************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.string.blink.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.4 String.prototype.blink()
	__webpack_require__(/*! ./_string-html */ 144)('blink', function(createHTML){
	  return function blink(){
	    return createHTML(this, 'blink', '', '');
	  }
	});

/***/ },
/* 147 */
/*!***************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.string.bold.js ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.5 String.prototype.bold()
	__webpack_require__(/*! ./_string-html */ 144)('bold', function(createHTML){
	  return function bold(){
	    return createHTML(this, 'b', '', '');
	  }
	});

/***/ },
/* 148 */
/*!****************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.string.fixed.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.6 String.prototype.fixed()
	__webpack_require__(/*! ./_string-html */ 144)('fixed', function(createHTML){
	  return function fixed(){
	    return createHTML(this, 'tt', '', '');
	  }
	});

/***/ },
/* 149 */
/*!********************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.string.fontcolor.js ***!
  \********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.7 String.prototype.fontcolor(color)
	__webpack_require__(/*! ./_string-html */ 144)('fontcolor', function(createHTML){
	  return function fontcolor(color){
	    return createHTML(this, 'font', 'color', color);
	  }
	});

/***/ },
/* 150 */
/*!*******************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.string.fontsize.js ***!
  \*******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.8 String.prototype.fontsize(size)
	__webpack_require__(/*! ./_string-html */ 144)('fontsize', function(createHTML){
	  return function fontsize(size){
	    return createHTML(this, 'font', 'size', size);
	  }
	});

/***/ },
/* 151 */
/*!******************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.string.italics.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.9 String.prototype.italics()
	__webpack_require__(/*! ./_string-html */ 144)('italics', function(createHTML){
	  return function italics(){
	    return createHTML(this, 'i', '', '');
	  }
	});

/***/ },
/* 152 */
/*!***************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.string.link.js ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.10 String.prototype.link(url)
	__webpack_require__(/*! ./_string-html */ 144)('link', function(createHTML){
	  return function link(url){
	    return createHTML(this, 'a', 'href', url);
	  }
	});

/***/ },
/* 153 */
/*!****************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.string.small.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.11 String.prototype.small()
	__webpack_require__(/*! ./_string-html */ 144)('small', function(createHTML){
	  return function small(){
	    return createHTML(this, 'small', '', '');
	  }
	});

/***/ },
/* 154 */
/*!*****************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.string.strike.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.12 String.prototype.strike()
	__webpack_require__(/*! ./_string-html */ 144)('strike', function(createHTML){
	  return function strike(){
	    return createHTML(this, 'strike', '', '');
	  }
	});

/***/ },
/* 155 */
/*!**************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.string.sub.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.13 String.prototype.sub()
	__webpack_require__(/*! ./_string-html */ 144)('sub', function(createHTML){
	  return function sub(){
	    return createHTML(this, 'sub', '', '');
	  }
	});

/***/ },
/* 156 */
/*!**************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.string.sup.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.14 String.prototype.sup()
	__webpack_require__(/*! ./_string-html */ 144)('sup', function(createHTML){
	  return function sup(){
	    return createHTML(this, 'sup', '', '');
	  }
	});

/***/ },
/* 157 */
/*!************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.date.now.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 20.3.3.1 / 15.9.4.4 Date.now()
	var $export = __webpack_require__(/*! ./_export */ 11);
	
	$export($export.S, 'Date', {now: function(){ return new Date().getTime(); }});

/***/ },
/* 158 */
/*!****************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.date.to-json.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export     = __webpack_require__(/*! ./_export */ 11)
	  , toObject    = __webpack_require__(/*! ./_to-object */ 61)
	  , toPrimitive = __webpack_require__(/*! ./_to-primitive */ 19);
	
	$export($export.P + $export.F * __webpack_require__(/*! ./_fails */ 10)(function(){
	  return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({toISOString: function(){ return 1; }}) !== 1;
	}), 'Date', {
	  toJSON: function toJSON(key){
	    var O  = toObject(this)
	      , pv = toPrimitive(O);
	    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
	  }
	});

/***/ },
/* 159 */
/*!**********************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.date.to-iso-string.js ***!
  \**********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
	var $export = __webpack_require__(/*! ./_export */ 11)
	  , fails   = __webpack_require__(/*! ./_fails */ 10)
	  , getTime = Date.prototype.getTime;
	
	var lz = function(num){
	  return num > 9 ? num : '0' + num;
	};
	
	// PhantomJS / old WebKit has a broken implementations
	$export($export.P + $export.F * (fails(function(){
	  return new Date(-5e13 - 1).toISOString() != '0385-07-25T07:06:39.999Z';
	}) || !fails(function(){
	  new Date(NaN).toISOString();
	})), 'Date', {
	  toISOString: function toISOString(){
	    if(!isFinite(getTime.call(this)))throw RangeError('Invalid time value');
	    var d = this
	      , y = d.getUTCFullYear()
	      , m = d.getUTCMilliseconds()
	      , s = y < 0 ? '-' : y > 9999 ? '+' : '';
	    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
	      '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
	      'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
	      ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
	  }
	});

/***/ },
/* 160 */
/*!******************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.date.to-string.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var DateProto    = Date.prototype
	  , INVALID_DATE = 'Invalid Date'
	  , TO_STRING    = 'toString'
	  , $toString    = DateProto[TO_STRING]
	  , getTime      = DateProto.getTime;
	if(new Date(NaN) + '' != INVALID_DATE){
	  __webpack_require__(/*! ./_redefine */ 21)(DateProto, TO_STRING, function toString(){
	    var value = getTime.call(this);
	    return value === value ? $toString.call(this) : INVALID_DATE;
	  });
	}

/***/ },
/* 161 */
/*!*********************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.date.to-primitive.js ***!
  \*********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var TO_PRIMITIVE = __webpack_require__(/*! ./_wks */ 28)('toPrimitive')
	  , proto        = Date.prototype;
	
	if(!(TO_PRIMITIVE in proto))__webpack_require__(/*! ./_hide */ 13)(proto, TO_PRIMITIVE, __webpack_require__(/*! ./_date-to-primitive */ 162));

/***/ },
/* 162 */
/*!******************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_date-to-primitive.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var anObject    = __webpack_require__(/*! ./_an-object */ 15)
	  , toPrimitive = __webpack_require__(/*! ./_to-primitive */ 19)
	  , NUMBER      = 'number';
	
	module.exports = function(hint){
	  if(hint !== 'string' && hint !== NUMBER && hint !== 'default')throw TypeError('Incorrect hint');
	  return toPrimitive(anObject(this), hint != NUMBER);
	};

/***/ },
/* 163 */
/*!******************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.array.is-array.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
	var $export = __webpack_require__(/*! ./_export */ 11);
	
	$export($export.S, 'Array', {isArray: __webpack_require__(/*! ./_is-array */ 48)});

/***/ },
/* 164 */
/*!**************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.array.from.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx            = __webpack_require__(/*! ./_ctx */ 23)
	  , $export        = __webpack_require__(/*! ./_export */ 11)
	  , toObject       = __webpack_require__(/*! ./_to-object */ 61)
	  , call           = __webpack_require__(/*! ./_iter-call */ 165)
	  , isArrayIter    = __webpack_require__(/*! ./_is-array-iter */ 166)
	  , toLength       = __webpack_require__(/*! ./_to-length */ 40)
	  , createProperty = __webpack_require__(/*! ./_create-property */ 167)
	  , getIterFn      = __webpack_require__(/*! ./core.get-iterator-method */ 168);
	
	$export($export.S + $export.F * !__webpack_require__(/*! ./_iter-detect */ 169)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 165 */
/*!**********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_iter-call.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(/*! ./_an-object */ 15);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 166 */
/*!**************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_is-array-iter.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(/*! ./_iterators */ 133)
	  , ITERATOR   = __webpack_require__(/*! ./_wks */ 28)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 167 */
/*!****************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_create-property.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $defineProperty = __webpack_require__(/*! ./_object-dp */ 14)
	  , createDesc      = __webpack_require__(/*! ./_property-desc */ 20);
	
	module.exports = function(object, index, value){
	  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};

/***/ },
/* 168 */
/*!************************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/core.get-iterator-method.js ***!
  \************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(/*! ./_classof */ 78)
	  , ITERATOR  = __webpack_require__(/*! ./_wks */ 28)('iterator')
	  , Iterators = __webpack_require__(/*! ./_iterators */ 133);
	module.exports = __webpack_require__(/*! ./_core */ 12).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 169 */
/*!************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_iter-detect.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(/*! ./_wks */ 28)('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 170 */
/*!************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.array.of.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export        = __webpack_require__(/*! ./_export */ 11)
	  , createProperty = __webpack_require__(/*! ./_create-property */ 167);
	
	// WebKit Array.of isn't generic
	$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 10)(function(){
	  function F(){}
	  return !(Array.of.call(F) instanceof F);
	}), 'Array', {
	  // 22.1.2.3 Array.of( ...items)
	  of: function of(/* ...args */){
	    var index  = 0
	      , aLen   = arguments.length
	      , result = new (typeof this == 'function' ? this : Array)(aLen);
	    while(aLen > index)createProperty(result, index, arguments[index++]);
	    result.length = aLen;
	    return result;
	  }
	});

/***/ },
/* 171 */
/*!**************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.array.join.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.13 Array.prototype.join(separator)
	var $export   = __webpack_require__(/*! ./_export */ 11)
	  , toIObject = __webpack_require__(/*! ./_to-iobject */ 35)
	  , arrayJoin = [].join;
	
	// fallback for not array-like strings
	$export($export.P + $export.F * (__webpack_require__(/*! ./_iobject */ 36) != Object || !__webpack_require__(/*! ./_strict-method */ 172)(arrayJoin)), 'Array', {
	  join: function join(separator){
	    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
	  }
	});

/***/ },
/* 172 */
/*!**************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_strict-method.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var fails = __webpack_require__(/*! ./_fails */ 10);
	
	module.exports = function(method, arg){
	  return !!method && fails(function(){
	    arg ? method.call(null, function(){}, 1) : method.call(null);
	  });
	};

/***/ },
/* 173 */
/*!***************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.array.slice.js ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export    = __webpack_require__(/*! ./_export */ 11)
	  , html       = __webpack_require__(/*! ./_html */ 51)
	  , cof        = __webpack_require__(/*! ./_cof */ 37)
	  , toIndex    = __webpack_require__(/*! ./_to-index */ 42)
	  , toLength   = __webpack_require__(/*! ./_to-length */ 40)
	  , arraySlice = [].slice;
	
	// fallback for not array-like ES3 strings and DOM objects
	$export($export.P + $export.F * __webpack_require__(/*! ./_fails */ 10)(function(){
	  if(html)arraySlice.call(html);
	}), 'Array', {
	  slice: function slice(begin, end){
	    var len   = toLength(this.length)
	      , klass = cof(this);
	    end = end === undefined ? len : end;
	    if(klass == 'Array')return arraySlice.call(this, begin, end);
	    var start  = toIndex(begin, len)
	      , upTo   = toIndex(end, len)
	      , size   = toLength(upTo - start)
	      , cloned = Array(size)
	      , i      = 0;
	    for(; i < size; i++)cloned[i] = klass == 'String'
	      ? this.charAt(start + i)
	      : this[start + i];
	    return cloned;
	  }
	});

/***/ },
/* 174 */
/*!**************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.array.sort.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export   = __webpack_require__(/*! ./_export */ 11)
	  , aFunction = __webpack_require__(/*! ./_a-function */ 24)
	  , toObject  = __webpack_require__(/*! ./_to-object */ 61)
	  , fails     = __webpack_require__(/*! ./_fails */ 10)
	  , $sort     = [].sort
	  , test      = [1, 2, 3];
	
	$export($export.P + $export.F * (fails(function(){
	  // IE8-
	  test.sort(undefined);
	}) || !fails(function(){
	  // V8 bug
	  test.sort(null);
	  // Old WebKit
	}) || !__webpack_require__(/*! ./_strict-method */ 172)($sort)), 'Array', {
	  // 22.1.3.25 Array.prototype.sort(comparefn)
	  sort: function sort(comparefn){
	    return comparefn === undefined
	      ? $sort.call(toObject(this))
	      : $sort.call(toObject(this), aFunction(comparefn));
	  }
	});

/***/ },
/* 175 */
/*!******************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.array.for-each.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export  = __webpack_require__(/*! ./_export */ 11)
	  , $forEach = __webpack_require__(/*! ./_array-methods */ 176)(0)
	  , STRICT   = __webpack_require__(/*! ./_strict-method */ 172)([].forEach, true);
	
	$export($export.P + $export.F * !STRICT, 'Array', {
	  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
	  forEach: function forEach(callbackfn /* , thisArg */){
	    return $forEach(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 176 */
/*!**************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_array-methods.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var ctx      = __webpack_require__(/*! ./_ctx */ 23)
	  , IObject  = __webpack_require__(/*! ./_iobject */ 36)
	  , toObject = __webpack_require__(/*! ./_to-object */ 61)
	  , toLength = __webpack_require__(/*! ./_to-length */ 40)
	  , asc      = __webpack_require__(/*! ./_array-species-create */ 177);
	module.exports = function(TYPE, $create){
	  var IS_MAP        = TYPE == 1
	    , IS_FILTER     = TYPE == 2
	    , IS_SOME       = TYPE == 3
	    , IS_EVERY      = TYPE == 4
	    , IS_FIND_INDEX = TYPE == 6
	    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
	    , create        = $create || asc;
	  return function($this, callbackfn, that){
	    var O      = toObject($this)
	      , self   = IObject(O)
	      , f      = ctx(callbackfn, that, 3)
	      , length = toLength(self.length)
	      , index  = 0
	      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
	      , val, res;
	    for(;length > index; index++)if(NO_HOLES || index in self){
	      val = self[index];
	      res = f(val, index, O);
	      if(TYPE){
	        if(IS_MAP)result[index] = res;            // map
	        else if(res)switch(TYPE){
	          case 3: return true;                    // some
	          case 5: return val;                     // find
	          case 6: return index;                   // findIndex
	          case 2: result.push(val);               // filter
	        } else if(IS_EVERY)return false;          // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

/***/ },
/* 177 */
/*!*********************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_array-species-create.js ***!
  \*********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var speciesConstructor = __webpack_require__(/*! ./_array-species-constructor */ 178);
	
	module.exports = function(original, length){
	  return new (speciesConstructor(original))(length);
	};

/***/ },
/* 178 */
/*!**************************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_array-species-constructor.js ***!
  \**************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(/*! ./_is-object */ 16)
	  , isArray  = __webpack_require__(/*! ./_is-array */ 48)
	  , SPECIES  = __webpack_require__(/*! ./_wks */ 28)('species');
	
	module.exports = function(original){
	  var C;
	  if(isArray(original)){
	    C = original.constructor;
	    // cross-realm fallback
	    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
	    if(isObject(C)){
	      C = C[SPECIES];
	      if(C === null)C = undefined;
	    }
	  } return C === undefined ? Array : C;
	};

/***/ },
/* 179 */
/*!*************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.array.map.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(/*! ./_export */ 11)
	  , $map    = __webpack_require__(/*! ./_array-methods */ 176)(1);
	
	$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 172)([].map, true), 'Array', {
	  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
	  map: function map(callbackfn /* , thisArg */){
	    return $map(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 180 */
/*!****************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.array.filter.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(/*! ./_export */ 11)
	  , $filter = __webpack_require__(/*! ./_array-methods */ 176)(2);
	
	$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 172)([].filter, true), 'Array', {
	  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
	  filter: function filter(callbackfn /* , thisArg */){
	    return $filter(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 181 */
/*!**************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.array.some.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(/*! ./_export */ 11)
	  , $some   = __webpack_require__(/*! ./_array-methods */ 176)(3);
	
	$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 172)([].some, true), 'Array', {
	  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
	  some: function some(callbackfn /* , thisArg */){
	    return $some(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 182 */
/*!***************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.array.every.js ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(/*! ./_export */ 11)
	  , $every  = __webpack_require__(/*! ./_array-methods */ 176)(4);
	
	$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 172)([].every, true), 'Array', {
	  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
	  every: function every(callbackfn /* , thisArg */){
	    return $every(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 183 */
/*!****************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.array.reduce.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(/*! ./_export */ 11)
	  , $reduce = __webpack_require__(/*! ./_array-reduce */ 184);
	
	$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 172)([].reduce, true), 'Array', {
	  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
	  reduce: function reduce(callbackfn /* , initialValue */){
	    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
	  }
	});

/***/ },
/* 184 */
/*!*************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_array-reduce.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var aFunction = __webpack_require__(/*! ./_a-function */ 24)
	  , toObject  = __webpack_require__(/*! ./_to-object */ 61)
	  , IObject   = __webpack_require__(/*! ./_iobject */ 36)
	  , toLength  = __webpack_require__(/*! ./_to-length */ 40);
	
	module.exports = function(that, callbackfn, aLen, memo, isRight){
	  aFunction(callbackfn);
	  var O      = toObject(that)
	    , self   = IObject(O)
	    , length = toLength(O.length)
	    , index  = isRight ? length - 1 : 0
	    , i      = isRight ? -1 : 1;
	  if(aLen < 2)for(;;){
	    if(index in self){
	      memo = self[index];
	      index += i;
	      break;
	    }
	    index += i;
	    if(isRight ? index < 0 : length <= index){
	      throw TypeError('Reduce of empty array with no initial value');
	    }
	  }
	  for(;isRight ? index >= 0 : length > index; index += i)if(index in self){
	    memo = callbackfn(memo, self[index], index, O);
	  }
	  return memo;
	};

/***/ },
/* 185 */
/*!**********************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.array.reduce-right.js ***!
  \**********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(/*! ./_export */ 11)
	  , $reduce = __webpack_require__(/*! ./_array-reduce */ 184);
	
	$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 172)([].reduceRight, true), 'Array', {
	  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
	  reduceRight: function reduceRight(callbackfn /* , initialValue */){
	    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
	  }
	});

/***/ },
/* 186 */
/*!******************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.array.index-of.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export       = __webpack_require__(/*! ./_export */ 11)
	  , $indexOf      = __webpack_require__(/*! ./_array-includes */ 39)(false)
	  , $native       = [].indexOf
	  , NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;
	
	$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(/*! ./_strict-method */ 172)($native)), 'Array', {
	  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
	  indexOf: function indexOf(searchElement /*, fromIndex = 0 */){
	    return NEGATIVE_ZERO
	      // convert -0 to +0
	      ? $native.apply(this, arguments) || 0
	      : $indexOf(this, searchElement, arguments[1]);
	  }
	});

/***/ },
/* 187 */
/*!***********************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.array.last-index-of.js ***!
  \***********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export       = __webpack_require__(/*! ./_export */ 11)
	  , toIObject     = __webpack_require__(/*! ./_to-iobject */ 35)
	  , toInteger     = __webpack_require__(/*! ./_to-integer */ 41)
	  , toLength      = __webpack_require__(/*! ./_to-length */ 40)
	  , $native       = [].lastIndexOf
	  , NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;
	
	$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(/*! ./_strict-method */ 172)($native)), 'Array', {
	  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
	  lastIndexOf: function lastIndexOf(searchElement /*, fromIndex = @[*-1] */){
	    // convert -0 to +0
	    if(NEGATIVE_ZERO)return $native.apply(this, arguments) || 0;
	    var O      = toIObject(this)
	      , length = toLength(O.length)
	      , index  = length - 1;
	    if(arguments.length > 1)index = Math.min(index, toInteger(arguments[1]));
	    if(index < 0)index = length + index;
	    for(;index >= 0; index--)if(index in O)if(O[index] === searchElement)return index || 0;
	    return -1;
	  }
	});

/***/ },
/* 188 */
/*!*********************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.array.copy-within.js ***!
  \*********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	var $export = __webpack_require__(/*! ./_export */ 11);
	
	$export($export.P, 'Array', {copyWithin: __webpack_require__(/*! ./_array-copy-within */ 189)});
	
	__webpack_require__(/*! ./_add-to-unscopables */ 190)('copyWithin');

/***/ },
/* 189 */
/*!******************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_array-copy-within.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	'use strict';
	var toObject = __webpack_require__(/*! ./_to-object */ 61)
	  , toIndex  = __webpack_require__(/*! ./_to-index */ 42)
	  , toLength = __webpack_require__(/*! ./_to-length */ 40);
	
	module.exports = [].copyWithin || function copyWithin(target/*= 0*/, start/*= 0, end = @length*/){
	  var O     = toObject(this)
	    , len   = toLength(O.length)
	    , to    = toIndex(target, len)
	    , from  = toIndex(start, len)
	    , end   = arguments.length > 2 ? arguments[2] : undefined
	    , count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to)
	    , inc   = 1;
	  if(from < to && to < from + count){
	    inc  = -1;
	    from += count - 1;
	    to   += count - 1;
	  }
	  while(count-- > 0){
	    if(from in O)O[to] = O[from];
	    else delete O[to];
	    to   += inc;
	    from += inc;
	  } return O;
	};

/***/ },
/* 190 */
/*!*******************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_add-to-unscopables.js ***!
  \*******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = __webpack_require__(/*! ./_wks */ 28)('unscopables')
	  , ArrayProto  = Array.prototype;
	if(ArrayProto[UNSCOPABLES] == undefined)__webpack_require__(/*! ./_hide */ 13)(ArrayProto, UNSCOPABLES, {});
	module.exports = function(key){
	  ArrayProto[UNSCOPABLES][key] = true;
	};

/***/ },
/* 191 */
/*!**************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.array.fill.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	var $export = __webpack_require__(/*! ./_export */ 11);
	
	$export($export.P, 'Array', {fill: __webpack_require__(/*! ./_array-fill */ 192)});
	
	__webpack_require__(/*! ./_add-to-unscopables */ 190)('fill');

/***/ },
/* 192 */
/*!***********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_array-fill.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	'use strict';
	var toObject = __webpack_require__(/*! ./_to-object */ 61)
	  , toIndex  = __webpack_require__(/*! ./_to-index */ 42)
	  , toLength = __webpack_require__(/*! ./_to-length */ 40);
	module.exports = function fill(value /*, start = 0, end = @length */){
	  var O      = toObject(this)
	    , length = toLength(O.length)
	    , aLen   = arguments.length
	    , index  = toIndex(aLen > 1 ? arguments[1] : undefined, length)
	    , end    = aLen > 2 ? arguments[2] : undefined
	    , endPos = end === undefined ? length : toIndex(end, length);
	  while(endPos > index)O[index++] = value;
	  return O;
	};

/***/ },
/* 193 */
/*!**************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.array.find.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
	var $export = __webpack_require__(/*! ./_export */ 11)
	  , $find   = __webpack_require__(/*! ./_array-methods */ 176)(5)
	  , KEY     = 'find'
	  , forced  = true;
	// Shouldn't skip holes
	if(KEY in [])Array(1)[KEY](function(){ forced = false; });
	$export($export.P + $export.F * forced, 'Array', {
	  find: function find(callbackfn/*, that = undefined */){
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	__webpack_require__(/*! ./_add-to-unscopables */ 190)(KEY);

/***/ },
/* 194 */
/*!********************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.array.find-index.js ***!
  \********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
	var $export = __webpack_require__(/*! ./_export */ 11)
	  , $find   = __webpack_require__(/*! ./_array-methods */ 176)(6)
	  , KEY     = 'findIndex'
	  , forced  = true;
	// Shouldn't skip holes
	if(KEY in [])Array(1)[KEY](function(){ forced = false; });
	$export($export.P + $export.F * forced, 'Array', {
	  findIndex: function findIndex(callbackfn/*, that = undefined */){
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	__webpack_require__(/*! ./_add-to-unscopables */ 190)(KEY);

/***/ },
/* 195 */
/*!*****************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.array.species.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ./_set-species */ 196)('Array');

/***/ },
/* 196 */
/*!************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_set-species.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(/*! ./_global */ 7)
	  , dP          = __webpack_require__(/*! ./_object-dp */ 14)
	  , DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 9)
	  , SPECIES     = __webpack_require__(/*! ./_wks */ 28)('species');
	
	module.exports = function(KEY){
	  var C = global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 197 */
/*!******************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.array.iterator.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(/*! ./_add-to-unscopables */ 190)
	  , step             = __webpack_require__(/*! ./_iter-step */ 198)
	  , Iterators        = __webpack_require__(/*! ./_iterators */ 133)
	  , toIObject        = __webpack_require__(/*! ./_to-iobject */ 35);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(/*! ./_iter-define */ 132)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 198 */
/*!**********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_iter-step.js ***!
  \**********************************************************/
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 199 */
/*!**********************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.regexp.constructor.js ***!
  \**********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var global            = __webpack_require__(/*! ./_global */ 7)
	  , inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ 91)
	  , dP                = __webpack_require__(/*! ./_object-dp */ 14).f
	  , gOPN              = __webpack_require__(/*! ./_object-gopn */ 53).f
	  , isRegExp          = __webpack_require__(/*! ./_is-regexp */ 138)
	  , $flags            = __webpack_require__(/*! ./_flags */ 200)
	  , $RegExp           = global.RegExp
	  , Base              = $RegExp
	  , proto             = $RegExp.prototype
	  , re1               = /a/g
	  , re2               = /a/g
	  // "new" creates a new object, old webkit buggy here
	  , CORRECT_NEW       = new $RegExp(re1) !== re1;
	
	if(__webpack_require__(/*! ./_descriptors */ 9) && (!CORRECT_NEW || __webpack_require__(/*! ./_fails */ 10)(function(){
	  re2[__webpack_require__(/*! ./_wks */ 28)('match')] = false;
	  // RegExp constructor can alter flags and IsRegExp works correct with @@match
	  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
	}))){
	  $RegExp = function RegExp(p, f){
	    var tiRE = this instanceof $RegExp
	      , piRE = isRegExp(p)
	      , fiU  = f === undefined;
	    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
	      : inheritIfRequired(CORRECT_NEW
	        ? new Base(piRE && !fiU ? p.source : p, f)
	        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
	      , tiRE ? this : proto, $RegExp);
	  };
	  var proxy = function(key){
	    key in $RegExp || dP($RegExp, key, {
	      configurable: true,
	      get: function(){ return Base[key]; },
	      set: function(it){ Base[key] = it; }
	    });
	  };
	  for(var keys = gOPN(Base), i = 0; keys.length > i; )proxy(keys[i++]);
	  proto.constructor = $RegExp;
	  $RegExp.prototype = proto;
	  __webpack_require__(/*! ./_redefine */ 21)(global, 'RegExp', $RegExp);
	}
	
	__webpack_require__(/*! ./_set-species */ 196)('RegExp');

/***/ },
/* 200 */
/*!******************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_flags.js ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 21.2.5.3 get RegExp.prototype.flags
	var anObject = __webpack_require__(/*! ./_an-object */ 15);
	module.exports = function(){
	  var that   = anObject(this)
	    , result = '';
	  if(that.global)     result += 'g';
	  if(that.ignoreCase) result += 'i';
	  if(that.multiline)  result += 'm';
	  if(that.unicode)    result += 'u';
	  if(that.sticky)     result += 'y';
	  return result;
	};

/***/ },
/* 201 */
/*!********************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.regexp.to-string.js ***!
  \********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	__webpack_require__(/*! ./es6.regexp.flags */ 202);
	var anObject    = __webpack_require__(/*! ./_an-object */ 15)
	  , $flags      = __webpack_require__(/*! ./_flags */ 200)
	  , DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 9)
	  , TO_STRING   = 'toString'
	  , $toString   = /./[TO_STRING];
	
	var define = function(fn){
	  __webpack_require__(/*! ./_redefine */ 21)(RegExp.prototype, TO_STRING, fn, true);
	};
	
	// 21.2.5.14 RegExp.prototype.toString()
	if(__webpack_require__(/*! ./_fails */ 10)(function(){ return $toString.call({source: 'a', flags: 'b'}) != '/a/b'; })){
	  define(function toString(){
	    var R = anObject(this);
	    return '/'.concat(R.source, '/',
	      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
	  });
	// FF44- RegExp#toString has a wrong name
	} else if($toString.name != TO_STRING){
	  define(function toString(){
	    return $toString.call(this);
	  });
	}

/***/ },
/* 202 */
/*!****************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.regexp.flags.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 21.2.5.3 get RegExp.prototype.flags()
	if(__webpack_require__(/*! ./_descriptors */ 9) && /./g.flags != 'g')__webpack_require__(/*! ./_object-dp */ 14).f(RegExp.prototype, 'flags', {
	  configurable: true,
	  get: __webpack_require__(/*! ./_flags */ 200)
	});

/***/ },
/* 203 */
/*!****************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.regexp.match.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// @@match logic
	__webpack_require__(/*! ./_fix-re-wks */ 204)('match', 1, function(defined, MATCH, $match){
	  // 21.1.3.11 String.prototype.match(regexp)
	  return [function match(regexp){
	    'use strict';
	    var O  = defined(this)
	      , fn = regexp == undefined ? undefined : regexp[MATCH];
	    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
	  }, $match];
	});

/***/ },
/* 204 */
/*!***********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_fix-re-wks.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var hide     = __webpack_require__(/*! ./_hide */ 13)
	  , redefine = __webpack_require__(/*! ./_redefine */ 21)
	  , fails    = __webpack_require__(/*! ./_fails */ 10)
	  , defined  = __webpack_require__(/*! ./_defined */ 38)
	  , wks      = __webpack_require__(/*! ./_wks */ 28);
	
	module.exports = function(KEY, length, exec){
	  var SYMBOL   = wks(KEY)
	    , fns      = exec(defined, SYMBOL, ''[KEY])
	    , strfn    = fns[0]
	    , rxfn     = fns[1];
	  if(fails(function(){
	    var O = {};
	    O[SYMBOL] = function(){ return 7; };
	    return ''[KEY](O) != 7;
	  })){
	    redefine(String.prototype, KEY, strfn);
	    hide(RegExp.prototype, SYMBOL, length == 2
	      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	      ? function(string, arg){ return rxfn.call(string, this, arg); }
	      // 21.2.5.6 RegExp.prototype[@@match](string)
	      // 21.2.5.9 RegExp.prototype[@@search](string)
	      : function(string){ return rxfn.call(string, this); }
	    );
	  }
	};

/***/ },
/* 205 */
/*!******************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.regexp.replace.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// @@replace logic
	__webpack_require__(/*! ./_fix-re-wks */ 204)('replace', 2, function(defined, REPLACE, $replace){
	  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
	  return [function replace(searchValue, replaceValue){
	    'use strict';
	    var O  = defined(this)
	      , fn = searchValue == undefined ? undefined : searchValue[REPLACE];
	    return fn !== undefined
	      ? fn.call(searchValue, O, replaceValue)
	      : $replace.call(String(O), searchValue, replaceValue);
	  }, $replace];
	});

/***/ },
/* 206 */
/*!*****************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.regexp.search.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// @@search logic
	__webpack_require__(/*! ./_fix-re-wks */ 204)('search', 1, function(defined, SEARCH, $search){
	  // 21.1.3.15 String.prototype.search(regexp)
	  return [function search(regexp){
	    'use strict';
	    var O  = defined(this)
	      , fn = regexp == undefined ? undefined : regexp[SEARCH];
	    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
	  }, $search];
	});

/***/ },
/* 207 */
/*!****************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.regexp.split.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// @@split logic
	__webpack_require__(/*! ./_fix-re-wks */ 204)('split', 2, function(defined, SPLIT, $split){
	  'use strict';
	  var isRegExp   = __webpack_require__(/*! ./_is-regexp */ 138)
	    , _split     = $split
	    , $push      = [].push
	    , $SPLIT     = 'split'
	    , LENGTH     = 'length'
	    , LAST_INDEX = 'lastIndex';
	  if(
	    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
	    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
	    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
	    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
	    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
	    ''[$SPLIT](/.?/)[LENGTH]
	  ){
	    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
	    // based on es5-shim implementation, need to rework it
	    $split = function(separator, limit){
	      var string = String(this);
	      if(separator === undefined && limit === 0)return [];
	      // If `separator` is not a regex, use native split
	      if(!isRegExp(separator))return _split.call(string, separator, limit);
	      var output = [];
	      var flags = (separator.ignoreCase ? 'i' : '') +
	                  (separator.multiline ? 'm' : '') +
	                  (separator.unicode ? 'u' : '') +
	                  (separator.sticky ? 'y' : '');
	      var lastLastIndex = 0;
	      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
	      // Make `global` and avoid `lastIndex` issues by working with a copy
	      var separatorCopy = new RegExp(separator.source, flags + 'g');
	      var separator2, match, lastIndex, lastLength, i;
	      // Doesn't need flags gy, but they don't hurt
	      if(!NPCG)separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
	      while(match = separatorCopy.exec(string)){
	        // `separatorCopy.lastIndex` is not reliable cross-browser
	        lastIndex = match.index + match[0][LENGTH];
	        if(lastIndex > lastLastIndex){
	          output.push(string.slice(lastLastIndex, match.index));
	          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
	          if(!NPCG && match[LENGTH] > 1)match[0].replace(separator2, function(){
	            for(i = 1; i < arguments[LENGTH] - 2; i++)if(arguments[i] === undefined)match[i] = undefined;
	          });
	          if(match[LENGTH] > 1 && match.index < string[LENGTH])$push.apply(output, match.slice(1));
	          lastLength = match[0][LENGTH];
	          lastLastIndex = lastIndex;
	          if(output[LENGTH] >= splitLimit)break;
	        }
	        if(separatorCopy[LAST_INDEX] === match.index)separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
	      }
	      if(lastLastIndex === string[LENGTH]){
	        if(lastLength || !separatorCopy.test(''))output.push('');
	      } else output.push(string.slice(lastLastIndex));
	      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
	    };
	  // Chakra, V8
	  } else if('0'[$SPLIT](undefined, 0)[LENGTH]){
	    $split = function(separator, limit){
	      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
	    };
	  }
	  // 21.1.3.17 String.prototype.split(separator, limit)
	  return [function split(separator, limit){
	    var O  = defined(this)
	      , fn = separator == undefined ? undefined : separator[SPLIT];
	    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
	  }, $split];
	});

/***/ },
/* 208 */
/*!***********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.promise.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY            = __webpack_require__(/*! ./_library */ 31)
	  , global             = __webpack_require__(/*! ./_global */ 7)
	  , ctx                = __webpack_require__(/*! ./_ctx */ 23)
	  , classof            = __webpack_require__(/*! ./_classof */ 78)
	  , $export            = __webpack_require__(/*! ./_export */ 11)
	  , isObject           = __webpack_require__(/*! ./_is-object */ 16)
	  , anObject           = __webpack_require__(/*! ./_an-object */ 15)
	  , aFunction          = __webpack_require__(/*! ./_a-function */ 24)
	  , anInstance         = __webpack_require__(/*! ./_an-instance */ 93)
	  , forOf              = __webpack_require__(/*! ./_for-of */ 209)
	  , setProto           = __webpack_require__(/*! ./_set-proto */ 76).set
	  , speciesConstructor = __webpack_require__(/*! ./_species-constructor */ 210)
	  , task               = __webpack_require__(/*! ./_task */ 211).set
	  , microtask          = __webpack_require__(/*! ./_microtask */ 212)()
	  , PROMISE            = 'Promise'
	  , TypeError          = global.TypeError
	  , process            = global.process
	  , $Promise           = global[PROMISE]
	  , process            = global.process
	  , isNode             = classof(process) == 'process'
	  , empty              = function(){ /* empty */ }
	  , Internal, GenericPromiseCapability, Wrapper;
	
	var USE_NATIVE = !!function(){
	  try {
	    // correct subclassing with @@species support
	    var promise     = $Promise.resolve(1)
	      , FakePromise = (promise.constructor = {})[__webpack_require__(/*! ./_wks */ 28)('species')] = function(exec){ exec(empty, empty); };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch(e){ /* empty */ }
	}();
	
	// helpers
	var sameConstructor = function(a, b){
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function(C){
	  return sameConstructor($Promise, C)
	    ? new PromiseCapability(C)
	    : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject  = aFunction(reject);
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(promise, isReject){
	  if(promise._n)return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function(){
	    var value = promise._v
	      , ok    = promise._s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , domain  = reaction.domain
	        , result, then;
	      try {
	        if(handler){
	          if(!ok){
	            if(promise._h == 2)onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if(handler === true)result = value;
	          else {
	            if(domain)domain.enter();
	            result = handler(value);
	            if(domain)domain.exit();
	          }
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if(isReject && !promise._h)onUnhandled(promise);
	  });
	};
	var onUnhandled = function(promise){
	  task.call(global, function(){
	    var value = promise._v
	      , abrupt, handler, console;
	    if(isUnhandled(promise)){
	      abrupt = perform(function(){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if(abrupt)throw abrupt.error;
	  });
	};
	var isUnhandled = function(promise){
	  if(promise._h == 1)return false;
	  var chain = promise._a || promise._c
	    , i     = 0
	    , reaction;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var onHandleUnhandled = function(promise){
	  task.call(global, function(){
	    var handler;
	    if(isNode){
	      process.emit('rejectionHandled', promise);
	    } else if(handler = global.onrejectionhandled){
	      handler({promise: promise, reason: promise._v});
	    }
	  });
	};
	var $reject = function(value){
	  var promise = this;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if(!promise._a)promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function(value){
	  var promise = this
	    , then;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if(promise === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      microtask(function(){
	        var wrapper = {_w: promise, _d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch(e){
	    $reject.call({_w: promise, _d: false}, e); // wrap
	  }
	};
	
	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor){
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch(err){
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor){
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__(/*! ./_redefine-all */ 213)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail   = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if(this._a)this._a.push(reaction);
	      if(this._s)notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function(){
	    var promise  = new Internal;
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject  = ctx($reject, promise, 1);
	  };
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
	__webpack_require__(/*! ./_set-to-string-tag */ 27)($Promise, PROMISE);
	__webpack_require__(/*! ./_set-species */ 196)(PROMISE);
	Wrapper = __webpack_require__(/*! ./_core */ 12)[PROMISE];
	
	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = newPromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
	    var capability = newPromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(/*! ./_iter-detect */ 169)(function(iter){
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      var values    = []
	        , index     = 0
	        , remaining = 1;
	      forOf(iterable, false, function(promise){
	        var $index        = index++
	          , alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled  = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 209 */
/*!*******************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_for-of.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(/*! ./_ctx */ 23)
	  , call        = __webpack_require__(/*! ./_iter-call */ 165)
	  , isArrayIter = __webpack_require__(/*! ./_is-array-iter */ 166)
	  , anObject    = __webpack_require__(/*! ./_an-object */ 15)
	  , toLength    = __webpack_require__(/*! ./_to-length */ 40)
	  , getIterFn   = __webpack_require__(/*! ./core.get-iterator-method */ 168);
	module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    call(iterator, f, step.value, entries);
	  }
	};

/***/ },
/* 210 */
/*!********************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_species-constructor.js ***!
  \********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(/*! ./_an-object */ 15)
	  , aFunction = __webpack_require__(/*! ./_a-function */ 24)
	  , SPECIES   = __webpack_require__(/*! ./_wks */ 28)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 211 */
/*!*****************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_task.js ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(/*! ./_ctx */ 23)
	  , invoke             = __webpack_require__(/*! ./_invoke */ 81)
	  , html               = __webpack_require__(/*! ./_html */ 51)
	  , cel                = __webpack_require__(/*! ./_dom-create */ 18)
	  , global             = __webpack_require__(/*! ./_global */ 7)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(/*! ./_cof */ 37)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 212 */
/*!**********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_microtask.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(/*! ./_global */ 7)
	  , macrotask = __webpack_require__(/*! ./_task */ 211).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(/*! ./_cof */ 37)(process) == 'process';
	
	module.exports = function(){
	  var head, last, notify;
	
	  var flush = function(){
	    var parent, fn;
	    if(isNode && (parent = process.domain))parent.exit();
	    while(head){
	      fn   = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch(e){
	        if(head)notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if(parent)parent.enter();
	  };
	
	  // Node.js
	  if(isNode){
	    notify = function(){
	      process.nextTick(flush);
	    };
	  // browsers with MutationObserver
	  } else if(Observer){
	    var toggle = true
	      , node   = document.createTextNode('');
	    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	    notify = function(){
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if(Promise && Promise.resolve){
	    var promise = Promise.resolve();
	    notify = function(){
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function(){
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global, flush);
	    };
	  }
	
	  return function(fn){
	    var task = {fn: fn, next: undefined};
	    if(last)last.next = task;
	    if(!head){
	      head = task;
	      notify();
	    } last = task;
	  };
	};

/***/ },
/* 213 */
/*!*************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_redefine-all.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var redefine = __webpack_require__(/*! ./_redefine */ 21);
	module.exports = function(target, src, safe){
	  for(var key in src)redefine(target, key, src[key], safe);
	  return target;
	};

/***/ },
/* 214 */
/*!*******************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.map.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(/*! ./_collection-strong */ 215);
	
	// 23.1 Map Objects
	module.exports = __webpack_require__(/*! ./_collection */ 216)('Map', function(get){
	  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key){
	    var entry = strong.getEntry(this, key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value){
	    return strong.def(this, key === 0 ? 0 : key, value);
	  }
	}, strong, true);

/***/ },
/* 215 */
/*!******************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_collection-strong.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var dP          = __webpack_require__(/*! ./_object-dp */ 14).f
	  , create      = __webpack_require__(/*! ./_object-create */ 49)
	  , hide        = __webpack_require__(/*! ./_hide */ 13)
	  , redefineAll = __webpack_require__(/*! ./_redefine-all */ 213)
	  , ctx         = __webpack_require__(/*! ./_ctx */ 23)
	  , anInstance  = __webpack_require__(/*! ./_an-instance */ 93)
	  , defined     = __webpack_require__(/*! ./_defined */ 38)
	  , forOf       = __webpack_require__(/*! ./_for-of */ 209)
	  , $iterDefine = __webpack_require__(/*! ./_iter-define */ 132)
	  , step        = __webpack_require__(/*! ./_iter-step */ 198)
	  , setSpecies  = __webpack_require__(/*! ./_set-species */ 196)
	  , DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 9)
	  , fastKey     = __webpack_require__(/*! ./_meta */ 25).fastKey
	  , SIZE        = DESCRIPTORS ? '_s' : 'size';
	
	var getEntry = function(that, key){
	  // fast case
	  var index = fastKey(key), entry;
	  if(index !== 'F')return that._i[index];
	  // frozen object case
	  for(entry = that._f; entry; entry = entry.n){
	    if(entry.k == key)return entry;
	  }
	};
	
	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      anInstance(that, C, NAME, '_i');
	      that._i = create(null); // index
	      that._f = undefined;    // first entry
	      that._l = undefined;    // last entry
	      that[SIZE] = 0;         // size
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear(){
	        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
	          entry.r = true;
	          if(entry.p)entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function(key){
	        var that  = this
	          , entry = getEntry(that, key);
	        if(entry){
	          var next = entry.n
	            , prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if(prev)prev.n = next;
	          if(next)next.p = prev;
	          if(that._f == entry)that._f = next;
	          if(that._l == entry)that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /*, that = undefined */){
	        anInstance(this, C, 'forEach');
	        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
	          , entry;
	        while(entry = entry ? entry.n : this._f){
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while(entry && entry.r)entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key){
	        return !!getEntry(this, key);
	      }
	    });
	    if(DESCRIPTORS)dP(C.prototype, 'size', {
	      get: function(){
	        return defined(this[SIZE]);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var entry = getEntry(that, key)
	      , prev, index;
	    // change existing entry
	    if(entry){
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if(!that._f)that._f = entry;
	      if(prev)prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if(index !== 'F')that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function(C, NAME, IS_MAP){
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    $iterDefine(C, NAME, function(iterated, kind){
	      this._t = iterated;  // target
	      this._k = kind;      // kind
	      this._l = undefined; // previous
	    }, function(){
	      var that  = this
	        , kind  = that._k
	        , entry = that._l;
	      // revert to the last existing entry
	      while(entry && entry.r)entry = entry.p;
	      // get next entry
	      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
	        // or finish the iteration
	        that._t = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if(kind == 'keys'  )return step(0, entry.k);
	      if(kind == 'values')return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);
	
	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(NAME);
	  }
	};

/***/ },
/* 216 */
/*!***********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_collection.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global            = __webpack_require__(/*! ./_global */ 7)
	  , $export           = __webpack_require__(/*! ./_export */ 11)
	  , redefine          = __webpack_require__(/*! ./_redefine */ 21)
	  , redefineAll       = __webpack_require__(/*! ./_redefine-all */ 213)
	  , meta              = __webpack_require__(/*! ./_meta */ 25)
	  , forOf             = __webpack_require__(/*! ./_for-of */ 209)
	  , anInstance        = __webpack_require__(/*! ./_an-instance */ 93)
	  , isObject          = __webpack_require__(/*! ./_is-object */ 16)
	  , fails             = __webpack_require__(/*! ./_fails */ 10)
	  , $iterDetect       = __webpack_require__(/*! ./_iter-detect */ 169)
	  , setToStringTag    = __webpack_require__(/*! ./_set-to-string-tag */ 27)
	  , inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ 91);
	
	module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
	  var Base  = global[NAME]
	    , C     = Base
	    , ADDER = IS_MAP ? 'set' : 'add'
	    , proto = C && C.prototype
	    , O     = {};
	  var fixMethod = function(KEY){
	    var fn = proto[KEY];
	    redefine(proto, KEY,
	      KEY == 'delete' ? function(a){
	        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'has' ? function has(a){
	        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'get' ? function get(a){
	        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
	        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
	    );
	  };
	  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
	    new C().entries().next();
	  }))){
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    redefineAll(C.prototype, methods);
	    meta.NEED = true;
	  } else {
	    var instance             = new C
	      // early implementations not supports chaining
	      , HASNT_CHAINING       = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
	      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
	      , THROWS_ON_PRIMITIVES = fails(function(){ instance.has(1); })
	      // most early implementations doesn't supports iterables, most modern - not close it correctly
	      , ACCEPT_ITERABLES     = $iterDetect(function(iter){ new C(iter); }) // eslint-disable-line no-new
	      // for early implementations -0 and +0 not the same
	      , BUGGY_ZERO = !IS_WEAK && fails(function(){
	        // V8 ~ Chromium 42- fails only with 5+ elements
	        var $instance = new C()
	          , index     = 5;
	        while(index--)$instance[ADDER](index, index);
	        return !$instance.has(-0);
	      });
	    if(!ACCEPT_ITERABLES){ 
	      C = wrapper(function(target, iterable){
	        anInstance(target, C, NAME);
	        var that = inheritIfRequired(new Base, target, C);
	        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	        return that;
	      });
	      C.prototype = proto;
	      proto.constructor = C;
	    }
	    if(THROWS_ON_PRIMITIVES || BUGGY_ZERO){
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }
	    if(BUGGY_ZERO || HASNT_CHAINING)fixMethod(ADDER);
	    // weak collections should not contains .clear method
	    if(IS_WEAK && proto.clear)delete proto.clear;
	  }
	
	  setToStringTag(C, NAME);
	
	  O[NAME] = C;
	  $export($export.G + $export.W + $export.F * (C != Base), O);
	
	  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);
	
	  return C;
	};

/***/ },
/* 217 */
/*!*******************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.set.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(/*! ./_collection-strong */ 215);
	
	// 23.2 Set Objects
	module.exports = __webpack_require__(/*! ./_collection */ 216)('Set', function(get){
	  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value){
	    return strong.def(this, value = value === 0 ? 0 : value, value);
	  }
	}, strong);

/***/ },
/* 218 */
/*!************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.weak-map.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var each         = __webpack_require__(/*! ./_array-methods */ 176)(0)
	  , redefine     = __webpack_require__(/*! ./_redefine */ 21)
	  , meta         = __webpack_require__(/*! ./_meta */ 25)
	  , assign       = __webpack_require__(/*! ./_object-assign */ 72)
	  , weak         = __webpack_require__(/*! ./_collection-weak */ 219)
	  , isObject     = __webpack_require__(/*! ./_is-object */ 16)
	  , has          = __webpack_require__(/*! ./_has */ 8)
	  , getWeak      = meta.getWeak
	  , isExtensible = Object.isExtensible
	  , uncaughtFrozenStore = weak.ufstore
	  , tmp          = {}
	  , InternalMap;
	
	var wrapper = function(get){
	  return function WeakMap(){
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	};
	
	var methods = {
	  // 23.3.3.3 WeakMap.prototype.get(key)
	  get: function get(key){
	    if(isObject(key)){
	      var data = getWeak(key);
	      if(data === true)return uncaughtFrozenStore(this).get(key);
	      return data ? data[this._i] : undefined;
	    }
	  },
	  // 23.3.3.5 WeakMap.prototype.set(key, value)
	  set: function set(key, value){
	    return weak.def(this, key, value);
	  }
	};
	
	// 23.3 WeakMap Objects
	var $WeakMap = module.exports = __webpack_require__(/*! ./_collection */ 216)('WeakMap', wrapper, methods, weak, true, true);
	
	// IE11 WeakMap frozen keys fix
	if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
	  InternalMap = weak.getConstructor(wrapper);
	  assign(InternalMap.prototype, methods);
	  meta.NEED = true;
	  each(['delete', 'has', 'get', 'set'], function(key){
	    var proto  = $WeakMap.prototype
	      , method = proto[key];
	    redefine(proto, key, function(a, b){
	      // store frozen objects on internal weakmap shim
	      if(isObject(a) && !isExtensible(a)){
	        if(!this._f)this._f = new InternalMap;
	        var result = this._f[key](a, b);
	        return key == 'set' ? this : result;
	      // store all the rest on native weakmap
	      } return method.call(this, a, b);
	    });
	  });
	}

/***/ },
/* 219 */
/*!****************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_collection-weak.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var redefineAll       = __webpack_require__(/*! ./_redefine-all */ 213)
	  , getWeak           = __webpack_require__(/*! ./_meta */ 25).getWeak
	  , anObject          = __webpack_require__(/*! ./_an-object */ 15)
	  , isObject          = __webpack_require__(/*! ./_is-object */ 16)
	  , anInstance        = __webpack_require__(/*! ./_an-instance */ 93)
	  , forOf             = __webpack_require__(/*! ./_for-of */ 209)
	  , createArrayMethod = __webpack_require__(/*! ./_array-methods */ 176)
	  , $has              = __webpack_require__(/*! ./_has */ 8)
	  , arrayFind         = createArrayMethod(5)
	  , arrayFindIndex    = createArrayMethod(6)
	  , id                = 0;
	
	// fallback for uncaught frozen keys
	var uncaughtFrozenStore = function(that){
	  return that._l || (that._l = new UncaughtFrozenStore);
	};
	var UncaughtFrozenStore = function(){
	  this.a = [];
	};
	var findUncaughtFrozen = function(store, key){
	  return arrayFind(store.a, function(it){
	    return it[0] === key;
	  });
	};
	UncaughtFrozenStore.prototype = {
	  get: function(key){
	    var entry = findUncaughtFrozen(this, key);
	    if(entry)return entry[1];
	  },
	  has: function(key){
	    return !!findUncaughtFrozen(this, key);
	  },
	  set: function(key, value){
	    var entry = findUncaughtFrozen(this, key);
	    if(entry)entry[1] = value;
	    else this.a.push([key, value]);
	  },
	  'delete': function(key){
	    var index = arrayFindIndex(this.a, function(it){
	      return it[0] === key;
	    });
	    if(~index)this.a.splice(index, 1);
	    return !!~index;
	  }
	};
	
	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      anInstance(that, C, NAME, '_i');
	      that._i = id++;      // collection id
	      that._l = undefined; // leak store for uncaught frozen objects
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.3.3.2 WeakMap.prototype.delete(key)
	      // 23.4.3.3 WeakSet.prototype.delete(value)
	      'delete': function(key){
	        if(!isObject(key))return false;
	        var data = getWeak(key);
	        if(data === true)return uncaughtFrozenStore(this)['delete'](key);
	        return data && $has(data, this._i) && delete data[this._i];
	      },
	      // 23.3.3.4 WeakMap.prototype.has(key)
	      // 23.4.3.4 WeakSet.prototype.has(value)
	      has: function has(key){
	        if(!isObject(key))return false;
	        var data = getWeak(key);
	        if(data === true)return uncaughtFrozenStore(this).has(key);
	        return data && $has(data, this._i);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var data = getWeak(anObject(key), true);
	    if(data === true)uncaughtFrozenStore(that).set(key, value);
	    else data[that._i] = value;
	    return that;
	  },
	  ufstore: uncaughtFrozenStore
	};

/***/ },
/* 220 */
/*!************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.weak-set.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var weak = __webpack_require__(/*! ./_collection-weak */ 219);
	
	// 23.4 WeakSet Objects
	__webpack_require__(/*! ./_collection */ 216)('WeakSet', function(get){
	  return function WeakSet(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.4.3.1 WeakSet.prototype.add(value)
	  add: function add(value){
	    return weak.def(this, value, true);
	  }
	}, weak, false, true);

/***/ },
/* 221 */
/*!**********************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.typed.array-buffer.js ***!
  \**********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export      = __webpack_require__(/*! ./_export */ 11)
	  , $typed       = __webpack_require__(/*! ./_typed */ 222)
	  , buffer       = __webpack_require__(/*! ./_typed-buffer */ 223)
	  , anObject     = __webpack_require__(/*! ./_an-object */ 15)
	  , toIndex      = __webpack_require__(/*! ./_to-index */ 42)
	  , toLength     = __webpack_require__(/*! ./_to-length */ 40)
	  , isObject     = __webpack_require__(/*! ./_is-object */ 16)
	  , TYPED_ARRAY  = __webpack_require__(/*! ./_wks */ 28)('typed_array')
	  , ArrayBuffer  = __webpack_require__(/*! ./_global */ 7).ArrayBuffer
	  , speciesConstructor = __webpack_require__(/*! ./_species-constructor */ 210)
	  , $ArrayBuffer = buffer.ArrayBuffer
	  , $DataView    = buffer.DataView
	  , $isView      = $typed.ABV && ArrayBuffer.isView
	  , $slice       = $ArrayBuffer.prototype.slice
	  , VIEW         = $typed.VIEW
	  , ARRAY_BUFFER = 'ArrayBuffer';
	
	$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), {ArrayBuffer: $ArrayBuffer});
	
	$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
	  // 24.1.3.1 ArrayBuffer.isView(arg)
	  isView: function isView(it){
	    return $isView && $isView(it) || isObject(it) && VIEW in it;
	  }
	});
	
	$export($export.P + $export.U + $export.F * __webpack_require__(/*! ./_fails */ 10)(function(){
	  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
	}), ARRAY_BUFFER, {
	  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
	  slice: function slice(start, end){
	    if($slice !== undefined && end === undefined)return $slice.call(anObject(this), start); // FF fix
	    var len    = anObject(this).byteLength
	      , first  = toIndex(start, len)
	      , final  = toIndex(end === undefined ? len : end, len)
	      , result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first))
	      , viewS  = new $DataView(this)
	      , viewT  = new $DataView(result)
	      , index  = 0;
	    while(first < final){
	      viewT.setUint8(index++, viewS.getUint8(first++));
	    } return result;
	  }
	});
	
	__webpack_require__(/*! ./_set-species */ 196)(ARRAY_BUFFER);

/***/ },
/* 222 */
/*!******************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_typed.js ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(/*! ./_global */ 7)
	  , hide   = __webpack_require__(/*! ./_hide */ 13)
	  , uid    = __webpack_require__(/*! ./_uid */ 22)
	  , TYPED  = uid('typed_array')
	  , VIEW   = uid('view')
	  , ABV    = !!(global.ArrayBuffer && global.DataView)
	  , CONSTR = ABV
	  , i = 0, l = 9, Typed;
	
	var TypedArrayConstructors = (
	  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
	).split(',');
	
	while(i < l){
	  if(Typed = global[TypedArrayConstructors[i++]]){
	    hide(Typed.prototype, TYPED, true);
	    hide(Typed.prototype, VIEW, true);
	  } else CONSTR = false;
	}
	
	module.exports = {
	  ABV:    ABV,
	  CONSTR: CONSTR,
	  TYPED:  TYPED,
	  VIEW:   VIEW
	};

/***/ },
/* 223 */
/*!*************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_typed-buffer.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global         = __webpack_require__(/*! ./_global */ 7)
	  , DESCRIPTORS    = __webpack_require__(/*! ./_descriptors */ 9)
	  , LIBRARY        = __webpack_require__(/*! ./_library */ 31)
	  , $typed         = __webpack_require__(/*! ./_typed */ 222)
	  , hide           = __webpack_require__(/*! ./_hide */ 13)
	  , redefineAll    = __webpack_require__(/*! ./_redefine-all */ 213)
	  , fails          = __webpack_require__(/*! ./_fails */ 10)
	  , anInstance     = __webpack_require__(/*! ./_an-instance */ 93)
	  , toInteger      = __webpack_require__(/*! ./_to-integer */ 41)
	  , toLength       = __webpack_require__(/*! ./_to-length */ 40)
	  , gOPN           = __webpack_require__(/*! ./_object-gopn */ 53).f
	  , dP             = __webpack_require__(/*! ./_object-dp */ 14).f
	  , arrayFill      = __webpack_require__(/*! ./_array-fill */ 192)
	  , setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 27)
	  , ARRAY_BUFFER   = 'ArrayBuffer'
	  , DATA_VIEW      = 'DataView'
	  , PROTOTYPE      = 'prototype'
	  , WRONG_LENGTH   = 'Wrong length!'
	  , WRONG_INDEX    = 'Wrong index!'
	  , $ArrayBuffer   = global[ARRAY_BUFFER]
	  , $DataView      = global[DATA_VIEW]
	  , Math           = global.Math
	  , parseInt       = global.parseInt
	  , RangeError     = global.RangeError
	  , Infinity       = global.Infinity
	  , BaseBuffer     = $ArrayBuffer
	  , abs            = Math.abs
	  , pow            = Math.pow
	  , min            = Math.min
	  , floor          = Math.floor
	  , log            = Math.log
	  , LN2            = Math.LN2
	  , BUFFER         = 'buffer'
	  , BYTE_LENGTH    = 'byteLength'
	  , BYTE_OFFSET    = 'byteOffset'
	  , $BUFFER        = DESCRIPTORS ? '_b' : BUFFER
	  , $LENGTH        = DESCRIPTORS ? '_l' : BYTE_LENGTH
	  , $OFFSET        = DESCRIPTORS ? '_o' : BYTE_OFFSET;
	
	// IEEE754 conversions based on https://github.com/feross/ieee754
	var packIEEE754 = function(value, mLen, nBytes){
	  var buffer = Array(nBytes)
	    , eLen   = nBytes * 8 - mLen - 1
	    , eMax   = (1 << eLen) - 1
	    , eBias  = eMax >> 1
	    , rt     = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0
	    , i      = 0
	    , s      = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0
	    , e, m, c;
	  value = abs(value)
	  if(value != value || value === Infinity){
	    m = value != value ? 1 : 0;
	    e = eMax;
	  } else {
	    e = floor(log(value) / LN2);
	    if(value * (c = pow(2, -e)) < 1){
	      e--;
	      c *= 2;
	    }
	    if(e + eBias >= 1){
	      value += rt / c;
	    } else {
	      value += rt * pow(2, 1 - eBias);
	    }
	    if(value * c >= 2){
	      e++;
	      c /= 2;
	    }
	    if(e + eBias >= eMax){
	      m = 0;
	      e = eMax;
	    } else if(e + eBias >= 1){
	      m = (value * c - 1) * pow(2, mLen);
	      e = e + eBias;
	    } else {
	      m = value * pow(2, eBias - 1) * pow(2, mLen);
	      e = 0;
	    }
	  }
	  for(; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
	  e = e << mLen | m;
	  eLen += mLen;
	  for(; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
	  buffer[--i] |= s * 128;
	  return buffer;
	};
	var unpackIEEE754 = function(buffer, mLen, nBytes){
	  var eLen  = nBytes * 8 - mLen - 1
	    , eMax  = (1 << eLen) - 1
	    , eBias = eMax >> 1
	    , nBits = eLen - 7
	    , i     = nBytes - 1
	    , s     = buffer[i--]
	    , e     = s & 127
	    , m;
	  s >>= 7;
	  for(; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
	  m = e & (1 << -nBits) - 1;
	  e >>= -nBits;
	  nBits += mLen;
	  for(; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
	  if(e === 0){
	    e = 1 - eBias;
	  } else if(e === eMax){
	    return m ? NaN : s ? -Infinity : Infinity;
	  } else {
	    m = m + pow(2, mLen);
	    e = e - eBias;
	  } return (s ? -1 : 1) * m * pow(2, e - mLen);
	};
	
	var unpackI32 = function(bytes){
	  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
	};
	var packI8 = function(it){
	  return [it & 0xff];
	};
	var packI16 = function(it){
	  return [it & 0xff, it >> 8 & 0xff];
	};
	var packI32 = function(it){
	  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
	};
	var packF64 = function(it){
	  return packIEEE754(it, 52, 8);
	};
	var packF32 = function(it){
	  return packIEEE754(it, 23, 4);
	};
	
	var addGetter = function(C, key, internal){
	  dP(C[PROTOTYPE], key, {get: function(){ return this[internal]; }});
	};
	
	var get = function(view, bytes, index, isLittleEndian){
	  var numIndex = +index
	    , intIndex = toInteger(numIndex);
	  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
	  var store = view[$BUFFER]._b
	    , start = intIndex + view[$OFFSET]
	    , pack  = store.slice(start, start + bytes);
	  return isLittleEndian ? pack : pack.reverse();
	};
	var set = function(view, bytes, index, conversion, value, isLittleEndian){
	  var numIndex = +index
	    , intIndex = toInteger(numIndex);
	  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
	  var store = view[$BUFFER]._b
	    , start = intIndex + view[$OFFSET]
	    , pack  = conversion(+value);
	  for(var i = 0; i < bytes; i++)store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
	};
	
	var validateArrayBufferArguments = function(that, length){
	  anInstance(that, $ArrayBuffer, ARRAY_BUFFER);
	  var numberLength = +length
	    , byteLength   = toLength(numberLength);
	  if(numberLength != byteLength)throw RangeError(WRONG_LENGTH);
	  return byteLength;
	};
	
	if(!$typed.ABV){
	  $ArrayBuffer = function ArrayBuffer(length){
	    var byteLength = validateArrayBufferArguments(this, length);
	    this._b       = arrayFill.call(Array(byteLength), 0);
	    this[$LENGTH] = byteLength;
	  };
	
	  $DataView = function DataView(buffer, byteOffset, byteLength){
	    anInstance(this, $DataView, DATA_VIEW);
	    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
	    var bufferLength = buffer[$LENGTH]
	      , offset       = toInteger(byteOffset);
	    if(offset < 0 || offset > bufferLength)throw RangeError('Wrong offset!');
	    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
	    if(offset + byteLength > bufferLength)throw RangeError(WRONG_LENGTH);
	    this[$BUFFER] = buffer;
	    this[$OFFSET] = offset;
	    this[$LENGTH] = byteLength;
	  };
	
	  if(DESCRIPTORS){
	    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
	    addGetter($DataView, BUFFER, '_b');
	    addGetter($DataView, BYTE_LENGTH, '_l');
	    addGetter($DataView, BYTE_OFFSET, '_o');
	  }
	
	  redefineAll($DataView[PROTOTYPE], {
	    getInt8: function getInt8(byteOffset){
	      return get(this, 1, byteOffset)[0] << 24 >> 24;
	    },
	    getUint8: function getUint8(byteOffset){
	      return get(this, 1, byteOffset)[0];
	    },
	    getInt16: function getInt16(byteOffset /*, littleEndian */){
	      var bytes = get(this, 2, byteOffset, arguments[1]);
	      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
	    },
	    getUint16: function getUint16(byteOffset /*, littleEndian */){
	      var bytes = get(this, 2, byteOffset, arguments[1]);
	      return bytes[1] << 8 | bytes[0];
	    },
	    getInt32: function getInt32(byteOffset /*, littleEndian */){
	      return unpackI32(get(this, 4, byteOffset, arguments[1]));
	    },
	    getUint32: function getUint32(byteOffset /*, littleEndian */){
	      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
	    },
	    getFloat32: function getFloat32(byteOffset /*, littleEndian */){
	      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
	    },
	    getFloat64: function getFloat64(byteOffset /*, littleEndian */){
	      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
	    },
	    setInt8: function setInt8(byteOffset, value){
	      set(this, 1, byteOffset, packI8, value);
	    },
	    setUint8: function setUint8(byteOffset, value){
	      set(this, 1, byteOffset, packI8, value);
	    },
	    setInt16: function setInt16(byteOffset, value /*, littleEndian */){
	      set(this, 2, byteOffset, packI16, value, arguments[2]);
	    },
	    setUint16: function setUint16(byteOffset, value /*, littleEndian */){
	      set(this, 2, byteOffset, packI16, value, arguments[2]);
	    },
	    setInt32: function setInt32(byteOffset, value /*, littleEndian */){
	      set(this, 4, byteOffset, packI32, value, arguments[2]);
	    },
	    setUint32: function setUint32(byteOffset, value /*, littleEndian */){
	      set(this, 4, byteOffset, packI32, value, arguments[2]);
	    },
	    setFloat32: function setFloat32(byteOffset, value /*, littleEndian */){
	      set(this, 4, byteOffset, packF32, value, arguments[2]);
	    },
	    setFloat64: function setFloat64(byteOffset, value /*, littleEndian */){
	      set(this, 8, byteOffset, packF64, value, arguments[2]);
	    }
	  });
	} else {
	  if(!fails(function(){
	    new $ArrayBuffer;     // eslint-disable-line no-new
	  }) || !fails(function(){
	    new $ArrayBuffer(.5); // eslint-disable-line no-new
	  })){
	    $ArrayBuffer = function ArrayBuffer(length){
	      return new BaseBuffer(validateArrayBufferArguments(this, length));
	    };
	    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
	    for(var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j; ){
	      if(!((key = keys[j++]) in $ArrayBuffer))hide($ArrayBuffer, key, BaseBuffer[key]);
	    };
	    if(!LIBRARY)ArrayBufferProto.constructor = $ArrayBuffer;
	  }
	  // iOS Safari 7.x bug
	  var view = new $DataView(new $ArrayBuffer(2))
	    , $setInt8 = $DataView[PROTOTYPE].setInt8;
	  view.setInt8(0, 2147483648);
	  view.setInt8(1, 2147483649);
	  if(view.getInt8(0) || !view.getInt8(1))redefineAll($DataView[PROTOTYPE], {
	    setInt8: function setInt8(byteOffset, value){
	      $setInt8.call(this, byteOffset, value << 24 >> 24);
	    },
	    setUint8: function setUint8(byteOffset, value){
	      $setInt8.call(this, byteOffset, value << 24 >> 24);
	    }
	  }, true);
	}
	setToStringTag($ArrayBuffer, ARRAY_BUFFER);
	setToStringTag($DataView, DATA_VIEW);
	hide($DataView[PROTOTYPE], $typed.VIEW, true);
	exports[ARRAY_BUFFER] = $ArrayBuffer;
	exports[DATA_VIEW] = $DataView;

/***/ },
/* 224 */
/*!*******************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.typed.data-view.js ***!
  \*******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(/*! ./_export */ 11);
	$export($export.G + $export.W + $export.F * !__webpack_require__(/*! ./_typed */ 222).ABV, {
	  DataView: __webpack_require__(/*! ./_typed-buffer */ 223).DataView
	});

/***/ },
/* 225 */
/*!********************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.typed.int8-array.js ***!
  \********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ./_typed-array */ 226)('Int8', 1, function(init){
	  return function Int8Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 226 */
/*!************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_typed-array.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	if(__webpack_require__(/*! ./_descriptors */ 9)){
	  var LIBRARY             = __webpack_require__(/*! ./_library */ 31)
	    , global              = __webpack_require__(/*! ./_global */ 7)
	    , fails               = __webpack_require__(/*! ./_fails */ 10)
	    , $export             = __webpack_require__(/*! ./_export */ 11)
	    , $typed              = __webpack_require__(/*! ./_typed */ 222)
	    , $buffer             = __webpack_require__(/*! ./_typed-buffer */ 223)
	    , ctx                 = __webpack_require__(/*! ./_ctx */ 23)
	    , anInstance          = __webpack_require__(/*! ./_an-instance */ 93)
	    , propertyDesc        = __webpack_require__(/*! ./_property-desc */ 20)
	    , hide                = __webpack_require__(/*! ./_hide */ 13)
	    , redefineAll         = __webpack_require__(/*! ./_redefine-all */ 213)
	    , isInteger           = __webpack_require__(/*! ./_is-integer */ 100)
	    , toInteger           = __webpack_require__(/*! ./_to-integer */ 41)
	    , toLength            = __webpack_require__(/*! ./_to-length */ 40)
	    , toIndex             = __webpack_require__(/*! ./_to-index */ 42)
	    , toPrimitive         = __webpack_require__(/*! ./_to-primitive */ 19)
	    , has                 = __webpack_require__(/*! ./_has */ 8)
	    , same                = __webpack_require__(/*! ./_same-value */ 74)
	    , classof             = __webpack_require__(/*! ./_classof */ 78)
	    , isObject            = __webpack_require__(/*! ./_is-object */ 16)
	    , toObject            = __webpack_require__(/*! ./_to-object */ 61)
	    , isArrayIter         = __webpack_require__(/*! ./_is-array-iter */ 166)
	    , create              = __webpack_require__(/*! ./_object-create */ 49)
	    , getPrototypeOf      = __webpack_require__(/*! ./_object-gpo */ 62)
	    , gOPN                = __webpack_require__(/*! ./_object-gopn */ 53).f
	    , isIterable          = __webpack_require__(/*! ./core.is-iterable */ 227)
	    , getIterFn           = __webpack_require__(/*! ./core.get-iterator-method */ 168)
	    , uid                 = __webpack_require__(/*! ./_uid */ 22)
	    , wks                 = __webpack_require__(/*! ./_wks */ 28)
	    , createArrayMethod   = __webpack_require__(/*! ./_array-methods */ 176)
	    , createArrayIncludes = __webpack_require__(/*! ./_array-includes */ 39)
	    , speciesConstructor  = __webpack_require__(/*! ./_species-constructor */ 210)
	    , ArrayIterators      = __webpack_require__(/*! ./es6.array.iterator */ 197)
	    , Iterators           = __webpack_require__(/*! ./_iterators */ 133)
	    , $iterDetect         = __webpack_require__(/*! ./_iter-detect */ 169)
	    , setSpecies          = __webpack_require__(/*! ./_set-species */ 196)
	    , arrayFill           = __webpack_require__(/*! ./_array-fill */ 192)
	    , arrayCopyWithin     = __webpack_require__(/*! ./_array-copy-within */ 189)
	    , $DP                 = __webpack_require__(/*! ./_object-dp */ 14)
	    , $GOPD               = __webpack_require__(/*! ./_object-gopd */ 54)
	    , dP                  = $DP.f
	    , gOPD                = $GOPD.f
	    , RangeError          = global.RangeError
	    , TypeError           = global.TypeError
	    , Uint8Array          = global.Uint8Array
	    , ARRAY_BUFFER        = 'ArrayBuffer'
	    , SHARED_BUFFER       = 'Shared' + ARRAY_BUFFER
	    , BYTES_PER_ELEMENT   = 'BYTES_PER_ELEMENT'
	    , PROTOTYPE           = 'prototype'
	    , ArrayProto          = Array[PROTOTYPE]
	    , $ArrayBuffer        = $buffer.ArrayBuffer
	    , $DataView           = $buffer.DataView
	    , arrayForEach        = createArrayMethod(0)
	    , arrayFilter         = createArrayMethod(2)
	    , arraySome           = createArrayMethod(3)
	    , arrayEvery          = createArrayMethod(4)
	    , arrayFind           = createArrayMethod(5)
	    , arrayFindIndex      = createArrayMethod(6)
	    , arrayIncludes       = createArrayIncludes(true)
	    , arrayIndexOf        = createArrayIncludes(false)
	    , arrayValues         = ArrayIterators.values
	    , arrayKeys           = ArrayIterators.keys
	    , arrayEntries        = ArrayIterators.entries
	    , arrayLastIndexOf    = ArrayProto.lastIndexOf
	    , arrayReduce         = ArrayProto.reduce
	    , arrayReduceRight    = ArrayProto.reduceRight
	    , arrayJoin           = ArrayProto.join
	    , arraySort           = ArrayProto.sort
	    , arraySlice          = ArrayProto.slice
	    , arrayToString       = ArrayProto.toString
	    , arrayToLocaleString = ArrayProto.toLocaleString
	    , ITERATOR            = wks('iterator')
	    , TAG                 = wks('toStringTag')
	    , TYPED_CONSTRUCTOR   = uid('typed_constructor')
	    , DEF_CONSTRUCTOR     = uid('def_constructor')
	    , ALL_CONSTRUCTORS    = $typed.CONSTR
	    , TYPED_ARRAY         = $typed.TYPED
	    , VIEW                = $typed.VIEW
	    , WRONG_LENGTH        = 'Wrong length!';
	
	  var $map = createArrayMethod(1, function(O, length){
	    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
	  });
	
	  var LITTLE_ENDIAN = fails(function(){
	    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
	  });
	
	  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function(){
	    new Uint8Array(1).set({});
	  });
	
	  var strictToLength = function(it, SAME){
	    if(it === undefined)throw TypeError(WRONG_LENGTH);
	    var number = +it
	      , length = toLength(it);
	    if(SAME && !same(number, length))throw RangeError(WRONG_LENGTH);
	    return length;
	  };
	
	  var toOffset = function(it, BYTES){
	    var offset = toInteger(it);
	    if(offset < 0 || offset % BYTES)throw RangeError('Wrong offset!');
	    return offset;
	  };
	
	  var validate = function(it){
	    if(isObject(it) && TYPED_ARRAY in it)return it;
	    throw TypeError(it + ' is not a typed array!');
	  };
	
	  var allocate = function(C, length){
	    if(!(isObject(C) && TYPED_CONSTRUCTOR in C)){
	      throw TypeError('It is not a typed array constructor!');
	    } return new C(length);
	  };
	
	  var speciesFromList = function(O, list){
	    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
	  };
	
	  var fromList = function(C, list){
	    var index  = 0
	      , length = list.length
	      , result = allocate(C, length);
	    while(length > index)result[index] = list[index++];
	    return result;
	  };
	
	  var addGetter = function(it, key, internal){
	    dP(it, key, {get: function(){ return this._d[internal]; }});
	  };
	
	  var $from = function from(source /*, mapfn, thisArg */){
	    var O       = toObject(source)
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , iterFn  = getIterFn(O)
	      , i, length, values, result, step, iterator;
	    if(iterFn != undefined && !isArrayIter(iterFn)){
	      for(iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++){
	        values.push(step.value);
	      } O = values;
	    }
	    if(mapping && aLen > 2)mapfn = ctx(mapfn, arguments[2], 2);
	    for(i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++){
	      result[i] = mapping ? mapfn(O[i], i) : O[i];
	    }
	    return result;
	  };
	
	  var $of = function of(/*...items*/){
	    var index  = 0
	      , length = arguments.length
	      , result = allocate(this, length);
	    while(length > index)result[index] = arguments[index++];
	    return result;
	  };
	
	  // iOS Safari 6.x fails here
	  var TO_LOCALE_BUG = !!Uint8Array && fails(function(){ arrayToLocaleString.call(new Uint8Array(1)); });
	
	  var $toLocaleString = function toLocaleString(){
	    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
	  };
	
	  var proto = {
	    copyWithin: function copyWithin(target, start /*, end */){
	      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    every: function every(callbackfn /*, thisArg */){
	      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    fill: function fill(value /*, start, end */){ // eslint-disable-line no-unused-vars
	      return arrayFill.apply(validate(this), arguments);
	    },
	    filter: function filter(callbackfn /*, thisArg */){
	      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
	        arguments.length > 1 ? arguments[1] : undefined));
	    },
	    find: function find(predicate /*, thisArg */){
	      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    findIndex: function findIndex(predicate /*, thisArg */){
	      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    forEach: function forEach(callbackfn /*, thisArg */){
	      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    indexOf: function indexOf(searchElement /*, fromIndex */){
	      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    includes: function includes(searchElement /*, fromIndex */){
	      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    join: function join(separator){ // eslint-disable-line no-unused-vars
	      return arrayJoin.apply(validate(this), arguments);
	    },
	    lastIndexOf: function lastIndexOf(searchElement /*, fromIndex */){ // eslint-disable-line no-unused-vars
	      return arrayLastIndexOf.apply(validate(this), arguments);
	    },
	    map: function map(mapfn /*, thisArg */){
	      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    reduce: function reduce(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
	      return arrayReduce.apply(validate(this), arguments);
	    },
	    reduceRight: function reduceRight(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
	      return arrayReduceRight.apply(validate(this), arguments);
	    },
	    reverse: function reverse(){
	      var that   = this
	        , length = validate(that).length
	        , middle = Math.floor(length / 2)
	        , index  = 0
	        , value;
	      while(index < middle){
	        value         = that[index];
	        that[index++] = that[--length];
	        that[length]  = value;
	      } return that;
	    },
	    some: function some(callbackfn /*, thisArg */){
	      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    sort: function sort(comparefn){
	      return arraySort.call(validate(this), comparefn);
	    },
	    subarray: function subarray(begin, end){
	      var O      = validate(this)
	        , length = O.length
	        , $begin = toIndex(begin, length);
	      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
	        O.buffer,
	        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
	        toLength((end === undefined ? length : toIndex(end, length)) - $begin)
	      );
	    }
	  };
	
	  var $slice = function slice(start, end){
	    return speciesFromList(this, arraySlice.call(validate(this), start, end));
	  };
	
	  var $set = function set(arrayLike /*, offset */){
	    validate(this);
	    var offset = toOffset(arguments[1], 1)
	      , length = this.length
	      , src    = toObject(arrayLike)
	      , len    = toLength(src.length)
	      , index  = 0;
	    if(len + offset > length)throw RangeError(WRONG_LENGTH);
	    while(index < len)this[offset + index] = src[index++];
	  };
	
	  var $iterators = {
	    entries: function entries(){
	      return arrayEntries.call(validate(this));
	    },
	    keys: function keys(){
	      return arrayKeys.call(validate(this));
	    },
	    values: function values(){
	      return arrayValues.call(validate(this));
	    }
	  };
	
	  var isTAIndex = function(target, key){
	    return isObject(target)
	      && target[TYPED_ARRAY]
	      && typeof key != 'symbol'
	      && key in target
	      && String(+key) == String(key);
	  };
	  var $getDesc = function getOwnPropertyDescriptor(target, key){
	    return isTAIndex(target, key = toPrimitive(key, true))
	      ? propertyDesc(2, target[key])
	      : gOPD(target, key);
	  };
	  var $setDesc = function defineProperty(target, key, desc){
	    if(isTAIndex(target, key = toPrimitive(key, true))
	      && isObject(desc)
	      && has(desc, 'value')
	      && !has(desc, 'get')
	      && !has(desc, 'set')
	      // TODO: add validation descriptor w/o calling accessors
	      && !desc.configurable
	      && (!has(desc, 'writable') || desc.writable)
	      && (!has(desc, 'enumerable') || desc.enumerable)
	    ){
	      target[key] = desc.value;
	      return target;
	    } else return dP(target, key, desc);
	  };
	
	  if(!ALL_CONSTRUCTORS){
	    $GOPD.f = $getDesc;
	    $DP.f   = $setDesc;
	  }
	
	  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
	    getOwnPropertyDescriptor: $getDesc,
	    defineProperty:           $setDesc
	  });
	
	  if(fails(function(){ arrayToString.call({}); })){
	    arrayToString = arrayToLocaleString = function toString(){
	      return arrayJoin.call(this);
	    }
	  }
	
	  var $TypedArrayPrototype$ = redefineAll({}, proto);
	  redefineAll($TypedArrayPrototype$, $iterators);
	  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
	  redefineAll($TypedArrayPrototype$, {
	    slice:          $slice,
	    set:            $set,
	    constructor:    function(){ /* noop */ },
	    toString:       arrayToString,
	    toLocaleString: $toLocaleString
	  });
	  addGetter($TypedArrayPrototype$, 'buffer', 'b');
	  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
	  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
	  addGetter($TypedArrayPrototype$, 'length', 'e');
	  dP($TypedArrayPrototype$, TAG, {
	    get: function(){ return this[TYPED_ARRAY]; }
	  });
	
	  module.exports = function(KEY, BYTES, wrapper, CLAMPED){
	    CLAMPED = !!CLAMPED;
	    var NAME       = KEY + (CLAMPED ? 'Clamped' : '') + 'Array'
	      , ISNT_UINT8 = NAME != 'Uint8Array'
	      , GETTER     = 'get' + KEY
	      , SETTER     = 'set' + KEY
	      , TypedArray = global[NAME]
	      , Base       = TypedArray || {}
	      , TAC        = TypedArray && getPrototypeOf(TypedArray)
	      , FORCED     = !TypedArray || !$typed.ABV
	      , O          = {}
	      , TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
	    var getter = function(that, index){
	      var data = that._d;
	      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
	    };
	    var setter = function(that, index, value){
	      var data = that._d;
	      if(CLAMPED)value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
	      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
	    };
	    var addElement = function(that, index){
	      dP(that, index, {
	        get: function(){
	          return getter(this, index);
	        },
	        set: function(value){
	          return setter(this, index, value);
	        },
	        enumerable: true
	      });
	    };
	    if(FORCED){
	      TypedArray = wrapper(function(that, data, $offset, $length){
	        anInstance(that, TypedArray, NAME, '_d');
	        var index  = 0
	          , offset = 0
	          , buffer, byteLength, length, klass;
	        if(!isObject(data)){
	          length     = strictToLength(data, true)
	          byteLength = length * BYTES;
	          buffer     = new $ArrayBuffer(byteLength);
	        } else if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
	          buffer = data;
	          offset = toOffset($offset, BYTES);
	          var $len = data.byteLength;
	          if($length === undefined){
	            if($len % BYTES)throw RangeError(WRONG_LENGTH);
	            byteLength = $len - offset;
	            if(byteLength < 0)throw RangeError(WRONG_LENGTH);
	          } else {
	            byteLength = toLength($length) * BYTES;
	            if(byteLength + offset > $len)throw RangeError(WRONG_LENGTH);
	          }
	          length = byteLength / BYTES;
	        } else if(TYPED_ARRAY in data){
	          return fromList(TypedArray, data);
	        } else {
	          return $from.call(TypedArray, data);
	        }
	        hide(that, '_d', {
	          b: buffer,
	          o: offset,
	          l: byteLength,
	          e: length,
	          v: new $DataView(buffer)
	        });
	        while(index < length)addElement(that, index++);
	      });
	      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
	      hide(TypedArrayPrototype, 'constructor', TypedArray);
	    } else if(!$iterDetect(function(iter){
	      // V8 works with iterators, but fails in many other cases
	      // https://code.google.com/p/v8/issues/detail?id=4552
	      new TypedArray(null); // eslint-disable-line no-new
	      new TypedArray(iter); // eslint-disable-line no-new
	    }, true)){
	      TypedArray = wrapper(function(that, data, $offset, $length){
	        anInstance(that, TypedArray, NAME);
	        var klass;
	        // `ws` module bug, temporarily remove validation length for Uint8Array
	        // https://github.com/websockets/ws/pull/645
	        if(!isObject(data))return new Base(strictToLength(data, ISNT_UINT8));
	        if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
	          return $length !== undefined
	            ? new Base(data, toOffset($offset, BYTES), $length)
	            : $offset !== undefined
	              ? new Base(data, toOffset($offset, BYTES))
	              : new Base(data);
	        }
	        if(TYPED_ARRAY in data)return fromList(TypedArray, data);
	        return $from.call(TypedArray, data);
	      });
	      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function(key){
	        if(!(key in TypedArray))hide(TypedArray, key, Base[key]);
	      });
	      TypedArray[PROTOTYPE] = TypedArrayPrototype;
	      if(!LIBRARY)TypedArrayPrototype.constructor = TypedArray;
	    }
	    var $nativeIterator   = TypedArrayPrototype[ITERATOR]
	      , CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined)
	      , $iterator         = $iterators.values;
	    hide(TypedArray, TYPED_CONSTRUCTOR, true);
	    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
	    hide(TypedArrayPrototype, VIEW, true);
	    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);
	
	    if(CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)){
	      dP(TypedArrayPrototype, TAG, {
	        get: function(){ return NAME; }
	      });
	    }
	
	    O[NAME] = TypedArray;
	
	    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);
	
	    $export($export.S, NAME, {
	      BYTES_PER_ELEMENT: BYTES,
	      from: $from,
	      of: $of
	    });
	
	    if(!(BYTES_PER_ELEMENT in TypedArrayPrototype))hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);
	
	    $export($export.P, NAME, proto);
	
	    setSpecies(NAME);
	
	    $export($export.P + $export.F * FORCED_SET, NAME, {set: $set});
	
	    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);
	
	    $export($export.P + $export.F * (TypedArrayPrototype.toString != arrayToString), NAME, {toString: arrayToString});
	
	    $export($export.P + $export.F * fails(function(){
	      new TypedArray(1).slice();
	    }), NAME, {slice: $slice});
	
	    $export($export.P + $export.F * (fails(function(){
	      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString()
	    }) || !fails(function(){
	      TypedArrayPrototype.toLocaleString.call([1, 2]);
	    })), NAME, {toLocaleString: $toLocaleString});
	
	    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
	    if(!LIBRARY && !CORRECT_ITER_NAME)hide(TypedArrayPrototype, ITERATOR, $iterator);
	  };
	} else module.exports = function(){ /* empty */ };

/***/ },
/* 227 */
/*!****************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/core.is-iterable.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(/*! ./_classof */ 78)
	  , ITERATOR  = __webpack_require__(/*! ./_wks */ 28)('iterator')
	  , Iterators = __webpack_require__(/*! ./_iterators */ 133);
	module.exports = __webpack_require__(/*! ./_core */ 12).isIterable = function(it){
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    || Iterators.hasOwnProperty(classof(O));
	};

/***/ },
/* 228 */
/*!*********************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.typed.uint8-array.js ***!
  \*********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ./_typed-array */ 226)('Uint8', 1, function(init){
	  return function Uint8Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 229 */
/*!*****************************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.typed.uint8-clamped-array.js ***!
  \*****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ./_typed-array */ 226)('Uint8', 1, function(init){
	  return function Uint8ClampedArray(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	}, true);

/***/ },
/* 230 */
/*!*********************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.typed.int16-array.js ***!
  \*********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ./_typed-array */ 226)('Int16', 2, function(init){
	  return function Int16Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 231 */
/*!**********************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.typed.uint16-array.js ***!
  \**********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ./_typed-array */ 226)('Uint16', 2, function(init){
	  return function Uint16Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 232 */
/*!*********************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.typed.int32-array.js ***!
  \*********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ./_typed-array */ 226)('Int32', 4, function(init){
	  return function Int32Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 233 */
/*!**********************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.typed.uint32-array.js ***!
  \**********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ./_typed-array */ 226)('Uint32', 4, function(init){
	  return function Uint32Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 234 */
/*!***********************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.typed.float32-array.js ***!
  \***********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ./_typed-array */ 226)('Float32', 4, function(init){
	  return function Float32Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 235 */
/*!***********************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.typed.float64-array.js ***!
  \***********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ./_typed-array */ 226)('Float64', 8, function(init){
	  return function Float64Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 236 */
/*!*****************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.reflect.apply.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
	var $export = __webpack_require__(/*! ./_export */ 11)
	  , _apply  = Function.apply;
	
	$export($export.S, 'Reflect', {
	  apply: function apply(target, thisArgument, argumentsList){
	    return _apply.call(target, thisArgument, argumentsList);
	  }
	});

/***/ },
/* 237 */
/*!*********************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.reflect.construct.js ***!
  \*********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
	var $export   = __webpack_require__(/*! ./_export */ 11)
	  , create    = __webpack_require__(/*! ./_object-create */ 49)
	  , aFunction = __webpack_require__(/*! ./_a-function */ 24)
	  , anObject  = __webpack_require__(/*! ./_an-object */ 15)
	  , isObject  = __webpack_require__(/*! ./_is-object */ 16)
	  , bind      = __webpack_require__(/*! ./_bind */ 80);
	
	// MS Edge supports only 2 arguments
	// FF Nightly sets third argument as `new.target`, but does not create `this` from it
	$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 10)(function(){
	  function F(){}
	  return !(Reflect.construct(function(){}, [], F) instanceof F);
	}), 'Reflect', {
	  construct: function construct(Target, args /*, newTarget*/){
	    aFunction(Target);
	    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
	    if(Target == newTarget){
	      // w/o altered newTarget, optimization for 0-4 arguments
	      if(args != undefined)switch(anObject(args).length){
	        case 0: return new Target;
	        case 1: return new Target(args[0]);
	        case 2: return new Target(args[0], args[1]);
	        case 3: return new Target(args[0], args[1], args[2]);
	        case 4: return new Target(args[0], args[1], args[2], args[3]);
	      }
	      // w/o altered newTarget, lot of arguments case
	      var $args = [null];
	      $args.push.apply($args, args);
	      return new (bind.apply(Target, $args));
	    }
	    // with altered newTarget, not support built-in constructors
	    var proto    = newTarget.prototype
	      , instance = create(isObject(proto) ? proto : Object.prototype)
	      , result   = Function.apply.call(Target, instance, args);
	    return isObject(result) ? result : instance;
	  }
	});

/***/ },
/* 238 */
/*!***************************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.reflect.define-property.js ***!
  \***************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
	var dP          = __webpack_require__(/*! ./_object-dp */ 14)
	  , $export     = __webpack_require__(/*! ./_export */ 11)
	  , anObject    = __webpack_require__(/*! ./_an-object */ 15)
	  , toPrimitive = __webpack_require__(/*! ./_to-primitive */ 19);
	
	// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
	$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 10)(function(){
	  Reflect.defineProperty(dP.f({}, 1, {value: 1}), 1, {value: 2});
	}), 'Reflect', {
	  defineProperty: function defineProperty(target, propertyKey, attributes){
	    anObject(target);
	    propertyKey = toPrimitive(propertyKey, true);
	    anObject(attributes);
	    try {
	      dP.f(target, propertyKey, attributes);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});

/***/ },
/* 239 */
/*!***************************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.reflect.delete-property.js ***!
  \***************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 26.1.4 Reflect.deleteProperty(target, propertyKey)
	var $export  = __webpack_require__(/*! ./_export */ 11)
	  , gOPD     = __webpack_require__(/*! ./_object-gopd */ 54).f
	  , anObject = __webpack_require__(/*! ./_an-object */ 15);
	
	$export($export.S, 'Reflect', {
	  deleteProperty: function deleteProperty(target, propertyKey){
	    var desc = gOPD(anObject(target), propertyKey);
	    return desc && !desc.configurable ? false : delete target[propertyKey];
	  }
	});

/***/ },
/* 240 */
/*!*********************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.reflect.enumerate.js ***!
  \*********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 26.1.5 Reflect.enumerate(target)
	var $export  = __webpack_require__(/*! ./_export */ 11)
	  , anObject = __webpack_require__(/*! ./_an-object */ 15);
	var Enumerate = function(iterated){
	  this._t = anObject(iterated); // target
	  this._i = 0;                  // next index
	  var keys = this._k = []       // keys
	    , key;
	  for(key in iterated)keys.push(key);
	};
	__webpack_require__(/*! ./_iter-create */ 134)(Enumerate, 'Object', function(){
	  var that = this
	    , keys = that._k
	    , key;
	  do {
	    if(that._i >= keys.length)return {value: undefined, done: true};
	  } while(!((key = keys[that._i++]) in that._t));
	  return {value: key, done: false};
	});
	
	$export($export.S, 'Reflect', {
	  enumerate: function enumerate(target){
	    return new Enumerate(target);
	  }
	});

/***/ },
/* 241 */
/*!***************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.reflect.get.js ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 26.1.6 Reflect.get(target, propertyKey [, receiver])
	var gOPD           = __webpack_require__(/*! ./_object-gopd */ 54)
	  , getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 62)
	  , has            = __webpack_require__(/*! ./_has */ 8)
	  , $export        = __webpack_require__(/*! ./_export */ 11)
	  , isObject       = __webpack_require__(/*! ./_is-object */ 16)
	  , anObject       = __webpack_require__(/*! ./_an-object */ 15);
	
	function get(target, propertyKey/*, receiver*/){
	  var receiver = arguments.length < 3 ? target : arguments[2]
	    , desc, proto;
	  if(anObject(target) === receiver)return target[propertyKey];
	  if(desc = gOPD.f(target, propertyKey))return has(desc, 'value')
	    ? desc.value
	    : desc.get !== undefined
	      ? desc.get.call(receiver)
	      : undefined;
	  if(isObject(proto = getPrototypeOf(target)))return get(proto, propertyKey, receiver);
	}
	
	$export($export.S, 'Reflect', {get: get});

/***/ },
/* 242 */
/*!***************************************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.reflect.get-own-property-descriptor.js ***!
  \***************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
	var gOPD     = __webpack_require__(/*! ./_object-gopd */ 54)
	  , $export  = __webpack_require__(/*! ./_export */ 11)
	  , anObject = __webpack_require__(/*! ./_an-object */ 15);
	
	$export($export.S, 'Reflect', {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
	    return gOPD.f(anObject(target), propertyKey);
	  }
	});

/***/ },
/* 243 */
/*!****************************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.reflect.get-prototype-of.js ***!
  \****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 26.1.8 Reflect.getPrototypeOf(target)
	var $export  = __webpack_require__(/*! ./_export */ 11)
	  , getProto = __webpack_require__(/*! ./_object-gpo */ 62)
	  , anObject = __webpack_require__(/*! ./_an-object */ 15);
	
	$export($export.S, 'Reflect', {
	  getPrototypeOf: function getPrototypeOf(target){
	    return getProto(anObject(target));
	  }
	});

/***/ },
/* 244 */
/*!***************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.reflect.has.js ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 26.1.9 Reflect.has(target, propertyKey)
	var $export = __webpack_require__(/*! ./_export */ 11);
	
	$export($export.S, 'Reflect', {
	  has: function has(target, propertyKey){
	    return propertyKey in target;
	  }
	});

/***/ },
/* 245 */
/*!*************************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.reflect.is-extensible.js ***!
  \*************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 26.1.10 Reflect.isExtensible(target)
	var $export       = __webpack_require__(/*! ./_export */ 11)
	  , anObject      = __webpack_require__(/*! ./_an-object */ 15)
	  , $isExtensible = Object.isExtensible;
	
	$export($export.S, 'Reflect', {
	  isExtensible: function isExtensible(target){
	    anObject(target);
	    return $isExtensible ? $isExtensible(target) : true;
	  }
	});

/***/ },
/* 246 */
/*!********************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.reflect.own-keys.js ***!
  \********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 26.1.11 Reflect.ownKeys(target)
	var $export = __webpack_require__(/*! ./_export */ 11);
	
	$export($export.S, 'Reflect', {ownKeys: __webpack_require__(/*! ./_own-keys */ 247)});

/***/ },
/* 247 */
/*!*********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_own-keys.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// all object keys, includes non-enumerable and symbols
	var gOPN     = __webpack_require__(/*! ./_object-gopn */ 53)
	  , gOPS     = __webpack_require__(/*! ./_object-gops */ 46)
	  , anObject = __webpack_require__(/*! ./_an-object */ 15)
	  , Reflect  = __webpack_require__(/*! ./_global */ 7).Reflect;
	module.exports = Reflect && Reflect.ownKeys || function ownKeys(it){
	  var keys       = gOPN.f(anObject(it))
	    , getSymbols = gOPS.f;
	  return getSymbols ? keys.concat(getSymbols(it)) : keys;
	};

/***/ },
/* 248 */
/*!******************************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.reflect.prevent-extensions.js ***!
  \******************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 26.1.12 Reflect.preventExtensions(target)
	var $export            = __webpack_require__(/*! ./_export */ 11)
	  , anObject           = __webpack_require__(/*! ./_an-object */ 15)
	  , $preventExtensions = Object.preventExtensions;
	
	$export($export.S, 'Reflect', {
	  preventExtensions: function preventExtensions(target){
	    anObject(target);
	    try {
	      if($preventExtensions)$preventExtensions(target);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});

/***/ },
/* 249 */
/*!***************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.reflect.set.js ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
	var dP             = __webpack_require__(/*! ./_object-dp */ 14)
	  , gOPD           = __webpack_require__(/*! ./_object-gopd */ 54)
	  , getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 62)
	  , has            = __webpack_require__(/*! ./_has */ 8)
	  , $export        = __webpack_require__(/*! ./_export */ 11)
	  , createDesc     = __webpack_require__(/*! ./_property-desc */ 20)
	  , anObject       = __webpack_require__(/*! ./_an-object */ 15)
	  , isObject       = __webpack_require__(/*! ./_is-object */ 16);
	
	function set(target, propertyKey, V/*, receiver*/){
	  var receiver = arguments.length < 4 ? target : arguments[3]
	    , ownDesc  = gOPD.f(anObject(target), propertyKey)
	    , existingDescriptor, proto;
	  if(!ownDesc){
	    if(isObject(proto = getPrototypeOf(target))){
	      return set(proto, propertyKey, V, receiver);
	    }
	    ownDesc = createDesc(0);
	  }
	  if(has(ownDesc, 'value')){
	    if(ownDesc.writable === false || !isObject(receiver))return false;
	    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
	    existingDescriptor.value = V;
	    dP.f(receiver, propertyKey, existingDescriptor);
	    return true;
	  }
	  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
	}
	
	$export($export.S, 'Reflect', {set: set});

/***/ },
/* 250 */
/*!****************************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es6.reflect.set-prototype-of.js ***!
  \****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 26.1.14 Reflect.setPrototypeOf(target, proto)
	var $export  = __webpack_require__(/*! ./_export */ 11)
	  , setProto = __webpack_require__(/*! ./_set-proto */ 76);
	
	if(setProto)$export($export.S, 'Reflect', {
	  setPrototypeOf: function setPrototypeOf(target, proto){
	    setProto.check(target, proto);
	    try {
	      setProto.set(target, proto);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});

/***/ },
/* 251 */
/*!******************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es7.array.includes.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/tc39/Array.prototype.includes
	var $export   = __webpack_require__(/*! ./_export */ 11)
	  , $includes = __webpack_require__(/*! ./_array-includes */ 39)(true);
	
	$export($export.P, 'Array', {
	  includes: function includes(el /*, fromIndex = 0 */){
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	
	__webpack_require__(/*! ./_add-to-unscopables */ 190)('includes');

/***/ },
/* 252 */
/*!*************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es7.string.at.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/mathiasbynens/String.prototype.at
	var $export = __webpack_require__(/*! ./_export */ 11)
	  , $at     = __webpack_require__(/*! ./_string-at */ 131)(true);
	
	$export($export.P, 'String', {
	  at: function at(pos){
	    return $at(this, pos);
	  }
	});

/***/ },
/* 253 */
/*!********************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es7.string.pad-start.js ***!
  \********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/tc39/proposal-string-pad-start-end
	var $export = __webpack_require__(/*! ./_export */ 11)
	  , $pad    = __webpack_require__(/*! ./_string-pad */ 254);
	
	$export($export.P, 'String', {
	  padStart: function padStart(maxLength /*, fillString = ' ' */){
	    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
	  }
	});

/***/ },
/* 254 */
/*!***********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_string-pad.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-string-pad-start-end
	var toLength = __webpack_require__(/*! ./_to-length */ 40)
	  , repeat   = __webpack_require__(/*! ./_string-repeat */ 95)
	  , defined  = __webpack_require__(/*! ./_defined */ 38);
	
	module.exports = function(that, maxLength, fillString, left){
	  var S            = String(defined(that))
	    , stringLength = S.length
	    , fillStr      = fillString === undefined ? ' ' : String(fillString)
	    , intMaxLength = toLength(maxLength);
	  if(intMaxLength <= stringLength || fillStr == '')return S;
	  var fillLen = intMaxLength - stringLength
	    , stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
	  if(stringFiller.length > fillLen)stringFiller = stringFiller.slice(0, fillLen);
	  return left ? stringFiller + S : S + stringFiller;
	};


/***/ },
/* 255 */
/*!******************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es7.string.pad-end.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/tc39/proposal-string-pad-start-end
	var $export = __webpack_require__(/*! ./_export */ 11)
	  , $pad    = __webpack_require__(/*! ./_string-pad */ 254);
	
	$export($export.P, 'String', {
	  padEnd: function padEnd(maxLength /*, fillString = ' ' */){
	    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
	  }
	});

/***/ },
/* 256 */
/*!********************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es7.string.trim-left.js ***!
  \********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
	__webpack_require__(/*! ./_string-trim */ 86)('trimLeft', function($trim){
	  return function trimLeft(){
	    return $trim(this, 1);
	  };
	}, 'trimStart');

/***/ },
/* 257 */
/*!*********************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es7.string.trim-right.js ***!
  \*********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
	__webpack_require__(/*! ./_string-trim */ 86)('trimRight', function($trim){
	  return function trimRight(){
	    return $trim(this, 2);
	  };
	}, 'trimEnd');

/***/ },
/* 258 */
/*!********************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es7.string.match-all.js ***!
  \********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://tc39.github.io/String.prototype.matchAll/
	var $export     = __webpack_require__(/*! ./_export */ 11)
	  , defined     = __webpack_require__(/*! ./_defined */ 38)
	  , toLength    = __webpack_require__(/*! ./_to-length */ 40)
	  , isRegExp    = __webpack_require__(/*! ./_is-regexp */ 138)
	  , getFlags    = __webpack_require__(/*! ./_flags */ 200)
	  , RegExpProto = RegExp.prototype;
	
	var $RegExpStringIterator = function(regexp, string){
	  this._r = regexp;
	  this._s = string;
	};
	
	__webpack_require__(/*! ./_iter-create */ 134)($RegExpStringIterator, 'RegExp String', function next(){
	  var match = this._r.exec(this._s);
	  return {value: match, done: match === null};
	});
	
	$export($export.P, 'String', {
	  matchAll: function matchAll(regexp){
	    defined(this);
	    if(!isRegExp(regexp))throw TypeError(regexp + ' is not a regexp!');
	    var S     = String(this)
	      , flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp)
	      , rx    = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
	    rx.lastIndex = toLength(regexp.lastIndex);
	    return new $RegExpStringIterator(rx, S);
	  }
	});

/***/ },
/* 259 */
/*!*************************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es7.symbol.async-iterator.js ***!
  \*************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ./_wks-define */ 30)('asyncIterator');

/***/ },
/* 260 */
/*!*********************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es7.symbol.observable.js ***!
  \*********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ./_wks-define */ 30)('observable');

/***/ },
/* 261 */
/*!***************************************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es7.object.get-own-property-descriptors.js ***!
  \***************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-object-getownpropertydescriptors
	var $export        = __webpack_require__(/*! ./_export */ 11)
	  , ownKeys        = __webpack_require__(/*! ./_own-keys */ 247)
	  , toIObject      = __webpack_require__(/*! ./_to-iobject */ 35)
	  , gOPD           = __webpack_require__(/*! ./_object-gopd */ 54)
	  , createProperty = __webpack_require__(/*! ./_create-property */ 167);
	
	$export($export.S, 'Object', {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
	    var O       = toIObject(object)
	      , getDesc = gOPD.f
	      , keys    = ownKeys(O)
	      , result  = {}
	      , i       = 0
	      , key, D;
	    while(keys.length > i)createProperty(result, key = keys[i++], getDesc(O, key));
	    return result;
	  }
	});

/***/ },
/* 262 */
/*!*****************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es7.object.values.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-object-values-entries
	var $export = __webpack_require__(/*! ./_export */ 11)
	  , $values = __webpack_require__(/*! ./_object-to-array */ 263)(false);
	
	$export($export.S, 'Object', {
	  values: function values(it){
	    return $values(it);
	  }
	});

/***/ },
/* 263 */
/*!****************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_object-to-array.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(/*! ./_object-keys */ 33)
	  , toIObject = __webpack_require__(/*! ./_to-iobject */ 35)
	  , isEnum    = __webpack_require__(/*! ./_object-pie */ 47).f;
	module.exports = function(isEntries){
	  return function(it){
	    var O      = toIObject(it)
	      , keys   = getKeys(O)
	      , length = keys.length
	      , i      = 0
	      , result = []
	      , key;
	    while(length > i)if(isEnum.call(O, key = keys[i++])){
	      result.push(isEntries ? [key, O[key]] : O[key]);
	    } return result;
	  };
	};

/***/ },
/* 264 */
/*!******************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es7.object.entries.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-object-values-entries
	var $export  = __webpack_require__(/*! ./_export */ 11)
	  , $entries = __webpack_require__(/*! ./_object-to-array */ 263)(true);
	
	$export($export.S, 'Object', {
	  entries: function entries(it){
	    return $entries(it);
	  }
	});

/***/ },
/* 265 */
/*!************************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es7.object.define-getter.js ***!
  \************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export         = __webpack_require__(/*! ./_export */ 11)
	  , toObject        = __webpack_require__(/*! ./_to-object */ 61)
	  , aFunction       = __webpack_require__(/*! ./_a-function */ 24)
	  , $defineProperty = __webpack_require__(/*! ./_object-dp */ 14);
	
	// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
	__webpack_require__(/*! ./_descriptors */ 9) && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ 266), 'Object', {
	  __defineGetter__: function __defineGetter__(P, getter){
	    $defineProperty.f(toObject(this), P, {get: aFunction(getter), enumerable: true, configurable: true});
	  }
	});

/***/ },
/* 266 */
/*!******************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_object-forced-pam.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// Forced replacement prototype accessors methods
	module.exports = __webpack_require__(/*! ./_library */ 31)|| !__webpack_require__(/*! ./_fails */ 10)(function(){
	  var K = Math.random();
	  // In FF throws only define methods
	  __defineSetter__.call(null, K, function(){ /* empty */});
	  delete __webpack_require__(/*! ./_global */ 7)[K];
	});

/***/ },
/* 267 */
/*!************************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es7.object.define-setter.js ***!
  \************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export         = __webpack_require__(/*! ./_export */ 11)
	  , toObject        = __webpack_require__(/*! ./_to-object */ 61)
	  , aFunction       = __webpack_require__(/*! ./_a-function */ 24)
	  , $defineProperty = __webpack_require__(/*! ./_object-dp */ 14);
	
	// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
	__webpack_require__(/*! ./_descriptors */ 9) && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ 266), 'Object', {
	  __defineSetter__: function __defineSetter__(P, setter){
	    $defineProperty.f(toObject(this), P, {set: aFunction(setter), enumerable: true, configurable: true});
	  }
	});

/***/ },
/* 268 */
/*!************************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es7.object.lookup-getter.js ***!
  \************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export                  = __webpack_require__(/*! ./_export */ 11)
	  , toObject                 = __webpack_require__(/*! ./_to-object */ 61)
	  , toPrimitive              = __webpack_require__(/*! ./_to-primitive */ 19)
	  , getPrototypeOf           = __webpack_require__(/*! ./_object-gpo */ 62)
	  , getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ 54).f;
	
	// B.2.2.4 Object.prototype.__lookupGetter__(P)
	__webpack_require__(/*! ./_descriptors */ 9) && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ 266), 'Object', {
	  __lookupGetter__: function __lookupGetter__(P){
	    var O = toObject(this)
	      , K = toPrimitive(P, true)
	      , D;
	    do {
	      if(D = getOwnPropertyDescriptor(O, K))return D.get;
	    } while(O = getPrototypeOf(O));
	  }
	});

/***/ },
/* 269 */
/*!************************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es7.object.lookup-setter.js ***!
  \************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export                  = __webpack_require__(/*! ./_export */ 11)
	  , toObject                 = __webpack_require__(/*! ./_to-object */ 61)
	  , toPrimitive              = __webpack_require__(/*! ./_to-primitive */ 19)
	  , getPrototypeOf           = __webpack_require__(/*! ./_object-gpo */ 62)
	  , getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ 54).f;
	
	// B.2.2.5 Object.prototype.__lookupSetter__(P)
	__webpack_require__(/*! ./_descriptors */ 9) && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ 266), 'Object', {
	  __lookupSetter__: function __lookupSetter__(P){
	    var O = toObject(this)
	      , K = toPrimitive(P, true)
	      , D;
	    do {
	      if(D = getOwnPropertyDescriptor(O, K))return D.set;
	    } while(O = getPrototypeOf(O));
	  }
	});

/***/ },
/* 270 */
/*!***************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es7.map.to-json.js ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(/*! ./_export */ 11);
	
	$export($export.P + $export.R, 'Map', {toJSON: __webpack_require__(/*! ./_collection-to-json */ 271)('Map')});

/***/ },
/* 271 */
/*!*******************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_collection-to-json.js ***!
  \*******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var classof = __webpack_require__(/*! ./_classof */ 78)
	  , from    = __webpack_require__(/*! ./_array-from-iterable */ 272);
	module.exports = function(NAME){
	  return function toJSON(){
	    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
	    return from(this);
	  };
	};

/***/ },
/* 272 */
/*!********************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_array-from-iterable.js ***!
  \********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var forOf = __webpack_require__(/*! ./_for-of */ 209);
	
	module.exports = function(iter, ITERATOR){
	  var result = [];
	  forOf(iter, false, result.push, result, ITERATOR);
	  return result;
	};


/***/ },
/* 273 */
/*!***************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es7.set.to-json.js ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(/*! ./_export */ 11);
	
	$export($export.P + $export.R, 'Set', {toJSON: __webpack_require__(/*! ./_collection-to-json */ 271)('Set')});

/***/ },
/* 274 */
/*!*****************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es7.system.global.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/ljharb/proposal-global
	var $export = __webpack_require__(/*! ./_export */ 11);
	
	$export($export.S, 'System', {global: __webpack_require__(/*! ./_global */ 7)});

/***/ },
/* 275 */
/*!******************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es7.error.is-error.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/ljharb/proposal-is-error
	var $export = __webpack_require__(/*! ./_export */ 11)
	  , cof     = __webpack_require__(/*! ./_cof */ 37);
	
	$export($export.S, 'Error', {
	  isError: function isError(it){
	    return cof(it) === 'Error';
	  }
	});

/***/ },
/* 276 */
/*!**************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es7.math.iaddh.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = __webpack_require__(/*! ./_export */ 11);
	
	$export($export.S, 'Math', {
	  iaddh: function iaddh(x0, x1, y0, y1){
	    var $x0 = x0 >>> 0
	      , $x1 = x1 >>> 0
	      , $y0 = y0 >>> 0;
	    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
	  }
	});

/***/ },
/* 277 */
/*!**************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es7.math.isubh.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = __webpack_require__(/*! ./_export */ 11);
	
	$export($export.S, 'Math', {
	  isubh: function isubh(x0, x1, y0, y1){
	    var $x0 = x0 >>> 0
	      , $x1 = x1 >>> 0
	      , $y0 = y0 >>> 0;
	    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
	  }
	});

/***/ },
/* 278 */
/*!**************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es7.math.imulh.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = __webpack_require__(/*! ./_export */ 11);
	
	$export($export.S, 'Math', {
	  imulh: function imulh(u, v){
	    var UINT16 = 0xffff
	      , $u = +u
	      , $v = +v
	      , u0 = $u & UINT16
	      , v0 = $v & UINT16
	      , u1 = $u >> 16
	      , v1 = $v >> 16
	      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
	    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
	  }
	});

/***/ },
/* 279 */
/*!**************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es7.math.umulh.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = __webpack_require__(/*! ./_export */ 11);
	
	$export($export.S, 'Math', {
	  umulh: function umulh(u, v){
	    var UINT16 = 0xffff
	      , $u = +u
	      , $v = +v
	      , u0 = $u & UINT16
	      , v0 = $v & UINT16
	      , u1 = $u >>> 16
	      , v1 = $v >>> 16
	      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
	    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
	  }
	});

/***/ },
/* 280 */
/*!***************************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es7.reflect.define-metadata.js ***!
  \***************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var metadata                  = __webpack_require__(/*! ./_metadata */ 281)
	  , anObject                  = __webpack_require__(/*! ./_an-object */ 15)
	  , toMetaKey                 = metadata.key
	  , ordinaryDefineOwnMetadata = metadata.set;
	
	metadata.exp({defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey){
	  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
	}});

/***/ },
/* 281 */
/*!*********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_metadata.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var Map     = __webpack_require__(/*! ./es6.map */ 214)
	  , $export = __webpack_require__(/*! ./_export */ 11)
	  , shared  = __webpack_require__(/*! ./_shared */ 26)('metadata')
	  , store   = shared.store || (shared.store = new (__webpack_require__(/*! ./es6.weak-map */ 218)));
	
	var getOrCreateMetadataMap = function(target, targetKey, create){
	  var targetMetadata = store.get(target);
	  if(!targetMetadata){
	    if(!create)return undefined;
	    store.set(target, targetMetadata = new Map);
	  }
	  var keyMetadata = targetMetadata.get(targetKey);
	  if(!keyMetadata){
	    if(!create)return undefined;
	    targetMetadata.set(targetKey, keyMetadata = new Map);
	  } return keyMetadata;
	};
	var ordinaryHasOwnMetadata = function(MetadataKey, O, P){
	  var metadataMap = getOrCreateMetadataMap(O, P, false);
	  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
	};
	var ordinaryGetOwnMetadata = function(MetadataKey, O, P){
	  var metadataMap = getOrCreateMetadataMap(O, P, false);
	  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
	};
	var ordinaryDefineOwnMetadata = function(MetadataKey, MetadataValue, O, P){
	  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
	};
	var ordinaryOwnMetadataKeys = function(target, targetKey){
	  var metadataMap = getOrCreateMetadataMap(target, targetKey, false)
	    , keys        = [];
	  if(metadataMap)metadataMap.forEach(function(_, key){ keys.push(key); });
	  return keys;
	};
	var toMetaKey = function(it){
	  return it === undefined || typeof it == 'symbol' ? it : String(it);
	};
	var exp = function(O){
	  $export($export.S, 'Reflect', O);
	};
	
	module.exports = {
	  store: store,
	  map: getOrCreateMetadataMap,
	  has: ordinaryHasOwnMetadata,
	  get: ordinaryGetOwnMetadata,
	  set: ordinaryDefineOwnMetadata,
	  keys: ordinaryOwnMetadataKeys,
	  key: toMetaKey,
	  exp: exp
	};

/***/ },
/* 282 */
/*!***************************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es7.reflect.delete-metadata.js ***!
  \***************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var metadata               = __webpack_require__(/*! ./_metadata */ 281)
	  , anObject               = __webpack_require__(/*! ./_an-object */ 15)
	  , toMetaKey              = metadata.key
	  , getOrCreateMetadataMap = metadata.map
	  , store                  = metadata.store;
	
	metadata.exp({deleteMetadata: function deleteMetadata(metadataKey, target /*, targetKey */){
	  var targetKey   = arguments.length < 3 ? undefined : toMetaKey(arguments[2])
	    , metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
	  if(metadataMap === undefined || !metadataMap['delete'](metadataKey))return false;
	  if(metadataMap.size)return true;
	  var targetMetadata = store.get(target);
	  targetMetadata['delete'](targetKey);
	  return !!targetMetadata.size || store['delete'](target);
	}});

/***/ },
/* 283 */
/*!************************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es7.reflect.get-metadata.js ***!
  \************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var metadata               = __webpack_require__(/*! ./_metadata */ 281)
	  , anObject               = __webpack_require__(/*! ./_an-object */ 15)
	  , getPrototypeOf         = __webpack_require__(/*! ./_object-gpo */ 62)
	  , ordinaryHasOwnMetadata = metadata.has
	  , ordinaryGetOwnMetadata = metadata.get
	  , toMetaKey              = metadata.key;
	
	var ordinaryGetMetadata = function(MetadataKey, O, P){
	  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
	  if(hasOwn)return ordinaryGetOwnMetadata(MetadataKey, O, P);
	  var parent = getPrototypeOf(O);
	  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
	};
	
	metadata.exp({getMetadata: function getMetadata(metadataKey, target /*, targetKey */){
	  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	}});

/***/ },
/* 284 */
/*!*****************************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es7.reflect.get-metadata-keys.js ***!
  \*****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var Set                     = __webpack_require__(/*! ./es6.set */ 217)
	  , from                    = __webpack_require__(/*! ./_array-from-iterable */ 272)
	  , metadata                = __webpack_require__(/*! ./_metadata */ 281)
	  , anObject                = __webpack_require__(/*! ./_an-object */ 15)
	  , getPrototypeOf          = __webpack_require__(/*! ./_object-gpo */ 62)
	  , ordinaryOwnMetadataKeys = metadata.keys
	  , toMetaKey               = metadata.key;
	
	var ordinaryMetadataKeys = function(O, P){
	  var oKeys  = ordinaryOwnMetadataKeys(O, P)
	    , parent = getPrototypeOf(O);
	  if(parent === null)return oKeys;
	  var pKeys  = ordinaryMetadataKeys(parent, P);
	  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
	};
	
	metadata.exp({getMetadataKeys: function getMetadataKeys(target /*, targetKey */){
	  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
	}});

/***/ },
/* 285 */
/*!****************************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es7.reflect.get-own-metadata.js ***!
  \****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var metadata               = __webpack_require__(/*! ./_metadata */ 281)
	  , anObject               = __webpack_require__(/*! ./_an-object */ 15)
	  , ordinaryGetOwnMetadata = metadata.get
	  , toMetaKey              = metadata.key;
	
	metadata.exp({getOwnMetadata: function getOwnMetadata(metadataKey, target /*, targetKey */){
	  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
	    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	}});

/***/ },
/* 286 */
/*!*********************************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es7.reflect.get-own-metadata-keys.js ***!
  \*********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var metadata                = __webpack_require__(/*! ./_metadata */ 281)
	  , anObject                = __webpack_require__(/*! ./_an-object */ 15)
	  , ordinaryOwnMetadataKeys = metadata.keys
	  , toMetaKey               = metadata.key;
	
	metadata.exp({getOwnMetadataKeys: function getOwnMetadataKeys(target /*, targetKey */){
	  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
	}});

/***/ },
/* 287 */
/*!************************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es7.reflect.has-metadata.js ***!
  \************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var metadata               = __webpack_require__(/*! ./_metadata */ 281)
	  , anObject               = __webpack_require__(/*! ./_an-object */ 15)
	  , getPrototypeOf         = __webpack_require__(/*! ./_object-gpo */ 62)
	  , ordinaryHasOwnMetadata = metadata.has
	  , toMetaKey              = metadata.key;
	
	var ordinaryHasMetadata = function(MetadataKey, O, P){
	  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
	  if(hasOwn)return true;
	  var parent = getPrototypeOf(O);
	  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
	};
	
	metadata.exp({hasMetadata: function hasMetadata(metadataKey, target /*, targetKey */){
	  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	}});

/***/ },
/* 288 */
/*!****************************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es7.reflect.has-own-metadata.js ***!
  \****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var metadata               = __webpack_require__(/*! ./_metadata */ 281)
	  , anObject               = __webpack_require__(/*! ./_an-object */ 15)
	  , ordinaryHasOwnMetadata = metadata.has
	  , toMetaKey              = metadata.key;
	
	metadata.exp({hasOwnMetadata: function hasOwnMetadata(metadataKey, target /*, targetKey */){
	  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
	    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	}});

/***/ },
/* 289 */
/*!********************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es7.reflect.metadata.js ***!
  \********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var metadata                  = __webpack_require__(/*! ./_metadata */ 281)
	  , anObject                  = __webpack_require__(/*! ./_an-object */ 15)
	  , aFunction                 = __webpack_require__(/*! ./_a-function */ 24)
	  , toMetaKey                 = metadata.key
	  , ordinaryDefineOwnMetadata = metadata.set;
	
	metadata.exp({metadata: function metadata(metadataKey, metadataValue){
	  return function decorator(target, targetKey){
	    ordinaryDefineOwnMetadata(
	      metadataKey, metadataValue,
	      (targetKey !== undefined ? anObject : aFunction)(target),
	      toMetaKey(targetKey)
	    );
	  };
	}});

/***/ },
/* 290 */
/*!********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/es7.asap.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
	var $export   = __webpack_require__(/*! ./_export */ 11)
	  , microtask = __webpack_require__(/*! ./_microtask */ 212)()
	  , process   = __webpack_require__(/*! ./_global */ 7).process
	  , isNode    = __webpack_require__(/*! ./_cof */ 37)(process) == 'process';
	
	$export($export.G, {
	  asap: function asap(fn){
	    var domain = isNode && process.domain;
	    microtask(domain ? domain.bind(fn) : fn);
	  }
	});

/***/ },
/* 291 */
/*!**********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/web.timers.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// ie9- setTimeout & setInterval additional parameters fix
	var global     = __webpack_require__(/*! ./_global */ 7)
	  , $export    = __webpack_require__(/*! ./_export */ 11)
	  , invoke     = __webpack_require__(/*! ./_invoke */ 81)
	  , partial    = __webpack_require__(/*! ./_partial */ 292)
	  , navigator  = global.navigator
	  , MSIE       = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
	var wrap = function(set){
	  return MSIE ? function(fn, time /*, ...args */){
	    return set(invoke(
	      partial,
	      [].slice.call(arguments, 2),
	      typeof fn == 'function' ? fn : Function(fn)
	    ), time);
	  } : set;
	};
	$export($export.G + $export.B + $export.F * MSIE, {
	  setTimeout:  wrap(global.setTimeout),
	  setInterval: wrap(global.setInterval)
	});

/***/ },
/* 292 */
/*!********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_partial.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var path      = __webpack_require__(/*! ./_path */ 293)
	  , invoke    = __webpack_require__(/*! ./_invoke */ 81)
	  , aFunction = __webpack_require__(/*! ./_a-function */ 24);
	module.exports = function(/* ...pargs */){
	  var fn     = aFunction(this)
	    , length = arguments.length
	    , pargs  = Array(length)
	    , i      = 0
	    , _      = path._
	    , holder = false;
	  while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
	  return function(/* ...args */){
	    var that = this
	      , aLen = arguments.length
	      , j = 0, k = 0, args;
	    if(!holder && !aLen)return invoke(fn, pargs, that);
	    args = pargs.slice();
	    if(holder)for(;length > j; j++)if(args[j] === _)args[j] = arguments[k++];
	    while(aLen > k)args.push(arguments[k++]);
	    return invoke(fn, args, that);
	  };
	};

/***/ },
/* 293 */
/*!*****************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_path.js ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./_global */ 7);

/***/ },
/* 294 */
/*!*************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/web.immediate.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(/*! ./_export */ 11)
	  , $task   = __webpack_require__(/*! ./_task */ 211);
	$export($export.G + $export.B, {
	  setImmediate:   $task.set,
	  clearImmediate: $task.clear
	});

/***/ },
/* 295 */
/*!****************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/web.dom.iterable.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $iterators    = __webpack_require__(/*! ./es6.array.iterator */ 197)
	  , redefine      = __webpack_require__(/*! ./_redefine */ 21)
	  , global        = __webpack_require__(/*! ./_global */ 7)
	  , hide          = __webpack_require__(/*! ./_hide */ 13)
	  , Iterators     = __webpack_require__(/*! ./_iterators */ 133)
	  , wks           = __webpack_require__(/*! ./_wks */ 28)
	  , ITERATOR      = wks('iterator')
	  , TO_STRING_TAG = wks('toStringTag')
	  , ArrayValues   = Iterators.Array;
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype
	    , key;
	  if(proto){
	    if(!proto[ITERATOR])hide(proto, ITERATOR, ArrayValues);
	    if(!proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	    Iterators[NAME] = ArrayValues;
	    for(key in $iterators)if(!proto[key])redefine(proto, key, $iterators[key], true);
	  }
	}

/***/ },
/* 296 */
/*!************************************************!*\
  !*** ./~/babel-regenerator-runtime/runtime.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */
	
	!(function(global) {
	  "use strict";
	
	  var hasOwn = Object.prototype.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var iteratorSymbol =
	    typeof Symbol === "function" && Symbol.iterator || "@@iterator";
	
	  var inModule = typeof module === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }
	
	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};
	
	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided, then outerFn.prototype instanceof Generator.
	    var generator = Object.create((outerFn || Generator).prototype);
	    var context = new Context(tryLocsList || []);
	
	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);
	
	    return generator;
	  }
	  runtime.wrap = wrap;
	
	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }
	
	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";
	
	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};
	
	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}
	
	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunction.displayName = "GeneratorFunction";
	
	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }
	
	  runtime.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };
	
	  runtime.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };
	
	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `value instanceof AwaitArgument` to determine if the yielded value is
	  // meant to be awaited. Some may consider the name of this method too
	  // cutesy, but they are curmudgeons.
	  runtime.awrap = function(arg) {
	    return new AwaitArgument(arg);
	  };
	
	  function AwaitArgument(arg) {
	    this.arg = arg;
	  }
	
	  function AsyncIterator(generator) {
	    // This invoke function is written in a style that assumes some
	    // calling function (or Promise) will handle exceptions.
	    function invoke(method, arg) {
	      var result = generator[method](arg);
	      var value = result.value;
	      return value instanceof AwaitArgument
	        ? Promise.resolve(value.arg).then(invokeNext, invokeThrow)
	        : Promise.resolve(value).then(function(unwrapped) {
	            // When a yielded Promise is resolved, its final value becomes
	            // the .value of the Promise<{value,done}> result for the
	            // current iteration. If the Promise is rejected, however, the
	            // result for this iteration will be rejected with the same
	            // reason. Note that rejections of yielded Promises are not
	            // thrown back into the generator function, as is the case
	            // when an awaited Promise is rejected. This difference in
	            // behavior between yield and await is important, because it
	            // allows the consumer to decide what to do with the yielded
	            // rejection (swallow it and continue, manually .throw it back
	            // into the generator, abandon iteration, whatever). With
	            // await, by contrast, there is no opportunity to examine the
	            // rejection reason outside the generator function, so the
	            // only option is to throw it from the await expression, and
	            // let the generator function handle the exception.
	            result.value = unwrapped;
	            return result;
	          });
	    }
	
	    if (typeof process === "object" && process.domain) {
	      invoke = process.domain.bind(invoke);
	    }
	
	    var invokeNext = invoke.bind(generator, "next");
	    var invokeThrow = invoke.bind(generator, "throw");
	    var invokeReturn = invoke.bind(generator, "return");
	    var previousPromise;
	
	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return invoke(method, arg);
	      }
	
	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : new Promise(function (resolve) {
	          resolve(callInvokeWithMethodAndArg());
	        });
	    }
	
	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }
	
	  defineIteratorMethods(AsyncIterator.prototype);
	
	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );
	
	    return runtime.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };
	
	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;
	
	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }
	
	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }
	
	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }
	
	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          if (method === "return" ||
	              (method === "throw" && delegate.iterator[method] === undefined)) {
	            // A return or throw (when the delegate iterator has no throw
	            // method) always terminates the yield* loop.
	            context.delegate = null;
	
	            // If the delegate iterator has a return method, give it a
	            // chance to clean up.
	            var returnMethod = delegate.iterator["return"];
	            if (returnMethod) {
	              var record = tryCatch(returnMethod, delegate.iterator, arg);
	              if (record.type === "throw") {
	                // If the return method threw an exception, let that
	                // exception prevail over the original return or throw.
	                method = "throw";
	                arg = record.arg;
	                continue;
	              }
	            }
	
	            if (method === "return") {
	              // Continue with the outer return, now that the delegate
	              // iterator has been terminated.
	              continue;
	            }
	          }
	
	          var record = tryCatch(
	            delegate.iterator[method],
	            delegate.iterator,
	            arg
	          );
	
	          if (record.type === "throw") {
	            context.delegate = null;
	
	            // Like returning generator.throw(uncaught), but without the
	            // overhead of an extra function call.
	            method = "throw";
	            arg = record.arg;
	            continue;
	          }
	
	          // Delegate generator ran and handled its own exceptions so
	          // regardless of what the method was, we continue as if it is
	          // "next" with an undefined arg.
	          method = "next";
	          arg = undefined;
	
	          var info = record.arg;
	          if (info.done) {
	            context[delegate.resultName] = info.value;
	            context.next = delegate.nextLoc;
	          } else {
	            state = GenStateSuspendedYield;
	            return info;
	          }
	
	          context.delegate = null;
	        }
	
	        if (method === "next") {
	          context._sent = arg;
	
	          if (state === GenStateSuspendedYield) {
	            context.sent = arg;
	          } else {
	            context.sent = undefined;
	          }
	        } else if (method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw arg;
	          }
	
	          if (context.dispatchException(arg)) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            method = "next";
	            arg = undefined;
	          }
	
	        } else if (method === "return") {
	          context.abrupt("return", arg);
	        }
	
	        state = GenStateExecuting;
	
	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;
	
	          var info = {
	            value: record.arg,
	            done: context.done
	          };
	
	          if (record.arg === ContinueSentinel) {
	            if (context.delegate && method === "next") {
	              // Deliberately forget the last sent value so that we don't
	              // accidentally pass it on to the delegate.
	              arg = undefined;
	            }
	          } else {
	            return info;
	          }
	
	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(arg) call above.
	          method = "throw";
	          arg = record.arg;
	        }
	      }
	    };
	  }
	
	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);
	
	  Gp[iteratorSymbol] = function() {
	    return this;
	  };
	
	  Gp.toString = function() {
	    return "[object Generator]";
	  };
	
	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };
	
	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }
	
	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }
	
	    this.tryEntries.push(entry);
	  }
	
	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }
	
	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }
	
	  runtime.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();
	
	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }
	
	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };
	
	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }
	
	      if (typeof iterable.next === "function") {
	        return iterable;
	      }
	
	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }
	
	          next.value = undefined;
	          next.done = true;
	
	          return next;
	        };
	
	        return next.next = next;
	      }
	    }
	
	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;
	
	  function doneResult() {
	    return { value: undefined, done: true };
	  }
	
	  Context.prototype = {
	    constructor: Context,
	
	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      this.sent = undefined;
	      this.done = false;
	      this.delegate = null;
	
	      this.tryEntries.forEach(resetTryEntry);
	
	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },
	
	    stop: function() {
	      this.done = true;
	
	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }
	
	      return this.rval;
	    },
	
	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }
	
	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;
	        return !!caught;
	      }
	
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;
	
	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }
	
	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");
	
	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	
	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }
	
	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	
	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },
	
	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }
	
	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }
	
	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;
	
	      if (finallyEntry) {
	        this.next = finallyEntry.finallyLoc;
	      } else {
	        this.complete(record);
	      }
	
	      return ContinueSentinel;
	    },
	
	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }
	
	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = record.arg;
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }
	    },
	
	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },
	
	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }
	
	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },
	
	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };
	
	      return ContinueSentinel;
	    }
	  };
	})(
	  // Among the various tricks for obtaining a reference to the global
	  // object, this seems to be the most reliable technique that does not
	  // use indirect eval (which violates Content Security Policy).
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this
	);
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(/*! ./~/process/browser.js */ 297)))

/***/ },
/* 297 */
/*!******************************!*\
  !*** ./~/process/browser.js ***!
  \******************************/
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 298 */
/*!********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/fn/regexp/escape.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../../modules/core.regexp.escape */ 299);
	module.exports = __webpack_require__(/*! ../../modules/_core */ 12).RegExp.escape;

/***/ },
/* 299 */
/*!******************************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/core.regexp.escape.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/benjamingr/RexExp.escape
	var $export = __webpack_require__(/*! ./_export */ 11)
	  , $re     = __webpack_require__(/*! ./_replacer */ 300)(/[\\^$*+?.()|[\]{}]/g, '\\$&');
	
	$export($export.S, 'RegExp', {escape: function escape(it){ return $re(it); }});


/***/ },
/* 300 */
/*!*********************************************************!*\
  !*** ./~/babel-polyfill/~/core-js/modules/_replacer.js ***!
  \*********************************************************/
/***/ function(module, exports) {

	module.exports = function(regExp, replace){
	  var replacer = replace === Object(replace) ? function(part){
	    return replace[part];
	  } : replace;
	  return function(it){
	    return String(it).replace(regExp, replacer);
	  };
	};

/***/ },
/* 301 */
/*!*************************************!*\
  !*** ./~/babel-standalone/babel.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define([], factory);
		else if(typeof exports === 'object')
			exports["Babel"] = factory();
		else
			root["Babel"] = factory();
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
	
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	
	
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ((function(modules) {
		// Check all modules for deduplicated modules
		for(var i in modules) {
			if(Object.prototype.hasOwnProperty.call(modules, i)) {
				switch(typeof modules[i]) {
				case "function": break;
				case "object":
					// Module can be created from a template
					modules[i] = (function(_m) {
						var args = _m.slice(1), fn = modules[_m[0]];
						return function (a,b,c) {
							fn.apply(this, [a,b,c].concat(args));
						};
					}(modules[i]));
					break;
				default:
					// Module is a copy of another module
					modules[i] = modules[modules[i]];
					break;
				}
			}
		}
		return modules;
	}([
	/* 0 */
	/*!**********************!*\
	  !*** ./src/index.js ***!
	  \**********************/
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.version = exports.availablePresets = exports.availablePlugins = undefined;
	
		var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
		exports.transform = transform;
		exports.transformFromAst = transformFromAst;
	
		var _babelCore = __webpack_require__(/*! babel-core */ 244);
	
		var Babel = _interopRequireWildcard(_babelCore);
	
		function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
		/**
		 * Parses plugin names and presets from the specified options.
		 */
		function processOptions(options) {
		  // Parse preset names
		  var presets = (options.presets || []).map(function (presetName) {
		    if (typeof presetName === 'string') {
		      var preset = availablePresets[presetName];
		      if (!preset) {
		        throw new Error('Invalid preset specified in Babel options: "' + presetName + '"');
		      }
		      return preset;
		    } else {
		      // Could be an actual preset module
		      return presetName;
		    }
		  });
	
		  // Parse plugin names
		  var plugins = (options.plugins || []).map(function (pluginName) {
		    if (typeof pluginName === 'string') {
		      var plugin = availablePlugins[pluginName];
		      if (!plugin) {
		        throw new Error('Invalid plugin specified in Babel options: "' + pluginName + '"');
		      }
		      return plugin;
		    } else {
		      // Could be an actual plugin module
		      return pluginName;
		    }
		  });
	
		  return _extends({}, options, {
		    presets: presets,
		    plugins: plugins
		  });
		}
	
		function transform(code, options) {
		  return Babel.transform(code, processOptions(options));
		}
	
		function transformFromAst(ast, code, options) {
		  return Babel.transformFromAst(code, processOptions(options));
		}
	
		// All the plugins we should bundle
		var availablePlugins = exports.availablePlugins = {
		  'check-es2015-constants': __webpack_require__(/*! babel-plugin-check-es2015-constants */ 73),
		  'external-helpers-2': __webpack_require__(/*! babel-plugin-external-helpers-2 */ 300),
		  'syntax-async-functions': __webpack_require__(/*! babel-plugin-syntax-async-functions */ 74),
		  'syntax-async-generators': __webpack_require__(/*! babel-plugin-syntax-async-generators */ 301),
		  'syntax-class-constructor-call': __webpack_require__(/*! babel-plugin-syntax-class-constructor-call */ 161),
		  'syntax-class-properties': __webpack_require__(/*! babel-plugin-syntax-class-properties */ 162),
		  'syntax-decorators': __webpack_require__(/*! babel-plugin-syntax-decorators */ 110),
		  'syntax-do-expressions': __webpack_require__(/*! babel-plugin-syntax-do-expressions */ 163),
		  'syntax-exponentiation-operator': __webpack_require__(/*! babel-plugin-syntax-exponentiation-operator */ 164),
		  'syntax-export-extensions': __webpack_require__(/*! babel-plugin-syntax-export-extensions */ 165),
		  'syntax-flow': __webpack_require__(/*! babel-plugin-syntax-flow */ 111),
		  'syntax-function-bind': __webpack_require__(/*! babel-plugin-syntax-function-bind */ 166),
		  'syntax-jsx': __webpack_require__(/*! babel-plugin-syntax-jsx */ 112),
		  'syntax-object-rest-spread': __webpack_require__(/*! babel-plugin-syntax-object-rest-spread */ 167),
		  'syntax-trailing-function-commas': __webpack_require__(/*! babel-plugin-syntax-trailing-function-commas */ 168),
		  'transform-async-functions': __webpack_require__(/*! babel-plugin-transform-async-functions */ 302),
		  'transform-async-to-generator': __webpack_require__(/*! babel-plugin-transform-async-to-generator */ 169),
		  'transform-async-to-module-method': __webpack_require__(/*! babel-plugin-transform-async-to-module-method */ 303),
		  'transform-class-constructor-call': __webpack_require__(/*! babel-plugin-transform-class-constructor-call */ 170),
		  'transform-class-properties': __webpack_require__(/*! babel-plugin-transform-class-properties */ 171),
		  'transform-decorators': __webpack_require__(/*! babel-plugin-transform-decorators */ 172),
		  'transform-decorators-legacy': __webpack_require__(/*! babel-plugin-transform-decorators-legacy */ 304).default, // <- No clue. Nope.
		  'transform-do-expressions': __webpack_require__(/*! babel-plugin-transform-do-expressions */ 173),
		  'transform-es2015-arrow-functions': __webpack_require__(/*! babel-plugin-transform-es2015-arrow-functions */ 75),
		  'transform-es2015-block-scoped-functions': __webpack_require__(/*! babel-plugin-transform-es2015-block-scoped-functions */ 76),
		  'transform-es2015-block-scoping': __webpack_require__(/*! babel-plugin-transform-es2015-block-scoping */ 77),
		  'transform-es2015-classes': __webpack_require__(/*! babel-plugin-transform-es2015-classes */ 78),
		  'transform-es2015-computed-properties': __webpack_require__(/*! babel-plugin-transform-es2015-computed-properties */ 79),
		  'transform-es2015-destructuring': __webpack_require__(/*! babel-plugin-transform-es2015-destructuring */ 80),
		  'transform-es2015-for-of': __webpack_require__(/*! babel-plugin-transform-es2015-for-of */ 81),
		  'transform-es2015-function-name': __webpack_require__(/*! babel-plugin-transform-es2015-function-name */ 82),
		  'transform-es2015-instanceof': __webpack_require__(/*! babel-plugin-transform-es2015-instanceof */ 319),
		  'transform-es2015-literals': __webpack_require__(/*! babel-plugin-transform-es2015-literals */ 83),
		  'transform-es2015-modules-amd': __webpack_require__(/*! babel-plugin-transform-es2015-modules-amd */ 176),
		  'transform-es2015-modules-commonjs': __webpack_require__(/*! babel-plugin-transform-es2015-modules-commonjs */ 114),
		  'transform-es2015-modules-systemjs': __webpack_require__(/*! babel-plugin-transform-es2015-modules-systemjs */ 331),
		  'transform-es2015-modules-umd': __webpack_require__(/*! babel-plugin-transform-es2015-modules-umd */ 332),
		  'transform-es2015-object-super': __webpack_require__(/*! babel-plugin-transform-es2015-object-super */ 84),
		  'transform-es2015-parameters': __webpack_require__(/*! babel-plugin-transform-es2015-parameters */ 85),
		  'transform-es2015-shorthand-properties': __webpack_require__(/*! babel-plugin-transform-es2015-shorthand-properties */ 86),
		  'transform-es2015-spread': __webpack_require__(/*! babel-plugin-transform-es2015-spread */ 87),
		  'transform-es2015-sticky-regex': __webpack_require__(/*! babel-plugin-transform-es2015-sticky-regex */ 88),
		  'transform-es2015-template-literals': __webpack_require__(/*! babel-plugin-transform-es2015-template-literals */ 89),
		  'transform-es2015-typeof-symbol': __webpack_require__(/*! babel-plugin-transform-es2015-typeof-symbol */ 90),
		  'transform-es2015-unicode-regex': __webpack_require__(/*! babel-plugin-transform-es2015-unicode-regex */ 91),
		  'transform-es3-member-expression-literals': __webpack_require__(/*! babel-plugin-transform-es3-member-expression-literals */ 336),
		  'transform-es3-property-literals': __webpack_require__(/*! babel-plugin-transform-es3-property-literals */ 337),
		  'transform-es5-property-mutators': __webpack_require__(/*! babel-plugin-transform-es5-property-mutators */ 338),
		  'transform-eval': __webpack_require__(/*! babel-plugin-transform-eval */ 339),
		  'transform-exponentiation-operator': __webpack_require__(/*! babel-plugin-transform-exponentiation-operator */ 178),
		  'transform-export-extensions': __webpack_require__(/*! babel-plugin-transform-export-extensions */ 179),
		  'transform-flow-strip-types': __webpack_require__(/*! babel-plugin-transform-flow-strip-types */ 180),
		  'transform-function-bind': __webpack_require__(/*! babel-plugin-transform-function-bind */ 181),
		  'transform-inline-environment-variables': __webpack_require__(/*! babel-plugin-transform-inline-environment-variables */ 340),
		  'transform-jscript': __webpack_require__(/*! babel-plugin-transform-jscript */ 341),
		  'transform-member-expression-literals': __webpack_require__(/*! babel-plugin-transform-member-expression-literals */ 342),
		  'transform-merge-sibling-variables': __webpack_require__(/*! babel-plugin-transform-merge-sibling-variables */ 343),
		  'transform-minify-booleans': __webpack_require__(/*! babel-plugin-transform-minify-booleans */ 344),
		  'transform-node-env-inline': __webpack_require__(/*! babel-plugin-transform-node-env-inline */ 345),
		  'transform-object-assign': __webpack_require__(/*! babel-plugin-transform-object-assign */ 346),
		  'transform-object-rest-spread': __webpack_require__(/*! babel-plugin-transform-object-rest-spread */ 182),
		  'transform-object-set-prototype-of-to-assign': __webpack_require__(/*! babel-plugin-transform-object-set-prototype-of-to-assign */ 347),
		  'transform-property-literals': __webpack_require__(/*! babel-plugin-transform-property-literals */ 348),
		  'transform-proto-to-assign': __webpack_require__(/*! babel-plugin-transform-proto-to-assign */ 349),
		  'transform-react-constant-elements': __webpack_require__(/*! babel-plugin-transform-react-constant-elements */ 350),
		  'transform-react-display-name': __webpack_require__(/*! babel-plugin-transform-react-display-name */ 183),
		  'transform-react-inline-elements': __webpack_require__(/*! babel-plugin-transform-react-inline-elements */ 351),
		  'transform-react-jsx': __webpack_require__(/*! babel-plugin-transform-react-jsx */ 184),
		  'transform-react-jsx-compat': __webpack_require__(/*! babel-plugin-transform-react-jsx-compat */ 352),
		  'transform-react-jsx-source': __webpack_require__(/*! babel-plugin-transform-react-jsx-source */ 353),
		  'transform-regenerator': __webpack_require__(/*! babel-plugin-transform-regenerator */ 92),
		  'transform-remove-console': __webpack_require__(/*! babel-plugin-transform-remove-console */ 358),
		  'transform-remove-debugger': __webpack_require__(/*! babel-plugin-transform-remove-debugger */ 359),
		  'transform-runtime': __webpack_require__(/*! babel-plugin-transform-runtime */ 361),
		  'transform-simplify-comparison-operators': __webpack_require__(/*! babel-plugin-transform-simplify-comparison-operators */ 362),
		  'transform-strict-mode': __webpack_require__(/*! babel-plugin-transform-strict-mode */ 116),
		  'transform-undefined-to-void': __webpack_require__(/*! babel-plugin-transform-undefined-to-void */ 363),
		  'undeclared-variables-check': __webpack_require__(/*! babel-plugin-undeclared-variables-check */ 364)
		};
	
		// All the presets we should bundle
		var availablePresets = exports.availablePresets = {
		  es2015: __webpack_require__(/*! babel-preset-es2015 */ 365),
		  react: __webpack_require__(/*! babel-preset-react */ 366),
		  'stage-0': __webpack_require__(/*! babel-preset-stage-0 */ 367),
		  'stage-1': __webpack_require__(/*! babel-preset-stage-1 */ 187),
		  'stage-2': __webpack_require__(/*! babel-preset-stage-2 */ 188),
		  'stage-3': __webpack_require__(/*! babel-preset-stage-3 */ 189),
	
		  // ES2015 preset with es2015-modules-commonjs removed
		  // Plugin list copied from babel-preset-es2015/index.js
		  'es2015-no-commonjs': {
		    plugins: [__webpack_require__(/*! babel-plugin-transform-es2015-template-literals */ 89), __webpack_require__(/*! babel-plugin-transform-es2015-literals */ 83), __webpack_require__(/*! babel-plugin-transform-es2015-function-name */ 82), __webpack_require__(/*! babel-plugin-transform-es2015-arrow-functions */ 75), __webpack_require__(/*! babel-plugin-transform-es2015-block-scoped-functions */ 76), __webpack_require__(/*! babel-plugin-transform-es2015-classes */ 78), __webpack_require__(/*! babel-plugin-transform-es2015-object-super */ 84), __webpack_require__(/*! babel-plugin-transform-es2015-shorthand-properties */ 86), __webpack_require__(/*! babel-plugin-transform-es2015-computed-properties */ 79), __webpack_require__(/*! babel-plugin-transform-es2015-for-of */ 81), __webpack_require__(/*! babel-plugin-transform-es2015-sticky-regex */ 88), __webpack_require__(/*! babel-plugin-transform-es2015-unicode-regex */ 91), __webpack_require__(/*! babel-plugin-check-es2015-constants */ 73), __webpack_require__(/*! babel-plugin-transform-es2015-spread */ 87), __webpack_require__(/*! babel-plugin-transform-es2015-parameters */ 85), __webpack_require__(/*! babel-plugin-transform-es2015-destructuring */ 80), __webpack_require__(/*! babel-plugin-transform-es2015-block-scoping */ 77), __webpack_require__(/*! babel-plugin-transform-es2015-typeof-symbol */ 90), [__webpack_require__(/*! babel-plugin-transform-regenerator */ 92), { async: false, asyncGenerators: false }]]
		  },
	
		  // ES2015 preset with plugins set to loose mode and es2015-modules-commonjs
		  // removed.
		  // Based off https://github.com/bkonkle/babel-preset-es2015-loose/blob/master/index.js
		  'es2015-loose': {
		    plugins: [[__webpack_require__(/*! babel-plugin-transform-es2015-template-literals */ 89), { loose: true }], __webpack_require__(/*! babel-plugin-transform-es2015-literals */ 83), __webpack_require__(/*! babel-plugin-transform-es2015-function-name */ 82), __webpack_require__(/*! babel-plugin-transform-es2015-arrow-functions */ 75), __webpack_require__(/*! babel-plugin-transform-es2015-block-scoped-functions */ 76), [__webpack_require__(/*! babel-plugin-transform-es2015-classes */ 78), { loose: true }], __webpack_require__(/*! babel-plugin-transform-es2015-object-super */ 84), __webpack_require__(/*! babel-plugin-transform-es2015-shorthand-properties */ 86), [__webpack_require__(/*! babel-plugin-transform-es2015-computed-properties */ 79), { loose: true }], [__webpack_require__(/*! babel-plugin-transform-es2015-for-of */ 81), { loose: true }], __webpack_require__(/*! babel-plugin-transform-es2015-sticky-regex */ 88), __webpack_require__(/*! babel-plugin-transform-es2015-unicode-regex */ 91), __webpack_require__(/*! babel-plugin-check-es2015-constants */ 73), [__webpack_require__(/*! babel-plugin-transform-es2015-spread */ 87), { loose: true }], __webpack_require__(/*! babel-plugin-transform-es2015-parameters */ 85), [__webpack_require__(/*! babel-plugin-transform-es2015-destructuring */ 80), { loose: true }], __webpack_require__(/*! babel-plugin-transform-es2015-block-scoping */ 77), __webpack_require__(/*! babel-plugin-transform-es2015-typeof-symbol */ 90), [__webpack_require__(/*! babel-plugin-transform-regenerator */ 92), { async: false, asyncGenerators: false }]]
		  }
		};
	
		var version = exports.version = Babel.version;
	
	/***/ },
	/* 1 */
	/*!************************************************************!*\
	  !*** ./~/babel-runtime/helpers/interop-require-default.js ***!
	  \************************************************************/
	/***/ function(module, exports) {
	
		"use strict";
	
		exports["default"] = function (obj) {
		  return obj && obj.__esModule ? obj : {
		    "default": obj
		  };
		};
	
		exports.__esModule = true;
	
	/***/ },
	/* 2 */
	/*!*************************************************************!*\
	  !*** ./~/babel-runtime/helpers/interop-require-wildcard.js ***!
	  \*************************************************************/
	/***/ function(module, exports) {
	
		"use strict";
	
		exports["default"] = function (obj) {
		  if (obj && obj.__esModule) {
		    return obj;
		  } else {
		    var newObj = {};
	
		    if (obj != null) {
		      for (var key in obj) {
		        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
		      }
		    }
	
		    newObj["default"] = obj;
		    return newObj;
		  }
		};
	
		exports.__esModule = true;
	
	/***/ },
	/* 3 */
	/*!************************************!*\
	  !*** ./~/babel-types/lib/index.js ***!
	  \************************************/
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
	
		var _Object$keys = __webpack_require__(/*! babel-runtime/core-js/object/keys */ 14)["default"];
	
		var _getIterator = __webpack_require__(/*! babel-runtime/core-js/get-iterator */ 4)["default"];
	
		var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 1)["default"];
	
		var _interopRequireWildcard = __webpack_require__(/*! babel-runtime/helpers/interop-require-wildcard */ 2)["default"];
	
		var _defaults = __webpack_require__(/*! babel-runtime/helpers/defaults */ 54)["default"];
	
		var _interopExportWildcard = __webpack_require__(/*! babel-runtime/helpers/interop-export-wildcard */ 55)["default"];
	
		exports.__esModule = true;
		exports.is = is;
		exports.isType = isType;
		exports.validate = validate;
		exports.shallowEqual = shallowEqual;
		exports.appendToMemberExpression = appendToMemberExpression;
		exports.prependToMemberExpression = prependToMemberExpression;
		exports.ensureBlock = ensureBlock;
		exports.clone = clone;
		exports.cloneWithoutLoc = cloneWithoutLoc;
		exports.cloneDeep = cloneDeep;
		exports.buildMatchMemberExpression = buildMatchMemberExpression;
		exports.removeComments = removeComments;
		exports.inheritsComments = inheritsComments;
		exports.inheritTrailingComments = inheritTrailingComments;
		exports.inheritLeadingComments = inheritLeadingComments;
		exports.inheritInnerComments = inheritInnerComments;
		exports.inherits = inherits;
		exports.assertNode = assertNode;
		exports.isNode = isNode;
	
		var _toFastProperties = __webpack_require__(/*! to-fast-properties */ 69);
	
		var _toFastProperties2 = _interopRequireDefault(_toFastProperties);
	
		var _lodashArrayCompact = __webpack_require__(/*! lodash/array/compact */ 62);
	
		var _lodashArrayCompact2 = _interopRequireDefault(_lodashArrayCompact);
	
		var _lodashLangClone = __webpack_require__(/*! lodash/lang/clone */ 34);
	
		var _lodashLangClone2 = _interopRequireDefault(_lodashLangClone);
	
		var _lodashCollectionEach = __webpack_require__(/*! lodash/collection/each */ 31);
	
		var _lodashCollectionEach2 = _interopRequireDefault(_lodashCollectionEach);
	
		var _lodashArrayUniq = __webpack_require__(/*! lodash/array/uniq */ 63);
	
		var _lodashArrayUniq2 = _interopRequireDefault(_lodashArrayUniq);
	
		__webpack_require__(/*! ./definitions/init */ 398);
	
		var _definitions = __webpack_require__(/*! ./definitions */ 28);
	
		var _react2 = __webpack_require__(/*! ./react */ 402);
	
		var _react = _interopRequireWildcard(_react2);
	
		var t = exports;
	
		/**
		 * Registers `is[Type]` and `assert[Type]` generated functions for a given `type`.
		 * Pass `skipAliasCheck` to force it to directly compare `node.type` with `type`.
		 */
	
		function registerType(type) {
		  var is = t["is" + type] = function (node, opts) {
		    return t.is(type, node, opts);
		  };
	
		  t["assert" + type] = function (node, opts) {
		    opts = opts || {};
		    if (!is(node, opts)) {
		      throw new Error("Expected type " + JSON.stringify(type) + " with option " + JSON.stringify(opts));
		    }
		  };
		}
	
		//
	
		var _constants = __webpack_require__(/*! ./constants */ 120);
	
		_defaults(exports, _interopExportWildcard(_constants, _defaults));
	
		exports.VISITOR_KEYS = _definitions.VISITOR_KEYS;
		exports.ALIAS_KEYS = _definitions.ALIAS_KEYS;
		exports.NODE_FIELDS = _definitions.NODE_FIELDS;
		exports.BUILDER_KEYS = _definitions.BUILDER_KEYS;
		exports.DEPRECATED_KEYS = _definitions.DEPRECATED_KEYS;
		exports.react = _react;
	
		/**
		 * Registers `is[Type]` and `assert[Type]` for all types.
		 */
	
		for (var type in t.VISITOR_KEYS) {
		  registerType(type);
		}
	
		/**
		 * Flip `ALIAS_KEYS` for faster access in the reverse direction.
		 */
	
		t.FLIPPED_ALIAS_KEYS = {};
	
		_lodashCollectionEach2["default"](t.ALIAS_KEYS, function (aliases, type) {
		  _lodashCollectionEach2["default"](aliases, function (alias) {
		    var types = t.FLIPPED_ALIAS_KEYS[alias] = t.FLIPPED_ALIAS_KEYS[alias] || [];
		    types.push(type);
		  });
		});
	
		/**
		 * Registers `is[Alias]` and `assert[Alias]` functions for all aliases.
		 */
	
		_lodashCollectionEach2["default"](t.FLIPPED_ALIAS_KEYS, function (types, type) {
		  t[type.toUpperCase() + "_TYPES"] = types;
		  registerType(type);
		});
	
		var TYPES = _Object$keys(t.VISITOR_KEYS).concat(_Object$keys(t.FLIPPED_ALIAS_KEYS)).concat(_Object$keys(t.DEPRECATED_KEYS));
	
		exports.TYPES = TYPES;
		/**
		 * Returns whether `node` is of given `type`.
		 *
		 * For better performance, use this instead of `is[Type]` when `type` is unknown.
		 * Optionally, pass `skipAliasCheck` to directly compare `node.type` with `type`.
		 */
	
		function is(type, node, opts) {
		  if (!node) return false;
	
		  var matches = isType(node.type, type);
		  if (!matches) return false;
	
		  if (typeof opts === "undefined") {
		    return true;
		  } else {
		    return t.shallowEqual(node, opts);
		  }
		}
	
		/**
		 * Test if a `nodeType` is a `targetType` or if `targetType` is an alias of `nodeType`.
		 */
	
		function isType(nodeType, targetType) {
		  if (nodeType === targetType) return true;
	
		  var aliases = t.FLIPPED_ALIAS_KEYS[targetType];
		  if (aliases) {
		    if (aliases[0] === nodeType) return true;
	
		    for (var _iterator = aliases, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _getIterator(_iterator);;) {
		      var _ref;
	
		      if (_isArray) {
		        if (_i >= _iterator.length) break;
		        _ref = _iterator[_i++];
		      } else {
		        _i = _iterator.next();
		        if (_i.done) break;
		        _ref = _i.value;
		      }
	
		      var alias = _ref;
	
		      if (nodeType === alias) return true;
		    }
		  }
	
		  return false;
		}
	
		/**
		 * Description
		 */
	
		_lodashCollectionEach2["default"](t.BUILDER_KEYS, function (keys, type) {
		  function builder() {
		    if (arguments.length > keys.length) {
		      throw new Error("t." + type + ": Too many arguments passed. Received " + arguments.length + " but can receive " + ("no more than " + keys.length));
		    }
	
		    var node = {};
		    node.type = type;
	
		    var i = 0;
	
		    var _arr = keys;
		    for (var _i2 = 0; _i2 < _arr.length; _i2++) {
		      var key = _arr[_i2];
		      var field = t.NODE_FIELDS[type][key];
	
		      var arg = arguments[i++];
		      if (arg === undefined) arg = _lodashLangClone2["default"](field["default"]);
	
		      node[key] = arg;
		    }
	
		    for (var key in node) {
		      validate(node, key, node[key]);
		    }
	
		    return node;
		  }
	
		  t[type] = builder;
		  t[type[0].toLowerCase() + type.slice(1)] = builder;
		});
	
		/**
		 * Description
		 */
	
		var _loop = function (type) {
		  var proxy = function proxy(fn) {
		    return function () {
		      console.trace("The node type " + type + " has been renamed to " + newType);
		      return fn.apply(this, arguments);
		    };
		  };
	
		  var newType = t.DEPRECATED_KEYS[type];
	
		  t[type] = t[type[0].toLowerCase() + type.slice(1)] = proxy(t[newType]);
		  t["is" + type] = proxy(t["is" + newType]);
		  t["assert" + type] = proxy(t["assert" + newType]);
		};
	
		for (var type in t.DEPRECATED_KEYS) {
		  _loop(type);
		}
	
		/**
		 * Description
		 */
	
		function validate(node, key, val) {
		  if (!node) return;
	
		  var fields = t.NODE_FIELDS[node.type];
		  if (!fields) return;
	
		  var field = fields[key];
		  if (!field || !field.validate) return;
		  if (field.optional && val == null) return;
	
		  field.validate(node, key, val);
		}
	
		/**
		 * Test if an object is shallowly equal.
		 */
	
		function shallowEqual(actual, expected) {
		  var keys = _Object$keys(expected);
	
		  var _arr2 = keys;
		  for (var _i3 = 0; _i3 < _arr2.length; _i3++) {
		    var key = _arr2[_i3];
		    if (actual[key] !== expected[key]) {
		      return false;
		    }
		  }
	
		  return true;
		}
	
		/**
		 * Append a node to a member expression.
		 */
	
		function appendToMemberExpression(member, append, computed) {
		  member.object = t.memberExpression(member.object, member.property, member.computed);
		  member.property = append;
		  member.computed = !!computed;
		  return member;
		}
	
		/**
		 * Prepend a node to a member expression.
		 */
	
		function prependToMemberExpression(member, prepend) {
		  member.object = t.memberExpression(prepend, member.object);
		  return member;
		}
	
		/**
		 * Ensure the `key` (defaults to "body") of a `node` is a block.
		 * Casting it to a block if it is not.
		 */
	
		function ensureBlock(node) {
		  var key = arguments.length <= 1 || arguments[1] === undefined ? "body" : arguments[1];
	
		  return node[key] = t.toBlock(node[key], node);
		}
	
		/**
		 * Create a shallow clone of a `node` excluding `_private` properties.
		 */
	
		function clone(node) {
		  var newNode = {};
		  for (var key in node) {
		    if (key[0] === "_") continue;
		    newNode[key] = node[key];
		  }
		  return newNode;
		}
	
		/**
		 * Create a shallow clone of a `node` excluding `_private` and location properties.
		 */
	
		function cloneWithoutLoc(node) {
		  var newNode = clone(node);
		  delete newNode.loc;
		  return newNode;
		}
	
		/**
		 * Create a deep clone of a `node` and all of it's child nodes
		 * exluding `_private` properties.
		 */
	
		function cloneDeep(node) {
		  var newNode = {};
	
		  for (var key in node) {
		    if (key[0] === "_") continue;
	
		    var val = node[key];
	
		    if (val) {
		      if (val.type) {
		        val = t.cloneDeep(val);
		      } else if (Array.isArray(val)) {
		        val = val.map(t.cloneDeep);
		      }
		    }
	
		    newNode[key] = val;
		  }
	
		  return newNode;
		}
	
		/**
		 * Build a function that when called will return whether or not the
		 * input `node` `MemberExpression` matches the input `match`.
		 *
		 * For example, given the match `React.createClass` it would match the
		 * parsed nodes of `React.createClass` and `React["createClass"]`.
		 */
	
		function buildMatchMemberExpression(match, allowPartial) {
		  var parts = match.split(".");
	
		  return function (member) {
		    // not a member expression
		    if (!t.isMemberExpression(member)) return false;
	
		    var search = [member];
		    var i = 0;
	
		    while (search.length) {
		      var node = search.shift();
	
		      if (allowPartial && i === parts.length) {
		        return true;
		      }
	
		      if (t.isIdentifier(node)) {
		        // this part doesn't match
		        if (parts[i] !== node.name) return false;
		      } else if (t.isStringLiteral(node)) {
		        // this part doesn't match
		        if (parts[i] !== node.value) return false;
		      } else if (t.isMemberExpression(node)) {
		        if (node.computed && !t.isStringLiteral(node.property)) {
		          // we can't deal with this
		          return false;
		        } else {
		          search.push(node.object);
		          search.push(node.property);
		          continue;
		        }
		      } else {
		        // we can't deal with this
		        return false;
		      }
	
		      // too many parts
		      if (++i > parts.length) {
		        return false;
		      }
		    }
	
		    return true;
		  };
		}
	
		/**
		 * Remove comment properties from a node.
		 */
	
		function removeComments(node) {
		  for (var _iterator2 = t.COMMENT_KEYS, _isArray2 = Array.isArray(_iterator2), _i4 = 0, _iterator2 = _isArray2 ? _iterator2 : _getIterator(_iterator2);;) {
		    var _ref2;
	
		    if (_isArray2) {
		      if (_i4 >= _iterator2.length) break;
		      _ref2 = _iterator2[_i4++];
		    } else {
		      _i4 = _iterator2.next();
		      if (_i4.done) break;
		      _ref2 = _i4.value;
		    }
	
		    var key = _ref2;
	
		    delete node[key];
		  }
		  return node;
		}
	
		/**
		 * Inherit all unique comments from `parent` node to `child` node.
		 */
	
		function inheritsComments(child, parent) {
		  inheritTrailingComments(child, parent);
		  inheritLeadingComments(child, parent);
		  inheritInnerComments(child, parent);
		  return child;
		}
	
		function inheritTrailingComments(child, parent) {
		  _inheritComments("trailingComments", child, parent);
		}
	
		function inheritLeadingComments(child, parent) {
		  _inheritComments("leadingComments", child, parent);
		}
	
		function inheritInnerComments(child, parent) {
		  _inheritComments("innerComments", child, parent);
		}
	
		function _inheritComments(key, child, parent) {
		  if (child && parent) {
		    child[key] = _lodashArrayUniq2["default"](_lodashArrayCompact2["default"]([].concat(child[key], parent[key])));
		  }
		}
	
		// Can't use import because of cyclic dependency between babel-traverse
		// and this module (babel-types). This require needs to appear after
		// we export the TYPES constant.
		var traverse = __webpack_require__(/*! babel-traverse */ 6)["default"];
	
		/**
		 * Inherit all contextual properties from `parent` node to `child` node.
		 */
	
		function inherits(child, parent) {
		  if (!child || !parent) return child;
	
		  // optionally inherit specific properties if not null
		  var _arr3 = t.INHERIT_KEYS.optional;
		  for (var _i5 = 0; _i5 < _arr3.length; _i5++) {
		    var key = _arr3[_i5];
		    if (child[key] == null) {
		      child[key] = parent[key];
		    }
		  }
	
		  // force inherit "private" properties
		  for (var key in parent) {
		    if (key[0] === "_") child[key] = parent[key];
		  }
	
		  // force inherit select properties
		  var _arr4 = t.INHERIT_KEYS.force;
		  for (var _i6 = 0; _i6 < _arr4.length; _i6++) {
		    var key = _arr4[_i6];
		    child[key] = parent[key];
		  }
	
		  t.inheritsComments(child, parent);
		  traverse.copyCache(parent, child);
	
		  return child;
		}
	
		/**
		 * TODO
		 */
	
		function assertNode(node) {
		  if (!isNode(node)) {
		    // $FlowFixMe
		    throw new TypeError("Not a valid node " + (node && node.type));
		  }
		}
	
		/**
		 * TODO
		 */
	
		function isNode(node) {
		  return !!(node && _definitions.VISITOR_KEYS[node.type]);
		}
	
		// Optimize property access.
		_toFastProperties2["default"](t);
		_toFastProperties2["default"](t.VISITOR_KEYS);
	
		//
	
		var _retrievers = __webpack_require__(/*! ./retrievers */ 194);
	
		_defaults(exports, _interopExportWildcard(_retrievers, _defaults));
	
		var _validators = __webpack_require__(/*! ./validators */ 403);
	
		_defaults(exports, _interopExportWildcard(_validators, _defaults));
	
		var _converters = __webpack_require__(/*! ./converters */ 393);
	
		_defaults(exports, _interopExportWildcard(_converters, _defaults));
	
		var _flow = __webpack_require__(/*! ./flow */ 401);
	
		_defaults(exports, _interopExportWildcard(_flow, _defaults));
	
	/***/ },
	/* 4 */
	/*!*************************************************!*\
	  !*** ./~/babel-runtime/core-js/get-iterator.js ***!
	  \*************************************************/
	/***/ function(module, exports, __webpack_require__) {
	
		module.exports = { "default": __webpack_require__(/*! core-js/library/fn/get-iterator */ 410), __esModule: true };
	
	/***/ },
	/* 5 */
	/*!*****************************************************!*\
	  !*** ./~/babel-runtime/helpers/class-call-check.js ***!
	  \*****************************************************/
	/***/ function(module, exports) {
	
		"use strict";
	
		exports["default"] = function (instance, Constructor) {
		  if (!(instance instanceof Constructor)) {
		    throw new TypeError("Cannot call a class as a function");
		  }
		};
	
		exports.__esModule = true;
	
	/***/ },
	/* 6 */
	/*!***************************************!*\
	  !*** ./~/babel-traverse/lib/index.js ***!
	  \***************************************/
	/***/ function(module, exports, __webpack_require__) {
	
		/* eslint max-len: 0 */
	
		"use strict";
	
		var _getIterator = __webpack_require__(/*! babel-runtime/core-js/get-iterator */ 4)["default"];
	
		var _Symbol = __webpack_require__(/*! babel-runtime/core-js/symbol */ 16)["default"];
	
		var _Object$getOwnPropertySymbols = __webpack_require__(/*! babel-runtime/core-js/object/get-own-property-symbols */ 371)["default"];
	
		var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 1)["default"];
	
		var _interopRequireWildcard = __webpack_require__(/*! babel-runtime/helpers/interop-require-wildcard */ 2)["default"];
	
		var _interopRequire = __webpack_require__(/*! babel-runtime/helpers/interop-require */ 118)["default"];
	
		exports.__esModule = true;
		exports["default"] = traverse;
	
		var _context = __webpack_require__(/*! ./context */ 375);
	
		var _context2 = _interopRequireDefault(_context);
	
		var _visitors = __webpack_require__(/*! ./visitors */ 392);
	
		var visitors = _interopRequireWildcard(_visitors);
	
		var _babelMessages = __webpack_require__(/*! babel-messages */ 19);
	
		var messages = _interopRequireWildcard(_babelMessages);
	
		var _lodashCollectionIncludes = __webpack_require__(/*! lodash/collection/includes */ 99);
	
		var _lodashCollectionIncludes2 = _interopRequireDefault(_lodashCollectionIncludes);
	
		var _babelTypes = __webpack_require__(/*! babel-types */ 3);
	
		var t = _interopRequireWildcard(_babelTypes);
	
		var _cache = __webpack_require__(/*! ./cache */ 93);
	
		var cache = _interopRequireWildcard(_cache);
	
		var _path = __webpack_require__(/*! ./path */ 36);
	
		exports.NodePath = _interopRequire(_path);
	
		var _scope = __webpack_require__(/*! ./scope */ 119);
	
		exports.Scope = _interopRequire(_scope);
	
		var _hub = __webpack_require__(/*! ./hub */ 191);
	
		exports.Hub = _interopRequire(_hub);
		exports.visitors = visitors;
	
		function traverse(parent, opts, scope, state, parentPath) {
		  if (!parent) return;
		  if (!opts) opts = {};
	
		  if (!opts.noScope && !scope) {
		    if (parent.type !== "Program" && parent.type !== "File") {
		      throw new Error(messages.get("traverseNeedsParent", parent.type));
		    }
		  }
	
		  visitors.explode(opts);
	
		  traverse.node(parent, opts, scope, state, parentPath);
		}
	
		traverse.visitors = visitors;
		traverse.verify = visitors.verify;
		traverse.explode = visitors.explode;
	
		traverse.NodePath = __webpack_require__(/*! ./path */ 36);
		traverse.Scope = __webpack_require__(/*! ./scope */ 119);
		traverse.Hub = __webpack_require__(/*! ./hub */ 191);
	
		traverse.cheap = function (node, enter) {
		  if (!node) return;
	
		  var keys = t.VISITOR_KEYS[node.type];
		  if (!keys) return;
	
		  enter(node);
	
		  for (var _iterator = keys, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _getIterator(_iterator);;) {
		    var _ref;
	
		    if (_isArray) {
		      if (_i >= _iterator.length) break;
		      _ref = _iterator[_i++];
		    } else {
		      _i = _iterator.next();
		      if (_i.done) break;
		      _ref = _i.value;
		    }
	
		    var key = _ref;
	
		    var subNode = node[key];
	
		    if (Array.isArray(subNode)) {
		      for (var _iterator2 = subNode, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _getIterator(_iterator2);;) {
		        var _ref2;
	
		        if (_isArray2) {
		          if (_i2 >= _iterator2.length) break;
		          _ref2 = _iterator2[_i2++];
		        } else {
		          _i2 = _iterator2.next();
		          if (_i2.done) break;
		          _ref2 = _i2.value;
		        }
	
		        var _node = _ref2;
	
		        traverse.cheap(_node, enter);
		      }
		    } else {
		      traverse.cheap(subNode, enter);
		    }
		  }
		};
	
		traverse.node = function (node, opts, scope, state, parentPath, skipKeys) {
		  var keys = t.VISITOR_KEYS[node.type];
		  if (!keys) return;
	
		  var context = new _context2["default"](scope, opts, state, parentPath);
		  for (var _i3 = 0; _i3 < keys.length; _i3++) {
		    var key = keys[_i3];
		    if (skipKeys && skipKeys[key]) continue;
		    if (context.visit(node, key)) return;
		  }
		};
	
		var CLEAR_KEYS = t.COMMENT_KEYS.concat(["tokens", "comments", "start", "end", "loc", "raw", "rawValue"]);
	
		traverse.clearNode = function (node) {
		  for (var _i4 = 0; _i4 < CLEAR_KEYS.length; _i4++) {
		    var key = CLEAR_KEYS[_i4];
		    if (node[key] != null) node[key] = undefined;
		  }
	
		  for (var key in node) {
		    if (key[0] === "_" && node[key] != null) node[key] = undefined;
		  }
	
		  cache.path["delete"](node);
	
		  var syms = _Object$getOwnPropertySymbols(node);
		  for (var _i5 = 0; _i5 < syms.length; _i5++) {
		    var sym = syms[_i5];
		    node[sym] = null;
		  }
		};
	
		traverse.removeProperties = function (tree) {
		  traverse.cheap(tree, traverse.clearNode);
		  return tree;
		};
	
		function hasBlacklistedType(path, state) {
		  if (path.node.type === state.type) {
		    state.has = true;
		    path.stop();
		  }
		}
	
		traverse.hasType = function (tree, scope, type, blacklistTypes) {
		  // the node we're searching in is blacklisted
		  if (_lodashCollectionIncludes2["default"](blacklistTypes, tree.type)) return false;
	
		  // the type we're looking for is the same as the passed node
		  if (tree.type === type) return true;
	
		  var state = {
		    has: false,
		    type: type
		  };
	
		  traverse(tree, {
		    blacklist: blacklistTypes,
		    enter: hasBlacklistedType
		  }, scope, state);
	
		  return state.has;
		};
	
		traverse.clearCache = function () {
		  cache.clear();
		};
	
		traverse.copyCache = function (source, destination) {
		  if (cache.path.has(source)) {
		    cache.path.set(destination, cache.path.get(source));
		  }
		};
	
	/***/ },
	/* 7 */
	/*!****************************************!*\
	  !*** ./~/core-js/library/modules/$.js ***!
	  \****************************************/
	/***/ function(module, exports) {
	
		var $Object = Object;
		module.exports = {
		  create:     $Object.create,
		  getProto:   $Object.getPrototypeOf,
		  isEnum:     {}.propertyIsEnumerable,
		  getDesc:    $Object.getOwnPropertyDescriptor,
		  setDesc:    $Object.defineProperty,
		  setDescs:   $Object.defineProperties,
		  getKeys:    $Object.keys,
		  getNames:   $Object.getOwnPropertyNames,
		  getSymbols: $Object.getOwnPropertySymbols,
		  each:       [].forEach
		};
	
	/***/ },
	/* 8 */
	/*!******************************************************!*\
	  !*** ./~/babel-generator/~/babel-types/lib/index.js ***!
	  \******************************************************/
	[548, 288, 24, 292, 109, 151, 293, 283, 291],
	/* 9 */
	/*!***************************************!*\
	  !*** ./~/babel-template/lib/index.js ***!
	  \***************************************/
	/***/ function(module, exports, __webpack_require__) {
	
		/* eslint max-len: 0 */
	
		"use strict";
	
		var _Symbol = __webpack_require__(/*! babel-runtime/core-js/symbol */ 16)["default"];
	
		var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 1)["default"];
	
		var _interopRequireWildcard = __webpack_require__(/*! babel-runtime/helpers/interop-require-wildcard */ 2)["default"];
	
		exports.__esModule = true;
	
		var _lodashLangCloneDeep = __webpack_require__(/*! lodash/lang/cloneDeep */ 228);
	
		var _lodashLangCloneDeep2 = _interopRequireDefault(_lodashLangCloneDeep);
	
		var _lodashObjectAssign = __webpack_require__(/*! lodash/object/assign */ 67);
	
		var _lodashObjectAssign2 = _interopRequireDefault(_lodashObjectAssign);
	
		var _lodashObjectHas = __webpack_require__(/*! lodash/object/has */ 232);
	
		var _lodashObjectHas2 = _interopRequireDefault(_lodashObjectHas);
	
		var _babelTraverse = __webpack_require__(/*! babel-traverse */ 6);
	
		var _babelTraverse2 = _interopRequireDefault(_babelTraverse);
	
		var _babylon = __webpack_require__(/*! babylon */ 121);
	
		var babylon = _interopRequireWildcard(_babylon);
	
		var _babelTypes = __webpack_require__(/*! babel-types */ 3);
	
		var t = _interopRequireWildcard(_babelTypes);
	
		var FROM_TEMPLATE = "_fromTemplate"; //Symbol(); // todo: probably wont get copied over
		var TEMPLATE_SKIP = _Symbol();
	
		exports["default"] = function (code, opts) {
		  // since we lazy parse the template, we get the current stack so we have the
		  // original stack to append if it errors when parsing
		  var stack = undefined;
		  try {
		    // error stack gets populated in IE only on throw (https://msdn.microsoft.com/en-us/library/hh699850(v=vs.94).aspx)
		    throw new Error();
		  } catch (error) {
		    if (error.stack) {
		      // error.stack does not exists in IE <= 9
		      stack = error.stack.split("\n").slice(1).join("\n");
		    }
		  }
	
		  var _getAst = function getAst() {
		    var ast = undefined;
	
		    try {
		      ast = babylon.parse(code, _lodashObjectAssign2["default"]({
		        allowReturnOutsideFunction: true,
		        allowSuperOutsideMethod: true
		      }, opts));
	
		      ast = _babelTraverse2["default"].removeProperties(ast);
	
		      _babelTraverse2["default"].cheap(ast, function (node) {
		        node[FROM_TEMPLATE] = true;
		      });
		    } catch (err) {
		      err.stack = err.stack + "from\n" + stack;
		      throw err;
		    }
	
		    _getAst = function () {
		      return ast;
		    };
	
		    return ast;
		  };
	
		  return function () {
		    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
		      args[_key] = arguments[_key];
		    }
	
		    return useTemplate(_getAst(), args);
		  };
		};
	
		function useTemplate(ast, nodes) {
		  ast = _lodashLangCloneDeep2["default"](ast);
		  var _ast = ast;
		  var program = _ast.program;
	
		  if (nodes.length) {
		    _babelTraverse2["default"](ast, templateVisitor, null, nodes);
		  }
	
		  if (program.body.length > 1) {
		    return program.body;
		  } else {
		    return program.body[0];
		  }
		}
	
		var templateVisitor = {
		  // 360
		  noScope: true,
	
		  enter: function enter(path, args) {
		    var node = path.node;
	
		    if (node[TEMPLATE_SKIP]) return path.skip();
	
		    if (t.isExpressionStatement(node)) {
		      node = node.expression;
		    }
	
		    var replacement = undefined;
	
		    if (t.isIdentifier(node) && node[FROM_TEMPLATE]) {
		      if (_lodashObjectHas2["default"](args[0], node.name)) {
		        replacement = args[0][node.name];
		      } else if (node.name[0] === "$") {
		        var i = +node.name.slice(1);
		        if (args[i]) replacement = args[i];
		      }
		    }
	
		    if (replacement === null) {
		      path.remove();
		    }
	
		    if (replacement) {
		      replacement[TEMPLATE_SKIP] = true;
		      path.replaceInline(replacement);
		    }
		  },
	
		  exit: function exit(_ref) {
		    var node = _ref.node;
	
		    if (!node.loc) _babelTraverse2["default"].clearNode(node);
		  }
		};
		module.exports = exports["default"];
	
	/***/ },
	/* 10 */
	/*!**************************************************!*\
	  !*** ./~/babel-runtime/core-js/object/create.js ***!
	  \**************************************************/
	/***/ function(module, exports, __webpack_require__) {
	
		module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/create */ 414), __esModule: true };
	
	/***/ },
	/* 11 */
	/*!*************************************************!*\
	  !*** ./~/babel-core/~/babel-types/lib/index.js ***!
	  \*************************************************/
	[548, 261, 23, 265, 108, 147, 266, 256, 264],
	/* 12 */
	/*!*********************************************!*\
	  !*** ./~/core-js/library/modules/$.core.js ***!
	  \*********************************************/
	/***/ function(module, exports) {
	
		var core = module.exports = {version: '1.2.6'};
		if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
	
	/***/ },
	/* 13 */
	/*!**********************************!*\
	  !*** ./~/lodash/lang/isArray.js ***!
	  \**********************************/
	/***/ function(module, exports, __webpack_require__) {
	
		var getNative = __webpack_require__(/*! ../internal/getNative */ 100),
		    isLength = __webpack_require__(/*! ../internal/isLength */ 32),
		    isObjectLike = __webpack_require__(/*! ../internal/isObjectLike */ 17);
	
		/** `Object#toString` result references. */
		var arrayTag = '[object Array]';
	
		/** Used for native method references. */
		var objectProto = Object.prototype;
	
		/**
		 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
		 * of values.
		 */
		var objToString = objectProto.toString;
	
		/* Native method references for those with the same name as other `lodash` methods. */
		var nativeIsArray = getNative(Array, 'isArray');
	
		/**
		 * Checks if `value` is classified as an `Array` object.
		 *
		 * @static
		 * @memberOf _
		 * @category Lang
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
		 * @example
		 *
		 * _.isArray([1, 2, 3]);
		 * // => true
		 *
		 * _.isArray(function() { return arguments; }());
		 * // => false
		 */
		var isArray = nativeIsArray || function(value) {
		  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
		};
	
		module.exports = isArray;
	
	
	/***/ },
	/* 14 */
	/*!************************************************!*\
	  !*** ./~/babel-runtime/core-js/object/keys.js ***!
	  \************************************************/
	/***/ function(module, exports, __webpack_require__) {
	
		module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/keys */ 419), __esModule: true };
	
	/***/ },
	/* 15 */
	/*!***********************************!*\
	  !*** ./~/lodash/lang/isObject.js ***!
	  \***********************************/
	/***/ function(module, exports) {
	
		/**
		 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
		 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
		 *
		 * @static
		 * @memberOf _
		 * @category Lang
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
		 * @example
		 *
		 * _.isObject({});
		 * // => true
		 *
		 * _.isObject([1, 2, 3]);
		 * // => true
		 *
		 * _.isObject(1);
		 * // => false
		 */
		function isObject(value) {
		  // Avoid a V8 JIT bug in Chrome 19-20.
		  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
		  var type = typeof value;
		  return !!value && (type == 'object' || type == 'function');
		}
	
		module.exports = isObject;
	
	
	/***/ },
	/* 16 */
	/*!*******************************************!*\
	  !*** ./~/babel-runtime/core-js/symbol.js ***!
	  \*******************************************/
	/***/ function(module, exports, __webpack_require__) {
	
		module.exports = { "default": __webpack_require__(/*! core-js/library/fn/symbol */ 422), __esModule: true };
	
	/***/ },
	/* 17 */
	/*!*******************************************!*\
	  !*** ./~/lodash/internal/isObjectLike.js ***!
	  \*******************************************/
	/***/ function(module, exports) {
	
		/**
		 * Checks if `value` is object-like.
		 *
		 * @private
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
		 */
		function isObjectLike(value) {
		  return !!value && typeof value == 'object';
		}
	
		module.exports = isObjectLike;
	
	
	/***/ },
	/* 18 */
	/*!******************************!*\
	  !*** ./~/process/browser.js ***!
	  \******************************/
	/***/ function(module, exports) {
	
		// shim for using process in browser
	
		var process = module.exports = {};
		var queue = [];
		var draining = false;
		var currentQueue;
		var queueIndex = -1;
	
		function cleanUpNextTick() {
		    draining = false;
		    if (currentQueue.length) {
		        queue = currentQueue.concat(queue);
		    } else {
		        queueIndex = -1;
		    }
		    if (queue.length) {
		        drainQueue();
		    }
		}
	
		function drainQueue() {
		    if (draining) {
		        return;
		    }
		    var timeout = setTimeout(cleanUpNextTick);
		    draining = true;
	
		    var len = queue.length;
		    while(len) {
		        currentQueue = queue;
		        queue = [];
		        while (++queueIndex < len) {
		            if (currentQueue) {
		                currentQueue[queueIndex].run();
		            }
		        }
		        queueIndex = -1;
		        len = queue.length;
		    }
		    currentQueue = null;
		    draining = false;
		    clearTimeout(timeout);
		}
	
		process.nextTick = function (fun) {
		    var args = new Array(arguments.length - 1);
		    if (arguments.length > 1) {
		        for (var i = 1; i < arguments.length; i++) {
		            args[i - 1] = arguments[i];
		        }
		    }
		    queue.push(new Item(fun, args));
		    if (queue.length === 1 && !draining) {
		        setTimeout(drainQueue, 0);
		    }
		};
	
		// v8 likes predictible objects
		function Item(fun, array) {
		    this.fun = fun;
		    this.array = array;
		}
		Item.prototype.run = function () {
		    this.fun.apply(null, this.array);
		};
		process.title = 'browser';
		process.browser = true;
		process.env = {};
		process.argv = [];
		process.version = ''; // empty string to avoid regexp issues
		process.versions = {};
	
		function noop() {}
	
		process.on = noop;
		process.addListener = noop;
		process.once = noop;
		process.off = noop;
		process.removeListener = noop;
		process.removeAllListeners = noop;
		process.emit = noop;
	
		process.binding = function (name) {
		    throw new Error('process.binding is not supported');
		};
	
		process.cwd = function () { return '/' };
		process.chdir = function (dir) {
		    throw new Error('process.chdir is not supported');
		};
		process.umask = function() { return 0; };
	
	
	/***/ },
	/* 19 */
	/*!***************************************!*\
	  !*** ./~/babel-messages/lib/index.js ***!
	  \***************************************/
	/***/ function(module, exports, __webpack_require__) {
	
		/* eslint max-len: 0 */
	
		"use strict";
	
		var _interopRequireWildcard = __webpack_require__(/*! babel-runtime/helpers/interop-require-wildcard */ 2)["default"];
	
		exports.__esModule = true;
		exports.get = get;
		exports.parseArgs = parseArgs;
	
		var _util = __webpack_require__(/*! util */ 70);
	
		var util = _interopRequireWildcard(_util);
	
		/**
		 * Mapping of messages to be used in Babel.
		 * Messages can include $0-style placeholders.
		 */
	
		var MESSAGES = {
		  tailCallReassignmentDeopt: "Function reference has been reassigned, so it will probably be dereferenced, therefore we can't optimise this with confidence",
		  classesIllegalBareSuper: "Illegal use of bare super",
		  classesIllegalSuperCall: "Direct super call is illegal in non-constructor, use super.$1() instead",
		  scopeDuplicateDeclaration: "Duplicate declaration $1",
		  settersNoRest: "Setters aren't allowed to have a rest",
		  noAssignmentsInForHead: "No assignments allowed in for-in/of head",
		  expectedMemberExpressionOrIdentifier: "Expected type MemberExpression or Identifier",
		  invalidParentForThisNode: "We don't know how to handle this node within the current parent - please open an issue",
		  readOnly: "$1 is read-only",
		  unknownForHead: "Unknown node type $1 in ForStatement",
		  didYouMean: "Did you mean $1?",
		  codeGeneratorDeopt: "Note: The code generator has deoptimised the styling of $1 as it exceeds the max of $2.",
		  missingTemplatesDirectory: "no templates directory - this is most likely the result of a broken `npm publish`. Please report to https://github.com/babel/babel/issues",
		  unsupportedOutputType: "Unsupported output type $1",
		  illegalMethodName: "Illegal method name $1",
		  lostTrackNodePath: "We lost track of this node's position, likely because the AST was directly manipulated",
	
		  modulesIllegalExportName: "Illegal export $1",
		  modulesDuplicateDeclarations: "Duplicate module declarations with the same source but in different scopes",
	
		  undeclaredVariable: "Reference to undeclared variable $1",
		  undeclaredVariableType: "Referencing a type alias outside of a type annotation",
		  undeclaredVariableSuggestion: "Reference to undeclared variable $1 - did you mean $2?",
	
		  traverseNeedsParent: "You must pass a scope and parentPath unless traversing a Program/File. Instead of that you tried to traverse a $1 node without passing scope and parentPath.",
		  traverseVerifyRootFunction: "You passed `traverse()` a function when it expected a visitor object, are you sure you didn't mean `{ enter: Function }`?",
		  traverseVerifyVisitorProperty: "You passed `traverse()` a visitor object with the property $1 that has the invalid property $2",
		  traverseVerifyNodeType: "You gave us a visitor for the node type $1 but it's not a valid type",
	
		  pluginNotObject: "Plugin $2 specified in $1 was expected to return an object when invoked but returned $3",
		  pluginNotFunction: "Plugin $2 specified in $1 was expected to return a function but returned $3",
		  pluginUnknown: "Unknown plugin $1 specified in $2 at $3, attempted to resolve relative to $4",
		  pluginInvalidProperty: "Plugin $2 specified in $1 provided an invalid property of $3"
		};
	
		exports.MESSAGES = MESSAGES;
		/**
		 * Get a message with $0 placeholders replaced by arguments.
		 */
	
		function get(key) {
		  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		    args[_key - 1] = arguments[_key];
		  }
	
		  var msg = MESSAGES[key];
		  if (!msg) throw new ReferenceError("Unknown message " + JSON.stringify(key));
	
		  // stringify args
		  args = parseArgs(args);
	
		  // replace $0 placeholders with args
		  return msg.replace(/\$(\d+)/g, function (str, i) {
		    return args[i - 1];
		  });
		}
	
		/**
		 * Stingify arguments to be used inside messages.
		 */
	
		function parseArgs(args) {
		  return args.map(function (val) {
		    if (val != null && val.inspect) {
		      return val.inspect();
		    } else {
		      try {
		        return JSON.stringify(val) || val + "";
		      } catch (e) {
		        return util.inspect(val);
		      }
		    }
		  });
		}
	
	/***/ },
	/* 20 */
	/*!****************************************************************************!*\
	  !*** ./~/babel-plugin-transform-es2015-classes/~/babel-types/lib/index.js ***!
	  \****************************************************************************/
	[548, 312, 25, 316, 113, 175, 317, 307, 315],
	/* 21 */
	/*!********************************************!*\
	  !*** ./~/core-js/library/modules/$.wks.js ***!
	  \********************************************/
	/***/ function(module, exports, __webpack_require__) {
	
		var store  = __webpack_require__(/*! ./$.shared */ 203)('wks')
		  , uid    = __webpack_require__(/*! ./$.uid */ 98)
		  , Symbol = __webpack_require__(/*! ./$.global */ 59).Symbol;
		module.exports = function(name){
		  return store[name] || (store[name] =
		    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
		};
	
	/***/ },
	/* 22 */
	/*!************************************!*\
	  !*** ./~/path-browserify/index.js ***!
	  \************************************/
	/***/ function(module, exports, __webpack_require__) {
	
		/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
		//
		// Permission is hereby granted, free of charge, to any person obtaining a
		// copy of this software and associated documentation files (the
		// "Software"), to deal in the Software without restriction, including
		// without limitation the rights to use, copy, modify, merge, publish,
		// distribute, sublicense, and/or sell copies of the Software, and to permit
		// persons to whom the Software is furnished to do so, subject to the
		// following conditions:
		//
		// The above copyright notice and this permission notice shall be included
		// in all copies or substantial portions of the Software.
		//
		// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
		// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
		// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
		// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
		// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
		// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
		// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
		// resolves . and .. elements in a path array with directory names there
		// must be no slashes, empty elements, or device names (c:\) in the array
		// (so also no leading and trailing slashes - it does not distinguish
		// relative and absolute paths)
		function normalizeArray(parts, allowAboveRoot) {
		  // if the path tries to go above the root, `up` ends up > 0
		  var up = 0;
		  for (var i = parts.length - 1; i >= 0; i--) {
		    var last = parts[i];
		    if (last === '.') {
		      parts.splice(i, 1);
		    } else if (last === '..') {
		      parts.splice(i, 1);
		      up++;
		    } else if (up) {
		      parts.splice(i, 1);
		      up--;
		    }
		  }
	
		  // if the path is allowed to go above the root, restore leading ..s
		  if (allowAboveRoot) {
		    for (; up--; up) {
		      parts.unshift('..');
		    }
		  }
	
		  return parts;
		}
	
		// Split a filename into [root, dir, basename, ext], unix version
		// 'root' is just a slash, or nothing.
		var splitPathRe =
		    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
		var splitPath = function(filename) {
		  return splitPathRe.exec(filename).slice(1);
		};
	
		// path.resolve([from ...], to)
		// posix version
		exports.resolve = function() {
		  var resolvedPath = '',
		      resolvedAbsolute = false;
	
		  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
		    var path = (i >= 0) ? arguments[i] : process.cwd();
	
		    // Skip empty and invalid entries
		    if (typeof path !== 'string') {
		      throw new TypeError('Arguments to path.resolve must be strings');
		    } else if (!path) {
		      continue;
		    }
	
		    resolvedPath = path + '/' + resolvedPath;
		    resolvedAbsolute = path.charAt(0) === '/';
		  }
	
		  // At this point the path should be resolved to a full absolute path, but
		  // handle relative paths to be safe (might happen when process.cwd() fails)
	
		  // Normalize the path
		  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
		    return !!p;
		  }), !resolvedAbsolute).join('/');
	
		  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
		};
	
		// path.normalize(path)
		// posix version
		exports.normalize = function(path) {
		  var isAbsolute = exports.isAbsolute(path),
		      trailingSlash = substr(path, -1) === '/';
	
		  // Normalize the path
		  path = normalizeArray(filter(path.split('/'), function(p) {
		    return !!p;
		  }), !isAbsolute).join('/');
	
		  if (!path && !isAbsolute) {
		    path = '.';
		  }
		  if (path && trailingSlash) {
		    path += '/';
		  }
	
		  return (isAbsolute ? '/' : '') + path;
		};
	
		// posix version
		exports.isAbsolute = function(path) {
		  return path.charAt(0) === '/';
		};
	
		// posix version
		exports.join = function() {
		  var paths = Array.prototype.slice.call(arguments, 0);
		  return exports.normalize(filter(paths, function(p, index) {
		    if (typeof p !== 'string') {
		      throw new TypeError('Arguments to path.join must be strings');
		    }
		    return p;
		  }).join('/'));
		};
	
	
		// path.relative(from, to)
		// posix version
		exports.relative = function(from, to) {
		  from = exports.resolve(from).substr(1);
		  to = exports.resolve(to).substr(1);
	
		  function trim(arr) {
		    var start = 0;
		    for (; start < arr.length; start++) {
		      if (arr[start] !== '') break;
		    }
	
		    var end = arr.length - 1;
		    for (; end >= 0; end--) {
		      if (arr[end] !== '') break;
		    }
	
		    if (start > end) return [];
		    return arr.slice(start, end - start + 1);
		  }
	
		  var fromParts = trim(from.split('/'));
		  var toParts = trim(to.split('/'));
	
		  var length = Math.min(fromParts.length, toParts.length);
		  var samePartsLength = length;
		  for (var i = 0; i < length; i++) {
		    if (fromParts[i] !== toParts[i]) {
		      samePartsLength = i;
		      break;
		    }
		  }
	
		  var outputParts = [];
		  for (var i = samePartsLength; i < fromParts.length; i++) {
		    outputParts.push('..');
		  }
	
		  outputParts = outputParts.concat(toParts.slice(samePartsLength));
	
		  return outputParts.join('/');
		};
	
		exports.sep = '/';
		exports.delimiter = ':';
	
		exports.dirname = function(path) {
		  var result = splitPath(path),
		      root = result[0],
		      dir = result[1];
	
		  if (!root && !dir) {
		    // No dirname whatsoever
		    return '.';
		  }
	
		  if (dir) {
		    // It has a dirname, strip trailing slash
		    dir = dir.substr(0, dir.length - 1);
		  }
	
		  return root + dir;
		};
	
	
		exports.basename = function(path, ext) {
		  var f = splitPath(path)[2];
		  // TODO: make this comparison case-insensitive on windows?
		  if (ext && f.substr(-1 * ext.length) === ext) {
		    f = f.substr(0, f.length - ext.length);
		  }
		  return f;
		};
	
	
		exports.extname = function(path) {
		  return splitPath(path)[3];
		};
	
		function filter (xs, f) {
		    if (xs.filter) return xs.filter(f);
		    var res = [];
		    for (var i = 0; i < xs.length; i++) {
		        if (f(xs[i], i, xs)) res.push(xs[i]);
		    }
		    return res;
		}
	
		// String.prototype.substr - negative index don't work in IE8
		var substr = 'ab'.substr(-1) === 'b'
		    ? function (str, start, len) { return str.substr(start, len) }
		    : function (str, start, len) {
		        if (start < 0) start = str.length + start;
		        return str.substr(start, len);
		    }
		;
	
		/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./~/process/browser.js */ 18)))
	
	/***/ },
	/* 23 */
	/*!*************************************************************!*\
	  !*** ./~/babel-core/~/babel-types/lib/definitions/index.js ***!
	  \*************************************************************/
	[543, 11],
	/* 24 */
	/*!******************************************************************!*\
	  !*** ./~/babel-generator/~/babel-types/lib/definitions/index.js ***!
	  \******************************************************************/
	[543, 8],
	/* 25 */
	/*!****************************************************************************************!*\
	  !*** ./~/babel-plugin-transform-es2015-classes/~/babel-types/lib/definitions/index.js ***!
	  \****************************************************************************************/
	[543, 20],
	/* 26 */
	/*!*************************************************************************************************!*\
	  !*** ./~/babel-plugin-transform-es2015-modules-commonjs/~/babel-types/lib/definitions/index.js ***!
	  \*************************************************************************************************/
	[543, 27],
	/* 27 */
	/*!*************************************************************************************!*\
	  !*** ./~/babel-plugin-transform-es2015-modules-commonjs/~/babel-types/lib/index.js ***!
	  \*************************************************************************************/
	[548, 325, 26, 329, 115, 177, 330, 320, 328],
	/* 28 */
	/*!************************************************!*\
	  !*** ./~/babel-types/lib/definitions/index.js ***!
	  \************************************************/
	[543, 3],
	/* 29 */
	/*!***********************************************!*\
	  !*** ./~/core-js/library/modules/$.export.js ***!
	  \***********************************************/
	/***/ function(module, exports, __webpack_require__) {
	
		var global    = __webpack_require__(/*! ./$.global */ 59)
		  , core      = __webpack_require__(/*! ./$.core */ 12)
		  , ctx       = __webpack_require__(/*! ./$.ctx */ 56)
		  , PROTOTYPE = 'prototype';
	
		var $export = function(type, name, source){
		  var IS_FORCED = type & $export.F
		    , IS_GLOBAL = type & $export.G
		    , IS_STATIC = type & $export.S
		    , IS_PROTO  = type & $export.P
		    , IS_BIND   = type & $export.B
		    , IS_WRAP   = type & $export.W
		    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
		    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
		    , key, own, out;
		  if(IS_GLOBAL)source = name;
		  for(key in source){
		    // contains in native
		    own = !IS_FORCED && target && key in target;
		    if(own && key in exports)continue;
		    // export native or passed
		    out = own ? target[key] : source[key];
		    // prevent global pollution for namespaces
		    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
		    // bind timers to global for call from export context
		    : IS_BIND && own ? ctx(out, global)
		    // wrap global constructors for prevent change them in library
		    : IS_WRAP && target[key] == out ? (function(C){
		      var F = function(param){
		        return this instanceof C ? new C(param) : C(param);
		      };
		      F[PROTOTYPE] = C[PROTOTYPE];
		      return F;
		    // make static versions for prototype methods
		    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
		    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
		  }
		};
		// type bitmap
		$export.F = 1;  // forced
		$export.G = 2;  // global
		$export.S = 4;  // static
		$export.P = 8;  // proto
		$export.B = 16; // bind
		$export.W = 32; // wrap
		module.exports = $export;
	
	/***/ },
	/* 30 */
	/*!********************************!*\
	  !*** ./~/esutils/lib/utils.js ***!
	  \********************************/
	/***/ function(module, exports, __webpack_require__) {
	
		/*
		  Copyright (C) 2013 Yusuke Suzuki <utatane.tea@gmail.com>
	
		  Redistribution and use in source and binary forms, with or without
		  modification, are permitted provided that the following conditions are met:
	
		    * Redistributions of source code must retain the above copyright
		      notice, this list of conditions and the following disclaimer.
		    * Redistributions in binary form must reproduce the above copyright
		      notice, this list of conditions and the following disclaimer in the
		      documentation and/or other materials provided with the distribution.
	
		  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
		  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
		  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
		  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
		  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
		  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
		  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
		  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
		  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
		  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
		*/
	
	
		(function () {
		    'use strict';
	
		    exports.ast = __webpack_require__(/*! ./ast */ 455);
		    exports.code = __webpack_require__(/*! ./code */ 209);
		    exports.keyword = __webpack_require__(/*! ./keyword */ 456);
		}());
		/* vim: set sw=4 ts=4 et tw=80 : */
	
	
	/***/ },
	/* 31 */
	/*!*************************************!*\
	  !*** ./~/lodash/collection/each.js ***!
	  \*************************************/
	/***/ function(module, exports, __webpack_require__) {
	
		module.exports = __webpack_require__(/*! ./forEach */ 469);
	
	
	/***/ },
	/* 32 */
	/*!***************************************!*\
	  !*** ./~/lodash/internal/isLength.js ***!
	  \***************************************/
	/***/ function(module, exports) {
	
		/**
		 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
		 * of an array-like value.
		 */
		var MAX_SAFE_INTEGER = 9007199254740991;
	
		/**
		 * Checks if `value` is a valid array-like length.
		 *
		 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
		 *
		 * @private
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
		 */
		function isLength(value) {
		  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
		}
	
		module.exports = isLength;
	
	
	/***/ },
	/* 33 */
	/*!***************************************!*\
	  !*** ./~/lodash/internal/toObject.js ***!
	  \***************************************/
	/***/ function(module, exports, __webpack_require__) {
	
		var isObject = __webpack_require__(/*! ../lang/isObject */ 15);
	
		/**
		 * Converts `value` to an object if it's not one.
		 *
		 * @private
		 * @param {*} value The value to process.
		 * @returns {Object} Returns the object.
		 */
		function toObject(value) {
		  return isObject(value) ? value : Object(value);
		}
	
		module.exports = toObject;
	
	
	/***/ },
	/* 34 */
	/*!********************************!*\
	  !*** ./~/lodash/lang/clone.js ***!
	  \********************************/
	/***/ function(module, exports, __webpack_require__) {
	
		var baseClone = __webpack_require__(/*! ../internal/baseClone */ 217),
		    bindCallback = __webpack_require__(/*! ../internal/bindCallback */ 64),
		    isIterateeCall = __webpack_require__(/*! ../internal/isIterateeCall */ 65);
	
		/**
		 * Creates a clone of `value`. If `isDeep` is `true` nested objects are cloned,
		 * otherwise they are assigned by reference. If `customizer` is provided it's
		 * invoked to produce the cloned values. If `customizer` returns `undefined`
		 * cloning is handled by the method instead. The `customizer` is bound to
		 * `thisArg` and invoked with up to three argument; (value [, index|key, object]).
		 *
		 * **Note:** This method is loosely based on the
		 * [structured clone algorithm](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm).
		 * The enumerable properties of `arguments` objects and objects created by
		 * constructors other than `Object` are cloned to plain `Object` objects. An
		 * empty object is returned for uncloneable values such as functions, DOM nodes,
		 * Maps, Sets, and WeakMaps.
		 *
		 * @static
		 * @memberOf _
		 * @category Lang
		 * @param {*} value The value to clone.
		 * @param {boolean} [isDeep] Specify a deep clone.
		 * @param {Function} [customizer] The function to customize cloning values.
		 * @param {*} [thisArg] The `this` binding of `customizer`.
		 * @returns {*} Returns the cloned value.
		 * @example
		 *
		 * var users = [
		 *   { 'user': 'barney' },
		 *   { 'user': 'fred' }
		 * ];
		 *
		 * var shallow = _.clone(users);
		 * shallow[0] === users[0];
		 * // => true
		 *
		 * var deep = _.clone(users, true);
		 * deep[0] === users[0];
		 * // => false
		 *
		 * // using a customizer callback
		 * var el = _.clone(document.body, function(value) {
		 *   if (_.isElement(value)) {
		 *     return value.cloneNode(false);
		 *   }
		 * });
		 *
		 * el === document.body
		 * // => false
		 * el.nodeName
		 * // => BODY
		 * el.childNodes.length;
		 * // => 0
		 */
		function clone(value, isDeep, customizer, thisArg) {
		  if (isDeep && typeof isDeep != 'boolean' && isIterateeCall(value, isDeep, customizer)) {
		    isDeep = false;
		  }
		  else if (typeof isDeep == 'function') {
		    thisArg = customizer;
		    customizer = isDeep;
		    isDeep = false;
		  }
		  return typeof customizer == 'function'
		    ? baseClone(value, isDeep, bindCallback(customizer, thisArg, 3))
		    : baseClone(value, isDeep);
		}
	
		module.exports = clone;
	
	
	/***/ },
	/* 35 */
	/*!*********************************************!*\
	  !*** ./~/babel-runtime/helpers/inherits.js ***!
	  \*********************************************/
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
	
		var _Object$create = __webpack_require__(/*! babel-runtime/core-js/object/create */ 10)["default"];
	
		var _Object$setPrototypeOf = __webpack_require__(/*! babel-runtime/core-js/object/set-prototype-of */ 372)["default"];
	
		exports["default"] = function (subClass, superClass) {
		  if (typeof superClass !== "function" && superClass !== null) {
		    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
		  }
	
		  subClass.prototype = _Object$create(superClass && superClass.prototype, {
		    constructor: {
		      value: subClass,
		      enumerable: false,
		      writable: true,
		      configurable: true
		    }
		  });
		  if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
		};
	
		exports.__esModule = true;
	
	/***/ },
	/* 36 */
	/*!********************************************!*\
	  !*** ./~/babel-traverse/lib/path/index.js ***!
	  \********************************************/
	/***/ function(module, exports, __webpack_require__) {
	
		/* eslint max-len: 0 */
	
		"use strict";
	
		var _classCallCheck = __webpack_require__(/*! babel-runtime/helpers/class-call-check */ 5)["default"];
	
		var _interopRequireWildcard = __webpack_require__(/*! babel-runtime/helpers/interop-require-wildcard */ 2)["default"];
	
		var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 1)["default"];
	
		exports.__esModule = true;
	
		var _libVirtualTypes = __webpack_require__(/*! ./lib/virtual-types */ 192);
	
		var virtualTypes = _interopRequireWildcard(_libVirtualTypes);
	
		var _debug2 = __webpack_require__(/*! debug */ 451);
	
		var _debug3 = _interopRequireDefault(_debug2);
	
		var _invariant = __webpack_require__(/*! invariant */ 461);
	
		var _invariant2 = _interopRequireDefault(_invariant);
	
		var _index = __webpack_require__(/*! ../index */ 6);
	
		var _index2 = _interopRequireDefault(_index);
	
		var _lodashObjectAssign = __webpack_require__(/*! lodash/object/assign */ 67);
	
		var _lodashObjectAssign2 = _interopRequireDefault(_lodashObjectAssign);
	
		var _scope = __webpack_require__(/*! ../scope */ 119);
	
		var _scope2 = _interopRequireDefault(_scope);
	
		var _babelTypes = __webpack_require__(/*! babel-types */ 3);
	
		var t = _interopRequireWildcard(_babelTypes);
	
		var _cache = __webpack_require__(/*! ../cache */ 93);
	
		var _debug = _debug3["default"]("babel");
	
		var NodePath = (function () {
		  function NodePath(hub, parent) {
		    _classCallCheck(this, NodePath);
	
		    this.parent = parent;
		    this.hub = hub;
		    this.contexts = [];
		    this.data = {};
		    this.shouldSkip = false;
		    this.shouldStop = false;
		    this.removed = false;
		    this.state = null;
		    this.opts = null;
		    this.skipKeys = null;
		    this.parentPath = null;
		    this.context = null;
		    this.container = null;
		    this.listKey = null;
		    this.inList = false;
		    this.parentKey = null;
		    this.key = null;
		    this.node = null;
		    this.scope = null;
		    this.type = null;
		    this.typeAnnotation = null;
		  }
	
		  NodePath.get = function get(_ref) {
		    var hub = _ref.hub;
		    var parentPath = _ref.parentPath;
		    var parent = _ref.parent;
		    var container = _ref.container;
		    var listKey = _ref.listKey;
		    var key = _ref.key;
	
		    if (!hub && parentPath) {
		      hub = parentPath.hub;
		    }
	
		    _invariant2["default"](parent, "To get a node path the parent needs to exist");
	
		    var targetNode = container[key];
	
		    var paths = _cache.path.get(parent) || [];
		    if (!_cache.path.has(parent)) {
		      _cache.path.set(parent, paths);
		    }
	
		    var path = undefined;
	
		    for (var i = 0; i < paths.length; i++) {
		      var pathCheck = paths[i];
		      if (pathCheck.node === targetNode) {
		        path = pathCheck;
		        break;
		      }
		    }
	
		    if (!path) {
		      path = new NodePath(hub, parent);
		      paths.push(path);
		    }
	
		    path.setup(parentPath, container, listKey, key);
	
		    return path;
		  };
	
		  NodePath.prototype.getScope = function getScope(scope) {
		    var ourScope = scope;
	
		    // we're entering a new scope so let's construct it!
		    if (this.isScope()) {
		      ourScope = new _scope2["default"](this, scope);
		    }
	
		    return ourScope;
		  };
	
		  NodePath.prototype.setData = function setData(key, val) {
		    return this.data[key] = val;
		  };
	
		  NodePath.prototype.getData = function getData(key, def) {
		    var val = this.data[key];
		    if (!val && def) val = this.data[key] = def;
		    return val;
		  };
	
		  NodePath.prototype.buildCodeFrameError = function buildCodeFrameError(msg) {
		    var Error = arguments.length <= 1 || arguments[1] === undefined ? SyntaxError : arguments[1];
	
		    return this.hub.file.buildCodeFrameError(this.node, msg, Error);
		  };
	
		  NodePath.prototype.traverse = function traverse(visitor, state) {
		    _index2["default"](this.node, visitor, this.scope, state, this);
		  };
	
		  NodePath.prototype.mark = function mark(type, message) {
		    this.hub.file.metadata.marked.push({
		      type: type,
		      message: message,
		      loc: this.node.loc
		    });
		  };
	
		  NodePath.prototype.set = function set(key, node) {
		    t.validate(this.node, key, node);
		    this.node[key] = node;
		  };
	
		  NodePath.prototype.getPathLocation = function getPathLocation() {
		    var parts = [];
		    var path = this;
		    do {
		      var key = path.key;
		      if (path.inList) key = path.listKey + "[" + key + "]";
		      parts.unshift(key);
		    } while (path = path.parentPath);
		    return parts.join(".");
		  };
	
		  NodePath.prototype.debug = function debug(buildMessage) {
		    if (!_debug.enabled) return;
		    _debug(this.getPathLocation() + " " + this.type + ": " + buildMessage());
		  };
	
		  return NodePath;
		})();
	
		exports["default"] = NodePath;
	
		_lodashObjectAssign2["default"](NodePath.prototype, __webpack_require__(/*! ./ancestry */ 376));
		_lodashObjectAssign2["default"](NodePath.prototype, __webpack_require__(/*! ./inference */ 382));
		_lodashObjectAssign2["default"](NodePath.prototype, __webpack_require__(/*! ./replacement */ 390));
		_lodashObjectAssign2["default"](NodePath.prototype, __webpack_require__(/*! ./evaluation */ 380));
		_lodashObjectAssign2["default"](NodePath.prototype, __webpack_require__(/*! ./conversion */ 379));
		_lodashObjectAssign2["default"](NodePath.prototype, __webpack_require__(/*! ./introspection */ 385));
		_lodashObjectAssign2["default"](NodePath.prototype, __webpack_require__(/*! ./context */ 378));
		_lodashObjectAssign2["default"](NodePath.prototype, __webpack_require__(/*! ./removal */ 389));
		_lodashObjectAssign2["default"](NodePath.prototype, __webpack_require__(/*! ./modification */ 388));
		_lodashObjectAssign2["default"](NodePath.prototype, __webpack_require__(/*! ./family */ 381));
		_lodashObjectAssign2["default"](NodePath.prototype, __webpack_require__(/*! ./comments */ 377));
	
		var _arr = t.TYPES;
	
		var _loop = function () {
		  var type = _arr[_i];
		  var typeKey = "is" + type;
		  NodePath.prototype[typeKey] = function (opts) {
		    return t[typeKey](this.node, opts);
		  };
	
		  NodePath.prototype["assert" + type] = function (opts) {
		    if (!this[typeKey](opts)) {
		      throw new TypeError("Expected node path of type " + type);
		    }
		  };
		};
	
		for (var _i = 0; _i < _arr.length; _i++) {
		  _loop();
		}
	
		var _loop2 = function (type) {
		  if (type[0] === "_") return "continue";
		  if (t.TYPES.indexOf(type) < 0) t.TYPES.push(type);
	
		  var virtualType = virtualTypes[type];
	
		  NodePath.prototype["is" + type] = function (opts) {
		    return virtualType.checkPath(this, opts);
		  };
		};
	
		for (var type in virtualTypes) {
		  var _ret2 = _loop2(type);
	
		  // istanbul ignore next
		  if (_ret2 === "continue") continue;
		}
		module.exports = exports["default"];
	
	/***/ },
	/* 37 */
	/*!**************************************************!*\
	  !*** ./~/core-js/library/modules/$.is-object.js ***!
	  \**************************************************/
	/***/ function(module, exports) {
	
		module.exports = function(it){
		  return typeof it === 'object' ? it !== null : typeof it === 'function';
		};
	
	/***/ },
	/* 38 */
	/*!***********************************!*\
	  !*** ./~/lodash/lang/isString.js ***!
	  \***********************************/
	/***/ function(module, exports, __webpack_require__) {
	
		var isObjectLike = __webpack_require__(/*! ../internal/isObjectLike */ 17);
	
		/** `Object#toString` result references. */
		var stringTag = '[object String]';
	
		/** Used for native method references. */
		var objectProto = Object.prototype;
	
		/**
		 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
		 * of values.
		 */
		var objToString = objectProto.toString;
	
		/**
		 * Checks if `value` is classified as a `String` primitive or object.
		 *
		 * @static
		 * @memberOf _
		 * @category Lang
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
		 * @example
		 *
		 * _.isString('abc');
		 * // => true
		 *
		 * _.isString(1);
		 * // => false
		 */
		function isString(value) {
		  return typeof value == 'string' || (isObjectLike(value) && objToString.call(value) == stringTag);
		}
	
		module.exports = isString;
	
	
	/***/ },
	/* 39 */
	/*!*********************************!*\
	  !*** ./~/lodash/object/keys.js ***!
	  \*********************************/
	/***/ function(module, exports, __webpack_require__) {
	
		var getNative = __webpack_require__(/*! ../internal/getNative */ 100),
		    isArrayLike = __webpack_require__(/*! ../internal/isArrayLike */ 44),
		    isObject = __webpack_require__(/*! ../lang/isObject */ 15),
		    shimKeys = __webpack_require__(/*! ../internal/shimKeys */ 507);
	
		/* Native method references for those with the same name as other `lodash` methods. */
		var nativeKeys = getNative(Object, 'keys');
	
		/**
		 * Creates an array of the own enumerable property names of `object`.
		 *
		 * **Note:** Non-object values are coerced to objects. See the
		 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
		 * for more details.
		 *
		 * @static
		 * @memberOf _
		 * @category Object
		 * @param {Object} object The object to query.
		 * @returns {Array} Returns the array of property names.
		 * @example
		 *
		 * function Foo() {
		 *   this.a = 1;
		 *   this.b = 2;
		 * }
		 *
		 * Foo.prototype.c = 3;
		 *
		 * _.keys(new Foo);
		 * // => ['a', 'b'] (iteration order is not guaranteed)
		 *
		 * _.keys('hi');
		 * // => ['0', '1']
		 */
		var keys = !nativeKeys ? shimKeys : function(object) {
		  var Ctor = object == null ? undefined : object.constructor;
		  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
		      (typeof object != 'function' && isArrayLike(object))) {
		    return shimKeys(object);
		  }
		  return isObject(object) ? nativeKeys(object) : [];
		};
	
		module.exports = keys;
	
	
	/***/ },
	/* 40 */
	/*!*******************************************!*\
	  !*** ./~/node-libs-browser/mock/empty.js ***!
	  \*******************************************/
	/***/ function(module, exports) {
	
		
	
	/***/ },
	/* 41 */
	/*!**************************************************!*\
	  !*** ./~/core-js/library/modules/$.an-object.js ***!
	  \**************************************************/
	/***/ function(module, exports, __webpack_require__) {
	
		var isObject = __webpack_require__(/*! ./$.is-object */ 37);
		module.exports = function(it){
		  if(!isObject(it))throw TypeError(it + ' is not an object!');
		  return it;
		};
	
	/***/ },
	/* 42 */
	/*!********************************************!*\
	  !*** ./~/core-js/library/modules/$.has.js ***!
	  \********************************************/
	/***/ function(module, exports) {
	
		var hasOwnProperty = {}.hasOwnProperty;
		module.exports = function(it, key){
		  return hasOwnProperty.call(it, key);
		};
	
	/***/ },
	/* 43 */
	/*!*********************************************!*\
	  !*** ./~/core-js/library/modules/$.hide.js ***!
	  \*********************************************/
	/***/ function(module, exports, __webpack_require__) {
	
		var $          = __webpack_require__(/*! ./$ */ 7)
		  , createDesc = __webpack_require__(/*! ./$.property-desc */ 126);
		module.exports = __webpack_require__(/*! ./$.descriptors */ 57) ? function(object, key, value){
		  return $.setDesc(object, key, createDesc(1, value));
		} : function(object, key, value){
		  object[key] = value;
		  return object;
		};
	
	/***/ },
	/* 44 */
	/*!******************************************!*\
	  !*** ./~/lodash/internal/isArrayLike.js ***!
	  \******************************************/
	/***/ function(module, exports, __webpack_require__) {
	
		var getLength = __webpack_require__(/*! ./getLength */ 138),
		    isLength = __webpack_require__(/*! ./isLength */ 32);
	
		/**
		 * Checks if `value` is array-like.
		 *
		 * @private
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
		 */
		function isArrayLike(value) {
		  return value != null && isLength(getLength(value));
		}
	
		module.exports = isArrayLike;
	
	
	/***/ },
	/* 45 */
	/*!***********************************!*\
	  !*** ./~/lodash/lang/isNumber.js ***!
	  \***********************************/
	/***/ function(module, exports, __webpack_require__) {
	
		var isObjectLike = __webpack_require__(/*! ../internal/isObjectLike */ 17);
	
		/** `Object#toString` result references. */
		var numberTag = '[object Number]';
	
		/** Used for native method references. */
		var objectProto = Object.prototype;
	
		/**
		 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
		 * of values.
		 */
		var objToString = objectProto.toString;
	
		/**
		 * Checks if `value` is classified as a `Number` primitive or object.
		 *
		 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are classified
		 * as numbers, use the `_.isFinite` method.
		 *
		 * @static
		 * @memberOf _
		 * @category Lang
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
		 * @example
		 *
		 * _.isNumber(8.4);
		 * // => true
		 *
		 * _.isNumber(NaN);
		 * // => true
		 *
		 * _.isNumber('8.4');
		 * // => false
		 */
		function isNumber(value) {
		  return typeof value == 'number' || (isObjectLike(value) && objToString.call(value) == numberTag);
		}
	
		module.exports = isNumber;
	
	
	/***/ },
	/* 46 */
	/*!****************************************!*\
	  !*** ./~/lodash/lang/isPlainObject.js ***!
	  \****************************************/
	/***/ function(module, exports, __webpack_require__) {
	
		var baseForIn = __webpack_require__(/*! ../internal/baseForIn */ 478),
		    isArguments = __webpack_require__(/*! ./isArguments */ 66),
		    isObjectLike = __webpack_require__(/*! ../internal/isObjectLike */ 17);
	
		/** `Object#toString` result references. */
		var objectTag = '[object Object]';
	
		/** Used for native method references. */
		var objectProto = Object.prototype;
	
		/** Used to check objects for own properties. */
		var hasOwnProperty = objectProto.hasOwnProperty;
	
		/**
		 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
		 * of values.
		 */
		var objToString = objectProto.toString;
	
		/**
		 * Checks if `value` is a plain object, that is, an object created by the
		 * `Object` constructor or one with a `[[Prototype]]` of `null`.
		 *
		 * **Note:** This method assumes objects created by the `Object` constructor
		 * have no inherited enumerable properties.
		 *
		 * @static
		 * @memberOf _
		 * @category Lang
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
		 * @example
		 *
		 * function Foo() {
		 *   this.a = 1;
		 * }
		 *
		 * _.isPlainObject(new Foo);
		 * // => false
		 *
		 * _.isPlainObject([1, 2, 3]);
		 * // => false
		 *
		 * _.isPlainObject({ 'x': 0, 'y': 0 });
		 * // => true
		 *
		 * _.isPlainObject(Object.create(null));
		 * // => true
		 */
		function isPlainObject(value) {
		  var Ctor;
	
		  // Exit early for non `Object` objects.
		  if (!(isObjectLike(value) && objToString.call(value) == objectTag && !isArguments(value)) ||
		      (!hasOwnProperty.call(value, 'constructor') && (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor)))) {
		    return false;
		  }
		  // IE < 9 iterates inherited properties before own properties. If the first
		  // iterated property is an object's own property then there are no inherited
		  // enumerable properties.
		  var result;
		  // In most environments an object's own properties are iterated before
		  // its inherited properties. If the last iterated property is an object's
		  // own property then there are no inherited enumerable properties.
		  baseForIn(value, function(subValue, key) {
		    result = key;
		  });
		  return result === undefined || hasOwnProperty.call(value, result);
		}
	
		module.exports = isPlainObject;
	
	
	/***/ },
	/* 47 */
	/*!***********************************!*\
	  !*** ./~/lodash/lang/isRegExp.js ***!
	  \***********************************/
	/***/ function(module, exports, __webpack_require__) {
	
		var isObject = __webpack_require__(/*! ./isObject */ 15);
	
		/** `Object#toString` result references. */
		var regexpTag = '[object RegExp]';
	
		/** Used for native method references. */
		var objectProto = Object.prototype;
	
		/**
		 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
		 * of values.
		 */
		var objToString = objectProto.toString;
	
		/**
		 * Checks if `value` is classified as a `RegExp` object.
		 *
		 * @static
		 * @memberOf _
		 * @category Lang
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
		 * @example
		 *
		 * _.isRegExp(/abc/);
		 * // => true
		 *
		 * _.isRegExp('/abc/');
		 * // => false
		 */
		function isRegExp(value) {
		  return isObject(value) && objToString.call(value) == regexpTag;
		}
	
		module.exports = isRegExp;
	
	
	/***/ },
	/* 48 */
	/*!******************************!*\
	  !*** ./~/repeating/index.js ***!
	  \******************************/
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		var isFinite = __webpack_require__(/*! is-finite */ 210);
	
		module.exports = function (str, n) {
			if (typeof str !== 'string') {
				throw new TypeError('Expected a string as the first argument');
			}
	
			if (n < 0 || !isFinite(n)) {
				throw new TypeError('Expected a finite positive number');
			}
	
			var ret = '';
	
			do {
				if (n & 1) {
					ret += str;
				}
	
				str += str;
			} while (n = n >> 1);
	
			return ret;
		};
	
	
	/***/ },
	/* 49 */
	/*!****************************************************************!*\
	  !*** ./~/babel-core/lib/transformation/file/options/config.js ***!
	  \****************************************************************/
	/***/ function(module, exports) {
	
		/* eslint max-len: 0 */
	
		"use strict";
	
		module.exports = {
		  filename: {
		    type: "filename",
		    description: "filename to use when reading from stdin - this will be used in source-maps, errors etc",
		    "default": "unknown",
		    shorthand: "f"
		  },
	
		  filenameRelative: {
		    hidden: true,
		    type: "string"
		  },
	
		  inputSourceMap: {
		    hidden: true
		  },
	
		  env: {
		    hidden: true,
		    "default": {}
		  },
	
		  mode: {
		    description: "",
		    hidden: true
		  },
	
		  retainLines: {
		    type: "boolean",
		    "default": false,
		    description: "retain line numbers - will result in really ugly code"
		  },
	
		  highlightCode: {
		    description: "enable/disable ANSI syntax highlighting of code frames (on by default)",
		    type: "boolean",
		    "default": true
		  },
	
		  suppressDeprecationMessages: {
		    type: "boolean",
		    "default": false,
		    hidden: true
		  },
	
		  presets: {
		    type: "list",
		    description: "",
		    "default": []
		  },
	
		  plugins: {
		    type: "list",
		    "default": [],
		    description: ""
		  },
	
		  ignore: {
		    type: "list",
		    description: "list of glob paths to **not** compile",
		    "default": []
		  },
	
		  only: {
		    type: "list",
		    description: "list of glob paths to **only** compile"
		  },
	
		  code: {
		    hidden: true,
		    "default": true,
		    type: "boolean"
		  },
	
		  metadata: {
		    hidden: true,
		    "default": true,
		    type: "boolean"
		  },
	
		  ast: {
		    hidden: true,
		    "default": true,
		    type: "boolean"
		  },
	
		  "extends": {
		    type: "string",
		    hidden: true
		  },
	
		  comments: {
		    type: "boolean",
		    "default": true,
		    description: "write comments to generated output (true by default)"
		  },
	
		  shouldPrintComment: {
		    hidden: true,
		    description: "optional callback to control whether a comment should be inserted, when this is used the comments option is ignored"
		  },
	
		  compact: {
		    type: "booleanString",
		    "default": "auto",
		    description: "do not include superfluous whitespace characters and line terminators [true|false|auto]"
		  },
	
		  minified: {
		    type: "boolean",
		    "default": false,
		    description: "save as much bytes when printing [true|false]"
		  },
	
		  sourceMap: {
		    alias: "sourceMaps",
		    hidden: true
		  },
	
		  sourceMaps: {
		    type: "booleanString",
		    description: "[true|false|inline]",
		    "default": false,
		    shorthand: "s"
		  },
	
		  sourceMapTarget: {
		    type: "string",
		    description: "set `file` on returned source map"
		  },
	
		  sourceFileName: {
		    type: "string",
		    description: "set `sources[0]` on returned source map"
		  },
	
		  sourceRoot: {
		    type: "filename",
		    description: "the root from which all sources are relative"
		  },
	
		  babelrc: {
		    description: "Whether or not to look up .babelrc and .babelignore files",
		    type: "boolean",
		    "default": true
		  },
	
		  sourceType: {
		    description: "",
		    "default": "module"
		  },
	
		  auxiliaryCommentBefore: {
		    type: "string",
		    description: "print a comment before any injected non-user code"
		  },
	
		  auxiliaryCommentAfter: {
		    type: "string",
		    description: "print a comment after any injected non-user code"
		  },
	
		  resolveModuleSource: {
		    hidden: true
		  },
	
		  getModuleId: {
		    hidden: true
		  },
	
		  moduleRoot: {
		    type: "filename",
		    description: "optional prefix for the AMD module formatter that will be prepend to the filename on module definitions"
		  },
	
		  moduleIds: {
		    type: "boolean",
		    "default": false,
		    shorthand: "M",
		    description: "insert an explicit id for modules"
		  },
	
		  moduleId: {
		    description: "specify a custom name for module ids",
		    type: "string"
		  },
	
		  passPerPreset: {
		    description: "Whether to spawn a traversal pass per a preset. By default all presets are merged.",
		    type: "boolean",
		    "default": false,
		    hidden: true
		  }
		};
	
	/***/ },
	/* 50 */
	/*!************************************************************************!*\
	  !*** ./~/babel-core/lib/transformation/file/options/option-manager.js ***!
	  \************************************************************************/
	/***/ function(module, exports, __webpack_require__) {
	
		/* WEBPACK VAR INJECTION */(function(process) {/* eslint max-len: 0 */
	
		"use strict";
	
		var _classCallCheck = __webpack_require__(/*! babel-runtime/helpers/class-call-check */ 5)["default"];
	
		var _Object$assign = __webpack_require__(/*! babel-runtime/core-js/object/assign */ 117)["default"];
	
		var _interopRequireWildcard = __webpack_require__(/*! babel-runtime/helpers/interop-require-wildcard */ 2)["default"];
	
		var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 1)["default"];
	
		exports.__esModule = true;
	
		var _apiNode = __webpack_require__(/*! ../../../api/node */ 145);
	
		var context = _interopRequireWildcard(_apiNode);
	
		var _plugin2 = __webpack_require__(/*! ../../plugin */ 72);
	
		var _plugin3 = _interopRequireDefault(_plugin2);
	
		var _babelMessages = __webpack_require__(/*! babel-messages */ 19);
	
		var messages = _interopRequireWildcard(_babelMessages);
	
		var _index = __webpack_require__(/*! ./index */ 104);
	
		var _helpersResolve = __webpack_require__(/*! ../../../helpers/resolve */ 247);
	
		var _helpersResolve2 = _interopRequireDefault(_helpersResolve);
	
		var _json5 = __webpack_require__(/*! json5 */ 466);
	
		var _json52 = _interopRequireDefault(_json5);
	
		var _pathIsAbsolute = __webpack_require__(/*! path-is-absolute */ 521);
	
		var _pathIsAbsolute2 = _interopRequireDefault(_pathIsAbsolute);
	
		var _pathExists = __webpack_require__(/*! path-exists */ 520);
	
		var _pathExists2 = _interopRequireDefault(_pathExists);
	
		var _lodashLangCloneDeep = __webpack_require__(/*! lodash/lang/cloneDeep */ 228);
	
		var _lodashLangCloneDeep2 = _interopRequireDefault(_lodashLangCloneDeep);
	
		var _lodashLangClone = __webpack_require__(/*! lodash/lang/clone */ 34);
	
		var _lodashLangClone2 = _interopRequireDefault(_lodashLangClone);
	
		var _helpersMerge = __webpack_require__(/*! ../../../helpers/merge */ 245);
	
		var _helpersMerge2 = _interopRequireDefault(_helpersMerge);
	
		var _config = __webpack_require__(/*! ./config */ 49);
	
		var _config2 = _interopRequireDefault(_config);
	
		var _removed = __webpack_require__(/*! ./removed */ 106);
	
		var _removed2 = _interopRequireDefault(_removed);
	
		var _path = __webpack_require__(/*! path */ 22);
	
		var _path2 = _interopRequireDefault(_path);
	
		var _fs = __webpack_require__(/*! fs */ 40);
	
		var _fs2 = _interopRequireDefault(_fs);
	
		var existsCache = {};
		var jsonCache = {};
	
		var BABELIGNORE_FILENAME = ".babelignore";
		var BABELRC_FILENAME = ".babelrc";
		var PACKAGE_FILENAME = "package.json";
	
		function exists(filename) {
		  var cached = existsCache[filename];
		  if (cached == null) {
		    return existsCache[filename] = _pathExists2["default"].sync(filename);
		  } else {
		    return cached;
		  }
		}
	
		var OptionManager = (function () {
		  function OptionManager(log) {
		    _classCallCheck(this, OptionManager);
	
		    this.resolvedConfigs = [];
		    this.options = OptionManager.createBareOptions();
		    this.log = log;
		  }
	
		  OptionManager.memoisePluginContainer = function memoisePluginContainer(fn, loc, i, alias) {
		    var _arr = OptionManager.memoisedPlugins;
	
		    for (var _i = 0; _i < _arr.length; _i++) {
		      var cache = _arr[_i];
		      if (cache.container === fn) return cache.plugin;
		    }
	
		    var obj = undefined;
	
		    if (typeof fn === "function") {
		      obj = fn(context);
		    } else {
		      obj = fn;
		    }
	
		    if (typeof obj === "object") {
		      var _plugin = new _plugin3["default"](obj, alias);
		      OptionManager.memoisedPlugins.push({
		        container: fn,
		        plugin: _plugin
		      });
		      return _plugin;
		    } else {
		      throw new TypeError(messages.get("pluginNotObject", loc, i, typeof obj) + loc + i);
		    }
		  };
	
		  OptionManager.createBareOptions = function createBareOptions() {
		    var opts = {};
	
		    for (var _key in _config2["default"]) {
		      var opt = _config2["default"][_key];
		      opts[_key] = _lodashLangClone2["default"](opt["default"]);
		    }
	
		    return opts;
		  };
	
		  OptionManager.normalisePlugin = function normalisePlugin(plugin, loc, i, alias) {
		    plugin = plugin.__esModule ? plugin["default"] : plugin;
	
		    if (!(plugin instanceof _plugin3["default"])) {
		      // allow plugin containers to be specified so they don't have to manually require
		      if (typeof plugin === "function" || typeof plugin === "object") {
		        plugin = OptionManager.memoisePluginContainer(plugin, loc, i, alias);
		      } else {
		        throw new TypeError(messages.get("pluginNotFunction", loc, i, typeof plugin));
		      }
		    }
	
		    plugin.init(loc, i);
	
		    return plugin;
		  };
	
		  OptionManager.normalisePlugins = function normalisePlugins(loc, dirname, plugins) {
		    return plugins.map(function (val, i) {
		      var plugin = undefined,
		          options = undefined;
	
		      if (!val) {
		        throw new TypeError("Falsy value found in plugins");
		      }
	
		      // destructure plugins
		      if (Array.isArray(val)) {
		        plugin = val[0];
		        options = val[1];
		      } else {
		        plugin = val;
		      }
	
		      var alias = typeof plugin === "string" ? plugin : loc + "$" + i;
	
		      // allow plugins to be specified as strings
		      if (typeof plugin === "string") {
		        var pluginLoc = _helpersResolve2["default"]("babel-plugin-" + plugin, dirname) || _helpersResolve2["default"](plugin, dirname);
		        if (pluginLoc) {
		          plugin = __webpack_require__(/*! . */ 146)(pluginLoc);
		        } else {
		          throw new ReferenceError(messages.get("pluginUnknown", plugin, loc, i, dirname));
		        }
		      }
	
		      plugin = OptionManager.normalisePlugin(plugin, loc, i, alias);
	
		      return [plugin, options];
		    });
		  };
	
		  OptionManager.prototype.addConfig = function addConfig(loc, key) {
		    var json = arguments.length <= 2 || arguments[2] === undefined ? _json52["default"] : arguments[2];
	
		    if (this.resolvedConfigs.indexOf(loc) >= 0) {
		      return false;
		    }
	
		    var content = _fs2["default"].readFileSync(loc, "utf8");
		    var opts = undefined;
	
		    try {
		      opts = jsonCache[content] = jsonCache[content] || json.parse(content);
		      if (key) opts = opts[key];
		    } catch (err) {
		      err.message = loc + ": Error while parsing JSON - " + err.message;
		      throw err;
		    }
	
		    this.mergeOptions({
		      options: opts,
		      alias: loc,
		      dirname: _path2["default"].dirname(loc)
		    });
		    this.resolvedConfigs.push(loc);
	
		    return !!opts;
		  };
	
		  /**
		   * This is called when we want to merge the input `opts` into the
		   * base options (passed as the `extendingOpts`: at top-level it's the
		   * main options, at presets level it's presets options).
		   *
		   *  - `alias` is used to output pretty traces back to the original source.
		   *  - `loc` is used to point to the original config.
		   *  - `dirname` is used to resolve plugins relative to it.
		   */
	
		  OptionManager.prototype.mergeOptions = function mergeOptions(_ref) {
		    // istanbul ignore next
	
		    var _this = this;
	
		    var rawOpts = _ref.options;
		    var extendingOpts = _ref.extending;
		    var alias = _ref.alias;
		    var loc = _ref.loc;
		    var dirname = _ref.dirname;
	
		    alias = alias || "foreign";
		    if (!rawOpts) return;
	
		    //
		    if (typeof rawOpts !== "object" || Array.isArray(rawOpts)) {
		      this.log.error("Invalid options type for " + alias, TypeError);
		    }
	
		    //
		    var opts = _lodashLangCloneDeep2["default"](rawOpts, function (val) {
		      if (val instanceof _plugin3["default"]) {
		        return val;
		      }
		    });
	
		    //
		    dirname = dirname || process.cwd();
		    loc = loc || alias;
	
		    for (var _key2 in opts) {
		      var option = _config2["default"][_key2];
	
		      // check for an unknown option
		      if (!option && this.log) {
		        var pluginOptsInfo = "Check out http://babeljs.io/docs/usage/options/ for more info";
	
		        if (_removed2["default"][_key2]) {
		          this.log.error("Using removed Babel 5 option: " + alias + "." + _key2 + " - " + _removed2["default"][_key2].message, ReferenceError);
		        } else {
		          this.log.error("Unknown option: " + alias + "." + _key2 + ". " + pluginOptsInfo, ReferenceError);
		        }
		      }
		    }
	
		    // normalise options
		    _index.normaliseOptions(opts);
	
		    // resolve plugins
		    if (opts.plugins) {
		      opts.plugins = OptionManager.normalisePlugins(loc, dirname, opts.plugins);
		    }
	
		    // add extends clause
		    if (opts["extends"]) {
		      var extendsLoc = _helpersResolve2["default"](opts["extends"], dirname);
		      if (extendsLoc) {
		        this.addConfig(extendsLoc);
		      } else {
		        if (this.log) this.log.error("Couldn't resolve extends clause of " + opts["extends"] + " in " + alias);
		      }
		      delete opts["extends"];
		    }
	
		    // resolve presets
		    if (opts.presets) {
		      // If we're in the "pass per preset" mode, we resolve the presets
		      // and keep them for further execution to calculate the options.
		      if (opts.passPerPreset) {
		        opts.presets = this.resolvePresets(opts.presets, dirname, function (preset, presetLoc) {
		          _this.mergeOptions({
		            options: preset,
		            extending: preset,
		            alias: presetLoc,
		            loc: presetLoc,
		            dirname: dirname
		          });
		        });
		      } else {
		        // Otherwise, just merge presets options into the main options.
		        this.mergePresets(opts.presets, dirname);
		        delete opts.presets;
		      }
		    }
	
		    // env
		    var envOpts = undefined;
		    var envKey = process.env.BABEL_ENV || ("production") || "development";
		    if (opts.env) {
		      envOpts = opts.env[envKey];
		      delete opts.env;
		    }
	
		    // Merge them into current extending options in case of top-level
		    // options. In case of presets, just re-assign options which are got
		    // normalized during the `mergeOptions`.
		    if (rawOpts === extendingOpts) {
		      _Object$assign(extendingOpts, opts);
		    } else {
		      _helpersMerge2["default"](extendingOpts || this.options, opts);
		    }
	
		    // merge in env options
		    this.mergeOptions({
		      options: envOpts,
		      extending: extendingOpts,
		      alias: alias + ".env." + envKey,
		      dirname: dirname
		    });
		  };
	
		  /**
		   * Merges all presets into the main options in case we are not in the
		   * "pass per preset" mode. Otherwise, options are calculated per preset.
		   */
	
		  OptionManager.prototype.mergePresets = function mergePresets(presets, dirname) {
		    // istanbul ignore next
	
		    var _this2 = this;
	
		    this.resolvePresets(presets, dirname, function (presetOpts, presetLoc) {
		      _this2.mergeOptions({
		        options: presetOpts,
		        alias: presetLoc,
		        loc: presetLoc,
		        dirname: _path2["default"].dirname(presetLoc || "")
		      });
		    });
		  };
	
		  /**
		   * Resolves presets options which can be either direct object data,
		   * or a module name to require.
		   */
	
		  OptionManager.prototype.resolvePresets = function resolvePresets(presets, dirname, onResolve) {
		    return presets.map(function (val) {
		      if (typeof val === "string") {
		        var presetLoc = _helpersResolve2["default"]("babel-preset-" + val, dirname) || _helpersResolve2["default"](val, dirname);
		        if (presetLoc) {
		          var _val = __webpack_require__(/*! . */ 146)(presetLoc);
		          onResolve && onResolve(_val, presetLoc);
		          return _val;
		        } else {
		          throw new Error("Couldn't find preset " + JSON.stringify(val) + " relative to directory " + JSON.stringify(dirname));
		        }
		      } else if (typeof val === "object") {
		        onResolve && onResolve(val);
		        return val;
		      } else {
		        throw new Error("Unsupported preset format: " + val + ".");
		      }
		    });
		  };
	
		  OptionManager.prototype.addIgnoreConfig = function addIgnoreConfig(loc) {
		    var file = _fs2["default"].readFileSync(loc, "utf8");
		    var lines = file.split("\n");
	
		    lines = lines.map(function (line) {
		      return line.replace(/#(.*?)$/, "").trim();
		    }).filter(function (line) {
		      return !!line;
		    });
	
		    this.mergeOptions({
		      options: { ignore: lines },
		      loc: loc
		    });
		  };
	
		  OptionManager.prototype.findConfigs = function findConfigs(loc) {
		    if (!loc) return;
	
		    if (!_pathIsAbsolute2["default"](loc)) {
		      loc = _path2["default"].join(process.cwd(), loc);
		    }
	
		    var foundConfig = false;
		    var foundIgnore = false;
	
		    while (loc !== (loc = _path2["default"].dirname(loc))) {
		      if (!foundConfig) {
		        var configLoc = _path2["default"].join(loc, BABELRC_FILENAME);
		        if (exists(configLoc)) {
		          this.addConfig(configLoc);
		          foundConfig = true;
		        }
	
		        var pkgLoc = _path2["default"].join(loc, PACKAGE_FILENAME);
		        if (!foundConfig && exists(pkgLoc)) {
		          foundConfig = this.addConfig(pkgLoc, "babel", JSON);
		        }
		      }
	
		      if (!foundIgnore) {
		        var ignoreLoc = _path2["default"].join(loc, BABELIGNORE_FILENAME);
		        if (exists(ignoreLoc)) {
		          this.addIgnoreConfig(ignoreLoc);
		          foundIgnore = true;
		        }
		      }
	
		      if (foundIgnore && foundConfig) return;
		    }
		  };
	
		  OptionManager.prototype.normaliseOptions = function normaliseOptions() {
		    var opts = this.options;
	
		    for (var _key3 in _config2["default"]) {
		      var option = _config2["default"][_key3];
		      var val = opts[_key3];
	
		      // optional
		      if (!val && option.optional) continue;
	
		      // aliases
		      if (option.alias) {
		        opts[option.alias] = opts[option.alias] || val;
		      } else {
		        opts[_key3] = val;
		      }
		    }
		  };
	
		  OptionManager.prototype.init = function init() {
		    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
		    var filename = opts.filename;
	
		    // resolve all .babelrc files
		    if (opts.babelrc !== false) {
		      this.findConfigs(filename);
		    }
	
		    // merge in base options
		    this.mergeOptions({
		      options: opts,
		      alias: "base",
		      dirname: filename && _path2["default"].dirname(filename)
		    });
	
		    // normalise
		    this.normaliseOptions(opts);
	
		    return this.options;
		  };
	
		  return OptionManager;
		})();
	
		exports["default"] = OptionManager;
	
		OptionManager.memoisedPlugins = [];
		module.exports = exports["default"];
		/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./~/process/browser.js */ 18)))
	
	/***/ },
	/* 51 */
	/*!***************************************************!*\
	  !*** ./~/babel-helper-function-name/lib/index.js ***!
	  \***************************************************/
	/***/ function(module, exports, __webpack_require__) {
	
		/* eslint max-len: 0 */
	
		"use strict";
	
		var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 1)["default"];
	
		var _interopRequireWildcard = __webpack_require__(/*! babel-runtime/helpers/interop-require-wildcard */ 2)["default"];
	
		exports.__esModule = true;
	
		var _babelHelperGetFunctionArity = __webpack_require__(/*! babel-helper-get-function-arity */ 154);
	
		var _babelHelperGetFunctionArity2 = _interopRequireDefault(_babelHelperGetFunctionArity);
	
		var _babelTemplate = __webpack_require__(/*! babel-template */ 9);
	
		var _babelTemplate2 = _interopRequireDefault(_babelTemplate);
	
		var _babelTypes = __webpack_require__(/*! babel-types */ 3);
	
		var t = _interopRequireWildcard(_babelTypes);
	
		var buildPropertyMethodAssignmentWrapper = _babelTemplate2["default"]("\n  (function (FUNCTION_KEY) {\n    function FUNCTION_ID() {\n      return FUNCTION_KEY.apply(this, arguments);\n    }\n\n    FUNCTION_ID.toString = function () {\n      return FUNCTION_KEY.toString();\n    }\n\n    return FUNCTION_ID;\n  })(FUNCTION)\n");
	
		var buildGeneratorPropertyMethodAssignmentWrapper = _babelTemplate2["default"]("\n  (function (FUNCTION_KEY) {\n    function* FUNCTION_ID() {\n      return yield* FUNCTION_KEY.apply(this, arguments);\n    }\n\n    FUNCTION_ID.toString = function () {\n      return FUNCTION_KEY.toString();\n    };\n\n    return FUNCTION_ID;\n  })(FUNCTION)\n");
	
		var visitor = {
		  "ReferencedIdentifier|BindingIdentifier": function ReferencedIdentifierBindingIdentifier(path, state) {
		    // check if this node matches our function id
		    if (path.node.name !== state.name) return;
	
		    // check that we don't have a local variable declared as that removes the need
		    // for the wrapper
		    var localDeclar = path.scope.getBindingIdentifier(state.name);
		    if (localDeclar !== state.outerDeclar) return;
	
		    state.selfReference = true;
		    path.stop();
		  }
		};
	
		function wrap(state, method, id, scope) {
		  if (state.selfReference) {
		    if (scope.hasBinding(id.name) && !scope.hasGlobal(id.name)) {
		      // we can just munge the local binding
		      scope.rename(id.name);
		    } else {
		      // we don't currently support wrapping class expressions
		      if (!t.isFunction(method)) return;
	
		      // need to add a wrapper since we can't change the references
		      var build = buildPropertyMethodAssignmentWrapper;
		      if (method.generator) build = buildGeneratorPropertyMethodAssignmentWrapper;
		      var _template = build({
		        FUNCTION: method,
		        FUNCTION_ID: id,
		        FUNCTION_KEY: scope.generateUidIdentifier(id.name)
		      }).expression;
		      _template.callee._skipModulesRemap = true;
	
		      // shim in dummy params to retain function arity, if you try to read the
		      // source then you'll get the original since it's proxied so it's all good
		      var params = _template.callee.body.body[0].params;
		      for (var i = 0, len = _babelHelperGetFunctionArity2["default"](method); i < len; i++) {
		        params.push(scope.generateUidIdentifier("x"));
		      }
	
		      return _template;
		    }
		  }
	
		  method.id = id;
		  scope.getProgramParent().references[id.name] = true;
		}
	
		function visit(node, name, scope) {
		  var state = {
		    selfAssignment: false,
		    selfReference: false,
		    outerDeclar: scope.getBindingIdentifier(name),
		    references: [],
		    name: name
		  };
	
		  // check to see if we have a local binding of the id we're setting inside of
		  // the function, this is important as there are caveats associated
	
		  var binding = scope.getOwnBinding(name);
	
		  if (binding) {
		    if (binding.kind === "param") {
		      // safari will blow up in strict mode with code like:
		      //
		      //   let t = function t(t) {};
		      //
		      // with the error:
		      //
		      //   Cannot declare a parameter named 't' as it shadows the name of a
		      //   strict mode function.
		      //
		      // this isn't to the spec and they've invented this behaviour which is
		      // **extremely** annoying so we avoid setting the name if it has a param
		      // with the same id
		      state.selfReference = true;
		    } else {
		      // otherwise it's defined somewhere in scope like:
		      //
		      //   let t = function () {
		      //     let t = 2;
		      //   };
		      //
		      // so we can safely just set the id and move along as it shadows the
		      // bound function id
		    }
		  } else if (state.outerDeclar || scope.hasGlobal(name)) {
		      scope.traverse(node, visitor, state);
		    }
	
		  return state;
		}
	
		exports["default"] = function (_ref) {
		  var node = _ref.node;
		  var parent = _ref.parent;
		  var scope = _ref.scope;
		  var id = _ref.id;
	
		  // has an `id` so we don't need to infer one
		  if (node.id) return;
	
		  if ((t.isObjectProperty(parent) || t.isObjectMethod(parent, { kind: "method" })) && (!parent.computed || t.isLiteral(parent.key))) {
		    // { foo() {} };
		    id = parent.key;
		  } else if (t.isVariableDeclarator(parent)) {
		    // let foo = function () {};
		    id = parent.id;
	
		    if (t.isIdentifier(id)) {
		      var binding = scope.parent.getBinding(id.name);
		      if (binding && binding.constant && scope.getBinding(id.name) === binding) {
		        // always going to reference this method
		        node.id = id;
		        node.id[t.NOT_LOCAL_BINDING] = true;
		        return;
		      }
		    }
		  } else if (t.isAssignmentExpression(parent)) {
		    // foo = function () {};
		    id = parent.left;
		  } else if (!id) {
		    return;
		  }
	
		  var name = undefined;
		  if (id && t.isLiteral(id)) {
		    name = id.value;
		  } else if (id && t.isIdentifier(id)) {
		    name = id.name;
		  } else {
		    return;
		  }
	
		  name = t.toBindingIdentifierName(name);
		  id = t.identifier(name);
	
		  // The id shouldn't be considered a local binding to the function because
		  // we are simply trying to set the function name and not actually create
		  // a local binding.
		  id[t.NOT_LOCAL_BINDING] = true;
	
		  var state = visit(node, name, scope);
		  return wrap(state, node, id, scope) || node;
		};
	
		module.exports = exports["default"];
	
	/***/ },
	/* 52 */
	/*!************************************************************!*\
	  !*** ./~/babel-runtime/core-js/number/max-safe-integer.js ***!
	  \************************************************************/
	/***/ function(module, exports, __webpack_require__) {
	
		module.exports = { "default": __webpack_require__(/*! core-js/library/fn/number/max-safe-integer */ 412), __esModule: true };
	
	/***/ },
	/* 53 */
	/*!***********************************************!*\
	  !*** ./~/babel-runtime/core-js/symbol/for.js ***!
	  \***********************************************/
	/***/ function(module, exports, __webpack_require__) {
	
		module.exports = { "default": __webpack_require__(/*! core-js/library/fn/symbol/for */ 421), __esModule: true };
	
	/***/ },
	/* 54 */
	/*!*********************************************!*\
	  !*** ./~/babel-runtime/helpers/defaults.js ***!
	  \*********************************************/
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
	
		var _Object$getOwnPropertyNames = __webpack_require__(/*! babel-runtime/core-js/object/get-own-property-names */ 370)["default"];
	
		var _Object$getOwnPropertyDescriptor = __webpack_require__(/*! babel-runtime/core-js/object/get-own-property-descriptor */ 369)["default"];
	
		var _Object$defineProperty = __webpack_require__(/*! babel-runtime/core-js/object/define-property */ 190)["default"];
	
		exports["default"] = function (obj, defaults) {
		  var keys = _Object$getOwnPropertyNames(defaults);
	
		  for (var i = 0; i < keys.length; i++) {
		    var key = keys[i];
	
		    var value = _Object$getOwnPropertyDescriptor(defaults, key);
	
		    if (value && value.configurable && obj[key] === undefined) {
		      _Object$defineProperty(obj, key, value);
		    }
		  }
	
		  return obj;
		};
	
		exports.__esModule = true;
	
	/***/ },
	/* 55 */
	/*!************************************************************!*\
	  !*** ./~/babel-runtime/helpers/interop-export-wildcard.js ***!
	  \************************************************************/
	/***/ function(module, exports) {
	
		"use strict";
	
		exports["default"] = function (obj, defaults) {
		  var newObj = defaults({}, obj);
		  delete newObj["default"];
		  return newObj;
		};
	
		exports.__esModule = true;
	
	/***/ },
	/* 56 */
	/*!********************************************!*\
	  !*** ./~/core-js/library/modules/$.ctx.js ***!
	  \********************************************/
	/***/ function(module, exports, __webpack_require__) {
	
		// optional / simple context binding
		var aFunction = __webpack_require__(/*! ./$.a-function */ 424);
		module.exports = function(fn, that, length){
		  aFunction(fn);
		  if(that === undefined)return fn;
		  switch(length){
		    case 1: return function(a){
		      return fn.call(that, a);
		    };
		    case 2: return function(a, b){
		      return fn.call(that, a, b);
		    };
		    case 3: return function(a, b, c){
		      return fn.call(that, a, b, c);
		    };
		  }
		  return function(/* ...args */){
		    return fn.apply(that, arguments);
		  };
		};
	
	/***/ },
	/* 57 */
	/*!****************************************************!*\
	  !*** ./~/core-js/library/modules/$.descriptors.js ***!
	  \****************************************************/
	/***/ function(module, exports, __webpack_require__) {
	
		// Thank's IE8 for his funny defineProperty
		module.exports = !__webpack_require__(/*! ./$.fails */ 58)(function(){
		  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
		});
	
	/***/ },
	/* 58 */
	/*!**********************************************!*\
	  !*** ./~/core-js/library/modules/$.fails.js ***!
	  \**********************************************/
	/***/ function(module, exports) {
	
		module.exports = function(exec){
		  try {
		    return !!exec();
		  } catch(e){
		    return true;
		  }
		};
	
	/***/ },
	/* 59 */
	/*!***********************************************!*\
	  !*** ./~/core-js/library/modules/$.global.js ***!
	  \***********************************************/
	/***/ function(module, exports) {
	
		// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
		var global = module.exports = typeof window != 'undefined' && window.Math == Math
		  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
		if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
	
	/***/ },
	/* 60 */
	/*!**************************************************!*\
	  !*** ./~/core-js/library/modules/$.iterators.js ***!
	  \**************************************************/
	/***/ function(module, exports) {
	
		module.exports = {};
	
	/***/ },
	/* 61 */
	/*!***************************************************!*\
	  !*** ./~/core-js/library/modules/$.to-iobject.js ***!
	  \***************************************************/
	/***/ function(module, exports, __webpack_require__) {
	
		// to indexed object, toObject with fallback for non-array-like ES3 strings
		var IObject = __webpack_require__(/*! ./$.iobject */ 123)
		  , defined = __webpack_require__(/*! ./$.defined */ 94);
		module.exports = function(it){
		  return IObject(defined(it));
		};
	
	/***/ },
	/* 62 */
	/*!***********************************!*\
	  !*** ./~/lodash/array/compact.js ***!
	  \***********************************/
	/***/ function(module, exports) {
	
		/**
		 * Creates an array with all falsey values removed. The values `false`, `null`,
		 * `0`, `""`, `undefined`, and `NaN` are falsey.
		 *
		 * @static
		 * @memberOf _
		 * @category Array
		 * @param {Array} array The array to compact.
		 * @returns {Array} Returns the new array of filtered values.
		 * @example
		 *
		 * _.compact([0, 1, false, 2, '', 3]);
		 * // => [1, 2, 3]
		 */
		function compact(array) {
		  var index = -1,
		      length = array ? array.length : 0,
		      resIndex = -1,
		      result = [];
	
		  while (++index < length) {
		    var value = array[index];
		    if (value) {
		      result[++resIndex] = value;
		    }
		  }
		  return result;
		}
	
		module.exports = compact;
	
	
	/***/ },
	/* 63 */
	/*!********************************!*\
	  !*** ./~/lodash/array/uniq.js ***!
	  \********************************/
	/***/ function(module, exports, __webpack_require__) {
	
		var baseCallback = __webpack_require__(/*! ../internal/baseCallback */ 134),
		    baseUniq = __webpack_require__(/*! ../internal/baseUniq */ 487),
		    isIterateeCall = __webpack_require__(/*! ../internal/isIterateeCall */ 65),
		    sortedUniq = __webpack_require__(/*! ../internal/sortedUniq */ 508);
	
		/**
		 * Creates a duplicate-free version of an array, using
		 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
		 * for equality comparisons, in which only the first occurence of each element
		 * is kept. Providing `true` for `isSorted` performs a faster search algorithm
		 * for sorted arrays. If an iteratee function is provided it's invoked for
		 * each element in the array to generate the criterion by which uniqueness
		 * is computed. The `iteratee` is bound to `thisArg` and invoked with three
		 * arguments: (value, index, array).
		 *
		 * If a property name is provided for `iteratee` the created `_.property`
		 * style callback returns the property value of the given element.
		 *
		 * If a value is also provided for `thisArg` the created `_.matchesProperty`
		 * style callback returns `true` for elements that have a matching property
		 * value, else `false`.
		 *
		 * If an object is provided for `iteratee` the created `_.matches` style
		 * callback returns `true` for elements that have the properties of the given
		 * object, else `false`.
		 *
		 * @static
		 * @memberOf _
		 * @alias unique
		 * @category Array
		 * @param {Array} array The array to inspect.
		 * @param {boolean} [isSorted] Specify the array is sorted.
		 * @param {Function|Object|string} [iteratee] The function invoked per iteration.
		 * @param {*} [thisArg] The `this` binding of `iteratee`.
		 * @returns {Array} Returns the new duplicate-value-free array.
		 * @example
		 *
		 * _.uniq([2, 1, 2]);
		 * // => [2, 1]
		 *
		 * // using `isSorted`
		 * _.uniq([1, 1, 2], true);
		 * // => [1, 2]
		 *
		 * // using an iteratee function
		 * _.uniq([1, 2.5, 1.5, 2], function(n) {
		 *   return this.floor(n);
		 * }, Math);
		 * // => [1, 2.5]
		 *
		 * // using the `_.property` callback shorthand
		 * _.uniq([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
		 * // => [{ 'x': 1 }, { 'x': 2 }]
		 */
		function uniq(array, isSorted, iteratee, thisArg) {
		  var length = array ? array.length : 0;
		  if (!length) {
		    return [];
		  }
		  if (isSorted != null && typeof isSorted != 'boolean') {
		    thisArg = iteratee;
		    iteratee = isIterateeCall(array, isSorted, thisArg) ? undefined : isSorted;
		    isSorted = false;
		  }
		  iteratee = iteratee == null ? iteratee : baseCallback(iteratee, thisArg, 3);
		  return (isSorted)
		    ? sortedUniq(array, iteratee)
		    : baseUniq(array, iteratee);
		}
	
		module.exports = uniq;
	
	
	/***/ },
	/* 64 */
	/*!*******************************************!*\
	  !*** ./~/lodash/internal/bindCallback.js ***!
	  \*******************************************/
	/***/ function(module, exports, __webpack_require__) {
	
		var identity = __webpack_require__(/*! ../utility/identity */ 234);
	
		/**
		 * A specialized version of `baseCallback` which only supports `this` binding
		 * and specifying the number of arguments to provide to `func`.
		 *
		 * @private
		 * @param {Function} func The function to bind.
		 * @param {*} thisArg The `this` binding of `func`.
		 * @param {number} [argCount] The number of arguments to provide to `func`.
		 * @returns {Function} Returns the callback.
		 */
		function bindCallback(func, thisArg, argCount) {
		  if (typeof func != 'function') {
		    return identity;
		  }
		  if (thisArg === undefined) {
		    return func;
		  }
		  switch (argCount) {
		    case 1: return function(value) {
		      return func.call(thisArg, value);
		    };
		    case 3: return function(value, index, collection) {
		      return func.call(thisArg, value, index, collection);
		    };
		    case 4: return function(accumulator, value, index, collection) {
		      return func.call(thisArg, accumulator, value, index, collection);
		    };
		    case 5: return function(value, other, key, object, source) {
		      return func.call(thisArg, value, other, key, object, source);
		    };
		  }
		  return function() {
		    return func.apply(thisArg, arguments);
		  };
		}
	
		module.exports = bindCallback;
	
	
	/***/ },
	/* 65 */
	/*!*********************************************!*\
	  !*** ./~/lodash/internal/isIterateeCall.js ***!
	  \*********************************************/
	/***/ function(module, exports, __webpack_require__) {
	
		var isArrayLike = __webpack_require__(/*! ./isArrayLike */ 44),
		    isIndex = __webpack_require__(/*! ./isIndex */ 101),
		    isObject = __webpack_require__(/*! ../lang/isObject */ 15);
	
		/**
		 * Checks if the provided arguments are from an iteratee call.
		 *
		 * @private
		 * @param {*} value The potential iteratee value argument.
		 * @param {*} index The potential iteratee index or key argument.
		 * @param {*} object The potential iteratee object argument.
		 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
		 */
		function isIterateeCall(value, index, object) {
		  if (!isObject(object)) {
		    return false;
		  }
		  var type = typeof index;
		  if (type == 'number'
		      ? (isArrayLike(object) && isIndex(index, object.length))
		      : (type == 'string' && index in object)) {
		    var other = object[index];
		    return value === value ? (value === other) : (other !== other);
		  }
		  return false;
		}
	
		module.exports = isIterateeCall;
	
	
	/***/ },
	/* 66 */
	/*!**************************************!*\
	  !*** ./~/lodash/lang/isArguments.js ***!
	  \**************************************/
	/***/ function(module, exports, __webpack_require__) {
	
		var isArrayLike = __webpack_require__(/*! ../internal/isArrayLike */ 44),
		    isObjectLike = __webpack_require__(/*! ../internal/isObjectLike */ 17);
	
		/** Used for native method references. */
		var objectProto = Object.prototype;
	
		/** Used to check objects for own properties. */
		var hasOwnProperty = objectProto.hasOwnProperty;
	
		/** Native method references. */
		var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
		/**
		 * Checks if `value` is classified as an `arguments` object.
		 *
		 * @static
		 * @memberOf _
		 * @category Lang
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
		 * @example
		 *
		 * _.isArguments(function() { return arguments; }());
		 * // => true
		 *
		 * _.isArguments([1, 2, 3]);
		 * // => false
		 */
		function isArguments(value) {
		  return isObjectLike(value) && isArrayLike(value) &&
		    hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
		}
	
		module.exports = isArguments;
	
	
	/***/ },
	/* 67 */
	/*!***********************************!*\
	  !*** ./~/lodash/object/assign.js ***!
	  \***********************************/
	/***/ function(module, exports, __webpack_require__) {
	
		var assignWith = __webpack_require__(/*! ../internal/assignWith */ 476),
		    baseAssign = __webpack_require__(/*! ../internal/baseAssign */ 216),
		    createAssigner = __webpack_require__(/*! ../internal/createAssigner */ 226);
	
		/**
		 * Assigns own enumerable properties of source object(s) to the destination
		 * object. Subsequent sources overwrite property assignments of previous sources.
		 * If `customizer` is provided it's invoked to produce the assigned values.
		 * The `customizer` is bound to `thisArg` and invoked with five arguments:
		 * (objectValue, sourceValue, key, object, source).
		 *
		 * **Note:** This method mutates `object` and is based on
		 * [`Object.assign`](http://ecma-international.org/ecma-262/6.0/#sec-object.assign).
		 *
		 * @static
		 * @memberOf _
		 * @alias extend
		 * @category Object
		 * @param {Object} object The destination object.
		 * @param {...Object} [sources] The source objects.
		 * @param {Function} [customizer] The function to customize assigned values.
		 * @param {*} [thisArg] The `this` binding of `customizer`.
		 * @returns {Object} Returns `object`.
		 * @example
		 *
		 * _.assign({ 'user': 'barney' }, { 'age': 40 }, { 'user': 'fred' });
		 * // => { 'user': 'fred', 'age': 40 }
		 *
		 * // using a customizer callback
		 * var defaults = _.partialRight(_.assign, function(value, other) {
		 *   return _.isUndefined(value) ? other : value;
		 * });
		 *
		 * defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
		 * // => { 'user': 'barney', 'age': 36 }
		 */
		var assign = createAssigner(function(object, source, customizer) {
		  return customizer
		    ? assignWith(object, source, customizer)
		    : baseAssign(object, source);
		});
	
		module.exports = assign;
	
	
	/***/ },
	/* 68 */
	/*!**********************************!*\
	  !*** ./~/source-map/lib/util.js ***!
	  \**********************************/
	/***/ function(module, exports) {
	
		/* -*- Mode: js; js-indent-level: 2; -*- */
		/*
		 * Copyright 2011 Mozilla Foundation and contributors
		 * Licensed under the New BSD license. See LICENSE or:
		 * http://opensource.org/licenses/BSD-3-Clause
		 */
		{
		  /**
		   * This is a helper function for getting values from parameter/options
		   * objects.
		   *
		   * @param args The object we are extracting values from
		   * @param name The name of the property we are getting.
		   * @param defaultValue An optional value to return if the property is missing
		   * from the object. If this is not specified and the property is missing, an
		   * error will be thrown.
		   */
		  function getArg(aArgs, aName, aDefaultValue) {
		    if (aName in aArgs) {
		      return aArgs[aName];
		    } else if (arguments.length === 3) {
		      return aDefaultValue;
		    } else {
		      throw new Error('"' + aName + '" is a required argument.');
		    }
		  }
		  exports.getArg = getArg;
	
		  var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.]*)(?::(\d+))?(\S*)$/;
		  var dataUrlRegexp = /^data:.+\,.+$/;
	
		  function urlParse(aUrl) {
		    var match = aUrl.match(urlRegexp);
		    if (!match) {
		      return null;
		    }
		    return {
		      scheme: match[1],
		      auth: match[2],
		      host: match[3],
		      port: match[4],
		      path: match[5]
		    };
		  }
		  exports.urlParse = urlParse;
	
		  function urlGenerate(aParsedUrl) {
		    var url = '';
		    if (aParsedUrl.scheme) {
		      url += aParsedUrl.scheme + ':';
		    }
		    url += '//';
		    if (aParsedUrl.auth) {
		      url += aParsedUrl.auth + '@';
		    }
		    if (aParsedUrl.host) {
		      url += aParsedUrl.host;
		    }
		    if (aParsedUrl.port) {
		      url += ":" + aParsedUrl.port
		    }
		    if (aParsedUrl.path) {
		      url += aParsedUrl.path;
		    }
		    return url;
		  }
		  exports.urlGenerate = urlGenerate;
	
		  /**
		   * Normalizes a path, or the path portion of a URL:
		   *
		   * - Replaces consequtive slashes with one slash.
		   * - Removes unnecessary '.' parts.
		   * - Removes unnecessary '<dir>/..' parts.
		   *
		   * Based on code in the Node.js 'path' core module.
		   *
		   * @param aPath The path or url to normalize.
		   */
		  function normalize(aPath) {
		    var path = aPath;
		    var url = urlParse(aPath);
		    if (url) {
		      if (!url.path) {
		        return aPath;
		      }
		      path = url.path;
		    }
		    var isAbsolute = exports.isAbsolute(path);
	
		    var parts = path.split(/\/+/);
		    for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
		      part = parts[i];
		      if (part === '.') {
		        parts.splice(i, 1);
		      } else if (part === '..') {
		        up++;
		      } else if (up > 0) {
		        if (part === '') {
		          // The first part is blank if the path is absolute. Trying to go
		          // above the root is a no-op. Therefore we can remove all '..' parts
		          // directly after the root.
		          parts.splice(i + 1, up);
		          up = 0;
		        } else {
		          parts.splice(i, 2);
		          up--;
		        }
		      }
		    }
		    path = parts.join('/');
	
		    if (path === '') {
		      path = isAbsolute ? '/' : '.';
		    }
	
		    if (url) {
		      url.path = path;
		      return urlGenerate(url);
		    }
		    return path;
		  }
		  exports.normalize = normalize;
	
		  /**
		   * Joins two paths/URLs.
		   *
		   * @param aRoot The root path or URL.
		   * @param aPath The path or URL to be joined with the root.
		   *
		   * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
		   *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
		   *   first.
		   * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
		   *   is updated with the result and aRoot is returned. Otherwise the result
		   *   is returned.
		   *   - If aPath is absolute, the result is aPath.
		   *   - Otherwise the two paths are joined with a slash.
		   * - Joining for example 'http://' and 'www.example.com' is also supported.
		   */
		  function join(aRoot, aPath) {
		    if (aRoot === "") {
		      aRoot = ".";
		    }
		    if (aPath === "") {
		      aPath = ".";
		    }
		    var aPathUrl = urlParse(aPath);
		    var aRootUrl = urlParse(aRoot);
		    if (aRootUrl) {
		      aRoot = aRootUrl.path || '/';
		    }
	
		    // `join(foo, '//www.example.org')`
		    if (aPathUrl && !aPathUrl.scheme) {
		      if (aRootUrl) {
		        aPathUrl.scheme = aRootUrl.scheme;
		      }
		      return urlGenerate(aPathUrl);
		    }
	
		    if (aPathUrl || aPath.match(dataUrlRegexp)) {
		      return aPath;
		    }
	
		    // `join('http://', 'www.example.com')`
		    if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
		      aRootUrl.host = aPath;
		      return urlGenerate(aRootUrl);
		    }
	
		    var joined = aPath.charAt(0) === '/'
		      ? aPath
		      : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);
	
		    if (aRootUrl) {
		      aRootUrl.path = joined;
		      return urlGenerate(aRootUrl);
		    }
		    return joined;
		  }
		  exports.join = join;
	
		  exports.isAbsolute = function (aPath) {
		    return aPath.charAt(0) === '/' || !!aPath.match(urlRegexp);
		  };
	
		  /**
		   * Make a path relative to a URL or another path.
		   *
		   * @param aRoot The root path or URL.
		   * @param aPath The path or URL to be made relative to aRoot.
		   */
		  function relative(aRoot, aPath) {
		    if (aRoot === "") {
		      aRoot = ".";
		    }
	
		    aRoot = aRoot.replace(/\/$/, '');
	
		    // It is possible for the path to be above the root. In this case, simply
		    // checking whether the root is a prefix of the path won't work. Instead, we
		    // need to remove components from the root one by one, until either we find
		    // a prefix that fits, or we run out of components to remove.
		    var level = 0;
		    while (aPath.indexOf(aRoot + '/') !== 0) {
		      var index = aRoot.lastIndexOf("/");
		      if (index < 0) {
		        return aPath;
		      }
	
		      // If the only part of the root that is left is the scheme (i.e. http://,
		      // file:///, etc.), one or more slashes (/), or simply nothing at all, we
		      // have exhausted all components, so the path is not relative to the root.
		      aRoot = aRoot.slice(0, index);
		      if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
		        return aPath;
		      }
	
		      ++level;
		    }
	
		    // Make sure we add a "../" for each component we removed from the root.
		    return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
		  }
		  exports.relative = relative;
	
		  /**
		   * Because behavior goes wacky when you set `__proto__` on objects, we
		   * have to prefix all the strings in our set with an arbitrary character.
		   *
		   * See https://github.com/mozilla/source-map/pull/31 and
		   * https://github.com/mozilla/source-map/issues/30
		   *
		   * @param String aStr
		   */
		  function toSetString(aStr) {
		    return '$' + aStr;
		  }
		  exports.toSetString = toSetString;
	
		  function fromSetString(aStr) {
		    return aStr.substr(1);
		  }
		  exports.fromSetString = fromSetString;
	
		  /**
		   * Comparator between two mappings where the original positions are compared.
		   *
		   * Optionally pass in `true` as `onlyCompareGenerated` to consider two
		   * mappings with the same original source/line/column, but different generated
		   * line and column the same. Useful when searching for a mapping with a
		   * stubbed out mapping.
		   */
		  function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
		    var cmp = mappingA.source - mappingB.source;
		    if (cmp !== 0) {
		      return cmp;
		    }
	
		    cmp = mappingA.originalLine - mappingB.originalLine;
		    if (cmp !== 0) {
		      return cmp;
		    }
	
		    cmp = mappingA.originalColumn - mappingB.originalColumn;
		    if (cmp !== 0 || onlyCompareOriginal) {
		      return cmp;
		    }
	
		    cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		    if (cmp !== 0) {
		      return cmp;
		    }
	
		    cmp = mappingA.generatedLine - mappingB.generatedLine;
		    if (cmp !== 0) {
		      return cmp;
		    }
	
		    return mappingA.name - mappingB.name;
		  }
		  exports.compareByOriginalPositions = compareByOriginalPositions;
	
		  /**
		   * Comparator between two mappings with deflated source and name indices where
		   * the generated positions are compared.
		   *
		   * Optionally pass in `true` as `onlyCompareGenerated` to consider two
		   * mappings with the same generated line and column, but different
		   * source/name/original line and column the same. Useful when searching for a
		   * mapping with a stubbed out mapping.
		   */
		  function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
		    var cmp = mappingA.generatedLine - mappingB.generatedLine;
		    if (cmp !== 0) {
		      return cmp;
		    }
	
		    cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		    if (cmp !== 0 || onlyCompareGenerated) {
		      return cmp;
		    }
	
		    cmp = mappingA.source - mappingB.source;
		    if (cmp !== 0) {
		      return cmp;
		    }
	
		    cmp = mappingA.originalLine - mappingB.originalLine;
		    if (cmp !== 0) {
		      return cmp;
		    }
	
		    cmp = mappingA.originalColumn - mappingB.originalColumn;
		    if (cmp !== 0) {
		      return cmp;
		    }
	
		    return mappingA.name - mappingB.name;
		  }
		  exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;
	
		  function strcmp(aStr1, aStr2) {
		    if (aStr1 === aStr2) {
		      return 0;
		    }
	
		    if (aStr1 > aStr2) {
		      return 1;
		    }
	
		    return -1;
		  }
	
		  /**
		   * Comparator between two mappings with inflated source and name strings where
		   * the generated positions are compared.
		   */
		  function compareByGeneratedPositionsInflated(mappingA, mappingB) {
		    var cmp = mappingA.generatedLine - mappingB.generatedLine;
		    if (cmp !== 0) {
		      return cmp;
		    }
	
		    cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		    if (cmp !== 0) {
		      return cmp;
		    }
	
		    cmp = strcmp(mappingA.source, mappingB.source);
		    if (cmp !== 0) {
		      return cmp;
		    }
	
		    cmp = mappingA.originalLine - mappingB.originalLine;
		    if (cmp !== 0) {
		      return cmp;
		    }
	
		    cmp = mappingA.originalColumn - mappingB.originalColumn;
		    if (cmp !== 0) {
		      return cmp;
		    }
	
		    return strcmp(mappingA.name, mappingB.name);
		  }
		  exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;
		}
	
	
	/***/ },
	/* 69 */
	/*!***************************************!*\
	  !*** ./~/to-fast-properties/index.js ***!
	  \***************************************/
	/***/ function(module, exports) {
	
		'use strict';
		module.exports = function toFastProperties(obj) {
			function f() {}
			f.prototype = obj;
			new f();
			return;
			eval(obj);
		};
	
	
	/***/ },
	/* 70 */
	/*!************************!*\
	  !*** ./~/util/util.js ***!
	  \************************/
	/***/ function(module, exports, __webpack_require__) {
	
		/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
		//
		// Permission is hereby granted, free of charge, to any person obtaining a
		// copy of this software and associated documentation files (the
		// "Software"), to deal in the Software without restriction, including
		// without limitation the rights to use, copy, modify, merge, publish,
		// distribute, sublicense, and/or sell copies of the Software, and to permit
		// persons to whom the Software is furnished to do so, subject to the
		// following conditions:
		//
		// The above copyright notice and this permission notice shall be included
		// in all copies or substantial portions of the Software.
		//
		// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
		// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
		// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
		// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
		// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
		// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
		// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
		var formatRegExp = /%[sdj%]/g;
		exports.format = function(f) {
		  if (!isString(f)) {
		    var objects = [];
		    for (var i = 0; i < arguments.length; i++) {
		      objects.push(inspect(arguments[i]));
		    }
		    return objects.join(' ');
		  }
	
		  var i = 1;
		  var args = arguments;
		  var len = args.length;
		  var str = String(f).replace(formatRegExp, function(x) {
		    if (x === '%%') return '%';
		    if (i >= len) return x;
		    switch (x) {
		      case '%s': return String(args[i++]);
		      case '%d': return Number(args[i++]);
		      case '%j':
		        try {
		          return JSON.stringify(args[i++]);
		        } catch (_) {
		          return '[Circular]';
		        }
		      default:
		        return x;
		    }
		  });
		  for (var x = args[i]; i < len; x = args[++i]) {
		    if (isNull(x) || !isObject(x)) {
		      str += ' ' + x;
		    } else {
		      str += ' ' + inspect(x);
		    }
		  }
		  return str;
		};
	
	
		// Mark that a method should not be used.
		// Returns a modified function which warns once by default.
		// If --no-deprecation is set, then it is a no-op.
		exports.deprecate = function(fn, msg) {
		  // Allow for deprecating things in the process of starting up.
		  if (isUndefined(global.process)) {
		    return function() {
		      return exports.deprecate(fn, msg).apply(this, arguments);
		    };
		  }
	
		  if (process.noDeprecation === true) {
		    return fn;
		  }
	
		  var warned = false;
		  function deprecated() {
		    if (!warned) {
		      if (process.throwDeprecation) {
		        throw new Error(msg);
		      } else if (process.traceDeprecation) {
		        console.trace(msg);
		      } else {
		        console.error(msg);
		      }
		      warned = true;
		    }
		    return fn.apply(this, arguments);
		  }
	
		  return deprecated;
		};
	
	
		var debugs = {};
		var debugEnviron;
		exports.debuglog = function(set) {
		  if (isUndefined(debugEnviron))
		    debugEnviron = process.env.NODE_DEBUG || '';
		  set = set.toUpperCase();
		  if (!debugs[set]) {
		    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
		      var pid = process.pid;
		      debugs[set] = function() {
		        var msg = exports.format.apply(exports, arguments);
		        console.error('%s %d: %s', set, pid, msg);
		      };
		    } else {
		      debugs[set] = function() {};
		    }
		  }
		  return debugs[set];
		};
	
	
		/**
		 * Echos the value of a value. Trys to print the value out
		 * in the best way possible given the different types.
		 *
		 * @param {Object} obj The object to print out.
		 * @param {Object} opts Optional options object that alters the output.
		 */
		/* legacy: obj, showHidden, depth, colors*/
		function inspect(obj, opts) {
		  // default options
		  var ctx = {
		    seen: [],
		    stylize: stylizeNoColor
		  };
		  // legacy...
		  if (arguments.length >= 3) ctx.depth = arguments[2];
		  if (arguments.length >= 4) ctx.colors = arguments[3];
		  if (isBoolean(opts)) {
		    // legacy...
		    ctx.showHidden = opts;
		  } else if (opts) {
		    // got an "options" object
		    exports._extend(ctx, opts);
		  }
		  // set default options
		  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
		  if (isUndefined(ctx.depth)) ctx.depth = 2;
		  if (isUndefined(ctx.colors)) ctx.colors = false;
		  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
		  if (ctx.colors) ctx.stylize = stylizeWithColor;
		  return formatValue(ctx, obj, ctx.depth);
		}
		exports.inspect = inspect;
	
	
		// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
		inspect.colors = {
		  'bold' : [1, 22],
		  'italic' : [3, 23],
		  'underline' : [4, 24],
		  'inverse' : [7, 27],
		  'white' : [37, 39],
		  'grey' : [90, 39],
		  'black' : [30, 39],
		  'blue' : [34, 39],
		  'cyan' : [36, 39],
		  'green' : [32, 39],
		  'magenta' : [35, 39],
		  'red' : [31, 39],
		  'yellow' : [33, 39]
		};
	
		// Don't use 'blue' not visible on cmd.exe
		inspect.styles = {
		  'special': 'cyan',
		  'number': 'yellow',
		  'boolean': 'yellow',
		  'undefined': 'grey',
		  'null': 'bold',
		  'string': 'green',
		  'date': 'magenta',
		  // "name": intentionally not styling
		  'regexp': 'red'
		};
	
	
		function stylizeWithColor(str, styleType) {
		  var style = inspect.styles[styleType];
	
		  if (style) {
		    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
		           '\u001b[' + inspect.colors[style][1] + 'm';
		  } else {
		    return str;
		  }
		}
	
	
		function stylizeNoColor(str, styleType) {
		  return str;
		}
	
	
		function arrayToHash(array) {
		  var hash = {};
	
		  array.forEach(function(val, idx) {
		    hash[val] = true;
		  });
	
		  return hash;
		}
	
	
		function formatValue(ctx, value, recurseTimes) {
		  // Provide a hook for user-specified inspect functions.
		  // Check that value is an object with an inspect function on it
		  if (ctx.customInspect &&
		      value &&
		      isFunction(value.inspect) &&
		      // Filter out the util module, it's inspect function is special
		      value.inspect !== exports.inspect &&
		      // Also filter out any prototype objects using the circular check.
		      !(value.constructor && value.constructor.prototype === value)) {
		    var ret = value.inspect(recurseTimes, ctx);
		    if (!isString(ret)) {
		      ret = formatValue(ctx, ret, recurseTimes);
		    }
		    return ret;
		  }
	
		  // Primitive types cannot have properties
		  var primitive = formatPrimitive(ctx, value);
		  if (primitive) {
		    return primitive;
		  }
	
		  // Look up the keys of the object.
		  var keys = Object.keys(value);
		  var visibleKeys = arrayToHash(keys);
	
		  if (ctx.showHidden) {
		    keys = Object.getOwnPropertyNames(value);
		  }
	
		  // IE doesn't make error fields non-enumerable
		  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
		  if (isError(value)
		      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
		    return formatError(value);
		  }
	
		  // Some type of object without properties can be shortcutted.
		  if (keys.length === 0) {
		    if (isFunction(value)) {
		      var name = value.name ? ': ' + value.name : '';
		      return ctx.stylize('[Function' + name + ']', 'special');
		    }
		    if (isRegExp(value)) {
		      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
		    }
		    if (isDate(value)) {
		      return ctx.stylize(Date.prototype.toString.call(value), 'date');
		    }
		    if (isError(value)) {
		      return formatError(value);
		    }
		  }
	
		  var base = '', array = false, braces = ['{', '}'];
	
		  // Make Array say that they are Array
		  if (isArray(value)) {
		    array = true;
		    braces = ['[', ']'];
		  }
	
		  // Make functions say that they are functions
		  if (isFunction(value)) {
		    var n = value.name ? ': ' + value.name : '';
		    base = ' [Function' + n + ']';
		  }
	
		  // Make RegExps say that they are RegExps
		  if (isRegExp(value)) {
		    base = ' ' + RegExp.prototype.toString.call(value);
		  }
	
		  // Make dates with properties first say the date
		  if (isDate(value)) {
		    base = ' ' + Date.prototype.toUTCString.call(value);
		  }
	
		  // Make error with message first say the error
		  if (isError(value)) {
		    base = ' ' + formatError(value);
		  }
	
		  if (keys.length === 0 && (!array || value.length == 0)) {
		    return braces[0] + base + braces[1];
		  }
	
		  if (recurseTimes < 0) {
		    if (isRegExp(value)) {
		      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
		    } else {
		      return ctx.stylize('[Object]', 'special');
		    }
		  }
	
		  ctx.seen.push(value);
	
		  var output;
		  if (array) {
		    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
		  } else {
		    output = keys.map(function(key) {
		      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
		    });
		  }
	
		  ctx.seen.pop();
	
		  return reduceToSingleString(output, base, braces);
		}
	
	
		function formatPrimitive(ctx, value) {
		  if (isUndefined(value))
		    return ctx.stylize('undefined', 'undefined');
		  if (isString(value)) {
		    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
		                                             .replace(/'/g, "\\'")
		                                             .replace(/\\"/g, '"') + '\'';
		    return ctx.stylize(simple, 'string');
		  }
		  if (isNumber(value))
		    return ctx.stylize('' + value, 'number');
		  if (isBoolean(value))
		    return ctx.stylize('' + value, 'boolean');
		  // For some reason typeof null is "object", so special case here.
		  if (isNull(value))
		    return ctx.stylize('null', 'null');
		}
	
	
		function formatError(value) {
		  return '[' + Error.prototype.toString.call(value) + ']';
		}
	
	
		function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
		  var output = [];
		  for (var i = 0, l = value.length; i < l; ++i) {
		    if (hasOwnProperty(value, String(i))) {
		      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
		          String(i), true));
		    } else {
		      output.push('');
		    }
		  }
		  keys.forEach(function(key) {
		    if (!key.match(/^\d+$/)) {
		      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
		          key, true));
		    }
		  });
		  return output;
		}
	
	
		function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
		  var name, str, desc;
		  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
		  if (desc.get) {
		    if (desc.set) {
		      str = ctx.stylize('[Getter/Setter]', 'special');
		    } else {
		      str = ctx.stylize('[Getter]', 'special');
		    }
		  } else {
		    if (desc.set) {
		      str = ctx.stylize('[Setter]', 'special');
		    }
		  }
		  if (!hasOwnProperty(visibleKeys, key)) {
		    name = '[' + key + ']';
		  }
		  if (!str) {
		    if (ctx.seen.indexOf(desc.value) < 0) {
		      if (isNull(recurseTimes)) {
		        str = formatValue(ctx, desc.value, null);
		      } else {
		        str = formatValue(ctx, desc.value, recurseTimes - 1);
		      }
		      if (str.indexOf('\n') > -1) {
		        if (array) {
		          str = str.split('\n').map(function(line) {
		            return '  ' + line;
		          }).join('\n').substr(2);
		        } else {
		          str = '\n' + str.split('\n').map(function(line) {
		            return '   ' + line;
		          }).join('\n');
		        }
		      }
		    } else {
		      str = ctx.stylize('[Circular]', 'special');
		    }
		  }
		  if (isUndefined(name)) {
		    if (array && key.match(/^\d+$/)) {
		      return str;
		    }
		    name = JSON.stringify('' + key);
		    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
		      name = name.substr(1, name.length - 2);
		      name = ctx.stylize(name, 'name');
		    } else {
		      name = name.replace(/'/g, "\\'")
		                 .replace(/\\"/g, '"')
		                 .replace(/(^"|"$)/g, "'");
		      name = ctx.stylize(name, 'string');
		    }
		  }
	
		  return name + ': ' + str;
		}
	
	
		function reduceToSingleString(output, base, braces) {
		  var numLinesEst = 0;
		  var length = output.reduce(function(prev, cur) {
		    numLinesEst++;
		    if (cur.indexOf('\n') >= 0) numLinesEst++;
		    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
		  }, 0);
	
		  if (length > 60) {
		    return braces[0] +
		           (base === '' ? '' : base + '\n ') +
		           ' ' +
		           output.join(',\n  ') +
		           ' ' +
		           braces[1];
		  }
	
		  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
		}
	
	
		// NOTE: These type checking functions intentionally don't use `instanceof`
		// because it is fragile and can be easily faked with `Object.create()`.
		function isArray(ar) {
		  return Array.isArray(ar);
		}
		exports.isArray = isArray;
	
		function isBoolean(arg) {
		  return typeof arg === 'boolean';
		}
		exports.isBoolean = isBoolean;
	
		function isNull(arg) {
		  return arg === null;
		}
		exports.isNull = isNull;
	
		function isNullOrUndefined(arg) {
		  return arg == null;
		}
		exports.isNullOrUndefined = isNullOrUndefined;
	
		function isNumber(arg) {
		  return typeof arg === 'number';
		}
		exports.isNumber = isNumber;
	
		function isString(arg) {
		  return typeof arg === 'string';
		}
		exports.isString = isString;
	
		function isSymbol(arg) {
		  return typeof arg === 'symbol';
		}
		exports.isSymbol = isSymbol;
	
		function isUndefined(arg) {
		  return arg === void 0;
		}
		exports.isUndefined = isUndefined;
	
		function isRegExp(re) {
		  return isObject(re) && objectToString(re) === '[object RegExp]';
		}
		exports.isRegExp = isRegExp;
	
		function isObject(arg) {
		  return typeof arg === 'object' && arg !== null;
		}
		exports.isObject = isObject;
	
		function isDate(d) {
		  return isObject(d) && objectToString(d) === '[object Date]';
		}
		exports.isDate = isDate;
	
		function isError(e) {
		  return isObject(e) &&
		      (objectToString(e) === '[object Error]' || e instanceof Error);
		}
		exports.isError = isError;
	
		function isFunction(arg) {
		  return typeof arg === 'function';
		}
		exports.isFunction = isFunction;
	
		function isPrimitive(arg) {
		  return arg === null ||
		         typeof arg === 'boolean' ||
		         typeof arg === 'number' ||
		         typeof arg === 'string' ||
		         typeof arg === 'symbol' ||  // ES6 symbol
		         typeof arg === 'undefined';
		}
		exports.isPrimitive = isPrimitive;
	
		exports.isBuffer = __webpack_require__(/*! ./support/isBuffer */ 537);
	
		function objectToString(o) {
		  return Object.prototype.toString.call(o);
		}
	
	
		function pad(n) {
		  return n < 10 ? '0' + n.toString(10) : n.toString(10);
		}
	
	
		var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
		              'Oct', 'Nov', 'Dec'];
	
		// 26 Feb 16:19:34
		function timestamp() {
		  var d = new Date();
		  var time = [pad(d.getHours()),
		              pad(d.getMinutes()),
		              pad(d.getSeconds())].join(':');
		  return [d.getDate(), months[d.getMonth()], time].join(' ');
		}
	
	
		// log is just a thin wrapper to console.log that prepends a timestamp
		exports.log = function() {
		  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
		};
	
	
		/**
		 * Inherit the prototype methods from one constructor into another.
		 *
		 * The Function.prototype.inherits from lang.js rewritten as a standalone
		 * function (not on Function.prototype). NOTE: If this file is to be loaded
		 * during bootstrapping this function needs to be rewritten using some native
		 * functions as prototype setup using normal JavaScript does not work as
		 * expected during bootstrapping (see mirror.js in r114903).
		 *
		 * @param {function} ctor Constructor function which needs to inherit the
		 *     prototype.
		 * @param {function} superCtor Constructor function to inherit prototype from.
		 */
		exports.inherits = __webpack_require__(/*! inherits */ 460);
	
		exports._extend = function(origin, add) {
		  // Don't do anything if add isn't an object
		  if (!add || !isObject(add)) return origin;
	
		  var keys = Object.keys(add);
		  var i = keys.length;
		  while (i--) {
		    origin[keys[i]] = add[keys[i]];
		  }
		  return origin;
		};
	
		function hasOwnProperty(obj, prop) {
		  return Object.prototype.hasOwnProperty.call(obj, prop);
		}
	
		/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(/*! ./~/process/browser.js */ 18)))
	
	/***/ },
	/* 71 */
	/*!****************************!*\
	  !*** ./~/assert/assert.js ***!
	  \****************************/
	/***/ function(module, exports, __webpack_require__) {
	
		// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
		//
		// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
		//
		// Originally from narwhal.js (http://narwhaljs.org)
		// Copyright (c) 2009 Thomas Robinson <280north.com>
		//
		// Permission is hereby granted, free of charge, to any person obtaining a copy
		// of this software and associated documentation files (the 'Software'), to
		// deal in the Software without restriction, including without limitation the
		// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
		// sell copies of the Software, and to permit persons to whom the Software is
		// furnished to do so, subject to the following conditions:
		//
		// The above copyright notice and this permission notice shall be included in
		// all copies or substantial portions of the Software.
		//
		// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
		// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
		// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	
		// when used in node, this will actually load the util module we depend on
		// versus loading the builtin util module as happens otherwise
		// this is a bug in node module loading as far as I am concerned
		var util = __webpack_require__(/*! util/ */ 70);
	
		var pSlice = Array.prototype.slice;
		var hasOwn = Object.prototype.hasOwnProperty;
	
		// 1. The assert module provides functions that throw
		// AssertionError's when particular conditions are not met. The
		// assert module must conform to the following interface.
	
		var assert = module.exports = ok;
	
		// 2. The AssertionError is defined in assert.
		// new assert.AssertionError({ message: message,
		//                             actual: actual,
		//                             expected: expected })
	
		assert.AssertionError = function AssertionError(options) {
		  this.name = 'AssertionError';
		  this.actual = options.actual;
		  this.expected = options.expected;
		  this.operator = options.operator;
		  if (options.message) {
		    this.message = options.message;
		    this.generatedMessage = false;
		  } else {
		    this.message = getMessage(this);
		    this.generatedMessage = true;
		  }
		  var stackStartFunction = options.stackStartFunction || fail;
	
		  if (Error.captureStackTrace) {
		    Error.captureStackTrace(this, stackStartFunction);
		  }
		  else {
		    // non v8 browsers so we can have a stacktrace
		    var err = new Error();
		    if (err.stack) {
		      var out = err.stack;
	
		      // try to strip useless frames
		      var fn_name = stackStartFunction.name;
		      var idx = out.indexOf('\n' + fn_name);
		      if (idx >= 0) {
		        // once we have located the function frame
		        // we need to strip out everything before it (and its line)
		        var next_line = out.indexOf('\n', idx + 1);
		        out = out.substring(next_line + 1);
		      }
	
		      this.stack = out;
		    }
		  }
		};
	
		// assert.AssertionError instanceof Error
		util.inherits(assert.AssertionError, Error);
	
		function replacer(key, value) {
		  if (util.isUndefined(value)) {
		    return '' + value;
		  }
		  if (util.isNumber(value) && !isFinite(value)) {
		    return value.toString();
		  }
		  if (util.isFunction(value) || util.isRegExp(value)) {
		    return value.toString();
		  }
		  return value;
		}
	
		function truncate(s, n) {
		  if (util.isString(s)) {
		    return s.length < n ? s : s.slice(0, n);
		  } else {
		    return s;
		  }
		}
	
		function getMessage(self) {
		  return truncate(JSON.stringify(self.actual, replacer), 128) + ' ' +
		         self.operator + ' ' +
		         truncate(JSON.stringify(self.expected, replacer), 128);
		}
	
		// At present only the three keys mentioned above are used and
		// understood by the spec. Implementations or sub modules can pass
		// other keys to the AssertionError's constructor - they will be
		// ignored.
	
		// 3. All of the following functions must throw an AssertionError
		// when a corresponding condition is not met, with a message that
		// may be undefined if not provided.  All assertion methods provide
		// both the actual and expected values to the assertion error for
		// display purposes.
	
		function fail(actual, expected, message, operator, stackStartFunction) {
		  throw new assert.AssertionError({
		    message: message,
		    actual: actual,
		    expected: expected,
		    operator: operator,
		    stackStartFunction: stackStartFunction
		  });
		}
	
		// EXTENSION! allows for well behaved errors defined elsewhere.
		assert.fail = fail;
	
		// 4. Pure assertion tests whether a value is truthy, as determined
		// by !!guard.
		// assert.ok(guard, message_opt);
		// This statement is equivalent to assert.equal(true, !!guard,
		// message_opt);. To test strictly for the value true, use
		// assert.strictEqual(true, guard, message_opt);.
	
		function ok(value, message) {
		  if (!value) fail(value, true, message, '==', assert.ok);
		}
		assert.ok = ok;
	
		// 5. The equality assertion tests shallow, coercive equality with
		// ==.
		// assert.equal(actual, expected, message_opt);
	
		assert.equal = function equal(actual, expected, message) {
		  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
		};
	
		// 6. The non-equality assertion tests for whether two objects are not equal
		// with != assert.notEqual(actual, expected, message_opt);
	
		assert.notEqual = function notEqual(actual, expected, message) {
		  if (actual == expected) {
		    fail(actual, expected, message, '!=', assert.notEqual);
		  }
		};
	
		// 7. The equivalence assertion tests a deep equality relation.
		// assert.deepEqual(actual, expected, message_opt);
	
		assert.deepEqual = function deepEqual(actual, expected, message) {
		  if (!_deepEqual(actual, expected)) {
		    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
		  }
		};
	
		function _deepEqual(actual, expected) {
		  // 7.1. All identical values are equivalent, as determined by ===.
		  if (actual === expected) {
		    return true;
	
		  } else if (util.isBuffer(actual) && util.isBuffer(expected)) {
		    if (actual.length != expected.length) return false;
	
		    for (var i = 0; i < actual.length; i++) {
		      if (actual[i] !== expected[i]) return false;
		    }
	
		    return true;
	
		  // 7.2. If the expected value is a Date object, the actual value is
		  // equivalent if it is also a Date object that refers to the same time.
		  } else if (util.isDate(actual) && util.isDate(expected)) {
		    return actual.getTime() === expected.getTime();
	
		  // 7.3 If the expected value is a RegExp object, the actual value is
		  // equivalent if it is also a RegExp object with the same source and
		  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
		  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
		    return actual.source === expected.source &&
		           actual.global === expected.global &&
		           actual.multiline === expected.multiline &&
		           actual.lastIndex === expected.lastIndex &&
		           actual.ignoreCase === expected.ignoreCase;
	
		  // 7.4. Other pairs that do not both pass typeof value == 'object',
		  // equivalence is determined by ==.
		  } else if (!util.isObject(actual) && !util.isObject(expected)) {
		    return actual == expected;
	
		  // 7.5 For all other Object pairs, including Array objects, equivalence is
		  // determined by having the same number of owned properties (as verified
		  // with Object.prototype.hasOwnProperty.call), the same set of keys
		  // (although not necessarily the same order), equivalent values for every
		  // corresponding key, and an identical 'prototype' property. Note: this
		  // accounts for both named and indexed properties on Arrays.
		  } else {
		    return objEquiv(actual, expected);
		  }
		}
	
		function isArguments(object) {
		  return Object.prototype.toString.call(object) == '[object Arguments]';
		}
	
		function objEquiv(a, b) {
		  if (util.isNullOrUndefined(a) || util.isNullOrUndefined(b))
		    return false;
		  // an identical 'prototype' property.
		  if (a.prototype !== b.prototype) return false;
		  // if one is a primitive, the other must be same
		  if (util.isPrimitive(a) || util.isPrimitive(b)) {
		    return a === b;
		  }
		  var aIsArgs = isArguments(a),
		      bIsArgs = isArguments(b);
		  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
		    return false;
		  if (aIsArgs) {
		    a = pSlice.call(a);
		    b = pSlice.call(b);
		    return _deepEqual(a, b);
		  }
		  var ka = objectKeys(a),
		      kb = objectKeys(b),
		      key, i;
		  // having the same number of owned properties (keys incorporates
		  // hasOwnProperty)
		  if (ka.length != kb.length)
		    return false;
		  //the same set of keys (although not necessarily the same order),
		  ka.sort();
		  kb.sort();
		  //~~~cheap key test
		  for (i = ka.length - 1; i >= 0; i--) {
		    if (ka[i] != kb[i])
		      return false;
		  }
		  //equivalent values for every corresponding key, and
		  //~~~possibly expensive deep test
		  for (i = ka.length - 1; i >= 0; i--) {
		    key = ka[i];
		    if (!_deepEqual(a[key], b[key])) return false;
		  }
		  return true;
		}
	
		// 8. The non-equivalence assertion tests for any deep inequality.
		// assert.notDeepEqual(actual, expected, message_opt);
	
		assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
		  if (_deepEqual(actual, expected)) {
		    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
		  }
		};
	
		// 9. The strict equality assertion tests strict equality, as determined by ===.
		// assert.strictEqual(actual, expected, message_opt);
	
		assert.strictEqual = function strictEqual(actual, expected, message) {
		  if (actual !== expected) {
		    fail(actual, expected, message, '===', assert.strictEqual);
		  }
		};
	
		// 10. The strict non-equality assertion tests for strict inequality, as
		// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);
	
		assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
		  if (actual === expected) {
		    fail(actual, expected, message, '!==', assert.notStrictEqual);
		  }
		};
	
		function expectedException(actual, expected) {
		  if (!actual || !expected) {
		    return false;
		  }
	
		  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
		    return expected.test(actual);
		  } else if (actual instanceof expected) {
		    return true;
		  } else if (expected.call({}, actual) === true) {
		    return true;
		  }
	
		  return false;
		}
	
		function _throws(shouldThrow, block, expected, message) {
		  var actual;
	
		  if (util.isString(expected)) {
		    message = expected;
		    expected = null;
		  }
	
		  try {
		    block();
		  } catch (e) {
		    actual = e;
		  }
	
		  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
		            (message ? ' ' + message : '.');
	
		  if (shouldThrow && !actual) {
		    fail(actual, expected, 'Missing expected exception' + message);
		  }
	
		  if (!shouldThrow && expectedException(actual, expected)) {
		    fail(actual, expected, 'Got unwanted exception' + message);
		  }
	
		  if ((shouldThrow && actual && expected &&
		      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
		    throw actual;
		  }
		}
	
		// 11. Expected to throw an error:
		// assert.throws(block, Error_opt, message_opt);
	
		assert.throws = function(block, /*optional*/error, /*optional*/message) {
		  _throws.apply(this, [true].concat(pSlice.call(arguments)));
		};
	
		// EXTENSION! This is annoying to write outside this module.
		assert.doesNotThrow = function(block, /*optional*/message) {
		  _throws.apply(this, [false].concat(pSlice.call(arguments)));
		};
	
		assert.ifError = function(err) { if (err) {throw err;}};
	
		var objectKeys = Object.keys || function (obj) {
		  var keys = [];
		  for (var key in obj) {
		    if (hasOwn.call(obj, key)) keys.push(key);
		  }
		  return keys;
		};
	
	
	/***/ },
	/* 72 */
	/*!***************************************************!*\
	  !*** ./~/babel-core/lib/transformation/plugin.js ***!
	  \***************************************************/
	/***/ function(module, exports, __webpack_require__) {
	
		/* eslint max-len: 0 */
	
		"use strict";
	
		var _inherits = __webpack_require__(/*! babel-runtime/helpers/inherits */ 35)["default"];
	
		var _classCallCheck = __webpack_require__(/*! babel-runtime/helpers/class-call-check */ 5)["default"];
	
		var _getIterator = __webpack_require__(/*! babel-runtime/core-js/get-iterator */ 4)["default"];
	
		var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 1)["default"];
	
		var _interopRequireWildcard = __webpack_require__(/*! babel-runtime/helpers/interop-require-wildcard */ 2)["default"];
	
		exports.__esModule = true;
	
		var _fileOptionsOptionManager = __webpack_require__(/*! ./file/options/option-manager */ 50);
	
		var _fileOptionsOptionManager2 = _interopRequireDefault(_fileOptionsOptionManager);
	
		var _babelMessages = __webpack_require__(/*! babel-messages */ 19);
	
		var messages = _interopRequireWildcard(_babelMessages);
	
		var _store = __webpack_require__(/*! ../store */ 102);
	
		var _store2 = _interopRequireDefault(_store);
	
		var _babelTraverse = __webpack_require__(/*! babel-traverse */ 6);
	
		var _babelTraverse2 = _interopRequireDefault(_babelTraverse);
	
		var _lodashObjectAssign = __webpack_require__(/*! lodash/object/assign */ 67);
	
		var _lodashObjectAssign2 = _interopRequireDefault(_lodashObjectAssign);
	
		var _lodashLangClone = __webpack_require__(/*! lodash/lang/clone */ 34);
	
		var _lodashLangClone2 = _interopRequireDefault(_lodashLangClone);
	
		var GLOBAL_VISITOR_PROPS = ["enter", "exit"];
	
		var Plugin = (function (_Store) {
		  _inherits(Plugin, _Store);
	
		  function Plugin(plugin, key) {
		    _classCallCheck(this, Plugin);
	
		    _Store.call(this);
	
		    this.initialized = false;
		    this.raw = _lodashObjectAssign2["default"]({}, plugin);
		    this.key = key;
	
		    this.manipulateOptions = this.take("manipulateOptions");
		    this.post = this.take("post");
		    this.pre = this.take("pre");
		    this.visitor = this.normaliseVisitor(_lodashLangClone2["default"](this.take("visitor")) || {});
		  }
	
		  Plugin.prototype.take = function take(key) {
		    var val = this.raw[key];
		    delete this.raw[key];
		    return val;
		  };
	
		  Plugin.prototype.chain = function chain(target, key) {
		    if (!target[key]) return this[key];
		    if (!this[key]) return target[key];
	
		    var fns = [target[key], this[key]];
	
		    return function () {
		      var val = undefined;
	
		      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
		        args[_key] = arguments[_key];
		      }
	
		      for (var _i = 0; _i < fns.length; _i++) {
		        var fn = fns[_i];
		        if (fn) {
		          var ret = fn.apply(this, args);
		          if (ret != null) val = ret;
		        }
		      }
		      return val;
		    };
		  };
	
		  Plugin.prototype.maybeInherit = function maybeInherit(loc) {
		    var inherits = this.take("inherits");
		    if (!inherits) return;
	
		    inherits = _fileOptionsOptionManager2["default"].normalisePlugin(inherits, loc, "inherits");
	
		    this.manipulateOptions = this.chain(inherits, "manipulateOptions");
		    this.post = this.chain(inherits, "post");
		    this.pre = this.chain(inherits, "pre");
		    this.visitor = _babelTraverse2["default"].visitors.merge([inherits.visitor, this.visitor]);
		  };
	
		  /**
		   * We lazy initialise parts of a plugin that rely on contextual information such as
		   * position on disk and how it was specified.
		   */
	
		  Plugin.prototype.init = function init(loc, i) {
		    if (this.initialized) return;
		    this.initialized = true;
	
		    this.maybeInherit(loc);
	
		    for (var key in this.raw) {
		      throw new Error(messages.get("pluginInvalidProperty", loc, i, key));
		    }
		  };
	
		  Plugin.prototype.normaliseVisitor = function normaliseVisitor(visitor) {
		    for (var _iterator = GLOBAL_VISITOR_PROPS, _isArray = Array.isArray(_iterator), _i2 = 0, _iterator = _isArray ? _iterator : _getIterator(_iterator);;) {
		      var _ref;
	
		      if (_isArray) {
		        if (_i2 >= _iterator.length) break;
		        _ref = _iterator[_i2++];
		      } else {
		        _i2 = _iterator.next();
		        if (_i2.done) break;
		        _ref = _i2.value;
		      }
	
		      var key = _ref;
	
		      if (visitor[key]) {
		        throw new Error("Plugins aren't allowed to specify catch-all enter/exit handlers. Please target individual nodes.");
		      }
		    }
	
		    _babelTraverse2["default"].explode(visitor);
		    return visitor;
		  };
	
		  return Plugin;
		})(_store2["default"]);
	
		exports["default"] = Plugin;
		module.exports = exports["default"];
	
	/***/ },
	/* 73 */
	/*!************************************************************!*\
	  !*** ./~/babel-plugin-check-es2015-constants/lib/index.js ***!
	  \************************************************************/
	/***/ function(module, exports) {
	
		"use strict";
	
		exports.__esModule = true;
	
		exports["default"] = function (_ref) {
		  var messages = _ref.messages;
	
		  return {
		    visitor: {
		      Scope: function Scope(_ref2) {
		        var scope = _ref2.scope;
	
		        for (var _name in scope.bindings) {
		          var binding = scope.bindings[_name];
		          if (binding.kind !== "const" && binding.kind !== "module") continue;
	
		          var _arr = binding.constantViolations;
		          for (var _i = 0; _i < _arr.length; _i++) {
		            var violation = _arr[_i];
		            throw violation.buildCodeFrameError(messages.get("readOnly", _name));
		          }
		        }
		      }
		    }
		  };
		};
	
		module.exports = exports["default"];
	
	/***/ },
	/* 74 */
	/*!************************************************************!*\
	  !*** ./~/babel-plugin-syntax-async-functions/lib/index.js ***!
	  \************************************************************/
	/***/ function(module, exports) {
	
		"use strict";
	
		exports.__esModule = true;
	
		exports["default"] = function () {
		  return {
		    manipulateOptions: function manipulateOptions(opts, parserOpts) {
		      parserOpts.plugins.push("asyncFunctions");
		    }
		  };
		};
	
		module.exports = exports["default"];
	
	/***/ },
	/* 75 */
	/*!**********************************************************************!*\
	  !*** ./~/babel-plugin-transform-es2015-arrow-functions/lib/index.js ***!
	  \**********************************************************************/
	/***/ function(module, exports) {
	
		"use strict";
	
		exports.__esModule = true;
	
		exports["default"] = function (_ref) {
		  var t = _ref.types;
	
		  return {
		    visitor: {
		      ArrowFunctionExpression: function ArrowFunctionExpression(path, state) {
		        if (state.opts.spec) {
		          var node = path.node;
	
		          if (node.shadow) return;
	
		          node.shadow = { "this": false };
		          node.type = "FunctionExpression";
	
		          var boundThis = t.thisExpression();
		          boundThis._forceShadow = path;
	
		          // make sure that arrow function won't be instantiated
		          path.ensureBlock();
		          path.get("body").unshiftContainer("body", t.expressionStatement(t.callExpression(state.addHelper("newArrowCheck"), [t.thisExpression(), boundThis])));
	
		          path.replaceWith(t.callExpression(t.memberExpression(node, t.identifier("bind")), [t.thisExpression()]));
		        } else {
		          path.arrowFunctionToShadowed();
		        }
		      }
		    }
		  };
		};
	
		module.exports = exports["default"];
	
	/***/ },
	/* 76 */
	/*!*****************************************************************************!*\
	  !*** ./~/babel-plugin-transform-es2015-block-scoped-functions/lib/index.js ***!
	  \*****************************************************************************/
	/***/ function(module, exports) {
	
		"use strict";
	
		exports.__esModule = true;
	
		exports["default"] = function (_ref) {
		  var t = _ref.types;
	
		  function statementList(key, path) {
		    var paths = path.get(key);
	
		    for (var _i = 0; _i < paths.length; _i++) {
		      var _path = paths[_i];
		      var func = _path.node;
		      if (!_path.isFunctionDeclaration()) continue;
	
		      var declar = t.variableDeclaration("let", [t.variableDeclarator(func.id, t.toExpression(func))]);
	
		      // hoist it up above everything else
		      declar._blockHoist = 2;
	
		      // todo: name this
		      func.id = null;
	
		      _path.replaceWith(declar);
		    }
		  }
	
		  return {
		    visitor: {
		      BlockStatement: function BlockStatement(path) {
		        var node = path.node;
		        var parent = path.parent;
	
		        if (t.isFunction(parent, { body: node }) || t.isExportDeclaration(parent)) {
		          return;
		        }
	
		        statementList("body", path);
		      },
	
		      SwitchCase: function SwitchCase(path) {
		        statementList("consequent", path);
		      }
		    }
		  };
		};
	
		module.exports = exports["default"];
	
	/***/ },
	/* 77 */
	/*!********************************************************************!*\
	  !*** ./~/babel-plugin-transform-es2015-block-scoping/lib/index.js ***!
	  \********************************************************************/
	/***/ function(module, exports, __webpack_require__) {
	
		/* eslint max-len: 0 */
	
		"use strict";
	
		var _classCallCheck = __webpack_require__(/*! babel-runtime/helpers/class-call-check */ 5)["default"];
	
		var _Object$create = __webpack_require__(/*! babel-runtime/core-js/object/create */ 10)["default"];
	
		var _Symbol = __webpack_require__(/*! babel-runtime/core-js/symbol */ 16)["default"];
	
		var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 1)["default"];
	
		var _interopRequireWildcard = __webpack_require__(/*! babel-runtime/helpers/interop-require-wildcard */ 2)["default"];
	
		exports.__esModule = true;
	
		var _babelTraverse = __webpack_require__(/*! babel-traverse */ 6);
	
		var _babelTraverse2 = _interopRequireDefault(_babelTraverse);
	
		var _tdz = __webpack_require__(/*! ./tdz */ 305);
	
		var _babelTypes = __webpack_require__(/*! babel-types */ 3);
	
		var t = _interopRequireWildcard(_babelTypes);
	
		var _lodashObjectValues = __webpack_require__(/*! lodash/object/values */ 233);
	
		var _lodashObjectValues2 = _interopRequireDefault(_lodashObjectValues);
	
		var _lodashObjectExtend = __webpack_require__(/*! lodash/object/extend */ 511);
	
		var _lodashObjectExtend2 = _interopRequireDefault(_lodashObjectExtend);
	
		var _babelTemplate = __webpack_require__(/*! babel-template */ 9);
	
		var _babelTemplate2 = _interopRequireDefault(_babelTemplate);
	
		exports["default"] = function () {
		  return {
		    visitor: {
		      VariableDeclaration: function VariableDeclaration(path, file) {
		        var node = path.node;
		        var parent = path.parent;
		        var scope = path.scope;
	
		        if (!isBlockScoped(node)) return;
		        convertBlockScopedToVar(path, parent, scope, true);
	
		        if (node._tdzThis) {
		          var nodes = [node];
	
		          for (var i = 0; i < node.declarations.length; i++) {
		            var decl = node.declarations[i];
		            if (decl.init) {
		              var assign = t.assignmentExpression("=", decl.id, decl.init);
		              assign._ignoreBlockScopingTDZ = true;
		              nodes.push(t.expressionStatement(assign));
		            }
		            decl.init = file.addHelper("temporalUndefined");
		          }
	
		          node._blockHoist = 2;
	
		          if (path.isCompletionRecord()) {
		            // ensure we don't break completion record semantics by returning
		            // the initialiser of the last declarator
		            nodes.push(t.expressionStatement(scope.buildUndefinedNode()));
		          }
	
		          path.replaceWithMultiple(nodes);
		        }
		      },
	
		      Loop: function Loop(path, file) {
		        var node = path.node;
		        var parent = path.parent;
		        var scope = path.scope;
	
		        t.ensureBlock(node);
		        var blockScoping = new BlockScoping(path, path.get("body"), parent, scope, file);
		        var replace = blockScoping.run();
		        if (replace) path.replaceWith(replace);
		      },
	
		      "BlockStatement|Program": function BlockStatementProgram(path, file) {
		        if (!t.isLoop(path.parent)) {
		          var blockScoping = new BlockScoping(null, path, path.parent, path.scope, file);
		          blockScoping.run();
		        }
		      }
		    }
		  };
		};
	
		var buildRetCheck = _babelTemplate2["default"]("\n  if (typeof RETURN === \"object\") return RETURN.v;\n");
	
		function isBlockScoped(node) {
		  if (!t.isVariableDeclaration(node)) return false;
		  if (node[t.BLOCK_SCOPED_SYMBOL]) return true;
		  if (node.kind !== "let" && node.kind !== "const") return false;
		  return true;
		}
	
		function convertBlockScopedToVar(path, parent, scope) {
		  var moveBindingsToParent = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];
		  var node = path.node;
	
		  // https://github.com/babel/babel/issues/255
		  if (!t.isFor(parent)) {
		    for (var i = 0; i < node.declarations.length; i++) {
		      var declar = node.declarations[i];
		      declar.init = declar.init || scope.buildUndefinedNode();
		    }
		  }
	
		  node[t.BLOCK_SCOPED_SYMBOL] = true;
		  node.kind = "var";
	
		  // Move bindings from current block scope to function scope.
		  if (moveBindingsToParent) {
		    var parentScope = scope.getFunctionParent();
		    var ids = path.getBindingIdentifiers();
		    for (var _name in ids) {
		      var binding = scope.getOwnBinding(_name);
		      if (binding) binding.kind = "var";
		      scope.moveBindingTo(_name, parentScope);
		    }
		  }
		}
	
		function isVar(node) {
		  return t.isVariableDeclaration(node, { kind: "var" }) && !isBlockScoped(node);
		}
	
		function replace(path, node, scope, remaps) {
		  var remap = remaps[node.name];
		  if (!remap) return;
	
		  var ownBinding = scope.getBindingIdentifier(node.name);
		  if (ownBinding === remap.binding) {
		    scope.rename(node.name, remap.uid);
		  } else {
		    // scope already has it's own binding that doesn't
		    // match the one we have a stored replacement for
		    if (path) path.skip();
		  }
		}
	
		var replaceVisitor = {
		  ReferencedIdentifier: function ReferencedIdentifier(path, remaps) {
		    replace(path, path.node, path.scope, remaps);
		  },
	
		  AssignmentExpression: function AssignmentExpression(path, remaps) {
		    var ids = path.getBindingIdentifiers();
		    for (var _name2 in ids) {
		      replace(null, ids[_name2], path.scope, remaps);
		    }
		  }
		};
	
		function traverseReplace(node, parent, scope, remaps) {
		  if (t.isIdentifier(node)) {
		    replace(node, parent, scope, remaps);
		  }
	
		  if (t.isAssignmentExpression(node)) {
		    var ids = t.getBindingIdentifiers(node);
		    for (var _name3 in ids) {
		      replace(ids[_name3], parent, scope, remaps);
		    }
		  }
	
		  scope.traverse(node, replaceVisitor, remaps);
		}
	
		var letReferenceBlockVisitor = _babelTraverse2["default"].visitors.merge([{
		  Function: function Function(path, state) {
		    path.traverse(letReferenceFunctionVisitor, state);
		    return path.skip();
		  }
		}, _tdz.visitor]);
	
		var letReferenceFunctionVisitor = _babelTraverse2["default"].visitors.merge([{
		  ReferencedIdentifier: function ReferencedIdentifier(path, state) {
		    var ref = state.letReferences[path.node.name];
	
		    // not a part of our scope
		    if (!ref) return;
	
		    // this scope has a variable with the same name so it couldn't belong
		    // to our let scope
		    var localBinding = path.scope.getBindingIdentifier(path.node.name);
		    if (localBinding && localBinding !== ref) return;
	
		    state.closurify = true;
		  }
		}, _tdz.visitor]);
	
		var hoistVarDeclarationsVisitor = {
		  enter: function enter(path, self) {
		    var node = path.node;
		    var parent = path.parent;
	
		    if (path.isForStatement()) {
		      if (isVar(node.init, node)) {
		        var nodes = self.pushDeclar(node.init);
		        if (nodes.length === 1) {
		          node.init = nodes[0];
		        } else {
		          node.init = t.sequenceExpression(nodes);
		        }
		      }
		    } else if (path.isFor()) {
		      if (isVar(node.left, node)) {
		        self.pushDeclar(node.left);
		        node.left = node.left.declarations[0].id;
		      }
		    } else if (isVar(node, parent)) {
		      path.replaceWithMultiple(self.pushDeclar(node).map(function (expr) {
		        return t.expressionStatement(expr);
		      }));
		    } else if (path.isFunction()) {
		      return path.skip();
		    }
		  }
		};
	
		var loopLabelVisitor = {
		  LabeledStatement: function LabeledStatement(_ref, state) {
		    var node = _ref.node;
	
		    state.innerLabels.push(node.label.name);
		  }
		};
	
		var continuationVisitor = {
		  enter: function enter(path, state) {
		    if (path.isAssignmentExpression() || path.isUpdateExpression()) {
		      var bindings = path.getBindingIdentifiers();
		      for (var _name4 in bindings) {
		        if (state.outsideReferences[_name4] !== path.scope.getBindingIdentifier(_name4)) continue;
		        state.reassignments[_name4] = true;
		      }
		    }
		  }
		};
	
		function loopNodeTo(node) {
		  if (t.isBreakStatement(node)) {
		    return "break";
		  } else if (t.isContinueStatement(node)) {
		    return "continue";
		  }
		}
	
		var loopVisitor = {
		  Loop: function Loop(path, state) {
		    var oldIgnoreLabeless = state.ignoreLabeless;
		    state.ignoreLabeless = true;
		    path.traverse(loopVisitor, state);
		    state.ignoreLabeless = oldIgnoreLabeless;
		    path.skip();
		  },
	
		  Function: function Function(path) {
		    path.skip();
		  },
	
		  SwitchCase: function SwitchCase(path, state) {
		    var oldInSwitchCase = state.inSwitchCase;
		    state.inSwitchCase = true;
		    path.traverse(loopVisitor, state);
		    state.inSwitchCase = oldInSwitchCase;
		    path.skip();
		  },
	
		  "BreakStatement|ContinueStatement|ReturnStatement": function BreakStatementContinueStatementReturnStatement(path, state) {
		    var node = path.node;
		    var parent = path.parent;
		    var scope = path.scope;
	
		    if (node[this.LOOP_IGNORE]) return;
	
		    var replace = undefined;
		    var loopText = loopNodeTo(node);
	
		    if (loopText) {
		      if (node.label) {
		        // we shouldn't be transforming this because it exists somewhere inside
		        if (state.innerLabels.indexOf(node.label.name) >= 0) {
		          return;
		        }
	
		        loopText = loopText + "|" + node.label.name;
		      } else {
		        // we shouldn't be transforming these statements because
		        // they don't refer to the actual loop we're scopifying
		        if (state.ignoreLabeless) return;
	
		        //
		        if (state.inSwitchCase) return;
	
		        // break statements mean something different in this context
		        if (t.isBreakStatement(node) && t.isSwitchCase(parent)) return;
		      }
	
		      state.hasBreakContinue = true;
		      state.map[loopText] = node;
		      replace = t.stringLiteral(loopText);
		    }
	
		    if (path.isReturnStatement()) {
		      state.hasReturn = true;
		      replace = t.objectExpression([t.objectProperty(t.identifier("v"), node.argument || scope.buildUndefinedNode())]);
		    }
	
		    if (replace) {
		      replace = t.returnStatement(replace);
		      replace[this.LOOP_IGNORE] = true;
		      path.skip();
		      path.replaceWith(t.inherits(replace, node));
		    }
		  }
		};
	
		var BlockScoping = (function () {
		  function BlockScoping(loopPath, blockPath, parent, scope, file) {
		    _classCallCheck(this, BlockScoping);
	
		    this.parent = parent;
		    this.scope = scope;
		    this.file = file;
	
		    this.blockPath = blockPath;
		    this.block = blockPath.node;
	
		    this.outsideLetReferences = _Object$create(null);
		    this.hasLetReferences = false;
		    this.letReferences = _Object$create(null);
		    this.body = [];
	
		    if (loopPath) {
		      this.loopParent = loopPath.parent;
		      this.loopLabel = t.isLabeledStatement(this.loopParent) && this.loopParent.label;
		      this.loopPath = loopPath;
		      this.loop = loopPath.node;
		    }
		  }
	
		  /**
		   * Start the ball rolling.
		   */
	
		  BlockScoping.prototype.run = function run() {
		    var block = this.block;
		    if (block._letDone) return;
		    block._letDone = true;
	
		    var needsClosure = this.getLetReferences();
	
		    // this is a block within a `Function/Program` so we can safely leave it be
		    if (t.isFunction(this.parent) || t.isProgram(this.block)) {
		      this.updateScopeInfo();
		      return;
		    }
	
		    // we can skip everything
		    if (!this.hasLetReferences) return;
	
		    if (needsClosure) {
		      this.wrapClosure();
		    } else {
		      this.remap();
		    }
	
		    this.updateScopeInfo();
	
		    if (this.loopLabel && !t.isLabeledStatement(this.loopParent)) {
		      return t.labeledStatement(this.loopLabel, this.loop);
		    }
		  };
	
		  BlockScoping.prototype.updateScopeInfo = function updateScopeInfo() {
		    var scope = this.scope;
		    var parentScope = scope.getFunctionParent();
		    var letRefs = this.letReferences;
	
		    for (var key in letRefs) {
		      var ref = letRefs[key];
		      var binding = scope.getBinding(ref.name);
		      if (!binding) continue;
		      if (binding.kind === "let" || binding.kind === "const") {
		        binding.kind = "var";
		        scope.moveBindingTo(ref.name, parentScope);
		      }
		    }
		  };
	
		  BlockScoping.prototype.remap = function remap() {
		    var hasRemaps = false;
		    var letRefs = this.letReferences;
		    var scope = this.scope;
	
		    // alright, so since we aren't wrapping this block in a closure
		    // we have to check if any of our let variables collide with
		    // those in upper scopes and then if they do, generate a uid
		    // for them and replace all references with it
		    var remaps = _Object$create(null);
	
		    for (var key in letRefs) {
		      // just an Identifier node we collected in `getLetReferences`
		      // this is the defining identifier of a declaration
		      var ref = letRefs[key];
	
		      // todo: could skip this if the colliding binding is in another function
		      if (scope.parentHasBinding(key) || scope.hasGlobal(key)) {
		        var uid = scope.generateUidIdentifier(ref.name).name;
		        ref.name = uid;
	
		        hasRemaps = true;
		        remaps[key] = remaps[uid] = {
		          binding: ref,
		          uid: uid
		        };
		      }
		    }
	
		    if (!hasRemaps) return;
	
		    //
	
		    var loop = this.loop;
		    if (loop) {
		      traverseReplace(loop.right, loop, scope, remaps);
		      traverseReplace(loop.test, loop, scope, remaps);
		      traverseReplace(loop.update, loop, scope, remaps);
		    }
	
		    this.blockPath.traverse(replaceVisitor, remaps);
		  };
	
		  BlockScoping.prototype.wrapClosure = function wrapClosure() {
		    var block = this.block;
	
		    var outsideRefs = this.outsideLetReferences;
	
		    // remap loop heads with colliding variables
		    if (this.loop) {
		      for (var _name5 in outsideRefs) {
		        var id = outsideRefs[_name5];
	
		        if (this.scope.hasGlobal(id.name) || this.scope.parentHasBinding(id.name)) {
		          delete outsideRefs[id.name];
		          delete this.letReferences[id.name];
	
		          this.scope.rename(id.name);
	
		          this.letReferences[id.name] = id;
		          outsideRefs[id.name] = id;
		        }
		      }
		    }
	
		    // if we're inside of a for loop then we search to see if there are any
		    // `break`s, `continue`s, `return`s etc
		    this.has = this.checkLoop();
	
		    // hoist let references to retain scope
		    this.hoistVarDeclarations();
	
		    // turn outsideLetReferences into an array
		    var params = _lodashObjectValues2["default"](outsideRefs);
		    var args = _lodashObjectValues2["default"](outsideRefs);
	
		    // build the closure that we're going to wrap the block with
		    var fn = t.functionExpression(null, params, t.blockStatement(block.body));
		    fn.shadow = true;
	
		    // continuation
		    this.addContinuations(fn);
	
		    // replace the current block body with the one we're going to build
		    block.body = this.body;
	
		    var ref = fn;
	
		    if (this.loop) {
		      ref = this.scope.generateUidIdentifier("loop");
		      this.loopPath.insertBefore(t.variableDeclaration("var", [t.variableDeclarator(ref, fn)]));
		    }
	
		    // build a call and a unique id that we can assign the return value to
		    var call = t.callExpression(ref, args);
		    var ret = this.scope.generateUidIdentifier("ret");
	
		    // handle generators
		    var hasYield = _babelTraverse2["default"].hasType(fn.body, this.scope, "YieldExpression", t.FUNCTION_TYPES);
		    if (hasYield) {
		      fn.generator = true;
		      call = t.yieldExpression(call, true);
		    }
	
		    // handlers async functions
		    var hasAsync = _babelTraverse2["default"].hasType(fn.body, this.scope, "AwaitExpression", t.FUNCTION_TYPES);
		    if (hasAsync) {
		      fn.async = true;
		      call = t.awaitExpression(call);
		    }
	
		    this.buildClosure(ret, call);
		  };
	
		  /**
		   * Push the closure to the body.
		   */
	
		  BlockScoping.prototype.buildClosure = function buildClosure(ret, call) {
		    var has = this.has;
		    if (has.hasReturn || has.hasBreakContinue) {
		      this.buildHas(ret, call);
		    } else {
		      this.body.push(t.expressionStatement(call));
		    }
		  };
	
		  /**
		   * If any of the outer let variables are reassigned then we need to rename them in
		   * the closure so we can get direct access to the outer variable to continue the
		   * iteration with bindings based on each iteration.
		   *
		   * Reference: https://github.com/babel/babel/issues/1078
		   */
	
		  BlockScoping.prototype.addContinuations = function addContinuations(fn) {
		    var state = {
		      reassignments: {},
		      outsideReferences: this.outsideLetReferences
		    };
	
		    this.scope.traverse(fn, continuationVisitor, state);
	
		    for (var i = 0; i < fn.params.length; i++) {
		      var param = fn.params[i];
		      if (!state.reassignments[param.name]) continue;
	
		      var newParam = this.scope.generateUidIdentifier(param.name);
		      fn.params[i] = newParam;
	
		      this.scope.rename(param.name, newParam.name, fn);
	
		      // assign outer reference as it's been modified internally and needs to be retained
		      fn.body.body.push(t.expressionStatement(t.assignmentExpression("=", param, newParam)));
		    }
		  };
	
		  BlockScoping.prototype.getLetReferences = function getLetReferences() {
		    var block = this.block;
	
		    var declarators = [];
	
		    if (this.loop) {
		      var init = this.loop.left || this.loop.init;
		      if (isBlockScoped(init)) {
		        declarators.push(init);
		        _lodashObjectExtend2["default"](this.outsideLetReferences, t.getBindingIdentifiers(init));
		      }
		    }
	
		    //
		    if (block.body) {
		      for (var i = 0; i < block.body.length; i++) {
		        var declar = block.body[i];
		        if (t.isClassDeclaration(declar) || t.isFunctionDeclaration(declar) || isBlockScoped(declar)) {
		          var declarPath = this.blockPath.get("body")[i];
		          if (isBlockScoped(declar)) {
		            convertBlockScopedToVar(declarPath, block, this.scope);
		          }
		          declarators = declarators.concat(declar.declarations || declar);
		        }
		      }
		    }
	
		    //
		    for (var i = 0; i < declarators.length; i++) {
		      var declar = declarators[i];
		      var keys = t.getBindingIdentifiers(declar);
		      _lodashObjectExtend2["default"](this.letReferences, keys);
		      this.hasLetReferences = true;
		    }
	
		    // no let references so we can just quit
		    if (!this.hasLetReferences) return;
	
		    var state = {
		      letReferences: this.letReferences,
		      closurify: false,
		      file: this.file
		    };
	
		    // traverse through this block, stopping on functions and checking if they
		    // contain any local let references
		    this.blockPath.traverse(letReferenceBlockVisitor, state);
	
		    return state.closurify;
		  };
	
		  /**
		   * If we're inside of a loop then traverse it and check if it has one of
		   * the following node types `ReturnStatement`, `BreakStatement`,
		   * `ContinueStatement` and replace it with a return value that we can track
		   * later on.
		   */
	
		  BlockScoping.prototype.checkLoop = function checkLoop() {
		    var state = {
		      hasBreakContinue: false,
		      ignoreLabeless: false,
		      inSwitchCase: false,
		      innerLabels: [],
		      hasReturn: false,
		      isLoop: !!this.loop,
		      map: {},
		      LOOP_IGNORE: _Symbol()
		    };
	
		    this.blockPath.traverse(loopLabelVisitor, state);
		    this.blockPath.traverse(loopVisitor, state);
	
		    return state;
		  };
	
		  /**
		   * Hoist all let declarations in this block to before it so they retain scope
		   * once we wrap everything in a closure.
		   */
	
		  BlockScoping.prototype.hoistVarDeclarations = function hoistVarDeclarations() {
		    this.blockPath.traverse(hoistVarDeclarationsVisitor, this);
		  };
	
		  /**
		   * Turn a `VariableDeclaration` into an array of `AssignmentExpressions` with
		   * their declarations hoisted to before the closure wrapper.
		   */
	
		  BlockScoping.prototype.pushDeclar = function pushDeclar(node) {
		    var declars = [];
		    var names = t.getBindingIdentifiers(node);
		    for (var _name6 in names) {
		      declars.push(t.variableDeclarator(names[_name6]));
		    }
	
		    this.body.push(t.variableDeclaration(node.kind, declars));
	
		    var replace = [];
	
		    for (var i = 0; i < node.declarations.length; i++) {
		      var declar = node.declarations[i];
		      if (!declar.init) continue;
	
		      var expr = t.assignmentExpression("=", declar.id, declar.init);
		      replace.push(t.inherits(expr, declar));
		    }
	
		    return replace;
		  };
	
		  BlockScoping.prototype.buildHas = function buildHas(ret, call) {
		    var body = this.body;
	
		    body.push(t.variableDeclaration("var", [t.variableDeclarator(ret, call)]));
	
		    var retCheck = undefined;
		    var has = this.has;
		    var cases = [];
	
		    if (has.hasReturn) {
		      // typeof ret === "object"
		      retCheck = buildRetCheck({
		        RETURN: ret
		      });
		    }
	
		    if (has.hasBreakContinue) {
		      for (var key in has.map) {
		        cases.push(t.switchCase(t.stringLiteral(key), [has.map[key]]));
		      }
	
		      if (has.hasReturn) {
		        cases.push(t.switchCase(null, [retCheck]));
		      }
	
		      if (cases.length === 1) {
		        var single = cases[0];
		        body.push(t.ifStatement(t.binaryExpression("===", ret, single.test), single.consequent[0]));
		      } else {
		        // https://github.com/babel/babel/issues/998
		        for (var i = 0; i < cases.length; i++) {
		          var caseConsequent = cases[i].consequent[0];
		          if (t.isBreakStatement(caseConsequent) && !caseConsequent.label) {
		            caseConsequent.label = this.loopLabel = this.loopLabel || this.scope.generateUidIdentifier("loop");
		          }
		        }
	
		        body.push(t.switchStatement(ret, cases));
		      }
		    } else {
		      if (has.hasReturn) {
		        body.push(retCheck);
		      }
		    }
		  };
	
		  return BlockScoping;
		})();
	
		module.exports = exports["default"];
	
	/***/ },
	/* 78 */
	/*!**************************************************************!*\
	  !*** ./~/babel-plugin-transform-es2015-classes/lib/index.js ***!
	  \**************************************************************/
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
	
		var _Symbol = __webpack_require__(/*! babel-runtime/core-js/symbol */ 16)["default"];
	
		var _interopRequireDefault = __webpack_require__(/*! babel-runtime/helpers/interop-require-default */ 1)["default"];
	
		exports.__esModule = true;
	
		var _loose = __webpack_require__(/*! ./loose */ 306);
	
		var _loose2 = _interopRequireDefault(_loose);
	
		var _vanilla = __webpack_require__(/*! ./vanilla */ 174);
	
		var _vanilla2 = _interopRequireDefault(_vanilla);
	
		var _babelHelperFunctionName = __webpack_require__(/*! babel-helper-function-name */ 51);
	
		var _babelHelperFunctionName2 = _interopRequireDefault(_babelHelperFunctionName);
	
		exports["default"] = function (_ref) {
		  var t = _ref.types;
	
		  // todo: investigate traversal requeueing
		  var VISITED = _Symbol();
	
		  return {
		    visitor: {
		      ExportDefaultDeclaration: function ExportDefaultDeclaration(path) {
		        if (!path.get("declaration").isClassDeclaration()) return;
	
		        var node = path.node;
	
		        var ref = node.declaration.id || path.scope.generateUidIdentifier("class");
		        node.declaration.id = ref;
	
		        // Split the class declaration and the export into two separate statements.
		        path.replaceWith(node.declaration);
		        path.insertAfter(t.exportDefaultDeclaration(ref));
		      },
	
		      ClassDeclaration: function ClassDeclaration(path) {
		        var node = path.node;
	
		        var ref = node.id || path.scope.generateUidIdentifier("class");
	
		        path.replaceWith(t.variableDeclaration("let", [t.variableDeclarator(ref, t.toExpression(node))]));
		      },
	
		      ClassExpression: function ClassExpression(path, state) {
		        var node = path.node;
	
		        if (node[VISITED]) return;
	
		        var inferred = _babelHelperFunctionName2["default"](path);
		        if (inferred && inferred !== node) return path.replaceWith(inferred);
	
		        node[VISITED] = true;
	
		        var Constructor = _vanilla2["default"];
		        if (state.opts.loose) Constructor = _loose2["default"];
	
		        path.replaceWith(new Constructor(path, state.file).run());
		      }
		    }
		  };
		};
	
		module.exports = exports["default"];
	
	/***/ },
	/* 79 */
	/*!**************************************************************************!*\
	  !*** ./~/babel-plugin-transform-es2015-computed-properties/lib/index.js ***!
	  \**************************************************************************/
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
	
		var _getIterator = __webpack_require__(/*! babel-runtime/core-js/get-iterator */ 4)["default"];
	
		exports.__esModule = true;
	
		exports["default"] = function (_ref4) {
		  var t = _ref4.types;
		  var template = _ref4.template;
	
		  var buildMutatorMapAssign = template("\n    MUTATOR_MAP_REF[KEY] = MUTATOR_MAP_REF[KEY] || {};\n    MUTATOR_MAP_REF[KEY].KIND = VALUE;\n  ");
	
		  function getValue(prop) {
		    if (t.isObjectProperty(prop)) {
		      return prop.value;
		    } else if (t.isObjectMethod(prop)) {
		      return t.functionExpression(null, prop.params, prop.body, prop.generator, prop.async);
		    }
		  }
	
		  function pushAssign(objId, prop, body) {
		    if (prop.kind === "get" && prop.kind === "set") {
		      pushMutatorDefine(objId, prop, body);
		    } else {
		      body.push(t.expressionStatement(t.assignmentExpression("=", t.memberExpression(objId, prop.key, prop.computed || t.isLiteral(prop.key)), getValue(prop))));
		    }
		  }
	
		  function pushMutatorDefine(_ref5, prop) {
		    var objId = _ref5.objId;
		    var body = _ref5.body;
		    var getMutatorId = _ref5.getMutatorId;
		    var scope = _ref5.scope;
	
		    var key = !prop.computed && t.isIdentifier(prop.key) ? t.stringLiteral(prop.key.name) : prop.key;
	
		    var maybeMemoise = scope.maybeGenerateMemoised(key);
		    if (maybeMemoise) {
		      body.push(t.expressionStatement(t.assignmentExpression("=", maybeMemoise, key)));
		      key = maybeMemoise;
		    }
	
		    body.push.apply(body, buildMutatorMapAssign({
		      MUTATOR_MAP_REF: getMutatorId(),
		      KEY: key,
		      VALUE: getValue(prop),
		      KIND: t.identifier(prop.kind)
		    }));
		  }
	
		  function loose(info) {
		    for (var _iterator = info.computedProps, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _getIterator(_iterator);;) {
		      var _ref;
	
		      if (_isArray) {
		        if (_i >= _iterator.length) break;
		        _ref = _iterator[_i++];
		      } else {
		        _i = _iterator.next();
		        if (_i.done) break;
		        _ref = _i.value;
		      }
	
		      var prop = _ref;
	
		      if (prop.kind === "get" || prop.kind === "set") {
		        pushMutatorDefine(info, prop);
		      } else {
		        pushAssign(info.objId, prop, info.body);
		      }
		    }
		  }
	
		  function spec(info) {
		    var objId = info.objId;
		    var body = info.body;
		    var computedProps = info.computedProps;
		    var state = info.state;
	
		    for (var _iterator2 = computedProps, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _getIterator(_iterator2);;) {
		      var _ref2;
	
		      if (_isArray2) {
		        if (_i2 >= _iterator2.length) break;
		        _ref2 = _iterator2[_i2++];
		      } else {
		        _i2 = _iterator2.next();
		        if (_i2.done) break;
		        _ref2 = _i2.value;
		      }
	
		      var prop = _ref2;
	
		      var key = t.toComputedKey(prop);
	
		      if (prop.kind === "get" || prop.kind === "set") {
		        pushMutatorDefine(info, prop);
		      } else if (t.isStringLiteral(key, { value: "__proto__" })) {
		        pushAssign(objId, prop, body);
		      } else {
		        if (computedProps.length === 1) {
		          return t.callExpression(state.addHelper("defineProperty"), [info.initPropExpression, key, getValue(prop)]);
		        } else {
		          body.push(t.expressionStatement(t.callExpression(state.addHelper("defineProperty"), [objId, key, getValue(prop)])));
		        }
		      }
		    }
		  }
	
		  return {
		    visitor: {
		      ObjectExpression: {
		        exit: function exit(path, state) {
		          var node = path.node;
		          var parent = path.parent;
		          var scope = path.scope;
	
		          var hasComputed = false;
		          var _arr = node.properties;
		          for (var _i3 = 0; _i3 < _arr.length; _i3++) {
		            var prop = _arr[_i3];
		            hasComputed = prop.computed === true;
		            if (hasComputed) break;
		          }
		          if (!hasComputed) return;
	
		          // put all getters/setters into the first object expression as well as all initialisers up
		          // to the first computed property
	
		          var initProps = [];
		          var computedProps = [];
		          var foundComputed = false;
	
		          for (var _iterator3 = node.properties, _isArray3 = Array.isArray(_iterator3), _i4 = 0, _iterator3 = _isArray3 ? _iterator3 : _getIterator(_iterator3);;) {
		            var _ref3;
	
		            if (_isArray3) {
		              if (_i4 >= _iterator3.length) break;
		              _ref3 = _iterator3[_i4++];
		            } else {
		              _i4 = _iterator3.next();
		              if (_i4.done) break;
		              _ref3 = _i4.value;
		            }
	
		            var prop = _ref3;
	
		            if (prop.computed) {
		              foundComputed = true;
		            }
	
		            if (foundComputed) {
		              computedProps.push(prop);
		            } else {
		              initProps.push(prop);
		            }
		          }
	
		          var objId = scope.generateUidIdentifierBasedOnNode(parent);
		          var initPropExpression = t.objectExpression(initProps);
		          var body = [];
	
		          body.push(t.variableDeclaration("var", [t.variableDeclarator(objId, initPropExpression)]));
	
		          var callback = spec;
		          if (state.opts.loose) callback = loose;
	
		          var mutatorRef = undefined;
	
		          var getMutatorId = function getMutatorId() {
		            if (!mutatorRef) {
		              mutatorRef = scope.generateUidIdentifier("mutatorMap");
	
		              body.push(t.variableDeclaration("var", [t.variableDeclarator(mutatorRef, t.objectExpression([]))]));
		            }
	
		            return mutatorRef;
		          };
	
		          var single = callback({
		            scope: scope,
		            objId: objId,
		            body: body,
		            computedProps: computedProps,
		            initPropExpression: initPropExpression,
		            getMutatorId: getMutatorId,
		            state: state
		          });
	
		          if (mutatorRef) {
		            body.push(t.expressionStatement(t.callExpression(state.addHelper("defineEnumerableProperties"), [objId, mutatorRef])));
		          }
	
		          if (single) {
		            path.replaceWith(single);
		          } else {
		            body.push(t.expressionStatement(objId));
		            path.replaceWithMultiple(body);
		          }
		        }
		      }
		    }
		  };
		};
	
		module.exports = exports["default"];
	
	/***/ },
	/* 80 */
	/*!********************************************************************!*\
	  !*** ./~/babel-plugin-transform-es2015-destructuring/lib/index.js ***!
	  \********************************************************************/
	/***/ function(module, exports, __webpack_require__) {
	
		/* eslint max-len: 0 */
	
		"use strict";
	
		var _classCallCheck = __webpack_require__(/*! babel-runtime/helpers/class-call-check */ 5)["default"];
	
		exports.__esModule = true;
	
		exports["default"] = function (_ref) {
		  var t = _ref.types;
	
		  /**
		   * Test if a VariableDeclaration's declarations contains any Patterns.
		   */
	
		  function variableDeclarationHasPattern(node) {
		    var _arr = node.declarations;
	
		    for (var _i = 0; _i < _arr.length; _i++) {
		      var declar = _arr[_i];
		      if (t.isPattern(declar.id)) {
		        return true;
		      }
		    }
		    return false;
		  }
	
		  /**
		   * Test if an ArrayPattern's elements contain any RestElements.
		   */
	
		  function hasRest(pattern) {
		    var _arr2 = pattern.elements;
	
		    for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
		      var elem = _arr2[_i2];
		      if (t.isRestElement(elem)) {
		        return true;
		      }
		    }
		    return false;
		  }
	
		  var arrayUnpackVisitor = {
		    ReferencedIdentifier: function ReferencedIdentifier(path, state) {
		      if (state.bindings[path.node.name]) {
		        state.deopt = true;
		        path.stop();
		      }
		    }
		  };
	
		  var DestructuringTransformer = (function () {
		    function DestructuringTransformer(opts) {
		      _classCallCheck(this, DestructuringTransformer);
	
		      this.blockHoist = opts.blockHoist;
		      this.operator = opts.operator;
		      this.arrays = {};
		      this.nodes = opts.nodes || [];
		      this.scope = opts.scope;
		      this.file = opts.file;
		      this.kind = opts.kind;
		    }
	
		    DestructuringTransformer.prototype.buildVariableAssignment = function buildVariableAssignment(id, init) {
		      var op = this.operator;
		      if (t.isMemberExpression(id)) op = "=";
	
		      var node = undefined;
	
		      if (op) {
		        node = t.expressionStatement(t.assignmentExpression(op, id, init));
		      } else {
		        node = t.variableDeclaration(this.kind, [t.variableDeclarator(id, init)]);
		      }
	
		      node._blockHoist = this.blockHoist;
	
		      return node;
		    };
	
		    DestructuringTransformer.prototype.buildVariableDeclaration = function buildVariableDeclaration(id, init) {
		      var declar = t.variableDeclaration("var", [t.variableDeclarator(id, init)]);
		      declar._blockHoist = this.blockHoist;
		      return declar;
		    };
	
		    DestructuringTransformer.prototype.push = function push(id, init) {
		      if (t.isObjectPattern(id)) {
		        this.pushObjectPattern(id, init);
		      } else if (t.isArrayPattern(id)) {
		        this.pushArrayPattern(id, init);
		      } else if (t.isAssignmentPattern(id)) {
		        this.pushAssignmentPattern(id, init);
		      } else {
		        this.nodes.push(this.buildVariableAssignment(id, init));
		      }
		    };
	
		    DestructuringTransformer.prototype.toArray = function toArray(node, count) {
		      if (this.file.opts.loose || t.isIdentifier(node) && this.arrays[node.name]) {
		        return node;
		      } else {
		        return this.scope.toArray(node, count);
		      }
		    };
	
		    DestructuringTransformer.prototype.pushAssignmentPattern = function pushAssignmentPattern(pattern, valueRef) {
		      // we need to assign the current value of the assignment to avoid evaluating
		      // it more than once
	
		      var tempValueRef = this.scope.generateUidIdentifierBasedOnNode(valueRef);
	
		      var declar = t.variableDeclaration("var", [t.variableDeclarator(tempValueRef, valueRef)]);
		      declar._blockHoist = this.blockHoist;
		      this.nodes.push(declar);
	
		      //
	
		      var tempConditional = t.conditionalExpression(t.binaryExpression("===", tempValueRef, t.identifier("undefined")), pattern.right, tempValueRef);
	
		      var left = pattern.left;
		      if (t.isPattern(left)) {
		        var tempValueDefault = t.expressionStatement(t.assignmentExpression("=", tempValueRef, tempConditional));
		        tempValueDefault._blockHoist = this.blockHoist;
	
		        this.nodes.push(tempValueDefault);
		        this.push(left, tempValueRef);
		      } else {
		        this.nodes.push(this.buildVariableAssignment(left, tempConditional));
		      }
		    };
	
		    DestructuringTransformer.prototype.pushObjectRest = function pushObjectRest(pattern, objRef, spreadProp, spreadPropIndex) {
		      // get all the keys that appear in this object before the current spread
	
		      var keys = [];
	
		      for (var i = 0; i < pattern.properties.length; i++) {
		        var prop = pattern.properties[i];
	
		        // we've exceeded the index of the spread property to all properties to the
		        // right need to be ignored
		        if (i >= spreadPropIndex) break;
	
		        // ignore other spread properties
		        if (t.isRestProperty(prop)) continue;
	
		        var key = prop.key;
		        if (t.isIdentifier(key) && !prop.computed) key = t.stringLiteral(prop.key.name);
		        keys.push(key);
		      }
	
		      keys = t.arrayExpression(keys);
	
		      //
	
		      var value = t.callExpression(this.file.addHelper("objectWithoutProperties"), [objRef, keys]);
		      this.nodes.push(this.buildVariableAssignment(spreadProp.argument, value));
		    };
	
		    DestructuringTransformer.prototype.pushObjectProperty = function pushObjectProperty(prop, propRef) {
		      if (t.isLiteral(prop.key)) prop.computed = true;
	
		      var pattern = prop.value;
		      var objRef = t.memberExpression(propRef, prop.key, prop.computed);
	
		      if (t.isPattern(pattern)) {
		        this.push(pattern, objRef);
		      } else {
		        this.nodes.push(this.buildVariableAssignment(pattern, objRef));
		      }
		    };
	
		    DestructuringTransformer.prototype.pushObjectPattern = function pushObjectPattern(pattern, objRef) {
		      // https://github.com/babel/babel/issues/681
	
		      if (!pattern.properties.length) {
		        this.nodes.push(t.expressionStatement(t.callExpression(this.file.addHelper("objectDestructuringEmpty"), [objRef])));
		      }
	
		      // if we have more than one properties in this pattern and the objectRef is a
		      // member expression then we need to assign it to a temporary variable so it's
		      // only evaluated once
	
		      if (pattern.properties.length > 1 && !this.scope.isStatic(objRef)) {
		        var temp = this.scope.generateUidIdentifierBasedOnNode(objRef);
		        this.nodes.push(this.buildVariableDeclaration(temp, objRef));
		        objRef = temp;
		      }
	
		      //
	
		      for (var i = 0; i < pattern.properties.length; i++) {
		        var prop = pattern.properties[i];
		        if (t.isRestProperty(prop)) {
		          this.pushObjectRest(pattern, objRef, prop, i);
		        } else {
		          this.pushObjectProperty(prop, objRef);
		        }
		      }
		    };
	
		    DestructuringTransformer.prototype.canUnpackArrayPattern = function canUnpackArrayPattern(pattern, arr) {
		      // not an array so there's no way we can deal with this
		      if (!t.isArrayExpression(arr)) return false;
	
		      // pattern has less elements than the array and doesn't have a rest so some
		      // elements wont be evaluated
		      if (pattern.elements.length > arr.elements.length) return;
		      if (pattern.elements.length < arr.elements.length && !hasRest(pattern)) return false;
	
		      var _arr3 = pattern.elements;
		      for (var _i3 = 0; _i3 < _arr3.length; _i3++) {
		        var elem = _arr3[_i3];
		        // deopt on holes
		        if (!elem) return false;
	
		        // deopt on member expressions as they may be included in the RHS
		        if (t.isMemberExpression(elem)) return false;
		      }
	
		      var _arr4 = arr.elements;
		      for (var _i4 = 0; _i4 < _arr4.length; _i4++) {
		        var elem = _arr4[_i4];
		        // deopt on spread elements
		        if (t.isSpreadElement(elem)) return false;
		      }
	
		      // deopt on reference to left side identifiers
		      var bindings = t.getBindingIdentifiers(pattern);
		      var state = { deopt: false, bindings: bindings };
		      this.scope.traverse(arr, arrayUnpackVisitor, state);
		      return !state.deopt;
		    };
	
		    DestructuringTransformer.prototype.pushUnpackedArrayPattern = function pushUnpackedArrayPattern(pattern, arr) {
		      for (var i = 0; i < pattern.elements.length; i++) {
		        var elem = pattern.elements[i];
		        if (t.isRestElement(elem)) {
		          this.push(elem.argument, t.arrayExpression(arr.elements.slice(i)));
		        } else {
		          this.push(elem, arr.elements[i]);
		        }
		      }
		    };
	
		    DestructuringTransformer.prototype.pushArrayPattern = function pushArrayPattern(pattern, arrayRef) {
		      if (!pattern.elements) return;
	
		      // optimise basic array destructuring of an array expression
		      //
		      // we can't do this to a pattern of unequal size to it's right hand
		      // array expression as then there will be values that wont be evaluated
		      //
		      // eg: let [a, b] = [1, 2];
	
		      if (this.canUnpackArrayPattern(pattern, arrayRef)) {
		        return this.pushUnpackedArrayPattern(pattern, arrayRef);
		      }
	
		      // if we have a rest then we need all the elements so don't tell
		      // `scope.toArray` to only get a certain amount
	
		      var count = !hasRest(pattern) && pattern.elements.length;
	
		      // so we need to ensure that the `arrayRef` is an array, `scope.toArray` will
		      // return a locally bound identifier if it's been inferred to be an array,
		      // otherwise it'll be a call to a helper that will ensure it's one
	
		      var toArray = this.toArray(arrayRef, count);
	
		      if (t.isIdentifier(toArray)) {
		        // we've been given an identifier so it must have been inferred to be an
		        // array
		        arrayRef = toArray;
		      } else {
		        arrayRef = this.scope.generateUidIdentifierBasedOnNode(arrayRef);
		        this.arrays[arrayRef.name] = true;
		        this.nodes.push(this.buildVariableDeclaration(arrayRef, toArray));
		      }
	
		      //
	
		      for (var i = 0; i < pattern.elements.length; i++) {
		        var elem = pattern.elements[i];
	
		        // hole
		        if (!elem) continue;
	
		        var elemRef = undefined;
	
		        if (t.isRestElement(elem)) {
		          elemRef = this.toArray(arrayRef);
	
		          if (i > 0) {
		            elemRef = t.callExpression(t.memberExpression(elemRef, t.identifier("slice")), [t.numericLiteral(i)]);
		          }
	
		          // set the element to the rest element argument since we've dealt with it
		          // being a rest already
		          elem = elem.argument;
		        } else {
		          elemRef = t.memberExpression(arrayRef, t.numericLiteral(i), true);
		        }
	
		        this.push(elem, elemRef);
		      }
		    };
	
		    DestructuringTransformer.prototype.init = function init(pattern, ref) {
		      // trying to destructure a value that we can't evaluate more than once so we
		      // need to save it to a variable
	
		      if (!t.isArrayExpression(ref) && !t.isMemberExpression(ref)) {
		        var memo = this.scope.maybeGenerateMemoised(ref, true);
		        if (memo) {
		          this.nodes.push(this.buildVariableDeclaration(memo, ref));
		          ref = memo;
		        }
		      }
	
		      //
	
		      this.push(pattern, ref);
	
		      return this.nodes;
		    };
	
		    return DestructuringTransformer;
		  })();
	
		  return {
		    visitor: {
		      ExportNamedDeclaration: function ExportNamedDeclaration(path) {
		        var declaration = path.get("declaration");
		        if (!declaration.isVariableDeclaration()) return;
		        if (!variableDeclarationHasPattern(declaration.node)) return;
	
		        var specifiers = [];
	
		        for (var _name in path.getOuterBindingIdentifiers(path)) {
		          var id = t.identifier(_name);
		          specifiers.push(t.exportSpecifier(id, id));
		        }
	
		        // Split the declaration and export list into two declarations so that the variable
		        // declaration can be split up later without needing to worry about not being a
		        // top-level statement.
		        path.replaceWith(declaration.node);
		        path.insertAfter(t.exportNamedDeclaration(null, specifiers));
		      },
	
		      ForXStatement: function ForXStatement(path, file) {
		        var node = path.node;
		        var scope = path.scope;
	
		        var left = node.left;
	
		        if (t.isPattern(left)) {
		          // for ({ length: k } in { abc: 3 });
	
		          var temp = scope.generateUidIdentifier("ref");
	
		          node.left = t.variableDeclaration("var", [t.variableDeclarator(temp)]);
	
		          path.ensureBlock();
	
		          node.body.body.unshift(t.variableDeclaration("var", [t.variableDeclarator(left, temp)]));
	
		          return;
		        }
	
		        if (!t.isVariableDeclaration(left)) return;
	
		        var pattern = left.declarations[0].id;
		        if (!t.isPattern(pattern)) return;
	
		        var key = scope.generateUidIdentifier("ref");
		        node.left = t.variableDeclaration(left.kind, [t.variableDeclarator(key, null)]);
	
		        var nodes = [];
	
		        var destructuring = new DestructuringTransformer({
		          kind: left.kind,
		          file: file,
		          scope: scope,
		          nodes: nodes
		        });
	
		        destructuring.init(pattern, key);
	
		        path.ensureBlock();
	
		        var block = node.body;
		        block.body = nodes.concat(block.body);
		      },
	
		      CatchClause: function CatchClause(_ref2, file) {
		        var node = _ref2.node;
		        var scope = _ref2.scope;
	
		        var pattern = node.param;
		        if (!t.isPattern(pattern)) return;
	
		        var ref = scope.generateUidIdentifier("ref");
		        node.param = ref;
	
		        var nodes = [];
	
		        var destructuring = new DestructuringTransformer({
		          kind: "let",
		          file: file,
		          scope: scope,
		          nodes: nodes
		        });
		        destructuring.init(pattern, ref);
	
		        node.body.body = nodes.concat(node.body.body);
		      },
	
		      AssignmentExpression: function AssignmentExpression(path, file) {
		        var node = path.node;
		        var scope = path.scope;
	
		        if (!t.isPattern(node.left)) return;
	
		        var nodes = [];
	
		        var destructuring = new DestructuringTransformer({
		          operator: node.operator,
		          file: file,
		          scope: scope,
		          nodes: nodes
		        });
	
		        var ref = undefined;
		        if (path.isCompletionRecord() || !path.parentPath.isExpressionStatement()) {
		          ref = scope.generateUidIdentifierBasedOnNode(node.right, "ref");
	
		          nodes.push(t.variableDeclaration("var", [t.variableDeclarator(ref, node.right)]));
	
		          if (t.isArrayExpression(node.right)) {
		            destructuring.arrays[ref.name] = true;
		          }
		        }
	
		        destructuring.init(node.left, ref || node.right);
	
		        if (ref) {
		          nodes.push(t.expressionStatement(ref));
		        }
	
		        path.replaceWithMultiple(nodes);
		      },
	
		      VariableDeclaration: function VariableDeclaration(path, file) {
		        var node = path.node;
		        var scope = path.scope;
		        var parent = path.parent;
	
		        if (t.isForXStatement(parent)) return;
		        if (!parent || !path.container) return; // i don't know why this is necessary - TODO
		        if (!variableDeclarationHasPattern(node)) return;
	
		        var nodes = [];
		        var declar = undefined;
	
		        for (var i = 0; i < node.declarations.length; i++) {
		          declar = node.declarations[i];
	
		          var patternId = declar.init;
		          var pattern = declar.id;
	
		          var destructuring = new DestructuringTransformer({
		            blockHoist: node._blockHoist,
		            nodes: nodes,
		            scope: scope,
		            kind: node.kind,
		            file: file
		          });
	
		          if (t.isPattern(pattern)) {
		            destructuring.init(pattern, patternId);
	
		            if (+i !== node.declarations.length - 1) {
		              // we aren't the last declarator so let's just make the
		              // last transformed node inherit from us
		              t.inherits(nodes[nodes.length - 1], declar);
		            }
		          } else {
		            nodes.push(t.inherits(destructuring.buildVariableAssignment(declar.id, declar.init), declar));
		          }
		        }
	
		        path.replaceWithMultiple(nodes);
		      }
		    }
		  };
		};
	
		module.exports = exports["default"];
	
	/***/ },
	/* 81 */
	/*!*************************************************************!*\
	  !*** ./~/babel-plugin-transform-es2015-for-of/lib/index.js ***!
	  \*************************************************************/
	/***/ function(module, exports) {
	
		/* eslint max-len: 0 */
	
		"use strict";
	
		exports.__esModule = true;
	
		exports["default"] = function (_ref) {
		  var messages = _ref.messages;
		  var template = _ref.template;
		  var t = _ref.types;
	
		  var buildForOfArray = template("\n    for (var KEY = 0; KEY < ARR.length; KEY++) BODY;\n  ");
	
		  var buildForOfLoose = template("\n    for (var LOOP_OBJECT = OBJECT,\n             IS_ARRAY = Array.isArray(LOOP_OBJECT),\n             INDEX = 0,\n             LOOP_OBJECT = IS_ARRAY ? LOOP_OBJECT : LOOP_OBJECT[Symbol.iterator]();;) {\n      var ID;\n      if (IS_ARRAY) {\n        if (INDEX >= LOOP_OBJECT.length) break;\n        ID = LOOP_OBJECT[INDEX++];\n      } else {\n        INDEX = LOOP_OBJECT.next();\n        if (INDEX.done) break;\n        ID = INDEX.value;\n      }\n    }\n  ");
	
		  var buildForOf = template("\n    var ITERATOR_COMPLETION = true;\n    var ITERATOR_HAD_ERROR_KEY = false;\n    var ITERATOR_ERROR_KEY = undefined;\n    try {\n      for (var ITERATOR_KEY = OBJECT[Symbol.iterator](), STEP_KEY; !(ITERATOR_COMPLETION = (STEP_KEY = ITERATOR_KEY.next()).done); ITERATOR_COMPLETION = true) {\n      }\n    } catch (err) {\n      ITERATOR_HAD_ERROR_KEY = true;\n      ITERATOR_ERROR_KEY = err;\n    } finally {\n      try {\n        if (!ITERATOR_COMPLETION && ITERATOR_KEY.return) {\n          ITERATOR_KEY.return();\n        }\n      } finally {\n        if (ITERATOR_HAD_ERROR_KEY) {\n          throw ITERATOR_ERROR_KEY;\n        }\n      }\n    }\n  ");
	
		  function _ForOfStatementArray(path) {
		    var node = path.node;
		    var scope = path.scope;
	
		    var nodes = [];
		    var right = node.right;
	
		    if (!t.isIdentifier(right) || !scope.hasBinding(right.name)) {
		      var uid = scope.generateUidIdentifier("arr");
		      nodes.push(t.variableDeclaration("var", [t.variableDeclarator(uid, right)]));
		      right = uid;
		    }
	
		    var iterationKey = scope.generateUidIdentifier("i");
	
		    var loop = buildForOfArray({
		      BODY: node.body,
		      KEY: iterationKey,
		      ARR: right
		    });
	
		    t.inherits(loop, node);
		    t.ensureBlock(loop);
	
		    var iterationValue = t.memberExpression(right, iterationKey, true);
	
		    var left = node.left;
		    if (t.isVariableDeclaration(left)) {
		      left.declarations[0].init = iterationValue;
		      loop.body.body.unshift(left);
		    } else {
		      loop.body.body.unshift(t.expressionStatement(t.assignmentExpression("=", left, iterationValue)));
		    }
	
		    if (path.parentPath.isLabeledStatement()) {
		      loop = t.labeledStatement(path.parentPath.node.label, loop);
		    }
	
		    nodes.push(loop);
	
		    return nodes;
		  }
	
		  return {
		    visitor: {
		      ForOfStatement: function ForOfStatement(path, state) {
		        if (path.get("right").isArrayExpression()) {
		          return path.replaceWithMultiple(_ForOfStatementArray.call(this, path, state));
		        }
	
		        var callback = spec;
		        if (state.opts.loose) callback = loose;
	
		        var node = path.node;
	
		        var build = callback(path, state);
		        var declar = build.declar;
		        var loop = build.loop;
		        var block = loop.body;
	
		        // ensure that it's a block so we can take all its statements
		        path.ensureBlock();
	
		        // add the value declaration to the new loop body
		        if (declar) {
		          block.body.push(declar);
		        }
	
		        // push the rest of the original loop body onto our new body
		        block.body = block.body.concat(node.body.body);
	
		        t.inherits(loop, node);
		        t.inherits(loop.body, node.body);
	
		        if (build.replaceParent) {
		          path.parentPath.replaceWithMultiple(build.node);
		          path.remove();
		        } else {
		          path.replaceWithMultiple(build.node);
		        }
		      }
		    }
		  };
	
		  function loose(path, file) {
		    var node = path.node;
		    var scope = path.scope;
	
		    var left = node.left;
		    var declar = undefined,
		        id = undefined;
	
		    if (t.isIdentifier(left) || t.isPattern(left) || t.isMemberExpression(left)) {
		      // for (i of test), for ({ i } of test)
		      id = left;
		    } else if (t.isVariableDeclaration(left)) {
		      // for (let i of test)
		      id = scope.generateUidIdentifier("ref");
		      declar = t.variableDeclaration(left.kind, [t.variableDeclarator(left.declarations[0].id, id)]);
		    } else {
		      throw file.buildCodeFrameError(left, messages.get("unknownForHead", left.type));
		    }
	
		    var iteratorKey = scope.generateUidIdentifier("iterator");
		    var isArrayKey = scope.generateUidIdentifier("isArray");
	
		    var loop = buildForOfLoose({
		      LOOP_OBJECT: iteratorKey,
		      IS_ARRAY: isArrayKey,
		      OBJECT: node.right,
		      INDEX: scope.generateUidIdentifier("i"),
		      ID: id
		    });
	
		    if (!declar) {
		      // no declaration so we need to remove the variable declaration at the top of
		      // the for-of-loose template
		      loop.body.body.shift();
		    }
	
		    //
	
		    return {
		      declar: declar,
		      node: loop,
		      loop: loop
		    };
		  }
	
		  function spec(path, file) {
		    var node = path.node;
		    var scope = path.scope;
		    var parent = path.parent;
	
		    var left = node.left;
		    var declar = undefined;
	
		    var stepKey = scope.generateUidIdentifier("step");
		    var stepValue = t.memberExpression(stepKey, t.identifier("value"));
	
		    if (t.isIdentifier(left) || t.isPattern(left) || t.isMemberExpression(left)) {
		      // for (i of test), for ({ i } of test)
		      declar = t.expressionStatement(t.assignmentExpression("=", left, stepValue));
		    } else if (t.isVariableDeclaration(left))