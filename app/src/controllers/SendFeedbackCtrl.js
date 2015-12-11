
app.controller('SendFeedbackCtrl',['$scope','$location','$routeParams','loginFact','FeedbackFact',function($scope,$location,$routeParams,loginFact,FeedbackFact){

    $scope.submitted = false;
    $scope.message = null;
    $scope.feedbackDatails = {};
    $scope.member = {};
    $scope.showCompleteFeedbackMsg = false;

    if(!loginFact.isLoggedIn()){
        $location.path('/login');
    }

    FeedbackFact.getFeedbackLogDetails($routeParams.feedbackLogId)
        .success(function(data, status, headers, config){
            if(data.status == true){
                $scope.feedbackMessage = 'Feedback already provided to all members';
                $scope.showCompleteFeedbackMsg = !(data.data.feedbacklog.feedbacks.length)
                $scope.feedbackDatails  = data.data.feedbacklog;
                $scope.CtrlsenderPic =  data.data.feedbacklog.feedback_from.google_image_url;
                $scope.badges =  data.data.badges;
            }
        })
        .error(function(data,status,headers,config){
            $scope.feedbackMessage = data.message;
            $scope.showCompleteFeedbackMsg = true;
        });




    $scope.submitFeedback = function(member,feedItem,skipped,tabIndex){

        $scope.member = member;
        $scope.member.action = skipped
        if(skipped == 1){
            $scope.member.feedback_text = null;
            $scope.member.badge_id = null;
            $scope.member.action = 1
        }

        FeedbackFact.submitFeedback(feedItem.id,$scope.member)
            .success(function(data, status, headers, config){
                console.log(tabIndex);
                console.log($scope.feedbackDatails);
                alert(data.message)

            })
            .error(function(data){
                console.log(data);
                alert(data.message)
            })
    }




    $scope.setBadge = function(badgeObj){
        console.log('console '+badgeObj)
    }


}]);