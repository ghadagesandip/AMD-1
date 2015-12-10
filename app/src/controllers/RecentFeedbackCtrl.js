
app.controller('RecentFeedbackCtrl',['$scope','$location','loginFact',function($scope,$location,loginFact){

    $scope.submitted = false;
    $scope.message = null;

    if(!loginFact.isLoggedIn()){
        $location.path('/login');
    }


}]);