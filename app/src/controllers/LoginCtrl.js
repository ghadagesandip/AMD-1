app.controller('LoginCtrl',['$scope','$window','$location','loginFact',function($scope, $window, $location, loginFact){

    $scope.loginerror = false;
    $scope.ctrlerror = '';

    if(loginFact.isLoggedIn()){
        $location.path('/home');
    }

    $window.onSignIn = function(googleUser){

        var profile = googleUser.getBasicProfile();

        var userDetails = {
            googleid : profile.getId(),
            google_name : profile.getName(),
            google_image_url : profile.getImageUrl(),
            email : profile.getEmail(),
            is_organizer : 1,
            first_name : profile.getName().split(' ')[0],
            last_name : profile.getName().split(' ')[1]
        }

        loginFact.authenticate(userDetails)
            .success(function(data, status, headers, config){

                if(data.status===true && status==200){
                    console.log(data.data);
                    loginFact.saveValue('memberId',data.data.id);
                    loginFact.saveValue('first_name',data.data.first_name);
                    loginFact.saveValue('last_name',data.data.last_name);
                    loginFact.saveValue('google_name',data.data.google_name);
                    loginFact.saveValue('google_image_url',data.data.google_image_url);
                    loginFact.saveValue('googleid', data.data.googleid);
                    loginFact.saveValue('email', data.data.email);
                    loginFact.saveValue('is_organizer', data.data.is_organizer);
                    loginFact.saveValue('active', data.data.active);
                    loginFact.saveValue('isnew', data.data.new);

                    if(typeof data.data.teamId == "undefined" ){
                        $location.path('/create-team');
                    }else{
                        loginFact.saveValue('teamId', data.data.teamId);
                        $location.path('/home');

                    }

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
            console.log('User signed out.');
        });
    }
}]);