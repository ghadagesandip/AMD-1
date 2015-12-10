app.factory('loginFact',['$http','$location','$window','baseUrl',function($http, $location, $window, baseUrl){
    return {

        authenticate : function(credentials){
            return $http.post(baseUrl+'sign-up',credentials);
        },

        saveValue: function(cname,cvalue){
            localStorage.setItem(cname,cvalue);
        },

        setCookie: function(cname,cvalue){
            localStorage.setItem(cname,cvalue);
        },

        getCookie : function(cname){
            return localStorage.getItem(cname);
        },

        isLoggedIn : function(){
            var item = localStorage.getItem('google_name')
            if(typeof item ==="undefined" || item === null){
                return false;
            }
            return true;
        },

        getName : function(){
           return localStorage.getItem('google_name')
        },

        deleteCookies : function(){
            localStorage.removeItem('memberId');
            localStorage.removeItem('first_name');
            localStorage.removeItem('last_name');
            localStorage.removeItem('google_name');
            localStorage.removeItem('google_image_url');
            localStorage.removeItem('googleid');
            localStorage.removeItem('email');
            localStorage.removeItem('is_organizer');
            localStorage.removeItem('active');
            localStorage.removeItem('teamId');
            localStorage.removeItem('isnew');

            return true;
        }

    }
}]);