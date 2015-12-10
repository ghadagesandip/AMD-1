app.directive('myFeedback',function(){
    return {
        restrict : "E",
        templateUrl : 'views/templates/my-feedback.html',
        scope:{
            feed: "=",
            badges : "=",
            senderPic : "@",
            send : "&",
            selectbadge : "&"
        }
    }
})