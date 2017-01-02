/******/ (function(modules) { // webpackBootstrap
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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _index = __webpack_require__(1);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Nav = new _index2.default();

	document.getElementById("react").onclick = Nav.link({ name: "react", scripts: ["dist/react.js"] });
	document.getElementById("vue").onclick = Nav.link({ name: "vue", scripts: ["dist/vue.js"] });

/***/ },
/* 1 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";

	var app = typeof window !== 'undefined' ? window : global;

	app.uNavPages = {};

	var uNav = function uNav() {
	  this.mounted = null;
	  this.loadedScripts = [];
	  this.loadedStyles = [];
	};

	uNav.prototype.link = function (_ref) {
	  var name = _ref.name,
	      _ref$scripts = _ref.scripts,
	      scripts = _ref$scripts === undefined ? undefined : _ref$scripts,
	      _ref$styles = _ref.styles,
	      styles = _ref$styles === undefined ? undefined : _ref$styles;

	  console.log(app.uNavPages);
	  if (!name) throw new Error("name is required");
	  var self = this;
	  return function (e) {
	    if (e && e.preventDefault) e.preventDefault();
	    self.mount({ name: name, scripts: scripts, styles: styles });
	  };
	};

	uNav.prototype.mount = function (page) {
	  var _this = this;

	  if (!this.mounted || page.name !== this.mounted.name) {
	    this.handleStyles(page.styles, page.name);
	    this.handleScripts(page.scripts, page.name).then(function () {
	      if (!app.uNavPages[page.name]) throw new Error("Config Not Present in " + page.name);
	      var mount = app.uNavPages[page.name].mount;
	      var unmount = app.uNavPages[page.name].unmount;
	      if (typeof mount !== "function" || typeof unmount !== "function") throw new Error("mount and unmount must be functions");
	      if (_this.mounted) _this.mounted.unmount();
	      page.mount = mount;
	      page.unmount = unmount;
	      mount();
	      _this.mounted = page;
	    });
	  }
	};

	uNav.prototype.handleScripts = function (scripts, name) {
	  var _this2 = this;

	  if (scripts && scripts.length) {
	    return Promise.all(scripts.reduce(function (p, c) {
	      var key = "C" + c.replace(/ |\.|\\|\//g, "") + "x" + name.replace(/ |\.|\\|\//g, "");
	      if (_this2.loadedScripts.indexOf(key) === -1) {
	        _this2.loadedScripts.push(key);
	        p.push(_this2.loadScript(c, key));
	      }
	      return p;
	    }, []));
	  } else {
	    return Promise.resolve();
	  }
	};

	uNav.prototype.handleStyles = function (styles, name) {
	  var _this3 = this;

	  this.loadedStyles = this.loadedStyles.map(function (s) {
	    if (s.enabled) {
	      _this3.unloadStyle(s.key);
	      return { style: s.style, key: s.key, enabled: false };
	    }
	    return s;
	  });
	  if (styles && styles.length) {
	    styles.forEach(function (style) {
	      var key = "T" + style.replace(/ |\.|\\|\//g, "") + "x" + name.replace(/ |\.|\\|\//g, "");
	      var thisStyle = _this3.loadedStyles.find(function (s) {
	        return s.key === key;
	      });
	      if (!thisStyle) {
	        _this3.loadStyle(style, key);
	        _this3.loadedStyles.push({ url: style, enabled: true, key: key });
	      } else {
	        _this3.reloadStyle(key);
	        thisStyle.enabled = true;
	      }
	    });
	  }
	};

	uNav.prototype.loadScript = function (url, id) {
	  return new Promise(function (resolve, reject) {
	    if (document) {
	      var scriptTag = document.createElement('script');
	      scriptTag.onload = resolve;
	      scriptTag.onreadystatechange = resolve;
	      scriptTag.src = url;
	      scriptTag.id = id;
	      scriptTag.type = "application/javascript";
	      document.body.appendChild(scriptTag);
	    } else {
	      reject("Not in Browser Environment");
	    }
	  });
	};

	uNav.prototype.loadStyle = function (url, id) {
	  return new Promise(function (resolve, reject) {
	    if (document) {
	      var head = document.getElementsByTagName('head')[0];
	      var link = document.createElement('link');
	      link.id = id;
	      link.rel = 'stylesheet';
	      link.type = 'text/css';
	      link.href = url;
	      link.media = 'all';
	      link.onload = resolve;
	      link.onreadystatechange = resolve;
	      head.appendChild(link);
	    } else {
	      reject("Not in Browser Environment");
	    }
	  });
	};

	uNav.prototype.unloadStyle = function (id) {
	  document.getElementById(id).disabled = true;
	};

	uNav.prototype.reloadStyle = function (id) {
	  document.getElementById(id).disabled = false;
	};

	if (typeof window !== 'undefined') {
	  window.uNav = uNav;
	}

	if (typeof module !== 'undefined' && module.exports) {
	  module.exports = uNav;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }
/******/ ]);