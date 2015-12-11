app.factory('FeedbackFact',['$http','baseUrl',function($http,baseUrl){

    return {
        getFeedbackLogDetails : function(feedbackLogId){
            return $http.get(baseUrl+'get-feedback-log-details/'+feedbackLogId);
        },

        submitFeedback: function(feedbackId,data){
            return $http.post(baseUrl+'submit-feedback/'+feedbackId, data);
        },
        getMyRecentReceivedFeedbacks : function(memberId, teamId){
            return $http.get(baseUrl+'get-my-recent-received-feedbacks/'+memberId+'/'+teamId);
        }

    }

}])