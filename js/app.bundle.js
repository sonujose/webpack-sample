webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	angular.module('dashboard', []);

	__webpack_require__(1);
	__webpack_require__(5);
	__webpack_require__(7);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(2);

	angular.module('dashboard').directive('yepNope', __webpack_require__(4));

/***/ },
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	function YepNopeDirective() {
	  return {
	    restrict: 'E',
	    link: function (scope, element, attrs) {
	      scope.$watch(attrs.check, function (val) {
	        var words = val ? 'Yep' : 'Nope';
	        element.text(words);
	      });
	    }
	  }
	}

	module.exports = YepNopeDirective;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(2);

	angular.module('dashboard').service('GithubStatusService', __webpack_require__(6));

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	GithubStatusService.$inject = ['$http'];
	function GithubStatusService($http) {
	    var _this = this;
	    _this.getStatus = function getStatus() {
	        return $http({
	            method: 'jsonp',
	            url: 'https://status.github.com/api/status.json?callback=JSON_CALLBACK',
	            transformResponse: appendTransform($http.defaults.transformResponse, function(value) {
	                return (value.status === 'good');
	            })
	        });
	    }
	}

	function appendTransform(defaults, transform) {
	  defaults = angular.isArray(defaults) ? defaults : [defaults];
	  return defaults.concat(transform);
	}

	module.exports = GithubStatusService;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(2);

	angular.module('dashboard').controller('dashboardController', __webpack_require__(8));

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	DashboardController.$inject = ['GithubStatusService'];
	function DashboardController(gh) {
	    var _this = this;
	    _this.github = '';
	    gh.getStatus().success(function(status) {
	        _this.github = status;
	    });
	}

	module.exports = DashboardController;

/***/ }
]);