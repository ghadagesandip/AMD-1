
app.controller('HomeCtrl',['$scope','$location','loginFact','FeedbackFact',function($scope,$location,loginFact,FeedbackFact){

    $scope.submitted = false;

    if(!loginFact.isLoggedIn()){
        $location.path('/login');
    }

    FeedbackFact.getMyRecentReceivedFeedbacks(loginFact.getCookie('memberId'),loginFact.getCookie('teamId'))
        .success(function(data, status, headers, config){
            $scope.teamMembers = data.data.teamAndMembers.members
            $scope.feedbacksforme = data.data.receivedFeedbacks;
            $scope.feedbackssentbyme = data.data.sentFeedbacks;
        })

}]);