app.controller('SignupToTeamCtrl',['$scope','$rootScope','$routeParams','$window','$location','loginFact','TeamFactory','MemberFactory',function($scope, $rootScope, $routeParams, $window, $location, loginFact, TeamFactory, MemberFactory){

    $scope.loginerror = false;
    $scope.ctrlerror = '';
    $rootScope.flashmessage = '';

    TeamFactory.getTeamandMemberDetails($routeParams.teamId,$routeParams.memberId)
        .success(function(data, status, headers, config){

            if(data.status == true){

               if(data.data.member_name == null || data.data.team_name==null ){
                   $rootScope.flashmessage ="Sorry, Link is invalid.";
                   $location.path('/login')
               }
               $scope.team_name = data.data.team_name;
               $scope.member_name = data.data.member_name;
               $scope.organiser_name = data.data.organiser_name;
            }
        })
        .error(function(data,status,headers,config){
           console.log('error')
        });


    $window.onSignIn = function(googleUser){

        var profile = googleUser.getBasicProfile();

        var userDetails = {
            googleid : profile.getId(),
            google_name : profile.getName(),
            google_image_url : profile.getImageUrl(),
            email : profile.getEmail()
        }


        MemberFactory.completeMemberRegistration(userDetails, $routeParams.memberId, $routeParams.teamId)
            .success(function(data, status, headers, config){

                if(data.status===true && status==200){

                    loginFact.saveValue('memberId',data.data.id);
                    loginFact.saveValue('first_name',data.data.first_name);
                    loginFact.saveValue('last_name',data.data.last_name);
                    loginFact.saveValue('google_name',data.data.google_name);
                    loginFact.saveValue('google_image_url',data.data.google_image_url);
                    loginFact.saveValue('googleid', data.data.googleid);
                    loginFact.saveValue('email', data.data.email);
                    loginFact.saveValue('is_organizer', data.data.is_organizer);
                    loginFact.saveValue('active', data.data.active);
                    loginFact.saveValue('teamId', data.data.teams[0].id);
                    $location.path('/home');
                }
            })
            .error(function(data, status, headers, config){
                $scope.loginerror = true;
                $scope.ctrlerror = data.message
            })
    }

    $window.signOut = function(){
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {

        });
    }
}]);