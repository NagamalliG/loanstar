var app = angular.module("app", []);
app.controller("controller", function($scope) {
    $scope.countries = {
        'India': {
            'Maharashtra': ['Pune', 'Mumbai', 'Nagpur', 'Akola'],
            'Madhya Pradesh': ['Indore', 'Bhopal', 'Jabalpur'],
            'Rajasthan': ['Jaipur', 'Ajmer', 'Jodhpur']
        },
        'USA': {
            'Alabama': ['Montgomery', 'Birmingham'],
            'California': ['Sacramento', 'Fremont'],
            'Illinois': ['Springfield', 'Chicago']
        },
        'Australia': {
            'New South Wales': ['Sydney'],
            'Victoria': ['Melbourne']
        }
    };
    $scope.GetSelectedCountry = function() {
        $scope.strCountry = document.getElementById("country").value;
    };
    $scope.GetSelectedState = function() {
        $scope.strState = document.getElementById("state").value;
    };
    // $scope.items = [{
    //     name: "Chicken",
    //     options: [
    //         "Drumstick",
    //         "Thigh",
    //         "Wing"
    //     ],
    //     description: [
    //         "hi",
    //         "hello"
    //     ]
    // }, {
    //     name: "Meat",
    //     options: [
    //         "Lamb",
    //         "Goat",
    //     ],
    //     description: [
    //         "h r u ",
    //         "wt abt you "
    //     ]
    // }, {
    //     name: "Fish",
    //     options: [
    //         "Pulasa",
    //         "royya",
    //     ],
    //     description: [
    //         "who r u",
    //         "i am malli"
    //     ]
    // }];
});