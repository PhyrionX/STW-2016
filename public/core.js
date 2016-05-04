// public/core.js
var GestionUsuarios = angular.module('GestionUsuarios', []);

function mainController($scope, $http) {
    $scope.formData = new FormData();

    // when landing on the page, get all todos and show them
    $http.get('/api/notas')
        .success(function(data) {
            $scope.notas = data.notas;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createUser = function() {
        if ($scope.formData.texto != null && $scope.formData.fecha != null) {
            $http.post('/api/notas', $scope.formData)
                .success(function (data) {
                    $scope.formData = {}; // clear the form so our user is ready to enter another
                    $scope.users = data.message;
                    console.log(data);
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        }
    };

    // delete a todo after checking it
    $scope.deleteUser = function(id) {
        $http.delete('/users/' + id)
            .success(function(data) {
                $scope.users = data.message;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}










