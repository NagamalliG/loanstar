var app = angular.module("app", []);

app.controller("controller", function($scope, $http) {
    $scope.countries = [];
    $scope.states = [];
    $scope.cities = [];
    $scope.names = [];
    $scope.country;
    $scope.state;
    $scope.city;
    $scope.getDataFromDB = function() {
        var url = '/getDataFromDB';
        $http.get(url).success(function(data) {
            $scope.countries = data;
            console.log('data:=' + JSON.stringify(data));
        });
    };
    $scope.getDataFromDB();
    $scope.GetSelectedCountry = function() {
        if ($scope.country) {
            $scope.states = $scope.country.States;
            $scope.state = '';
            $scope.cities = [];
        } else {
            $scope.states = [];
        }
    };
    $scope.GetSelectedState = function() {
        if ($scope.state) {
            $scope.cities = $scope.state.cities;
        } else {
            $scope.cities = [];
        }
    };
    $scope.retrieve = function() {
            var inserturl = '/retrieve';
            // console.log('country : ' + JSON.stringify($scope.country.name) + '  state :  ' + JSON.stringify($scope.state.name) + ' city: ' + $scope.city);
            $scope.formData = {
                country: $scope.country ? $scope.country.name : '',
                state: $scope.state ? $scope.state.name : '',
                city: $scope.city ? $scope.city : ''
            };
            $http.post(inserturl, $scope.formData)
                .success(function(response) {
                    console.log('response==  ' + JSON.stringify(response));
                    console.log("length===   " + response.length);
                    if (response.length === 0) {
                        // document.getElementById("tableData").style.display = "none";
                        $scope.names = { nodata: 'there is no data to display...' };
                    } else {
                        $scope.names = response;
                    }

                    console.log('success..');
                })
                .error(function(err) {
                    console.log('faillure...');
                    console.log(err);
                });

        }
        /*$scope.countries = [{
            _id: 1,
            name: 'India',
            States: [{
                    id: 1,
                    name: 'Maharashtra',
                    cities: ['Pune', 'Mumbai', 'Nagpur', 'Akola']
                }, {
                    id: 2,
                    name: 'Madhya Pradesh',
                    cities: ['Indore', 'Bhopal', 'Jabalpur']
                }, {
                    id: 3,
                    name: 'Rajasthan',
                    cities: ['Jaipur', 'Ajmer', 'Jodhpur']
                }

            ]
        }, {
            _id: 2,
            name: 'USA',
            States: [{
                    id: 1,
                    name: 'Alabama',
                    cities: ['Montgomery', 'Birmingham']
                }, {
                    id: 2,
                    name: 'California',
                    cities: ['Sacramento', 'Fremont']
                }, {
                    id: 3,
                    name: 'Illinois',
                    cities: ['Springfield', 'Chicago']
                }

            ]
        }, {
            _id: 3,
            name: 'Australia',
            States: [{
                id: 1,
                name: 'New South Wales',
                cities: ['Sydney']
            }, {
                id: 2,
                name: 'Victoria',
                cities: ['Melbourne']
            }]
        }];*/

});