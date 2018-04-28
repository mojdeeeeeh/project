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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/assets/js/page/project/index-store.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (new Vuex.Store({
	state: {
		projects_data: []
	},

	getters: {
		projects: function projects(state) {
			return state.projects_data;
		}
	},

	mutations: {
		setProjects: function setProjects(state, data) {
			state.projects_data = data;
		},
		newProject: function newProject(state, data) {
			state.projects_data.push(data);
		},
		deleteProject: function deleteProject(state, data) {
			var index = state.projects_data.map(function (el) {
				return el.id;
			}).indexOf(data.id);

			state.projects_data.splice(index, 1);
		},
		updateProject: function updateProject(state, data) {
			var project = state.projects_data.filter(function (el) {
				return el.id == data.id;
			})[0];

			if (null != project) {
				project.title = data.title;
				project.start = data.start;
				project.finish = data.finish;
			}
		}
	},

	actions: {
		loadData: function loadData(context) {
			Axios.get('/projects').then(function (res) {
				return context.commit('setProjects', res.data.data);
			});
		},
		updateProject: function updateProject(context, project) {
			Axios.put('/projects/' + project.id, project).then(function (res) {
				context.commit('updateProject', res.data);

				alert('Updated');
			}).catch(function (err) {
				alert(err.message);
			});
		},
		newProject: function newProject(context, project) {
			return new Promise(function (resolve, reject) {
				Axios.post('/projects', project).then(function (res) {
					context.commit('newProject', res.data);

					resolve(res);
					alert('Inserted');
				}).catch(function (err) {
					reject(err);
					alert(err.message);
				});
			});
		},
		deleteProject: function deleteProject(context, project) {
			Axios.delete('/projects/' + project.id).then(function (res) {
				context.commit('deleteProject', project);

				alert('Deleted');
			}).catch(function (err) {
				alert(err.message);
			});
		}
	}
}));

/***/ }),

/***/ "./resources/assets/js/page/project/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_store__ = __webpack_require__("./resources/assets/js/page/project/index-store.js");


new Vue({
	el: '#root',

	data: {
		formMode: 0,
		project: {
			id: null,
			title: null,
			start: null,
			finish: null
		}
	},

	store: __WEBPACK_IMPORTED_MODULE_0__index_store__["a" /* default */],

	computed: {
		projects: function projects(state) {
			return state.$store.getters.projects;
		},
		isNormalMode: function isNormalMode(state) {
			return state.formMode == 0;
		},
		isUpdateMode: function isUpdateMode(state) {
			return state.formMode == 1;
		},
		isCreateMode: function isCreateMode(state) {
			return state.formMode == 2;
		}

	},

	mounted: function mounted() {
		this.$store.dispatch('loadData');
	},


	methods: {
		emptyProject: function emptyProject() {
			this.project.id = null;
			this.project.title = null;
			this.project.start = null;
			this.project.finish = null;
		},
		cancel: function cancel() {
			this.formMode = 0;
		},
		showUpdateForm: function showUpdateForm(project) {
			this.project = Object.assign({}, project);
			this.formMode = 1;
		},
		updateProject: function updateProject() {
			this.$store.dispatch('updateProject', this.project);
			this.formMode = 0;
		},
		showCreateForm: function showCreateForm() {
			this.emptyProject();
			this.formMode = 2;
		},
		createProject: function createProject() {
			var _this = this;

			this.$store.dispatch('newProject', this.project).then(function (res) {
				return _this.formMode = 0;
			}).catch(function (err) {
				return alert(err.message);
			});
		},
		deleteProject: function deleteProject(project) {
			var confirmed = confirm('Are you sure to delete project?');

			if (!confirmed) {
				return;
			}

			this.$store.dispatch('deleteProject', project);
			this.formMode = 0;
		}
	}
});

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./resources/assets/js/page/project/index.js");


/***/ })

/******/ });