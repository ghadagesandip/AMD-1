var app = angular.module('TinkerApp',['ngRoute','ngMaterial'])
    app.value('baseUrl','../../TinkerCake/api/');
    app.config(['$routeProvider','$mdThemingProvider', '$mdIconProvider',function($routeProvider,$mdThemingProvider, $mdIconProvider){
        $routeProvider
        .when('/',      { title:"Login", controller:'LoginCtrl', templateUrl:'./views/login.html' })
        .when('/login', { title:"Login", controller:'LoginCtrl', templateUrl:'./views/login.html' })
        .when('/logout', { title:"Logout", controller:'LogoutCtrl', templateUrl:'./views/logout.html' })
        .when('/create-team', { title:"Create Team", controller:'CreateTeamCtrl', templateUrl:'./views/create-team.html' })
        .when('/add-team-members', { title:"Add Team Members", controller:'AddTeamMemberCtrl', templateUrl:'./views/add-team-member.html' })
        .when('/signup-to-team/team/:teamId/member/:memberId', { title:"Signup to team", controller:'SignupToTeamCtrl', templateUrl:'./views/signup-to-team.html' })
        .when('/home',{ title:"Home", controller:'HomeCtrl', templateUrl:'./views/home.html' })
        .when('/recent-feedback',{ title:"Recent Feedback", controller:'RecentFeedbackCtrl', templateUrl:'./views/recent-feedback.html' })
        .when('/send-feedback/:feedbackLogId',{ title:"Send Feedback", controller:'SendFeedbackCtrl', templateUrl:'./views/sent-feedback.html'})
        .otherwise({redirectTo:'/login'});

        $mdIconProvider
            .defaultIconSet("./assets/svg/avatars.svg", 128)
            .icon("menu"       , "./assets/svg/menu.svg"        , 24)
            .icon("share"      , "./assets/svg/share.svg"       , 24)
            .icon("google_plus", "./assets/svg/google_plus.svg" , 512)
            .icon("hangouts"   , "./assets/svg/hangouts.svg"    , 512)
            .icon("twitter"    , "./assets/svg/twitter.svg"     , 512)
            .icon("phone"      , "./assets/svg/phone.svg"       , 512);

        $mdThemingProvider.theme('default')
            .primaryPalette('red')
            .accentPalette('blue');
    }]);

    app.run(['$location', '$rootScope','$mdSidenav', function($location, $rootScope,$mdSidenav) {
        $rootScope.$on('$routeChangeSuccess', function (event, current) {
            $rootScope.title = current.$$route.title;

            if($location.path() =='/login' || $location.path() =='/logout' || $location.path() =='/'){
                $rootScope.showLogout = false;
            }else{
                $rootScope.showLogout = true;
            }
        });

    }]);