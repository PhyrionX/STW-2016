// public/core.js
var app = angular.module('GestionUsuarios', []);

function mainController($scope, $http, formDataObject) {
    $scope.formData = new FormData();
    $scope.error = {};
    $scope.files = {};
    //listen for the file selected event
    $scope.$on("fileSelected", function (event, args) {
        $scope.$apply(function () {
            //add the file object to the scope's files collection
            console.log(args.file);
            $scope.files = args.file;
        });
    });

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
    $scope.createNota = function() {
        $scope.fileToUpload = {}
        console.log($scope.fileToUpload)
        if ($scope.formData.texto != null && $scope.formData.fecha != null) {
            $http({
                method:"post",
                url: '/api/notas',
                headers: { 'Content-Type': undefined },
                transformRequest: formDataObject,
                data: { model: $scope.formData, files: $scope.files }})
                .success(function (data) {
                    $scope.formData = {}; // clear the form so our user is ready to enter another
                    angular.element("input[type='file']").val(null);
                    $scope.notas = data.notas;
                    console.log(data);

                })
                .error(function (data) {
                    $scope.formData = {}; // clear the form so our user is ready to enter another
                    console.log('Error: ' + data);
                    angular.element("input[type='file']").val(null);
                });
        } else {
            $scope.error.fecha = true;
        }
    };

    // delete a todo after checking it
    $scope.deleteNota = function(id) {
        $http.delete('/api/notas/' + id)
            .success(function(data) {
                $scope.notas = data.notas;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };


}

app.factory('formDataObject', function() {
    return function (data) {
        var formData = new FormData();
        console.log(data.model.texto);
        //need to convert our json object to a string version of json otherwise
        // the browser will do a 'toString()' on the object which will result
        // in the value '[Object object]' on the server.
        formData.append("texto", data.model.texto);
        formData.append("fecha", data.model.fecha);
        //now add all of the assigned files
        formData.append("upload" , data.files);

        return formData;
    };
});

app.directive('fileUpload', function () {
    return {
        scope: true,        //create a new scope
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                var files = event.target.files;
                //iterate files since 'multiple' may be specified on the element
                //scope.$emit("fileSelected", { file: files });
                for (var i = 0;i< files.length;i++) {
                    //emit event upward
                    scope.$emit("fileSelected", { file: files[i] });
                }
            });
        }
    };
});


