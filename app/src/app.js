var app = angular.module('Tinker',['ngRoute','ngMaterial'])
    app.value('baseUrl','../TinkerCake/api/');
    app.config(['$routeProvider',function($routeProvider){
        $routeProvider

        .when('/',      { title:"Login", controller:'LoginCtrl', templateUrl:'views/login.html' })
        .when('/login', { title:"Login", controller:'LoginCtrl', templateUrl:'views/login.html' })
        .when('/logout', { title:"Logout", controller:'LogoutCtrl', templateUrl:'views/logout.html' })
        .when('/create-team', { title:"Create Team", controller:'CreateTeamCtrl', templateUrl:'views/create-team.html' })
        .when('/add-team-members', { title:"Add Team Members", controller:'AddTeamMemberCtrl', templateUrl:'views/add-team-member.html' })
        .when('/signup-to-team/team/:teamId/member/:memberId', { title:"Signup to team", controller:'SignupToTeamCtrl', templateUrl:'views/signup-to-team.html' })
        .when('/showMembers', { title:"Members", controller:'ListMemberCtrl', templateUrl:'views/list-members.html' })
        .when('/recent-feedback',{ title:"Recent Feedback", controller:'RecentFeedbackCtrl', templateUrl:'views/recent-feedback.html' })
        .when('/send-feedback/:feedbackLogId',{ title:"Send Feedback", controller:'SendFeedbackCtrl', templateUrl:'views/sent-feedback.html'})
        .otherwise({redirectTo:'/login'});
    }]);

    app.run(['$location', '$rootScope', function($location, $rootScope) {
        $rootScope.$on('$routeChangeSuccess', function (event, current) {
            $rootScope.title = current.$$route.title;
            if($location.path() =='/login' || $location.path() =='/logout' || $location.path() =='/'){
                $rootScope.showLogout = false;
            }else{
                $rootScope.showLogout = true;
            }

        });
    }]);