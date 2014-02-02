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
}).directive({
	bcFileModel: function($parse) {
		return {
			restrict: "A",
			link: function(scope, element, attrs) {
				var model = $parse(attrs.bcFileModel);
				var modelSetter = model.assign;
				element.bind("change", function() {
					scope.$apply(function() {
						modelSetter(scope, element[0].files[0]);
					})
				});
			}
		}
	}
}).factory({
	PixFactory: function($http) {
		return {
			get: function() {
				return $http.get("http://localhost:3030/pixes");
			},
			add: function(file) {
				var fd = new FormData();
				fd.append("file", file);
				return $http.post("http://localhost:3030/pix", fd, {
					transformRequest: angular.identity,
					headers: {'Content-Type': undefined}
				});
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
		$scope.pix = {};
		$scope.locales = [
			{value: "fr", text: "French"},
			{value: "en", text: "English"},
			{value: "ww", text: "World wide"}
		];
		$scope.pix.locale = $scope.locales[0].value;

		PixCategoryFactory.get().then(function(res) {
			console.log(res);
			$scope.pixCategories = res.data.pixCategories;
			$scope.pix.category = $scope.pixCategories[0].id;
		});

		$scope.add = function() {
//			PixFactory.add($scope.pix).success(function(res) {
//				console.log(res);
//			});
			var file = $scope.picture;
			PixFactory.add(file).success(function(res) {
				console.log(res);
			});
		};
	}
});