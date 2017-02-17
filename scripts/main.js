var app = angular.module("app", []);

app.controller("controller", function($scope) {

    $scope.items = [{
        name: "Chicken",
        options: [
            "Drumstick",
            "Thigh",
            "Wing"
        ]
    }, {
        name: "Meat",
        options: [
            "Lamb",
            "Goat",
        ]
    }, {
        name: "Fish"
    }];

});