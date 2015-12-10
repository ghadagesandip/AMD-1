
app.controller('SendFeedbackCtrl',['$scope','$location','$routeParams','loginFact','FeedbackFact',function($scope,$location,$routeParams,loginFact,FeedbackFact){

    $scope.submitted = false;
    $scope.message = null;
    $scope.feedbackDatails = {};
    $scope.member = {};

    if(!loginFact.isLoggedIn()){
        $location.path('/login');
    }

    FeedbackFact.getFeedbackLogDetails($routeParams.feedbackLogId)
        .success(function(data, status, headers, config){
            if(data.status == true){
                $scope.feedbackDatails  = data.data.feedbacklog;
                $scope.CtrlsenderPic =  data.data.feedbacklog.feedback_from.google_image_url;
                $scope.badges =  data.data.badges;
            }
        })
        .error(function(data,status,headers,config){
            console.log('error')
        });




    $scope.submitFeedback = function(member,feedItem,skipped,tabIndex){
        console.log('tabIndex'+tabIndex);
        $scope.member.action = skipped;

        FeedbackFact.submitFeedback(feedItem.id,$scope.member)
            .success(function(data, status, headers, config){
                console.log(tabIndex);
                console.log(data)
                console.log($scope.feedbackDatails);

            })
            .error(function(){
                console.log(data);
            })
    }




    $scope.setBadge = function(badgeObj){
        console.log(badgeObj)
    }


}]);