
app.controller('AddTeamMemberCtrl',['$scope','$rootScope','$location','loginFact','TeamFactory','MemberFactory',function($scope,$rootScope,$location,loginFact,TeamFactory,MemberFactory){

    if(!loginFact.isLoggedIn()){
        $location.path('/login');
    }

    $scope.progresshide = false;
    $scope.submitted = false;
    $scope.shomessage = false;
    $scope.feedback_message = "Kindly wait, sending email to member...";
    $scope.memeberDeletMsg ='';
    $rootScope.flashmessage ='';

    if(loginFact.getCookie('is_organizer') =="false"){
        $rootScope.flashmessage ='You are not allowed to create team';
        $location.path('/recent-feedback');
    }


    init();
    function init(){
        MemberFactory.getTeamMemebers()
            .success(function(result, status, headers, config){
                $scope.members = result.data.members;
            })
            .error(function(result, status, headers, config){

            });

    }

    $scope.addMembersToTeam = function(){
        $scope.submitted = true;

        if(!$scope.AddTeamMembersFrm.$valid){
            return false;
        }

        $scope.$watch(function(scope) { return scope.member.email },
            function(newValue, oldValue) {
                $scope.AddTeamMembersFrm.email.$setValidity('alreadyregisterd', true);
            }
        );
        $scope.shomessage = true;
        $scope.progresshide = true
        TeamFactory.addMemberToTeam($scope.member,loginFact.getCookie('teamId'))
            .success(function(result){
                if(result.status===true){
                    $scope.member = {};
                    $scope.submitted = false;
                    $scope.progresshide = false;
                    init();
                }else{
                    if(result.status===false){
                        if(typeof result.errors.last_name !="undefined"){

                        }
                        if(typeof result.errors.email !="undefined"){
                            if(typeof result.errors.email.unique !="undefined"){
                                $scope.AddTeamMembersFrm.email.$setValidity('alreadyregisterd', false);
                            }
                        }
                        $scope.progresshide = false;
                    }
                }
                $scope.feedback_message = "Email sent";
                $scope.shomessage = false;
            })
            .error(function(result, status, headers, config){
                if(result.status===false && typeof result.message.name.unique !== "undefined"){
                    $scope.createTeamFrm.name.$setValidity('unique',false);
                }
                $scope.feedback_message = "Error occurred while sending email";
                $scope.shomessage = false;
                $scope.progresshide = false;
            });


    }


    $scope.removeMemberFromTeam = function(member,index){
        if(confirm('Are you sure?')){
            var google_name = member.google_name;
            MemberFactory.deleteMemberFromTeam(member.id,loginFact.getCookie('teamId'))
                .success(function(result, status, headers, config){
                    if(status ==200){
                        $scope.members.splice($scope.members.indexOf(member), 1);
                        $scope.status = "Member "+google_name+" deleted";
                    }
                })
                .error(function(result, status, headers, config){
                    $scope.status = "Could n't delete member "+google_name;
                })
        }


    }


}]);