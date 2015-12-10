app.factory('TeamFactory',['$http','loginFact','baseUrl',function($http, loginFact, baseUrl){

    return {

        createTeam : function(teamData){
            return $http.post(baseUrl+'create-team',teamData);
        },
        addMemberToTeam : function(teamMemberData,teamId){
            return $http.post(baseUrl+'add-member-to-team/'+teamId, teamMemberData);
        },
        getTeamandMemberDetails : function(teamId,memberId){
            return $http.get(baseUrl+'get-team-and-member-details/'+teamId+'/'+memberId);
        }

    }
}]);