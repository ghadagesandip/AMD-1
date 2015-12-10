
app.controller('CreateTeamCtrl',['$scope','$rootScope','$location','loginFact','TeamFactory',function($scope, $rootScope, $location,loginFact,TeamFactory){

    $scope.submitted = false;
    $scope.message = null;
    $rootScope.flashmessage = '';
    if(!loginFact.isLoggedIn()){
        $location.path('/login');
    }


    if(loginFact.getCookie('is_organizer')=="false"){
        $rootScope.flashmessage ='You are not allowed to create team';
        $location.path('/recent-feedback');
    }else{

    }

    $scope.setName = loginFact.getCookie('google_name')+"'s Team";

    $scope.createTeam = function(){
        $scope.createTeamFrm.name.$setValidity('unique',true);
        $scope.submitted = true;

        if(!$scope.createTeamFrm.$valid){
            return false;
        }
        $scope.team = {};
        $scope.team.member_id = loginFact.getCookie('memberId');
        $scope.team.name = $scope.setName;


        TeamFactory.createTeam($scope.team)
            .success(function(result){
                $scope.team = {}
                $scope.status = 'team saved';
                loginFact.setCookie('teamId',result.data.id);
                $location.path('/add-team-members');
            })
            .error(function(result, status, headers, config){
                if(result.status===false && typeof result.message.name.unique !== "undefined"){
                    $scope.createTeamFrm.name.$setValidity('unique',false);
                }
            });
    }
}]);