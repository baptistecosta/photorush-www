angular.module("PhotoRushApp", [
	"ngResource",
	"ngRoute"
]).config(function($routeProvider) {
	$routeProvider.when("/home", {
		controller: "HomeController",
		templateUrl: "partials/home.html"
	}).when("/pixes", {
		controller: "PixesController",
		templateUrl: "partials/pixes.html"
	}).when("/pix/add", {
		controller: "PixAddController",
		templateUrl: "partials/pixes/add.html"
	}).otherwise({
		redirectTo: "/home"
	});
}).factory({
	PixFactory: function($http) {
		return {
			get: function() {
				return $http.get("http://localhost:3030/pixes");
			}
		};
	},
	PixCategoryFactory: function($http) {
		return {
			get: function() {
				return $http.get("http://localhost:3030/pixCategories");
			}
		}
	}
}).controller({
	HomeController: function($scope) {
		//
	},
	PixesController: function($scope, PixFactory) {
		PixFactory.get().then(function(res) {
			console.log(res);
			$scope.pixes = res.data.pixes;
		});
	},
	PixAddController: function($scope, PixFactory, PixCategoryFactory) {
		PixCategoryFactory.get().then(function(res) {
			console.log(res);
			$scope.pixCategories = res.data.pixCategories;
		});

		$scope.add = function() {
			console.log($scope.pix);
		};
	}
});