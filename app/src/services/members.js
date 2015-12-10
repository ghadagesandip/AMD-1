app.factory('MemberFactory',['$http','loginFact','baseUrl',function($http, loginFact, baseUrl){

    return {

        getTeamMemebers : function(){
            return $http.post(baseUrl+'get-team-memebers/'+loginFact.getCookie('teamId'));
        },
        completeMemberRegistration : function(memberData,memberId, teamId){
            return $http.post(baseUrl+'complete-member-registration/'+memberId+'/'+teamId, memberData)
        },
        deleteMemberFromTeam: function (memberId, teamId) {
            return $http.post(baseUrl+'delete-team-member/'+memberId+'/'+teamId);
        }


    }
}]);